import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { TranslateModule } from '@ngx-translate/core';
import { Currency, currencies } from './currencys';

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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CurrencyInputComponent),
    },
  ],
})
export class CurrencyInputComponent implements ControlValueAccessor {
  suggestions: Currency[] = [];
  value!: Currency | undefined;
  private touched = false;

  disabled = false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onChange = (value: Currency | undefined) => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  valueChanged(val: Currency | undefined) {
    console.log('CurrencyCodeInputComponent#valueChanged');
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

  search(event: AutoCompleteCompleteEvent) {
    console.log('CurrencyCodeInputComponent#search');
    const value = event.query;
    console.log(value);
    console.log(this.suggestions.length);
    this.suggestions = currencies.filter(
      (currency) =>
        currency.code.startsWith(value) || currency.currency.startsWith(value),
    );
    console.log(this.suggestions.length);
  }

  writeValue(value: Currency | undefined): void {
    console.log('CurrencyCodeInputComponent#writeValue');
    this.value = value;
  }
  registerOnChange(fn: (value: Currency | undefined) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
