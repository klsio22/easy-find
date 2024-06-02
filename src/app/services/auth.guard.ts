import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    tap(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(['/']);
      }
    }),
    map(isLoggedIn => isLoggedIn)
  );
};
