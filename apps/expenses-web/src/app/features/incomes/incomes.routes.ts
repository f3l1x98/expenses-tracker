import { Routes } from '@angular/router';
import { IncomesComponent } from './components/incomes.component';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { IncomesStore } from './incomes.store';
import { RecurringIncomesStore } from './recurring-incomes.store';

export const INCOMES_ROUTES: Routes = [
  {
    path: '',
    component: IncomesComponent,
    providers: [
      importProvidersFrom(TranslateModule.forChild()),
      IncomesStore,
      RecurringIncomesStore,
      ConfirmationService,
    ],
  },
];
