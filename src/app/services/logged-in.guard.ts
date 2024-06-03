import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, finalize, map, tap } from 'rxjs';
import { SpinnerService } from './spinner.service';

export const loggedInGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const spinnerService = inject(SpinnerService);

  spinnerService.show();

  return authService.isLoggedIn().pipe(
    tap((loggedIn) => {
      if (loggedIn) {
        router.navigate(['/home']);
        return true;
      }
      return false;
    }),
    map((loggedIn) => !loggedIn),
    finalize(() => spinnerService.hide()),
  );
};
