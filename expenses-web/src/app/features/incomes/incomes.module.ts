import { NgModule } from '@angular/core';

import { IncomesComponent } from './components/incomes.component';
import { IncomesRoutingModule } from './incomes-routing.module';
import { AppContentWrapperComponent } from '../../shared/components/app-content-wrapper/app-content-wrapper.component';
import { IncomesService } from './incomes.service';
import { incomesFeature } from './store/features/incomes.feature';
import { IncomesEffect } from './store/effects/incomes.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { recurringIncomesFeature } from './store/features/recurring-incomes.feature';
import { RecurringIncomesEffect } from './store/effects/recurring-incomes.effects';

@NgModule({
  imports: [
    IncomesRoutingModule,
    AppContentWrapperComponent,
    StoreModule.forFeature(incomesFeature),
    EffectsModule.forFeature([IncomesEffect]),
    StoreModule.forFeature(recurringIncomesFeature),
    EffectsModule.forFeature([RecurringIncomesEffect]),
  ],
  exports: [],
  declarations: [IncomesComponent],
  providers: [IncomesService],
})
export class IncomesModule {}
