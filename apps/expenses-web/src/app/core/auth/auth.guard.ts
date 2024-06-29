import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

function tokenExpired(token: string) {
  const expiry = JSON.parse(atob(token.split('.')[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
}

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.token$.pipe(
    map((token) => {
      if (!token || tokenExpired(token)) {
        const returnUrl = state.url;
        authService.logout();
        router.navigate(['/auth/login'], { queryParams: { returnUrl } });
        return false;
      } else {
        return true;
      }
    }),
  );
};
