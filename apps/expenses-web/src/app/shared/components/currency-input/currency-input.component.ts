import { Component, input, model, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { TranslateModule } from '@ngx-translate/core';
import { Currency, currencies } from './currencys';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'app-currency-input',
  templateUrl: 'currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
  imports: [
    FloatLabelModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
  ],
})
export class CurrencyInputComponent
  implements FormValueControl<Currency | null>
{
  suggestions = signal<Currency[]>([]);
  value = model<Currency | null>(null);
  touched = model<boolean>(false);
  invalid = model<boolean>(false);

  disabled = input<boolean>(false);

  search(event: AutoCompleteCompleteEvent) {
    const value = event.query;
    this.suggestions.set(
      currencies.filter(
        (currency) =>
          currency.code.startsWith(value) ||
          currency.currency.startsWith(value),
      ),
    );
  }

  onBlur() {
    this.touched.set(true);
  }
}
