import { Injectable } from '@angular/core';
import { AuthApiService } from './api/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authApiService: AuthApiService) {}

  public login$(username: string, password: string) {
    this.authApiService.login$({ username, password });
  }
}
