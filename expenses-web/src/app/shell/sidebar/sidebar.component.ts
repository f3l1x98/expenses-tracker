import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  standalone: true,
  imports: [RouterModule, ButtonModule],
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
