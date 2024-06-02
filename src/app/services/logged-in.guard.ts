import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

import { AuthService } from './auth.service';
import { map, tap } from 'rxjs';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    tap(isLoggedIn => {
      if (isLoggedIn) {
        router.navigate(['/home']);
      }
    }),
    map(isLoggedIn => !isLoggedIn)
  );
};
