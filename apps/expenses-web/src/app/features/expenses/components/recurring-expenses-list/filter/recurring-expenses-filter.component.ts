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
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ExpenseCategoryDropdownComponent } from '../../expense-category-dropdown/expense-category-dropdown.component';
import { RecurringExpensesService } from '../../../recurring-expenses.service';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { RecurringType } from 'libs/expenses-shared/src/lib/shared/recurring-type.enum';
import {
  ExpenseCategory,
  IDateRangeDto,
  IRecurringExpenseFilterDto,
} from 'expenses-shared';
import { RecurringTypeDropdownComponent } from 'apps/expenses-web/src/app/shared/components/recurring-type-dropdown/recurring-type-dropdown.component';

@Component({
  selector: 'app-recurring-expenses-filter',
  templateUrl: 'recurring-expenses-filter.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ExpenseCategoryDropdownComponent,
    InputTextModule,
    AppDateRangePickerComponent,
    FloatLabelModule,
    TranslateModule,
    RecurringTypeDropdownComponent,
  ],
})
export class RecurringExpensesFilterComponent implements OnInit {
  formGroup!: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private recurringExpensesService: RecurringExpensesService,
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      description: new FormControl('', {
        nonNullable: true,
      }),
      category: new FormControl<ExpenseCategory | undefined>(undefined, {
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
    const category: ExpenseCategory | undefined =
      this.formGroup.get('category')?.value ?? undefined;
    const dateRange: IDateRangeDto | undefined =
      this.formGroup.get('dateRange')?.value ?? undefined;
    const recurringType: RecurringType | undefined =
      this.formGroup.get('recurringType')?.value ?? undefined;

    const filter: IRecurringExpenseFilterDto = {
      description: description,
      category: category,
      ...dateRange,
      recurringType: recurringType,
    };
    this.recurringExpensesService.updateFilter(filter);
  }
}
