import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PageActions from '../actions/user-page.actions';
import { userFeature } from '../features/user.feature';

@Injectable({ providedIn: 'root' })
export class UserStoreService {
  loadStatus$ = this.store.select(userFeature.selectLoadStatus);
  own$ = this.store.select(userFeature.selectOwn);

  constructor(private store: Store) {}

  loadOwn() {
    this.store.dispatch(PageActions.loadOwn());
  }

  clearOwn() {
    this.store.dispatch(PageActions.clear());
  }
}
