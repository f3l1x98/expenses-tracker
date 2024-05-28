import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { authFeature } from './auth.feature';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService implements OnDestroy {
  status$ = this.store.select(authFeature.selectStatus);
  currentUser$ = this.store.select(authFeature.selectUser);
  errorMessage$ = this.store.select(authFeature.selectErrorMessage);
  token$ = this.store.select(authFeature.selectToken);

  private destory$ = new Subject();

  constructor(private store: Store) {}

  ngOnDestroy(): void {
    this.destory$.next(true);
    this.destory$.complete();
  }
}
