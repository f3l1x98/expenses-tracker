import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DateRange } from '../../interfaces/date-range.interface';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: 'app-date-range-picker.component.html',
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
    FloatLabelModule,
    TranslateModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AppDateRangePickerComponent),
    },
  ],
})
export class AppDateRangePickerComponent implements ControlValueAccessor {
  @Input()
  label = '';

  @Input()
  showClear = false;

  @Input()
  requireEnd = true;

  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onChange = new EventEmitter<DateRange>();

  calenderValue: Array<Date | null> | undefined;

  value!: DateRange | undefined;
  private touched = false;

  disabled = false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onChangeFn = (value: DateRange | undefined) => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouchedFn = () => {};

  valueChanged() {
    if (!this.disabled) {
      if (
        this.calenderValue !== undefined &&
        this.calenderValue[0] !== null &&
        (!this.requireEnd || this.calenderValue[1] !== null)
      ) {
        this.value = {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          startDate: this.calenderValue[0]!,
          endDate: this.calenderValue[1] ?? undefined,
        };
        this.onChangeFn(this.value);
        this.onChange.emit(this.value);
      }

      this.markAsTouched();
    }
  }

  private markAsTouched() {
    if (!this.touched) {
      this.onTouchedFn();
      this.touched = true;
    }
  }

  writeValue(value: DateRange | undefined): void {
    this.value = value;
  }
  registerOnChange(fn: (value: DateRange | undefined) => void): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
