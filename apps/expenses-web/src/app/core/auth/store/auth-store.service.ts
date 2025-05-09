import { Injectable, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { authFeature } from './feature/auth.feature';
import { Subject } from 'rxjs';
import * as PageActions from './actions/auth-page.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService implements OnDestroy {
  #store = inject(Store);

  status$ = this.#store.select(authFeature.selectStatus);
  currentUser$ = this.#store.select(authFeature.selectUser);
  errorMessage$ = this.#store.select(authFeature.selectErrorMessage);
  token$ = this.#store.select(authFeature.selectToken);

  private destory$ = new Subject();

  ngOnDestroy(): void {
    this.destory$.next(true);
    this.destory$.complete();
  }

  login(username: string, password: string) {
    this.#store.dispatch(
      PageActions.login({ request: { username, password } }),
    );
  }

  logout() {
    this.#store.dispatch(PageActions.logout());
  }
}
