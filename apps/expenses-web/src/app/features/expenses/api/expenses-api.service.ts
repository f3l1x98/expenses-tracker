import { Injectable } from '@angular/core';
import {
  BaseApiService,
  RequestParams,
} from '../../../shared/api/base-api.service';
import { Observable } from 'rxjs';
import {
  ICreateExpenseDto,
  IExpense,
  IExpenseFilterDto,
  IUpdateExpenseDto,
} from 'expenses-shared';

@Injectable({ providedIn: 'root' })
export class ExpensesApiService {
  constructor(private apiService: BaseApiService) {}

  private readonly baseUrl: string = `${this.apiService.apiRoot}/expenses`;
  private readonly createUrl: string = `${this.baseUrl}/`;
  private readonly updateUrl: string = `${this.baseUrl}/`;
  private readonly getAllUrl: string = `${this.baseUrl}/`;

  create$(request: ICreateExpenseDto): Observable<IExpense> {
    return this.apiService.post(this.createUrl, request);
  }

  update$(request: IUpdateExpenseDto): Observable<IExpense> {
    return this.apiService.put(this.updateUrl, request);
  }

  getAll$(filter?: IExpenseFilterDto): Observable<IExpense[]> {
    return this.apiService.get(
      this.getAllUrl,
      filter as unknown as RequestParams,
    );
  }

  delete$(id: string): Observable<void> {
    return this.apiService.delete(`${this.baseUrl}/${id}`);
  }
}
