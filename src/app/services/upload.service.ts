// upload.service.ts
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {}

  uploadFile(file: File, bookData: any, userId: string): Observable<string> {
    const filePath = `uploads/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return new Observable<string>((observer) => {
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            // Add book data to Firestore
            this.addBookData(userId, {...bookData, imageUrl: url}).then(() => {
              observer.next(url);
              observer.complete();
            });
          });
        })
      ).subscribe();
    });
  }

  private async addBookData(userId: string, bookData: any): Promise<void> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection('books')
      .add(bookData)
      .then(() => console.log('Book data added successfully'))
      .catch(error => console.error('Error adding book data: ', error));
  }
}
