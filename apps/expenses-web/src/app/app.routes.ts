import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./shell/user/user.routes').then((m) => m.USER_ROUTES),
  },
  {
    path: 'features',
    loadChildren: () =>
      import('./features/features.routes').then((m) => m.FEATURE_ROUTES),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'features',
    pathMatch: 'full',
  },
];
