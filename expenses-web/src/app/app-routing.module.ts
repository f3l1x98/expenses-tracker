import { NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Route,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';

const routes: Routes = [
  /*{
    path: '',
    redirectTo: 'features',
    pathMatch: 'full',
  },*/
  {
    path: 'login',
    loadChildren: () =>
      import('./core/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'features',
    loadChildren: () =>
      import('./features/features.module').then((m) => m.FeaturesModule),
    // TODO canActivate
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
