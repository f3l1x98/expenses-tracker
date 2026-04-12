import { Component, effect, input, model, signal } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { DateRange } from '../../interfaces/date-range.interface';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';

import { TranslateModule } from '@ngx-translate/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: 'app-date-range-picker.component.html',
  imports: [DatePickerModule, FormsModule, FloatLabelModule, TranslateModule],
})
export class AppDateRangePickerComponent
  implements FormValueControl<DateRange | null>
{
  label = input<string>('');
  showClear = input<boolean>(false);
  requireEnd = input<boolean>(true);
  disabled = input<boolean>(false);

  value = model<DateRange | null>(null);
  touched = model<boolean>(false);
  invalid = model<boolean>(false);

  calenderValue = signal<Array<Date | null> | undefined>(undefined);

  constructor() {
    effect(() => {
      const val = this.value();
      if (val) {
        this.calenderValue.set([val.startDate, val.endDate ?? null]);
      } else {
        this.calenderValue.set([]);
      }
    });
  }

  valueChanged(dates: Array<Date | null> | undefined) {
    if (this.disabled()) return;

    if (dates && dates[0]) {
      // If we don't require the end date, or if the end date is present
      if (!this.requireEnd() || dates[1]) {
        this.value.set({
          startDate: dates[0],
          endDate: dates[1] ?? undefined,
        });
      }
    } else if (!dates || dates.length === 0) {
      this.value.set(null);
    }
  }

  onBlur() {
    this.touched.set(true);
  }
}
