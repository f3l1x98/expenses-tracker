import { NgModule } from '@angular/core';

import { IncomesComponent } from './components/incomes.component';
import { IncomesRoutingModule } from './incomes-routing.module';

@NgModule({
  imports: [IncomesRoutingModule],
  exports: [],
  declarations: [IncomesComponent],
  providers: [],
})
export class IncomesModule {}
