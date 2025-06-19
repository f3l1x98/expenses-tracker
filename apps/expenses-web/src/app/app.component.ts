import { Component, effect, inject } from '@angular/core';
import { AuthStore } from './core/auth/auth.store';
import { UserStore } from './shell/user/user.store';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { SpinnerComponent } from './shell/spinner/spinner.component';
import { NotificationComponent } from './shell/notification/notification.component';
import { SpinnerStore } from './shell/spinner/spinner.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, SpinnerComponent, NotificationComponent],
})
export class AppComponent {
  #authStore = inject(AuthStore);
  #userStore = inject(UserStore);
  #router = inject(Router);
  #spinnerStore = inject(SpinnerStore);

  constructor() {
    effect(() => {
      const user = this.#authStore.user();
      if (!!user && !!user.id) {
        this.#userStore.loadOwn();
      } else {
        this.#userStore.clearOwn();
      }
    });

    // Done like this instead of using toSignal and effect, due to that version not receiving all events
    this.#router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.#spinnerStore.setState(true);
      } else if (event instanceof RouteConfigLoadEnd) {
        this.#spinnerStore.setState(false);
      }
    });
  }
}
