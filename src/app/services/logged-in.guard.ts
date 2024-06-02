// logged-in.guard.ts
import { Injectable } from '@angular/core';
import { Router , CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Para compatibilidade com Firebase v9
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !user),
      tap(notLoggedIn => {
        if (!notLoggedIn) {
          this.router.navigate(['/home']);
        }
      })
    );
  }
}
