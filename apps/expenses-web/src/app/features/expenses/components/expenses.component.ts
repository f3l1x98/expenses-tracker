import { Component } from '@angular/core';
import { AppContentWrapperComponent } from '../../../shared/components/app-content-wrapper/app-content-wrapper.component';
import { Card } from 'primeng/card';
import { ExpenseCreateComponent } from './expense-create/expense-create.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { RecurringExpensesListComponent } from './recurring-expenses-list/recurring-expenses-list.component';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-expenses',
  templateUrl: 'expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  imports: [
    AppContentWrapperComponent,
    Card,
    ExpenseCreateComponent,
    ExpensesListComponent,
    RecurringExpensesListComponent,
    ConfirmDialog,
    TranslateModule,
  ],
})
export class ExpensesComponent {}
