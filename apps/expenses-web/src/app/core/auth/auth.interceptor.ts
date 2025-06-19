import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStore } from './auth.store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  #store = inject(AuthStore);

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // Done like this due to toObservable(this.#store.token) throwing error "NG0602: effect() cannot be called from within a reactive context."
    const authReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${this.#store.token()}`,
      ),
    });
    return next.handle(authReq);
  }
}
