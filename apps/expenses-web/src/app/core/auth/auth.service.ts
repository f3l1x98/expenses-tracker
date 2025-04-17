import { Injectable, OnDestroy, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthStoreService } from './store/auth-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  #authStore = inject(AuthStoreService);

  private destroy$ = new Subject<void>();

  status$ = this.#authStore.status$;
  currentUser$ = this.#authStore.currentUser$;
  token$ = this.#authStore.token$;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public login(username: string, password: string) {
    this.#authStore.login(username, password);
  }

  public logout() {
    this.#authStore.logout();
  }
}
