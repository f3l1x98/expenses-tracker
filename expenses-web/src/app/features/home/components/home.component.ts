import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Observable, map, of } from 'rxjs';
import { ExpensesPerCategory } from '../store/interfaces/expenses-per-category.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  expensesPerCategoryData$!: Observable<ChartData>;
  expensesPerCategoryOptions!: ChartOptions<'pie'>;

  dateRangeFilter: Date[] | undefined;

  constructor() {}

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.expensesPerCategoryData$ = of([
      {
        category: 'test1',
        amount: 1,
        colorName: '--blue-500',
      },
      {
        category: 'test2',
        amount: 10,
        colorName: '--yellow-500',
      },
      {
        category: 'test3',
        amount: 3,
        colorName: '--green-500',
      },
    ] as ExpensesPerCategory[]).pipe(
      map((apiData) => ({
        labels: apiData.map((entries) => entries.category),
        datasets: [
          {
            data: apiData.map((entries) => entries.amount),
            backgroundColor: apiData.map((entries) =>
              documentStyle.getPropertyValue(entries.colorName)
            ),
          },
        ],
      }))
    );
    this.expensesPerCategoryOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
  }
}
