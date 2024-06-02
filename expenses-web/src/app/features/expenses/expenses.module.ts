import { NgModule } from '@angular/core';

import { ExpensesComponent } from './components/expenses.component';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { expensesFeature } from './store/features/expenses.feature';
import { ExpensesEffect } from './store/effects/expenses.effects';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { ExpensesService } from './expenses.service';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '../../shared/shared.nodule';
import { ExpensesListComponent } from './components/expenses-list/expenses-list.component';
import { RecurringExpensesListComponent } from './components/recurring-expenses-list/recurring-expenses-list.component';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AppContentWrapperComponent } from '../../shared/components/app-content-wrapper/app-content-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    StoreModule.forFeature(expensesFeature),
    EffectsModule.forFeature([ExpensesEffect]),
    CardModule,
    DataViewModule,
    TooltipModule,
    SharedModule,
    ButtonModule,
    MenuModule,
    AppContentWrapperComponent,
  ],
  exports: [],
  declarations: [
    ExpensesComponent,
    ExpensesListComponent,
    RecurringExpensesListComponent,
  ],
  providers: [ExpensesService],
})
export class ExpensesModule {}
