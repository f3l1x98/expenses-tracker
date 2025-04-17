import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { NotificationService } from './notification.service';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: 'notification.component.html',
  imports: [ToastModule, MessagesModule],
  providers: [MessageService],
})
export class NotificationComponent implements OnInit, OnDestroy {
  #notificationService = inject(NotificationService);
  #messageService = inject(MessageService);

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.#notificationService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe((notification) => this.#messageService.add(notification));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
