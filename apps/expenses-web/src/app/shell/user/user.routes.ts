import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { PendingChangesGuard } from '../../shared/guards/pending-changes.guard';
import { UserService } from './user.service';

export const USER_ROUTES: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canDeactivate: [PendingChangesGuard],
    providers: [UserService],
  },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
];
