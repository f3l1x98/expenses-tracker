import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../../../../shared/api/base-api.service';
import { CreateIncomeRequest } from '../../interfaces/api/create-income-request.interface';
import { UpdateIncomeRequest } from '../../interfaces/api/update-income-request.interface';
import { Income } from '../../interfaces/income.interface';

@Injectable({ providedIn: 'root' })
export class IncomesApiService {
  constructor(private apiService: BaseApiService) {}

  private readonly baseUrl: string = `${this.apiService.apiRoot}/incomes`;
  private readonly createUrl: string = `${this.baseUrl}/`;
  private readonly updateUrl: string = `${this.baseUrl}/`;
  private readonly getAllUrl: string = `${this.baseUrl}/`;

  create$(request: CreateIncomeRequest): Observable<Income> {
    return this.apiService.post(this.createUrl, request);
  }

  update$(request: UpdateIncomeRequest): Observable<Income> {
    return this.apiService.put(this.updateUrl, request);
  }

  getAll$(): Observable<Income[]> {
    return this.apiService.get(this.getAllUrl);
  }
}
