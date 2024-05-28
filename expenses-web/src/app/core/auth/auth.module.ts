import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import { authFeature } from './store/auth.feature';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';

@NgModule({
  imports: [
    AuthRoutingModule,
    LoginComponent,
    StoreModule.forFeature(authFeature),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class AuthModule {}
