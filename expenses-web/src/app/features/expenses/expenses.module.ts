import { NgModule } from '@angular/core';

import { ExpensesListComponent } from './components/list/expenses-list.component';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { expensesFeature } from './store/expenses.feature';
import { ExpensesEffect } from './store/expenses.effects';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { ExpensesService } from './expenses.service';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '../../shared/shared.nodule';

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
  ],
  exports: [],
  declarations: [ExpensesListComponent],
  providers: [ExpensesService],
})
export class ExpensesModule {}
