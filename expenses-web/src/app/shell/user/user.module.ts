import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { userFeature } from './store/features/user.feature';
import { UserEffect } from './store/effects/user.effect';
import { EffectsModule } from '@ngrx/effects';
import { UserService } from './user.service';

@NgModule({
  imports: [
    StoreModule.forFeature(userFeature),
    EffectsModule.forFeature([UserEffect]),
  ],
  exports: [],
  declarations: [],
  providers: [UserService],
})
export class UserModule {}
