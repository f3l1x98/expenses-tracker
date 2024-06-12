import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../shared/api/base-api.service';
import { UserLoginRequest } from './interfaces/user-login-request.interface';
import { Observable } from 'rxjs';
import { UserLoginResponse } from './interfaces/user-login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private apiService: BaseApiService) {}

  private readonly authUrl: string = `${this.apiService.apiRoot}/auth`;
  private readonly loginUrl: string = `${this.authUrl}/login`;

  login$(request: UserLoginRequest): Observable<UserLoginResponse> {
    return this.apiService.post(this.loginUrl, request);
  }
}
