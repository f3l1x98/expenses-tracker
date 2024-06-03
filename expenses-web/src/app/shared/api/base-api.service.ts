import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { NotificationService } from '../../shell/notification/notification.service';

type RequestParams =
  | HttpParams
  | {
      [param: string]:
        | string
        | number
        | boolean
        | ReadonlyArray<string | number | boolean>;
    };

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  public readonly apiRoot: string = environment.api.baseUrl;
  private defaultHttpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {}

  public get<T>(url: string, params?: RequestParams): Observable<T> {
    return this.request<T>('get', url, {}, undefined, params);
  }

  public request<T>(
    method: string,
    url: string,
    body?: {},
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        },
    params?: RequestParams
  ): Observable<T> {
    return this.httpClient
      .request<T>(method, url, {
        body: body,
        headers: headers,
        params: params,
      })
      .pipe(
        catchError((err) => {
          let errorMsg: string = 'Unexpected error';
          if (err instanceof HttpErrorResponse) {
            errorMsg = err.message;
          }
          this.notificationService.error(errorMsg);
          return throwError(() => err);
        })
      );
  }

  public post<T>(url: string, body: {}): Observable<T> {
    return this.request<T>('post', url, body, this.defaultHttpHeaders);
  }

  public put<T>(url: string, body: {}): Observable<T> {
    return this.request<T>('put', url, body, this.defaultHttpHeaders);
  }

  public delete<T>(url: string): Observable<T> {
    return this.request<T>('delete', url);
  }
}
