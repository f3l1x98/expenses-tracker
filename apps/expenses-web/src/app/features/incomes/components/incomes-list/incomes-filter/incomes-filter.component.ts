import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IDateRangeDto,
  IIncomeFilterDto,
  IncomeCategory,
} from 'expenses-shared';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { AppDateRangePickerComponent } from '../../../../../shared/components/app-date-range-picker/app-date-range-picker.component';
import { IncomeCategoryDropdownComponent } from '../../income-category-dropdown/income-category-dropdown.component';
import { IncomesService } from '../../../incomes.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-incomes-filter',
  templateUrl: 'incomes-filter.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IncomeCategoryDropdownComponent,
    InputTextModule,
    AppDateRangePickerComponent,
    FloatLabelModule,
    TranslateModule,
  ],
})
export class IncomesFilterComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private incomesService: IncomesService,
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      description: new FormControl('', {
        nonNullable: true,
      }),
      category: new FormControl<IncomeCategory | undefined>(undefined, {
        nonNullable: true,
      }),
      dateRange: new FormControl<IDateRangeDto | undefined>(undefined, {
        nonNullable: true,
      }),
    });

    this.formGroup.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(() => this.applyFilter());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFilter() {
    const description: string | undefined =
      this.formGroup.get('description')?.value ?? undefined;
    const category: IncomeCategory | undefined =
      this.formGroup.get('category')?.value ?? undefined;
    const dateRange: IDateRangeDto | undefined =
      this.formGroup.get('dateRange')?.value ?? undefined;

    const filter: IIncomeFilterDto = {
      description: description,
      category: category,
      ...dateRange,
    };
    this.incomesService.updateFilter(filter);
  }
}
