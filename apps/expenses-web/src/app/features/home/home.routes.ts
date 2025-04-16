import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { StoreModule } from '@ngrx/store';
import { HomeService } from './home.service';
import { EffectsModule } from '@ngrx/effects';
import { homeFeature } from './store/features/home.feature';
import { HomeEffect } from './store/effects/home.effect';
import { TranslateModule } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(homeFeature),
        EffectsModule.forFeature([HomeEffect]),
        TranslateModule.forChild(),
      ),
      HomeService,
    ],
  },
];
