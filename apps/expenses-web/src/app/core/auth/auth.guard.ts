import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthStore } from './auth.store';

function tokenExpired(token: string) {
  const expiry = JSON.parse(atob(token.split('.')[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
}

export const AuthGuard: CanActivateFn = (route, state) => {
  const store = inject(AuthStore);
  const router = inject(Router);
  return toObservable(store.token).pipe(
    map((token) => {
      if (!token || tokenExpired(token)) {
        const returnUrl = state.url;
        store.logout();
        router.navigate(['/auth/login'], { queryParams: { returnUrl } });
        return false;
      } else {
        return true;
      }
    }),
  );
};
