import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../shared/api/base-api.service';
import { Observable } from 'rxjs';
import { User } from '../store/interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  constructor(private apiService: BaseApiService) {}

  private readonly baseUrl: string = `${this.apiService.apiRoot}/users`;
  private readonly getOwnUrl: string = `${this.baseUrl}/me`;

  getOwn$(): Observable<User> {
    return this.apiService.get(this.getOwnUrl);
  }
}
