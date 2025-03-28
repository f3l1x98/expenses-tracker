import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { NotificationService } from './notification.service';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-notification',
  templateUrl: 'notification.component.html',
  imports: [ToastModule, MessagesModule, BrowserAnimationsModule],
  providers: [MessageService],
})
export class NotificationComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private notificationService: NotificationService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.notificationService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe((notification) => this.messageService.add(notification));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
