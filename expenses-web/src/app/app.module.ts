import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { LoginComponent } from './core/auth/components/login/login.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    LoginComponent,
    ButtonModule,
    CommonModule,
    CardModule,
    BrowserModule,
    StoreModule.forRoot({}),
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
