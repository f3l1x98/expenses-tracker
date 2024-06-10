import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { usersFeature } from './store/features/users.feature';
import { UsersEffect } from './store/effects/users.effect';
import { EffectsModule } from '@ngrx/effects';
import { UserService } from './user.service';

@NgModule({
  imports: [
    StoreModule.forFeature(usersFeature),
    EffectsModule.forFeature([UsersEffect]),
  ],
  exports: [],
  declarations: [],
  providers: [UserService],
})
export class UsersModule {}
