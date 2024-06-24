import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { IncomeCategory } from 'expenses-shared';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-income-category-dropdown',
  templateUrl: 'income-category-dropdown.component.html',
  standalone: true,
  imports: [FloatLabelModule, DropdownModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => IncomeCategoryDropdownComponent),
    },
  ],
})
export class IncomeCategoryDropdownComponent implements ControlValueAccessor {
  @Input()
  showClear = false;

  options = Object.values(IncomeCategory);
  value!: IncomeCategory | undefined;
  private touched = false;

  disabled = false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onChange = (value: IncomeCategory | undefined) => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  valueChanged(val: IncomeCategory | undefined) {
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

  writeValue(value: IncomeCategory | undefined): void {
    this.value = value;
  }
  registerOnChange(fn: (value: IncomeCategory | undefined) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
