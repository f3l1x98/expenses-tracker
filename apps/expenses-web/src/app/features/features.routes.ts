import { Routes } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { AuthGuard } from '../core/auth/auth.guard';

export const FEATURE_ROUTES: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import(`./home/home.routes`).then((m) => m.HOME_ROUTES),
        canActivate: [AuthGuard],
      },
      {
        path: 'income',
        loadChildren: () =>
          import(`./incomes/incomes.routes`).then((m) => m.INCOMES_ROUTES),
        canActivate: [AuthGuard],
      },
      {
        path: 'expense',
        loadChildren: () =>
          import(`./expenses/expenses.routes`).then((m) => m.EXPENSES_ROUTES),
        canActivate: [AuthGuard],
      },
      {
        path: 'settings',
        loadChildren: () =>
          import(`./settings/settings.routes`).then((m) => m.SETTINGS_ROUTES),
        canActivate: [AuthGuard],
      },
    ],
  },
];
