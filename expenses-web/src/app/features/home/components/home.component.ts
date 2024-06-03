import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Observable, map, of } from 'rxjs';
import { ExpensesPerCategoryResponse } from '../store/interfaces/api/expenses-per-catergory-response.interface';
import { TotalExpenseOfMonth } from '../store/interfaces/total-expense-of-month.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  expensesPerCategoryData$!: Observable<ChartData>;
  expensesPerCategoryOptions$!: Observable<ChartOptions<'pie'>>;

  expensesPerMonthData$!: Observable<ChartData>;
  expensesPerMonthOptions$!: Observable<ChartOptions<'line'>>;

  dateRangeFilter: Date[] | undefined;

  constructor() {}

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const expensesPerCategoryDummyApiData = of({
      data: [
        {
          category: 'test1',
          amount: 1,
          color: '--blue-500',
        },
        {
          category: 'test2',
          amount: 10,
          color: '--yellow-500',
        },
        {
          category: 'test3',
          amount: 3,
          color: '--green-500',
        },
      ],
      currency: 'EUR',
    } as ExpensesPerCategoryResponse);
    this.expensesPerCategoryData$ = expensesPerCategoryDummyApiData.pipe(
      map(({ data }) => ({
        labels: data.map((entries) => entries.category),
        datasets: [
          {
            data: data.map((entries) => entries.amount),
            backgroundColor: data.map((entries) =>
              documentStyle.getPropertyValue(entries.color)
            ),
          },
        ],
      }))
    );
    this.expensesPerCategoryOptions$ = expensesPerCategoryDummyApiData.pipe(
      map(({ currency }) => ({
        aspectRatio: 1.4,
        borderColor: textColorSecondary,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                console.dir(context, { depth: null });
                let label = context.dataset.label || '';

                if (label) {
                  label += '';
                }
                if (context.parsed !== null) {
                  label += new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: currency,
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
      }))
    );

    const expensesPerMonthDummyApiData = of([
      {
        month: 'January',
        amount: 10,
      },
      {
        month: 'February',
        amount: 12,
      },
      {
        month: 'March',
        amount: 3,
      },
      {
        month: 'April',
        amount: 2,
      },
      {
        month: 'May',
        amount: 45,
      },
      {
        month: 'June',
        amount: 13,
      },
      {
        month: 'July',
        amount: 8,
      },
    ] as TotalExpenseOfMonth[]);
    this.expensesPerMonthData$ = expensesPerMonthDummyApiData.pipe(
      map((data) => ({
        labels: data.map((entry) => entry.month),
        datasets: [
          {
            data: data.map((entry) => entry.amount),
            fill: false,
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            tension: 0.4,
          },
        ],
      }))
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
  }
}
