import { Injectable } from '@angular/core';
import { UsersStoreService } from './store/services/users-store.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  loadStatus$ = this.storeService.loadStatus$;
  own$ = this.storeService.own$;

  constructor(private storeService: UsersStoreService) {}

  loadOwn() {
    this.storeService.loadOwn();
  }
}
