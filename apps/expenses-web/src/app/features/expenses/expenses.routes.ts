import { Routes } from '@angular/router';
import { ExpensesComponent } from './components/expenses.component';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ExpensesStore } from './expenses.store';
import { RecurringExpensesStore } from './recurring-expenses.store';

export const EXPENSES_ROUTES: Routes = [
  {
    path: '',
    component: ExpensesComponent,
    providers: [
      importProvidersFrom(TranslateModule.forChild()),
      ExpensesStore,
      RecurringExpensesStore,
      ConfirmationService,
    ],
  },
];
