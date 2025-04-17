import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ExpenseCategoryDropdownComponent } from '../../expense-category-dropdown/expense-category-dropdown.component';
import {
  ExpenseCategory,
  IDateRangeDto,
  IExpenseFilterDto,
} from 'expenses-shared';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { ExpensesService } from '../../../expenses.service';
import { AppDateRangePickerComponent } from '../../../../../shared/components/app-date-range-picker/app-date-range-picker.component';
import { TranslateModule } from '@ngx-translate/core';

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
export class ExpensesFilterComponent implements OnInit, OnDestroy {
  #formBuilder = inject(FormBuilder);
  #expensesService = inject(ExpensesService);

  formGroup!: FormGroup;

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.formGroup = this.#formBuilder.group({
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

    const filter: IExpenseFilterDto = {
      description: description,
      category: category,
      ...dateRange,
    };
    this.#expensesService.updateFilter(filter);
  }
}
