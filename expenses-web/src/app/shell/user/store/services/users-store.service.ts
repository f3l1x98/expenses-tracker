import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UsersActions from '../actions/user-user.actions';
import { usersFeature } from '../features/users.feature';

@Injectable({ providedIn: 'root' })
export class UsersStoreService {
  loadStatus$ = this.store.select(usersFeature.selectLoadStatus);
  own$ = this.store.select(usersFeature.selectOwn);

  constructor(private store: Store) {}

  loadOwn() {
    this.store.dispatch(UsersActions.loadOwn());
  }
}
