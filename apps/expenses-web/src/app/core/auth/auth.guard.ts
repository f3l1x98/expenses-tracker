import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

function tokenExpired(token: string) {
  const expiry = JSON.parse(atob(token.split('.')[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
}

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.token$.pipe(
    map((token) => {
      if (!token || tokenExpired(token)) {
        router.navigate(['/auth/login']);
        return false;
      } else {
        return true;
      }
    }),
  );
};
