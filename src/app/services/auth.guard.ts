import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, catchError, finalize, map, of } from 'rxjs';
import { SpinnerService } from './spinner.service';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const spinnerService = inject(SpinnerService);

  spinnerService.show();

  return authService.isLoggedIn().pipe(
    map((loggedIn) => {
      if (!loggedIn) {
        router.navigate(['/']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigate(['/']);
      return of(false);
    }),
    finalize(() => spinnerService.hide()),
  );
};
