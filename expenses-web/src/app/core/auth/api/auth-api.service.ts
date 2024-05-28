import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../shared/api/base-api.service';
import { UserLoginRequest } from './user-login-request.interface';
import { Observable } from 'rxjs';
import { UserLoginResponse } from './user-login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private apiService: BaseApiService) {}

  private readonly loginUrl: string = `${this.apiService.apiRoot}/login`;

  login$(request: UserLoginRequest): Observable<UserLoginResponse> {
    return this.apiService.post(this.loginUrl, request);
  }
}
