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
import { recurringExpensesFeature } from './store/features/recurring-expenses.feature';
import { RecurringExpensesEffect } from './store/effects/recurring-expenses.effects';
import { RecurringExpensesService } from './recurring-expenses.service';
import { ExpenseCreateComponent } from './components/expense-create/expense-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ExpenseCategoryDropdownComponent } from './components/expense-category-dropdown/expense-category-dropdown.component';
import { ExpensesFilterComponent } from './components/expenses-list/expenses-filter/expenses-filter.component';

@NgModule({
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    StoreModule.forFeature(expensesFeature),
    EffectsModule.forFeature([ExpensesEffect]),
    StoreModule.forFeature(recurringExpensesFeature),
    EffectsModule.forFeature([RecurringExpensesEffect]),
    CardModule,
    DataViewModule,
    TooltipModule,
    SharedModule,
    ButtonModule,
    MenuModule,
    AppContentWrapperComponent,
    ReactiveFormsModule,
    FloatLabelModule,
    RadioButtonModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    InputTextModule,
    ConfirmDialogModule,
    ExpenseCategoryDropdownComponent,
    ExpensesFilterComponent,
  ],
  exports: [],
  declarations: [
    ExpensesComponent,
    ExpensesListComponent,
    RecurringExpensesListComponent,
    ExpenseCreateComponent,
  ],
  providers: [ExpensesService, RecurringExpensesService, ConfirmationService],
})
export class ExpensesModule {}
