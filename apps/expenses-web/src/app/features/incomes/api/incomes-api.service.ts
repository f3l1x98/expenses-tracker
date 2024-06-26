import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BaseApiService,
  RequestParams,
} from '../../../shared/api/base-api.service';
import {
  ICreateIncomeDto,
  IIncome,
  IIncomeFilterDto,
  IUpdateIncomeDto,
} from 'expenses-shared';

@Injectable({ providedIn: 'root' })
export class IncomesApiService {
  constructor(private apiService: BaseApiService) {}

  private readonly baseUrl: string = `${this.apiService.apiRoot}/incomes`;
  private readonly createUrl: string = `${this.baseUrl}/`;
  private readonly updateUrl: string = `${this.baseUrl}/`;
  private readonly getAllUrl: string = `${this.baseUrl}/`;

  create$(request: ICreateIncomeDto): Observable<IIncome> {
    return this.apiService.post(this.createUrl, request);
  }

  update$(request: IUpdateIncomeDto): Observable<IIncome> {
    return this.apiService.put(this.updateUrl, request);
  }

  getAll$(filter?: IIncomeFilterDto): Observable<IIncome[]> {
    return this.apiService.get(
      this.getAllUrl,
      filter as unknown as RequestParams,
    );
  }

  delete$(id: string): Observable<void> {
    return this.apiService.delete(`${this.baseUrl}/${id}`);
  }
}
