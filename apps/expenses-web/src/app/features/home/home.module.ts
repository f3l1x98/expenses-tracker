import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { AppContentWrapperComponent } from '../../shared/components/app-content-wrapper/app-content-wrapper.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { homeFeature } from './store/features/home.feature';
import { StoreModule } from '@ngrx/store';
import { AppDateRangePickerComponent } from '../../shared/components/app-date-range-picker/app-date-range-picker.component';
import { HomeService } from './home.service';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffect } from './store/effects/home.effect';
import { NoDataComponent } from './components/no-data/no-data.component';
import { SharedModule } from '../../shared/shared.nodule';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    HomeRoutingModule,
    ChartModule,
    CardModule,
    CommonModule,
    CalendarModule,
    AppContentWrapperComponent,
    AppDateRangePickerComponent,
    FormsModule,
    SharedModule,
    StoreModule.forFeature(homeFeature),
    EffectsModule.forFeature([HomeEffect]),
    TranslateModule,
  ],
  exports: [],
  declarations: [HomeComponent, NoDataComponent],
  providers: [HomeService],
})
export class HomeModule {}
