import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Observable, Subject, map, of, takeUntil } from 'rxjs';
import { DateRange } from '../../../shared/interfaces/date-range.interface';
import { HomeService } from '../home.service';
import { CurrentMonthDataDto } from 'expenses-shared';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  currentMonthDataData$!: Observable<CurrentMonthDataDto | undefined>;

  expensesPerCategoryData$!: Observable<ChartData>;
  expensesPerCategoryOptions$!: Observable<ChartOptions<'pie'>>;

  expensesPerMonthData$!: Observable<ChartData>;
  expensesPerMonthOptions$!: Observable<ChartOptions<'line'>>;

  private destory$ = new Subject<void>();

  constructor(private homeService: HomeService) {}

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary',
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.currentMonthDataData$ = this.homeService.currentMonthData$.pipe(
      takeUntil(this.destory$),
    );

    this.expensesPerCategoryData$ = this.homeService.expensesPerCategory$.pipe(
      takeUntil(this.destory$),
      map((event) => {
        if (event === undefined) {
          return {} as ChartData;
        } else {
          const data = event.data;
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
      }),
    );
    this.expensesPerCategoryOptions$ =
      this.homeService.expensesPerCategory$.pipe(
        takeUntil(this.destory$),
        map((event) => {
          if (event === undefined) {
            return {};
          } else {
            return {
              aspectRatio: 1.4,
              borderColor: textColorSecondary,
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
                          currency: event.currency,
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
        }),
      );

    this.expensesPerMonthData$ = this.homeService.expensesPerMonth$.pipe(
      takeUntil(this.destory$),
      map((event) => {
        if (event === undefined) {
          return {} as ChartData;
        } else {
          const data = event.data;
          return {
            labels: data.map((entry) => entry.month),
            datasets: [
              {
                data: data.map((entry) => entry.amount),
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: 0.4,
              },
            ],
          };
        }
      }),
    );
    this.expensesPerMonthOptions$ = of({
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          display: false,
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    });

    this.homeService.enterPage();
  }

  onDateRangeChanged(dateRange: DateRange) {
    this.homeService.setDateRangeFilter(dateRange);
  }
}
