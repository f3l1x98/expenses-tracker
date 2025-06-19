import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { DateRange } from '../../../shared/interfaces/date-range.interface';
import { AppContentWrapperComponent } from '../../../shared/components/app-content-wrapper/app-content-wrapper.component';
import { AppDateRangePickerComponent } from '../../../shared/components/app-date-range-picker/app-date-range-picker.component';
import { Card, CardModule } from 'primeng/card';
import { HighlightNegativeCurrencyDirective } from '../../../shared/directives/highlight-negative-currency.directive';
import { ChartModule, UIChart } from 'primeng/chart';
import { NoDataComponent } from './no-data/no-data.component';
import { FormatCurrencyPipe } from '../../../shared/pipes/format-currency.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { HomeStore } from '../home.store';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    AppContentWrapperComponent,
    AppDateRangePickerComponent,
    Card,
    HighlightNegativeCurrencyDirective,
    UIChart,
    NoDataComponent,
    FormatCurrencyPipe,
    TranslateModule,
    ChartModule,
    CardModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  #homeStore = inject(HomeStore);

  readonly currentMonthData = computed(
    () => this.#homeStore.currentMonthData().data,
  );
  readonly expensesPerCategoryData = computed<ChartData | undefined>(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const response = this.#homeStore.expensesPerCategory().data;
    if (response === undefined || response.data.length == 0) {
      return undefined;
    } else {
      const data = response.data;
      return {
        labels: data.map((entries) => entries.category),
        datasets: [
          {
            data: data.map((entries) => entries.amount),
            backgroundColor: data.map((entries) =>
              documentStyle.getPropertyValue(entries.color),
            ),
          },
        ],
      };
    }
  });
  readonly expensesPerCategoryNoData = computed<boolean>(() => {
    const response = this.#homeStore.expensesPerCategory().data;
    return response === undefined || response.data.length == 0;
  });
  readonly expensesPerCategoryOptions = computed<ChartOptions<'pie'>>(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const response = this.#homeStore.expensesPerCategory().data;
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
  });
  readonly expensesPerMonthData = computed<ChartData>(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const response = this.#homeStore.expensesPerMonth().data;
    if (response === undefined) {
      return {} as ChartData;
    } else {
      const data = response.data;
      return {
        labels: data.map((entry) => entry.month),
        datasets: [
          {
            data: data.map((entry) => entry.amount),
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-blue-500'),
            tension: 0.4,
          },
        ],
      };
    }
  });
  readonly expensesPerMonthNoData = computed<boolean>(() => {
    const response = this.#homeStore.expensesPerMonth().data;
    return response === undefined || response.data.length == 0;
  });
  readonly expensesPerMonthOptions: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: getComputedStyle(document.documentElement).getPropertyValue(
            '--p-text-color',
          ),
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: getComputedStyle(document.documentElement).getPropertyValue(
            '--p-text-color',
          ),
        },
        grid: {
          color: getComputedStyle(document.documentElement).getPropertyValue(
            '--p-surface-700',
          ),
        },
      },
      y: {
        ticks: {
          color: getComputedStyle(document.documentElement).getPropertyValue(
            '--p-text-color',
          ),
        },
        grid: {
          color: getComputedStyle(document.documentElement).getPropertyValue(
            '--p-surface-700',
          ),
        },
      },
    },
  };

  constructor() {
    effect(() => {
      const filter = this.#homeStore.filter();
      this.#homeStore.loadExpensesPerCategory(filter);
      this.#homeStore.loadExpensesPerMonth(filter);
    });
    this.#homeStore.loadCurrentMonthData();
  }

  onDateRangeChanged(dateRange: DateRange) {
    this.#homeStore.setDateRangeFilter(dateRange);
  }
}
