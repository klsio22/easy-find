import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  private async addFileData(userId: string, fileData: any): Promise<void> {
    if (!fileData.fileName || !fileData.fileUrl) {
      throw new Error('Invalid file data');
    }

    return this.firestore
      .collection('users')
      .doc(userId)
      .set(
        {
          books: {
            [fileData.fileName]: {
              FileName: fileData.fileName,
              FileUrl: fileData.fileUrl,
            },
          },
        },
        { merge: true },
      )
      .then(() => console.log('File data added successfully'))
      .catch((error) => console.error('Error adding file data: ', error));
  }

  getFiles(userId: string): Observable<any> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .valueChanges()
      .pipe(map((user: any) => user.books));
  }
}
