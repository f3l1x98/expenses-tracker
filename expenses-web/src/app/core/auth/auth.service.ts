import { Injectable } from '@angular/core';
import { AuthApiService } from './api/auth-api.service';
import { Observable } from 'rxjs';
import { UserLoginResponse } from './api/user-login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authApiService: AuthApiService) {}

  public login$(
    username: string,
    password: string
  ): Observable<UserLoginResponse> {
    return this.authApiService.login$({ username, password });
  }
}
