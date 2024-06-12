import { Injectable } from '@angular/core';
import { UserStoreService } from './store/services/user-store.service';
import { CreateUserRequest } from './api/interfaces/requests/create-user-request.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  loadStatus$ = this.storeService.loadStatus$;
  own$ = this.storeService.own$;
  registerStatus$ = this.storeService.createStatus$;

  constructor(private storeService: UserStoreService) {}

  register(request: CreateUserRequest) {
    this.storeService.register(request);
  }

  loadOwn() {
    this.storeService.loadOwn();
  }

  clearOwn() {
    this.storeService.clearOwn();
  }
}
