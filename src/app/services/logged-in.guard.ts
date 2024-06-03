import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map, tap } from 'rxjs';

export const loggedInGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    tap((loggedIn) => {
      if (loggedIn) {
        router.navigate(['/home']);
      }
    }),
    map((loggedIn) => !loggedIn)
  );
};
