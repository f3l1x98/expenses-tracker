import { Component } from '@angular/core';
import { AppContentWrapperComponent } from '../../../shared/components/app-content-wrapper/app-content-wrapper.component';
import { Card } from 'primeng/card';
import { IncomeCreateComponent } from './income-create/income-create.component';
import { IncomesListComponent } from './incomes-list/incomes-list.component';
import { RecurringIncomesListComponent } from './recurring-incomes-list/recurring-incomes-list.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-incomes',
  templateUrl: 'incomes.component.html',
  styleUrls: ['./incomes.component.scss'],
  imports: [
    AppContentWrapperComponent,
    Card,
    IncomeCreateComponent,
    IncomesListComponent,
    RecurringIncomesListComponent,
    TranslateModule,
  ],
})
export class IncomesComponent {}
