import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
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
export class ExpenseCategoryDropdownComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  @Input()
  showClear: boolean = false;

  options = Object.values(ExpenseCategory);
  value!: ExpenseCategory | undefined;
  private touched = false;

  disabled = false;

  onChange = (value: ExpenseCategory | undefined) => {};

  onTouched = () => {};

  constructor() {}

  ngOnInit() {}

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

  ngOnChanges(changes: SimpleChanges): void {}

  writeValue(value: ExpenseCategory | undefined): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
