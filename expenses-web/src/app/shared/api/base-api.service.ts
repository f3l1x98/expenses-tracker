import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  public readonly apiRoot: string = environment.api.baseUrl;
  private defaultHttpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    return this.request<T>('get', url);
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
    params?:
      | HttpParams
      | {
          [param: string]:
            | string
            | number
            | boolean
            | ReadonlyArray<string | number | boolean>;
        }
  ): Observable<T> {
    return this.httpClient
      .request<T>(method, url, {
        body: body,
        headers: headers,
        params: params,
      })
      .pipe(
        catchError((err) => {
          // TODO error handling
          console.error(err);
          return throwError(() => err);
        })
      );
  }

  public post<T>(url: string, body: {}): Observable<T> {
    return this.request<T>('post', url, body, this.defaultHttpHeaders);
  }

  public put<T>(url: string, body: Record<string, unknown>): Observable<T> {
    return this.request<T>('put', url, body, this.defaultHttpHeaders);
  }

  public delete<T>(url: string): Observable<T> {
    return this.request<T>('delete', url);
  }
}
