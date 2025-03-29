import { Routes } from '@angular/router';
import { ExpensesComponent } from './components/expenses.component';
import { importProvidersFrom } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ExpensesService } from './expenses.service';
import { RecurringExpensesService } from './recurring-expenses.service';
import { ExpensesEffect } from './store/effects/expenses.effects';
import { RecurringExpensesEffect } from './store/effects/recurring-expenses.effects';
import { expensesFeature } from './store/features/expenses.feature';
import { recurringExpensesFeature } from './store/features/recurring-expenses.feature';

export const EXPENSES_ROUTES: Routes = [
  {
    path: '',
    component: ExpensesComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(expensesFeature),
        EffectsModule.forFeature([ExpensesEffect]),
        StoreModule.forFeature(recurringExpensesFeature),
        EffectsModule.forFeature([RecurringExpensesEffect]),
        TranslateModule.forChild(),
      ),
      ExpensesService,
      RecurringExpensesService,
      ConfirmationService,
    ],
  },
];
