import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IncomeCategory } from 'expenses-shared';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-income-category-dropdown',
  templateUrl: 'income-category-dropdown.component.html',
  imports: [FloatLabelModule, SelectModule, TranslateModule, FormsModule],
})
export class IncomeCategoryDropdownComponent {
  showClear = input<boolean>(false);
  disabled = input<boolean>(false);

  value = model<IncomeCategory | undefined>();
  touched = model<boolean>(false);

  options = Object.values(IncomeCategory).map((e) => ({
    label: `incomes.categories.${e}`,
    value: e,
  }));

  onBlur() {
    this.touched.set(true);
  }
}
