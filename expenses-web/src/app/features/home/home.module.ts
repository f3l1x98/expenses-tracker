import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { AppContentWrapperComponent } from '../../shared/components/app-content-wrapper/app-content-wrapper.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    HomeRoutingModule,
    ChartModule,
    CardModule,
    CommonModule,
    CalendarModule,
    AppContentWrapperComponent,
    FormsModule,
  ],
  exports: [],
  declarations: [HomeComponent],
  providers: [],
})
export class HomeModule {}
