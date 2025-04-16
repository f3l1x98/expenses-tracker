import { Routes } from '@angular/router';
import { IncomesComponent } from './components/incomes.component';
import { importProvidersFrom } from '@angular/core';
import { IncomesService } from './incomes.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { RecurringIncomesService } from './recurring-incomes.service';
import { IncomesEffect } from './store/effects/incomes.effects';
import { RecurringIncomesEffect } from './store/effects/recurring-incomes.effects';
import { incomesFeature } from './store/features/incomes.feature';
import { recurringIncomesFeature } from './store/features/recurring-incomes.feature';

export const INCOMES_ROUTES: Routes = [
  {
    path: '',
    component: IncomesComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(incomesFeature),
        EffectsModule.forFeature([IncomesEffect]),
        StoreModule.forFeature(recurringIncomesFeature),
        EffectsModule.forFeature([RecurringIncomesEffect]),
        TranslateModule.forChild(),
      ),
      IncomesService,
      RecurringIncomesService,
      ConfirmationService,
    ],
  },
];
