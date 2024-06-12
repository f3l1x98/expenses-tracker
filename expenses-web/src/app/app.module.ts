import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './core/auth/auth.module';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SpinnerComponent } from './shell/spinner/spinner.component';
import { NotificationComponent } from './shell/notification/notification.component';
import { UserModule } from './shell/user/user.module';

@NgModule({
  declarations: [AppComponent],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    AuthModule,
    UserModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
    SpinnerComponent,
    NotificationComponent,
  ],
})
export class AppModule {}
