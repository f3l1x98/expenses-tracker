import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ExpenseCategoryDropdownComponent } from '../../expense-category-dropdown/expense-category-dropdown.component';
import { ExpenseCategory } from 'expenses-shared';
import { InputTextModule } from 'primeng/inputtext';
import { AppDateRangePickerComponent } from 'apps/expenses-web/src/app/shared/components/app-date-range-picker/app-date-range-picker.component';
import { DateRange } from 'apps/expenses-web/src/app/shared/interfaces/date-range.interface';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-expenses-filter',
  templateUrl: 'expenses-filter.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ExpenseCategoryDropdownComponent,
    InputTextModule,
    AppDateRangePickerComponent,
    FloatLabelModule,
  ],
})
export class ExpensesFilterComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      description: new FormControl('', {
        nonNullable: true,
      }),
      category: new FormControl<ExpenseCategory | undefined>(undefined, {
        nonNullable: true,
      }),
      dateRange: new FormControl<DateRange | undefined>(undefined, {
        nonNullable: true,
      }),
    });
  }
}
