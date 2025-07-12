import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { AppContentWrapperComponent } from '../../../shared/components/app-content-wrapper/app-content-wrapper.component';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TranslateModule } from '@ngx-translate/core';
import { HouseholdPlanerStore } from '../household-planer.store';
import { SpinnerStore } from '../../../shell/spinner/spinner.store';
import { FormatCurrencyPipe } from '../../../shared/pipes/format-currency.pipe';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-household-planer',
  templateUrl: 'household-planer.component.html',
  styleUrls: ['./household-planer.component.scss'],
  imports: [
    AppContentWrapperComponent,
    TableModule,
    PanelModule,
    TranslateModule,
    FormatCurrencyPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HouseholdPlanerComponent {
  #store = inject(HouseholdPlanerStore);
  #spinnerStore = inject(SpinnerStore);

  readonly householdIncomes = this.#store.householdIncomes;
  readonly householdExpenses = this.#store.householdExpenses;

  constructor() {
    effect(() => {
      const loadStatus = this.#store.loadStatus();
      this.#spinnerStore.setState(loadStatus.status === 'pending');
    });
    this.#store.loadHouseholdExpenses();
    this.#store.loadHouseholdIncomes();
  }

  public sortNullCategoryLast(event: SortEvent) {
    event.data?.sort((data1, data2) => {
      if (event.field === undefined) {
        return -1;
      }
      const value1 = data1[event.field];
      const value2 = data2[event.field];
      let result = null;
      if (value1 == null && value2 != null) result = 1;
      else if (value1 != null && value2 == null) result = -1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return (event.order ?? 1) * result;
    });
  }
}
