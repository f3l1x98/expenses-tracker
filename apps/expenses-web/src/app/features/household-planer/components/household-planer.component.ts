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
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { getExpenseCategoryColor } from 'expenses-shared';
import { NoDataComponent } from '../../../shared/components/no-data/no-data.component';

type OverviewChartData = {
  value: number;
  title?: string;
  displayTooltip: boolean;
};

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
    NoDataComponent,
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
  readonly householdOverviewMonthlyLeftOver =
    this.#store.householdOverviewMonthlyLeftOver;
  readonly householdOverviewYearlyLeftOver =
    this.#store.householdOverviewYearlyLeftOver;
  readonly householdOverviewCurrency = this.#store.householdOverview.currency;

  readonly householdOverviewData = computed<ChartData | undefined>(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const expensesPerCategory =
      this.#store.householdOverview.expensesPerCategory();
    const totalExpense = this.#store.householdOverview.totalExpense();
    const monthlyLeftOver = this.#store.householdOverviewMonthlyLeftOver();
    if (expensesPerCategory === undefined || expensesPerCategory.length == 0) {
      return undefined;
    }
    const datasets: ChartDataset<'doughnut', OverviewChartData[]>[] = [
      {
        data: expensesPerCategory.map((entries) => ({
          value: entries.monthlyAmount,
          displayTooltip: true,
        })),
        backgroundColor: expensesPerCategory.map((entries) =>
          documentStyle.getPropertyValue(
            getExpenseCategoryColor(entries.category),
          ),
        ),
        label: 'expense',
      },
    ];
    if (monthlyLeftOver < 0) {
      // defficit
      datasets.push({
        data: [
          {
            value: totalExpense.monthlyAmount + monthlyLeftOver,
            displayTooltip: false,
          },
          { value: monthlyLeftOver, title: 'Defficit', displayTooltip: true },
        ],
        backgroundColor: ['transparent', 'red'],
        label: 'difference',
      });
    } else if (monthlyLeftOver > 0) {
      // leftover
      datasets.push({
        data: [
          { value: monthlyLeftOver, title: 'Left over', displayTooltip: true },
          {
            value: totalExpense.monthlyAmount - monthlyLeftOver,
            displayTooltip: false,
          },
        ],
        backgroundColor: ['green', 'transparent'],
        label: 'difference',
      });
    }
    return {
      labels: [
        ...expensesPerCategory.map((entries) =>
          new TitleCasePipe().transform(entries.category),
        ),
      ],
      datasets: datasets as unknown as ChartDataset<
        'doughnut',
        (number | [number, number] | null)[]
      >[],
      parsing: {
        key: 'value',
      },
    };
  });
  readonly householdOverviewNoData = computed<boolean>(() => {
    const response = this.#store.householdOverview.expensesPerCategory();
    return response === undefined || response.length == 0;
  });
  readonly householdOverviewOptions = computed<ChartOptions<'doughnut'>>(() => {
    return {
      cutout: '20%',
      aspectRatio: 1.4,
      borderColor: 'transparent',
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Household Finance Overview',
          color: getComputedStyle(document.documentElement).getPropertyValue(
            '--p-text-color',
          ),
          font: {
            size: 24,
            weight: 'bolder',
          },
        },
        tooltip: {
          enabled: (context, _) => {
            if (!context.tooltipItems || context.tooltipItems.length == 0) {
              return true;
            }
            const dataIndex = context.tooltipItems[0].dataIndex;
            const data = context.tooltipItems[0].dataset.data[
              dataIndex
            ] as unknown as OverviewChartData;
            return data.displayTooltip;
          },
          callbacks: {
            title: (context) => {
              const dataIndex = context[0].dataIndex;
              const data = context[0].dataset.data[
                dataIndex
              ] as unknown as OverviewChartData;
              if (data.title) {
                return data.title;
              }
              return undefined;
            },
            label: (context) => {
              let label = '';
              if (context.parsed !== null) {
                label += new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(context.parsed);
              }
              return label;
            },
          },
        },
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            color: getComputedStyle(document.documentElement).getPropertyValue(
              '--p-text-color',
            ),
          },
        },
      },
    };
  });

  constructor() {
    effect(() => {
      const loadStatus = this.#store.loadStatus();
      this.#spinnerStore.setState(loadStatus.status === 'pending');
    });
    this.#store.loadHouseholdExpenses();
    this.#store.loadHouseholdIncomes();
    this.#store.loadHouseholdOverview();
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
