import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PageActions from '../actions/user-page.actions';
import { userFeature } from '../features/user.feature';
import { ICreateUserDto } from 'expenses-shared';

@Injectable({ providedIn: 'root' })
export class UserStoreService {
  #store = inject(Store);

  loadStatus$ = this.#store.select(userFeature.selectLoadStatus);
  own$ = this.#store.select(userFeature.selectOwn);
  createStatus$ = this.#store.select(userFeature.selectCreateStatus);

  register(request: ICreateUserDto) {
    this.#store.dispatch(PageActions.register({ request }));
  }

  loadOwn() {
    this.#store.dispatch(PageActions.loadOwn());
  }

  clearOwn() {
    this.#store.dispatch(PageActions.clear());
  }
}
