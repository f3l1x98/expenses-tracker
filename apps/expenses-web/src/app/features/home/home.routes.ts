import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';
import { HomeStore } from './home.store';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    providers: [importProvidersFrom(TranslateModule.forChild()), HomeStore],
  },
];
