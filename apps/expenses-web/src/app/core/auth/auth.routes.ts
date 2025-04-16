import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    providers: [importProvidersFrom(TranslateModule)],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
