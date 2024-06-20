import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../shared/api/base-api.service';
import { Observable } from 'rxjs';
import { ILoginUserDto, ILoginUserResponse } from 'expenses-shared';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private apiService: BaseApiService) {}

  private readonly authUrl: string = `${this.apiService.apiRoot}/auth`;
  private readonly loginUrl: string = `${this.authUrl}/login`;

  login$(request: ILoginUserDto): Observable<ILoginUserResponse> {
    return this.apiService.post(this.loginUrl, request);
  }
}
