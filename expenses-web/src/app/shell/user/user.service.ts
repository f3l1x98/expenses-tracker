import { Injectable } from '@angular/core';
import { UserStoreService } from './store/services/user-store.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  loadStatus$ = this.storeService.loadStatus$;
  own$ = this.storeService.own$;

  constructor(private storeService: UserStoreService) {}

  loadOwn() {
    this.storeService.loadOwn();
  }

  clearOwn() {
    this.storeService.clearOwn();
  }
}
