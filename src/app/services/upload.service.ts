import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
  ) {}

  uploadFile(file: File, userId: string): Observable<string> {
    const filePath = `uploads/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return new Observable<string>((observer) => {
      const handleDownloadUrl = (url: string) => {
        this.addFileData(userId, { fileUrl: url, fileName: file.name }).then(
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

  public async addFileData(userId: string, fileData: any): Promise<void> {
    if (!fileData.fileName || !fileData.fileUrl) {
      throw new Error('Invalid file data');
    }

    const userDocRef = this.firestore.collection('users').doc(userId).ref;

    try {
      await this.firestore.firestore.runTransaction(async (transaction) => {
        const userDoc = await transaction.get(userDocRef);
        let books: BookData[] = [];

        if (userDoc.exists) {
          const userData = userDoc.data() as UserData<BookData>;
          books = Array.isArray(userData.books) ? [...userData.books] : [];
        }

        const existingBookIndex = books.findIndex(
          (book) => book.FileUrl === fileData.fileUrl,
        );

        if (existingBookIndex === -1) {
          books.push({
            FileName: fileData.fileName,
            FileUrl: fileData.fileUrl,
          });
          transaction.set(userDocRef, { books }, { merge: true });
          console.log('File data added successfully');
        } else {
          console.log('File data already exists');
        }
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
