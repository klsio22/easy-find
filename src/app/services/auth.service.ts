import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { LocalStorageService } from './LocalStorageService';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private localStorageService: LocalStorageService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      tap((user) => {
        if (user) {
          this.localStorageService.setItem('user', JSON.stringify(user));
        } else {
          this.localStorageService.removeItem('user');
        }
      }),
      switchMap((user) => {
        if (user) {
          return of(user);
        } else {
          const storedUser = this.localStorageService.getItem('user');
          return storedUser ? of(JSON.parse(storedUser)) : of(null);
        }
      })
    );
  }

  async login() {
    return this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        this.localStorageService.setItem('user', JSON.stringify(result.user));
      });
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    localStorage.removeItem('user'); 
    return this.afAuth.signOut();
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user));
  }

  getUser(): firebase.User | null {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  getCurrentUser(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }
}
