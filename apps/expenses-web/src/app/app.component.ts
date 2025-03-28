import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { UserService } from './shell/user/user.service';
import { Subject, takeUntil } from 'rxjs';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { SpinnerService } from './shell/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  private destory$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private spinnerService: SpinnerService,
  ) {}

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destory$))
      .subscribe((user) => {
        if (!!user && !!user.id) {
          this.userService.loadOwn();
        } else {
          this.userService.clearOwn();
        }
      });
    this.router.events.pipe(takeUntil(this.destory$)).subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.spinnerService.setState({ active: true });
      } else if (event instanceof RouteConfigLoadEnd) {
        this.spinnerService.setState({ active: false });
      }
    });
  }
}
