import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../shared/api/base-api.service';
import { Observable } from 'rxjs';
import { CreateUserRequest } from './interfaces/requests/create-user-request.interface';
import { IUser } from 'expenses-shared';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  constructor(private apiService: BaseApiService) {}

  private readonly baseUrl: string = `${this.apiService.apiRoot}/users`;
  private readonly createUrl: string = `${this.baseUrl}/`;
  private readonly getOwnUrl: string = `${this.baseUrl}/me`;

  create$(request: CreateUserRequest): Observable<IUser> {
    return this.apiService.post(this.createUrl, request);
  }

  getOwn$(): Observable<IUser> {
    return this.apiService.get(this.getOwnUrl);
  }
}
