import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ExpenseCategory } from 'expenses-shared';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-expense-category-dropdown',
  templateUrl: 'expense-category-dropdown.component.html',
  imports: [FloatLabelModule, SelectModule, TranslateModule, FormsModule],
})
export class ExpenseCategoryDropdownComponent {
  showClear = input<boolean>(false);
  disabled = input<boolean>(false);

  value = model<ExpenseCategory | undefined>();
  touched = model<boolean>(false);

  options = Object.values(ExpenseCategory).map((e) => ({
    label: `expenses.categories.${e}`,
    value: e,
  }));

  onBlur() {
    this.touched.set(true);
  }
}
