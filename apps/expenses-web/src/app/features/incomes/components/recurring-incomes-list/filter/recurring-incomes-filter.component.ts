import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppDateRangePickerComponent } from '../../../../../shared/components/app-date-range-picker/app-date-range-picker.component';
import { RecurringTypeDropdownComponent } from '../../../../../shared/components/recurring-type-dropdown/recurring-type-dropdown.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { IncomeCategoryDropdownComponent } from '../../income-category-dropdown/income-category-dropdown.component';
import {
  IDateRangeDto,
  IRecurringIncomeFilterDto,
  IncomeCategory,
  RecurringType,
} from 'expenses-shared';
import { debounceTime } from 'rxjs';
import { RecurringIncomesStore } from '../../../recurring-incomes.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recurring-incomes-filter',
  templateUrl: 'recurring-incomes-filter.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IncomeCategoryDropdownComponent,
    InputTextModule,
    AppDateRangePickerComponent,
    FloatLabelModule,
    TranslateModule,
    RecurringTypeDropdownComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecurringIncomesFilterComponent {
  #recurringIncomesService = inject(RecurringIncomesStore);

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
    recurringType: new FormControl<RecurringType | undefined>(undefined, {
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
    const recurringType: RecurringType | undefined =
      this.formGroup.get('recurringType')?.value ?? undefined;

    const filter: IRecurringIncomeFilterDto = {
      description: description,
      category: category,
      ...dateRange,
      recurringType: recurringType,
    };
    this.#recurringIncomesService.updateFilter(filter);
  }
}
