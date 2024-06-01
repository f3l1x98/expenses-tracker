import { NgModule } from '@angular/core';

import { IncomesComponent } from './components/incomes.component';
import { IncomesRoutingModule } from './incomes-routing.module';
import { AppContentWrapperComponent } from '../../shared/components/app-content-wrapper/app-content-wrapper.component';

@NgModule({
  imports: [IncomesRoutingModule, AppContentWrapperComponent],
  exports: [],
  declarations: [IncomesComponent],
  providers: [],
})
export class IncomesModule {}
