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
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { IncomesListComponent } from './components/incomes-list/incomes-list.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.nodule';
import { RecurringIncomesListComponent } from './components/recurring-incomes-list/recurring-incomes-list.component';

@NgModule({
  exports: [],
  declarations: [
    IncomesComponent,
    IncomesListComponent,
    RecurringIncomesListComponent,
  ],
  providers: [IncomesService],
  imports: [
    CommonModule,
    IncomesRoutingModule,
    AppContentWrapperComponent,
    StoreModule.forFeature(incomesFeature),
    EffectsModule.forFeature([IncomesEffect]),
    StoreModule.forFeature(recurringIncomesFeature),
    EffectsModule.forFeature([RecurringIncomesEffect]),
    CardModule,
    DataViewModule,
    TooltipModule,
    SharedModule,
    ButtonModule,
    MenuModule,
  ],
})
export class IncomesModule {}
