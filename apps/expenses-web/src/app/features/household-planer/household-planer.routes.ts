import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HouseholdPlanerStore } from './household-planer.store';
import { HouseholdPlanerComponent } from './components/household-planer.component';

export const HOUSEHOLD_PLANER_ROUTES: Routes = [
  {
    path: '',
    component: HouseholdPlanerComponent,
    providers: [
      importProvidersFrom(TranslateModule.forChild()),
      HouseholdPlanerStore,
    ],
  },
];
