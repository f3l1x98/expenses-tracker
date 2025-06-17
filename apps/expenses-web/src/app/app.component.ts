import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { UserStore } from './shell/user/user.store';
import { Subject, takeUntil } from 'rxjs';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { SpinnerComponent } from './shell/spinner/spinner.component';
import { NotificationComponent } from './shell/notification/notification.component';
import { SpinnerStore } from './shell/spinner/spinner.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, SpinnerComponent, NotificationComponent],
})
export class AppComponent implements OnInit, OnDestroy {
  #authService = inject(AuthService);
  #userStore = inject(UserStore);
  #router = inject(Router);
  #spinnerStore = inject(SpinnerStore);

  private destory$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  ngOnInit(): void {
    this.#authService.currentUser$
      .pipe(takeUntil(this.destory$))
      .subscribe((user) => {
        if (!!user && !!user.id) {
          this.#userStore.loadOwn();
        } else {
          this.#userStore.clearOwn();
        }
      });
    this.#router.events.pipe(takeUntil(this.destory$)).subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.#spinnerStore.setState(true);
      } else if (event instanceof RouteConfigLoadEnd) {
        this.#spinnerStore.setState(false);
      }
    });
  }
}
