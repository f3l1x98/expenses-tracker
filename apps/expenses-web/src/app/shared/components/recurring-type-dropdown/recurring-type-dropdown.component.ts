import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RecurringType } from 'expenses-shared';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-recurring-type-dropdown',
  templateUrl: 'recurring-type-dropdown.component.html',
  imports: [FloatLabelModule, SelectModule, TranslateModule, FormsModule],
})
export class RecurringTypeDropdownComponent {
  showClear = input<boolean>(false);
  disabled = input<boolean>(false);

  value = model<RecurringType | undefined>();
  touched = model<boolean>(false);

  options = Object.values(RecurringType).map((e) => ({
    label: `recurringType.${e}`,
    value: e,
  }));

  onBlur() {
    this.touched.set(true);
  }
}
