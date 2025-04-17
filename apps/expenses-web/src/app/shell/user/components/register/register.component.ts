import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { StepperModule } from 'primeng/stepper';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../user.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RouterLinkWithHref } from '@angular/router';
import { ComponentCanDeactivate } from '../../../../shared/guards/pending-changes.guard';
import { ConfirmationService } from 'primeng/api';
import { PendingChangesDialogComponent } from '../../../../shared/components/pending-changes-dialog/pending-changes-dialog.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CurrencyInputComponent } from '../../../../shared/components/currency-input/currency-input.component';
import { Currency } from '../../../../shared/components/currency-input/currencys';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  imports: [
    CommonModule,
    RouterLinkWithHref,
    CardModule,
    StepperModule,
    ReactiveFormsModule,
    PasswordModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    PendingChangesDialogComponent,
    TranslateModule,
    CurrencyInputComponent,
  ],
  providers: [ConfirmationService],
})
export class RegisterComponent
  implements OnInit, OnDestroy, ComponentCanDeactivate
{
  #formBuilder = inject(FormBuilder);
  #userService = inject(UserService);
  #confirmationService = inject(ConfirmationService);
  #translateService = inject(TranslateService);

  credentialsFormGroup!: FormGroup;
  settingsFormGroup!: FormGroup;

  registerStatus$ = this.#userService.registerStatus$;

  private destroy$ = new Subject<void>();

  @HostListener('window:beforeunload')
  canDeactivate(): boolean | Observable<boolean> {
    if (this.credentialsFormGroup.pristine) {
      return true;
    }
    const canDeactiveSubject$ = new Subject<boolean>();
    this.#confirmationService.confirm({
      message: this.#translateService.instant('dialogs.unsafedData.message'),
      header: this.#translateService.instant('dialogs.unsafedData.header'),
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        canDeactiveSubject$.next(true);
      },
      reject: () => {
        canDeactiveSubject$.next(false);
      },
    });
    return canDeactiveSubject$;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.credentialsFormGroup = this.#formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.validateConfirmPassword(),
      ]),
    });
    this.settingsFormGroup = this.#formBuilder.group({
      currency: new FormControl<Currency | undefined>(undefined, [
        Validators.required,
      ]),
    });
    this.#userService.registerStatus$
      .pipe(takeUntil(this.destroy$))
      .subscribe((status) => {
        if (status.status == 'success') {
          this.credentialsFormGroup.reset();
          this.settingsFormGroup.reset();
        }
      });
  }

  private validateConfirmPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control.root as FormGroup;
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        return { notEqual: true };
      }

      return null;
    };
  }

  register() {
    if (!this.credentialsFormGroup.valid || !this.settingsFormGroup.valid)
      return;

    const currency = this.settingsFormGroup.get('currency')?.value as
      | Currency
      | undefined;
    this.#userService.register({
      password: this.credentialsFormGroup.get('password')?.value,
      username: this.credentialsFormGroup.get('username')?.value,
      settings: {
        currency: currency?.code ?? '',
      },
    });
  }
}
