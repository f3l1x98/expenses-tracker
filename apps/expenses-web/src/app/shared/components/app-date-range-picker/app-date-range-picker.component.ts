import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
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

@Component({
  selector: 'app-date-range-picker',
  templateUrl: 'app-date-range-picker.component.html',
  standalone: true,
  imports: [CommonModule, CalendarModule, FormsModule, FloatLabelModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AppDateRangePickerComponent),
    },
  ],
})
export class AppDateRangePickerComponent
  implements OnChanges, ControlValueAccessor
{
  @Input()
  label: string = '';

  @Input()
  showClear = false;

  @Input()
  requireEnd = true;

  @Output()
  onChange = new EventEmitter<DateRange>();

  calenderValue: Array<Date | null> | undefined;

  value!: DateRange | undefined;
  private touched = false;

  disabled = false;

  onChangeFn = (value: DateRange | undefined) => {};

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

  ngOnChanges(changes: SimpleChanges): void {}

  writeValue(value: DateRange | undefined): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
