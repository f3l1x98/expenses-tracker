import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { UserService } from './shell/user/user.service';
import { Subject, takeUntil } from 'rxjs';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { SpinnerService } from './shell/spinner/spinner.service';
import { SpinnerComponent } from './shell/spinner/spinner.component';
import { NotificationComponent } from './shell/notification/notification.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, SpinnerComponent, NotificationComponent],
})
export class AppComponent implements OnInit, OnDestroy {
  #authService = inject(AuthService);
  #userService = inject(UserService);
  #router = inject(Router);
  #spinnerService = inject(SpinnerService);

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
          this.#userService.loadOwn();
        } else {
          this.#userService.clearOwn();
        }
      });
    this.#router.events.pipe(takeUntil(this.destory$)).subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.#spinnerService.setState({ active: true });
      } else if (event instanceof RouteConfigLoadEnd) {
        this.#spinnerService.setState({ active: false });
      }
    });
  }
}
