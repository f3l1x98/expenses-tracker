import { NgModule } from '@angular/core';

import { ExpensesComponent } from './components/expenses.component';
import { ExpensesRoutingModule } from './expenses-routing.module';

@NgModule({
  imports: [ExpensesRoutingModule],
  exports: [],
  declarations: [ExpensesComponent],
  providers: [],
})
export class ExpensesModule {}
