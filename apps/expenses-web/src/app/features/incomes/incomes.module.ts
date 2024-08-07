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
import { RecurringIncomesService } from './recurring-incomes.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { IncomeCreateComponent } from './components/income-create/income-create.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IncomesFilterComponent } from './components/incomes-list/incomes-filter/incomes-filter.component';
import { TranslateModule } from '@ngx-translate/core';
import { RecurringIncomesFilterComponent } from './components/recurring-incomes-list/filter/recurring-incomes-filter.component';

@NgModule({
  exports: [],
  declarations: [
    IncomesComponent,
    IncomesListComponent,
    RecurringIncomesListComponent,
    IncomeCreateComponent,
  ],
  providers: [IncomesService, RecurringIncomesService, ConfirmationService],
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
    ReactiveFormsModule,
    FloatLabelModule,
    RadioButtonModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    InputTextModule,
    ConfirmDialogModule,
    IncomesFilterComponent,
    TranslateModule.forChild(),
    RecurringIncomesFilterComponent,
  ],
})
export class IncomesModule {}
