import { Injectable } from '@angular/core';
import { UserStoreService } from './store/services/user-store.service';
import { ICreateUserDto } from 'expenses-shared';

@Injectable({ providedIn: 'root' })
export class UserService {
  loadStatus$ = this.storeService.loadStatus$;
  own$ = this.storeService.own$;
  registerStatus$ = this.storeService.createStatus$;

  constructor(private storeService: UserStoreService) {}

  register(request: ICreateUserDto) {
    this.storeService.register(request);
  }

  loadOwn() {
    this.storeService.loadOwn();
  }

  clearOwn() {
    this.storeService.clearOwn();
  }
}
