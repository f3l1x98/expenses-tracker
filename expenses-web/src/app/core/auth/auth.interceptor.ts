import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthStoreService } from './store/auth-store.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthStoreService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.auth.token$.pipe(
      switchMap((token) => {
        const authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });

        return next.handle(authReq);
      })
    );
  }
}
