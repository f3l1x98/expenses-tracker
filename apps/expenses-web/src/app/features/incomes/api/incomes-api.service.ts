import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../../shared/api/base-api.service';
import { CreateIncomeRequest } from './interfaces/requests/create-income-request.interface';
import { UpdateIncomeRequest } from './interfaces/requests/update-income-request.interface';
import { IIncome } from 'expenses-shared';

@Injectable({ providedIn: 'root' })
export class IncomesApiService {
  constructor(private apiService: BaseApiService) {}

  private readonly baseUrl: string = `${this.apiService.apiRoot}/incomes`;
  private readonly createUrl: string = `${this.baseUrl}/`;
  private readonly updateUrl: string = `${this.baseUrl}/`;
  private readonly getAllUrl: string = `${this.baseUrl}/`;

  create$(request: CreateIncomeRequest): Observable<IIncome> {
    return this.apiService.post(this.createUrl, request);
  }

  update$(request: UpdateIncomeRequest): Observable<IIncome> {
    return this.apiService.put(this.updateUrl, request);
  }

  getAll$(): Observable<IIncome[]> {
    return this.apiService.get(this.getAllUrl);
  }

  delete$(id: string): Observable<void> {
    return this.apiService.delete(`${this.baseUrl}/${id}`);
  }
}
