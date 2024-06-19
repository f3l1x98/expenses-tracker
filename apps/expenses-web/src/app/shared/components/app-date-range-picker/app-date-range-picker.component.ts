import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DateRange } from '../../interfaces/date-range.interface';
import { ControlValueAccessor, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: 'app-date-range-picker.component.html',
  standalone: true,
  imports: [CalendarModule, FormsModule],
})
export class AppDateRangePickerComponent
  implements OnChanges, ControlValueAccessor
{
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
          endDate: this.calenderValue[1],
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
