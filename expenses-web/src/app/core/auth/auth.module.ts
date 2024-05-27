import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [AuthRoutingModule, LoginComponent],
  exports: [],
  declarations: [],
  providers: [],
})
export class AuthModule {}
