import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { PendingChangesGuard } from '../../shared/guards/pending-changes.guard';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
