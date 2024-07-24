import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppDateRangePickerComponent } from 'apps/expenses-web/src/app/shared/components/app-date-range-picker/app-date-range-picker.component';
import { RecurringTypeDropdownComponent } from 'apps/expenses-web/src/app/shared/components/recurring-type-dropdown/recurring-type-dropdown.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { IncomeCategoryDropdownComponent } from '../../income-category-dropdown/income-category-dropdown.component';
import {
  IDateRangeDto,
  IRecurringIncomeFilterDto,
  IncomeCategory,
  RecurringType,
} from 'expenses-shared';
import { Subject, takeUntil, debounceTime } from 'rxjs';
import { RecurringIncomesService } from '../../../recurring-incomes.service';

@Component({
  selector: 'app-recurring-incomes-filter',
  templateUrl: 'recurring-incomes-filter.component.html',
  standalone: true,
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
})
export class RecurringIncomesFilterComponent implements OnInit {
  formGroup!: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private recurringIncomesService: RecurringIncomesService,
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
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

    this.formGroup.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(() => this.applyFilter());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    this.recurringIncomesService.updateFilter(filter);
  }
}
