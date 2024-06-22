import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import 'firebase/compat/firestore';

export interface BookData {
  FileName: string;
  FileUrl: string;
}

interface UserData<T> {
  books: T[];
}

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private convertApiSecret = 'RA0mTkUEehXDvJih';

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private http: HttpClient,
  ) {}

  convertPdfToHtml(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const apiUrl = `https://v2.convertapi.com/convert/pdf/to/html?Secret=${this.convertApiSecret}`;

    console.log("v2312>>", apiUrl, formData);

    return this.http.post(apiUrl, formData);
  }

  saveToLocalStorage(key: string, data: any): void {
    const dataString = JSON.stringify(data);
    const dataSize = new Blob([dataString]).size;
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (dataSize > maxSize) {
      console.warn('Dados muito grandes para armazenar no localStorage');
      // Utilize uma abordagem alternativa aqui, como armazenar em um banco de dados
    } else {
      localStorage.setItem(key, dataString);
    }
  }

  getFromLocalStorage(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  uploadFile(file: File, userId: string): Observable<string> {
    const filePath = `uploads/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return new Observable<string>((observer) => {
      const handleDownloadUrl = (url: string) => {
        this.addFileData(userId, { FileUrl: url, FileName: file.name }).then(
          () => {
            observer.next(url);
            observer.complete();
          },
        );
      };

      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(handleDownloadUrl);
          }),
        )
        .subscribe();
    });
  }

  public async addFileData(userId: string, fileData: BookData): Promise<void> {
    if (!fileData.FileName || !fileData.FileUrl) {
      throw new Error('Invalid file data');
    }

    const userDocRef = this.firestore.collection('users').doc(userId).ref;

    try {
      const existingBooksSnapshot = await userDocRef
        .collection('books')
        .where('FileName', '==', fileData.FileName)
        .get();

      if (!existingBooksSnapshot.empty) {
        console.log('File data already exists');
        return;
      }

      await this.firestore.firestore.runTransaction(async (transaction) => {
        const userDoc = await transaction.get(userDocRef);
        let books: BookData[] = [];

        if (userDoc.exists) {
          const userData = userDoc.data() as UserData<BookData>;
          books = Array.isArray(userData.books) ? [...userData.books] : [];
        }

        books.push({
          FileName: fileData.FileName,
          FileUrl: fileData.FileUrl,
        });

        transaction.set(userDocRef, { books }, { merge: true });
        console.log('File data added successfully');
      });
    } catch (error) {
      console.error('Error adding file data: ', error);
      throw error;
    }
  }

  getFiles(userId: string): Observable<any> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .valueChanges()
      .pipe(map((user: any) => user.books));
  }
}
