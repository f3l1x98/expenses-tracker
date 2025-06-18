import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthStore } from '../../core/auth/auth.store';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  imports: [RouterModule, ButtonModule, AppHeaderComponent, TranslateModule],
})
export class SidebarComponent {
  #authStore = inject(AuthStore);
  #router = inject(Router);

  logout() {
    this.#authStore.logout();
    this.#router.navigate(['/auth/login']);
  }
}
