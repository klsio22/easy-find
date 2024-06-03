import { inject } from '@angular/core';
import { ResolveFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { SpinnerService } from './spinner.service';

export const authResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const spinnerService = inject(SpinnerService);

  spinnerService.show();

  return authService.isLoggedIn().pipe(
    map((loggedIn) => {
      if (!loggedIn) {
        console.log('User is not logged in');
        router.navigate(['/']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigate(['/']);
      return of(false);
    }),
    finalize(() => spinnerService.hide())
  );
};
