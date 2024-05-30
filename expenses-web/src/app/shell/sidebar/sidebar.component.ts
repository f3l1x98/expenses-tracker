import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../core/auth/auth.service';
import { NotificationService } from '../notification/notification.service';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  standalone: true,
  imports: [RouterModule, ButtonModule, AppHeaderComponent],
})
export class SidebarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  logout() {
    this.notificationService.success('test');
    //this.authService.logout();
  }
}
