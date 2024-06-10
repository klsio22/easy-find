import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  registerUser(email: string, password: string, additionalData: any) {
    return from(
      this.afAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      switchMap((userCredential) => {
        const uid = userCredential.user?.uid;
        return this.firestore
          .doc(`/users/${uid}`)
          .set({ email, ...additionalData });
      })
    );
  }

  saveUserProfile(uid: string, userData: any) {
    return from(
      this.firestore.doc(`/users/${uid}`).set(userData, { merge: true })
    );
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }

  getUserProfile(uid: string): Observable<any> {
    return this.firestore.doc(`/users/${uid}`).valueChanges();
  }
}
