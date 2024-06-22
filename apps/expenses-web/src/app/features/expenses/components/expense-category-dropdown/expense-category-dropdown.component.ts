import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { ExpenseCategory } from 'expenses-shared';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-expense-category-dropdown',
  templateUrl: 'expense-category-dropdown.component.html',
  standalone: true,
  imports: [FloatLabelModule, DropdownModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ExpenseCategoryDropdownComponent),
    },
  ],
})
export class ExpenseCategoryDropdownComponent implements ControlValueAccessor {
  @Input()
  showClear = false;

  options = Object.values(ExpenseCategory);
  value!: ExpenseCategory | undefined;
  private touched = false;

  disabled = false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onChange = (value: ExpenseCategory | undefined) => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  valueChanged(val: ExpenseCategory | undefined) {
    if (!this.disabled) {
      this.onChange(val);

      this.markAsTouched();
    }
  }

  private markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  writeValue(value: ExpenseCategory | undefined): void {
    this.value = value;
  }
  registerOnChange(fn: (value: ExpenseCategory | undefined) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
