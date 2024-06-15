import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.currentUser$.pipe(
    map((user) => {
      if (!user) {
        router.navigate(['/auth/login']);
        return false;
      } else {
        // TODO check if jwt token expired
        return true;
      }
    }),
  );
};
