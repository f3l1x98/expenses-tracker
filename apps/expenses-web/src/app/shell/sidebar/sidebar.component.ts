import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../core/auth/auth.service';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  standalone: true,
  imports: [RouterModule, ButtonModule, AppHeaderComponent, TranslateModule],
})
export class SidebarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
