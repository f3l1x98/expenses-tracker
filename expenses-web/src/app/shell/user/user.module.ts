import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { userFeature } from './store/features/user.feature';
import { UserEffect } from './store/effects/user.effect';
import { EffectsModule } from '@ngrx/effects';
import { UserService } from './user.service';
import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  imports: [
    UserRoutingModule,
    RegisterComponent,
    StoreModule.forFeature(userFeature),
    EffectsModule.forFeature([UserEffect]),
  ],
  exports: [],
  declarations: [],
  providers: [UserService],
})
export class UserModule {}
