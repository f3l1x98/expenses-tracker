import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RecurringType } from 'expenses-shared';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-recurring-type-dropdown',
  templateUrl: 'recurring-type-dropdown.component.html',
  imports: [
    FloatLabelModule,
    DropdownModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RecurringTypeDropdownComponent),
    },
  ],
})
export class RecurringTypeDropdownComponent implements ControlValueAccessor {
  @Input()
  showClear = false;

  options = Object.values(RecurringType);
  value!: RecurringType | undefined;
  private touched = false;

  disabled = false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onChange = (value: RecurringType | undefined) => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  valueChanged(val: RecurringType | undefined) {
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

  writeValue(value: RecurringType | undefined): void {
    this.value = value;
  }
  registerOnChange(fn: (value: RecurringType | undefined) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
