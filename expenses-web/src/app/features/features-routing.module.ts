import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { AuthGuard } from '../core/auth/auth.guard';

const routes: Routes = [
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
          import(`./home/home.module`).then((m) => m.HomeModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'income',
        loadChildren: () =>
          import(`./incomes/incomes.module`).then((m) => m.IncomesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'expense',
        loadChildren: () =>
          import(`./expenses/expenses.module`).then((m) => m.ExpensesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'settings',
        loadChildren: () =>
          import(`./settings/settings.module`).then((m) => m.SettingsModule),
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
