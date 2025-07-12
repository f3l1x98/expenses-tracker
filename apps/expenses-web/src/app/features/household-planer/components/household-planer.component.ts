import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { AppContentWrapperComponent } from '../../../shared/components/app-content-wrapper/app-content-wrapper.component';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { TranslateModule } from '@ngx-translate/core';
import { HouseholdPlanerStore } from '../household-planer.store';
import { SpinnerStore } from '../../../shell/spinner/spinner.store';
import { FormatCurrencyPipe } from '../../../shared/pipes/format-currency.pipe';
import { SortEvent } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ChartData, ChartOptions } from 'chart.js';
import {
  getExpenseCategoryColor,
  getIncomeCategoryColor,
} from 'expenses-shared';

@Component({
  selector: 'app-household-planer',
  templateUrl: 'household-planer.component.html',
  styleUrls: ['./household-planer.component.scss'],
  imports: [
    CommonModule,
    AppContentWrapperComponent,
    ChartModule,
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

  readonly householdIncomes = this.#store.householdIncomes.data;
  readonly householdIncomeCurrency = this.#store.householdIncomes.currency;
  readonly householdExpenses = this.#store.householdExpenses.data;
  readonly householdExpenseCurrency = this.#store.householdExpenses.currency;

  readonly householdExpensesPerCategoryData = computed<ChartData | undefined>(
    () => {
      const documentStyle = getComputedStyle(document.documentElement);
      const response = this.#store.householdExpensesOverview();
      if (response === undefined || response.data.length == 0) {
        return undefined;
      } else {
        const data = response.data;
        return {
          labels: data.map((entries) => entries.category),
          datasets: [
            {
              data: data.map((entries) => entries.monthlyAmount),
              backgroundColor: data.map((entries) =>
                documentStyle.getPropertyValue(
                  getExpenseCategoryColor(entries.category),
                ),
              ),
            },
          ],
        };
      }
    },
  );
  readonly householdExpensesPerCategoryNoData = computed<boolean>(() => {
    const response = this.#store.householdExpensesOverview();
    return response === undefined || response.data.length == 0;
  });
  readonly householdExpensesPerCategoryOptions = computed<ChartOptions<'pie'>>(
    () => {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const response = this.#store.householdExpensesOverview();
      if (response === undefined) {
        return {};
      } else {
        return {
          aspectRatio: 1.4,
          borderColor: textColor,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label || '';

                  if (label) {
                    label += '';
                  }
                  if (context.parsed !== null) {
                    label += new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: response.currency,
                    }).format(context.parsed);
                  }
                  return label;
                },
              },
            },
            legend: {
              position: 'right',
              labels: {
                usePointStyle: true,
                color: textColor,
              },
            },
          },
        };
      }
    },
  );
  readonly householdIncomesPerCategoryData = computed<ChartData | undefined>(
    () => {
      const documentStyle = getComputedStyle(document.documentElement);
      const response = this.#store.householdIncomesOverview();
      if (response === undefined || response.data.length == 0) {
        return undefined;
      } else {
        const data = response.data;
        return {
          labels: data.map((entries) => entries.category),
          datasets: [
            {
              data: data.map((entries) => entries.monthlyAmount),
              backgroundColor: data.map((entries) =>
                documentStyle.getPropertyValue(
                  getIncomeCategoryColor(entries.category),
                ),
              ),
            },
          ],
        };
      }
    },
  );
  readonly householdIncomePerCategoryNoData = computed<boolean>(() => {
    const response = this.#store.householdIncomesOverview();
    return response === undefined || response.data.length == 0;
  });
  readonly householdIncomesPerCategoryOptions = computed<ChartOptions<'pie'>>(
    () => {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const response = this.#store.householdIncomesOverview();
      if (response === undefined) {
        return {};
      } else {
        return {
          aspectRatio: 1.4,
          borderColor: textColor,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label || '';

                  if (label) {
                    label += '';
                  }
                  if (context.parsed !== null) {
                    label += new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: response.currency,
                    }).format(context.parsed);
                  }
                  return label;
                },
              },
            },
            legend: {
              position: 'right',
              labels: {
                usePointStyle: true,
                color: textColor,
              },
            },
          },
        };
      }
    },
  );

  constructor() {
    effect(() => {
      const loadStatus = this.#store.loadStatus();
      this.#spinnerStore.setState(loadStatus.status === 'pending');
    });
    this.#store.loadHouseholdExpenses();
    this.#store.loadHouseholdIncomes();
    this.#store.loadHouseholdExpensesOverview();
    this.#store.loadHouseholdIncomesOverivew();
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
