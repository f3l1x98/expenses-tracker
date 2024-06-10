import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { UserService } from './shell/user/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private destory$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private userService: UserService
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
        }
      });
  }
}
