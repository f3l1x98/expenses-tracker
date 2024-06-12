import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PageActions from '../actions/user-page.actions';
import { userFeature } from '../features/user.feature';
import { CreateUserRequest } from '../../api/interfaces/requests/create-user-request.interface';

@Injectable({ providedIn: 'root' })
export class UserStoreService {
  loadStatus$ = this.store.select(userFeature.selectLoadStatus);
  own$ = this.store.select(userFeature.selectOwn);
  createStatus$ = this.store.select(userFeature.selectCreateStatus);

  constructor(private store: Store) {}

  register(request: CreateUserRequest) {
    this.store.dispatch(PageActions.register({ request }));
  }

  loadOwn() {
    this.store.dispatch(PageActions.loadOwn());
  }

  clearOwn() {
    this.store.dispatch(PageActions.clear());
  }
}
