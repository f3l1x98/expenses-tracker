import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DateRange } from '../../interfaces/date-range.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: 'app-date-range-picker.component.html',
  standalone: true,
  imports: [CalendarModule, FormsModule],
})
export class AppDateRangePickerComponent {
  private _dateRange: DateRange | undefined;
  dateArray: Array<Date | null> | undefined;

  @Input()
  set dateRange(value: DateRange | undefined) {
    this._dateRange = value;
    this.dateArray =
      value !== undefined ? [value.startDate, value.endDate] : undefined;
  }

  @Input()
  requireEnd: boolean = false;

  get dateRange(): DateRange | undefined {
    return this._dateRange;
  }

  @Output()
  dateRangeChange = new EventEmitter<DateRange>();

  onDateChange(event: Date) {
    if (
      this.dateArray !== undefined &&
      (!this.requireEnd || !this.dateArray?.some((element) => element === null))
    ) {
      this._dateRange = {
        startDate: this.dateArray[0]!,
        endDate: this.dateArray[1],
      };
      this.dateRangeChange.emit(this._dateRange);
    }
  }
}
