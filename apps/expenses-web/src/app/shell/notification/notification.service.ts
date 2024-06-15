import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from './notification.interface';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  notifications$ = this.notificationSubject.asObservable();

  info(label: string, detail: string) {
    const notification: Notification = {
      summary: label,
      detail: detail,
      severity: 'info',
      life: 6000,
      sticky: false,
      closable: false,
    };
    this.addNotification(notification);
  }

  warn(detail: string) {
    const notification: Notification = {
      summary: 'Warning',
      detail: detail,
      severity: 'warn',
      life: 6000,
      sticky: false,
      closable: false,
    };
    this.addNotification(notification);
  }

  error(detail: string) {
    const notification: Notification = {
      summary: 'Error',
      detail: detail,
      severity: 'error',
      life: 6000,
      sticky: false,
      closable: false,
    };
    this.addNotification(notification);
  }

  success(detail: string) {
    const notification: Notification = {
      summary: 'Success',
      detail: detail,
      severity: 'success',
      life: 6000,
      sticky: false,
      closable: false,
    };
    this.addNotification(notification);
  }

  private addNotification(notification: Notification) {
    this.notificationSubject.next(notification);
  }
}
