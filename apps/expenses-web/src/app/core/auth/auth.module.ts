import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import { authFeature } from './store/feature/auth.feature';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { localStorageSyncReducer } from './store/local-storage-sync.reducer';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    AuthRoutingModule,
    LoginComponent,
    StoreModule.forFeature(authFeature.name, authFeature.reducer, {
      metaReducers: [localStorageSyncReducer],
    }),
    EffectsModule.forFeature([AuthEffects]),
    TranslateModule,
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class AuthModule {}
