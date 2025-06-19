import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  IDateRangeDto,
  IIncomeFilterDto,
  IncomeCategory,
} from 'expenses-shared';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { debounceTime } from 'rxjs';
import { AppDateRangePickerComponent } from '../../../../../shared/components/app-date-range-picker/app-date-range-picker.component';
import { IncomeCategoryDropdownComponent } from '../../income-category-dropdown/income-category-dropdown.component';
import { IncomesStore } from '../../../incomes.store';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-incomes-filter',
  templateUrl: 'incomes-filter.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IncomeCategoryDropdownComponent,
    InputTextModule,
    AppDateRangePickerComponent,
    FloatLabelModule,
    TranslateModule,
  ],
})
export class IncomesFilterComponent {
  #incomesStore = inject(IncomesStore);

  formGroup: FormGroup = new FormGroup({
    description: new FormControl('', {
      nonNullable: true,
    }),
    category: new FormControl<IncomeCategory | undefined>(undefined, {
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
    const category: IncomeCategory | undefined =
      this.formGroup.get('category')?.value ?? undefined;
    const dateRange: IDateRangeDto | undefined =
      this.formGroup.get('dateRange')?.value ?? undefined;

    const filter: IIncomeFilterDto = {
      description: description,
      category: category,
      ...dateRange,
    };
    this.#incomesStore.updateFilter(filter);
  }
}
