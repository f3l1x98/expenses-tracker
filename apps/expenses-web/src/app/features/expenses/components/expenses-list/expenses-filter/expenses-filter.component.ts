import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpenseCategoryDropdownComponent } from '../../expense-category-dropdown/expense-category-dropdown.component';
import {
  ExpenseCategory,
  IDateRangeDto,
  IExpenseFilterDto,
} from 'expenses-shared';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { debounceTime } from 'rxjs';
import { ExpensesStore } from '../../../expenses.store';
import { AppDateRangePickerComponent } from '../../../../../shared/components/app-date-range-picker/app-date-range-picker.component';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-expenses-filter',
  templateUrl: 'expenses-filter.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ExpenseCategoryDropdownComponent,
    InputTextModule,
    AppDateRangePickerComponent,
    FloatLabelModule,
    TranslateModule,
  ],
})
export class ExpensesFilterComponent {
  #expensesStore = inject(ExpensesStore);

  formGroup: FormGroup = new FormGroup({
    description: new FormControl('', {
      nonNullable: true,
    }),
    category: new FormControl<ExpenseCategory | undefined>(undefined, {
      nonNullable: true,
    }),
    dateRange: new FormControl<IDateRangeDto | undefined>(undefined, {
      nonNullable: true,
    }),
  });

  constructor() {
    this.formGroup.valueChanges
      .pipe(takeUntilDestroyed(), debounceTime(300))
      .subscribe(() => this.applyFilter());
  }

  applyFilter() {
    const description: string | undefined =
      this.formGroup.get('description')?.value ?? undefined;
    const category: ExpenseCategory | undefined =
      this.formGroup.get('category')?.value ?? undefined;
    const dateRange: IDateRangeDto | undefined =
      this.formGroup.get('dateRange')?.value ?? undefined;

    const filter: IExpenseFilterDto = {
      description: description,
      category: category,
      ...dateRange,
    };
    this.#expensesStore.updateFilter(filter);
  }
}
