import { CommonModule } from '@angular/common';
import { Component, HostListener, effect, inject } from '@angular/core';
import {
  AbstractControl,
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
import { Observable, Subject } from 'rxjs';
import { RouterLinkWithHref } from '@angular/router';
import { ComponentCanDeactivate } from '../../../../shared/guards/pending-changes.guard';
import { ConfirmationService } from 'primeng/api';
import { PendingChangesDialogComponent } from '../../../../shared/components/pending-changes-dialog/pending-changes-dialog.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CurrencyInputComponent } from '../../../../shared/components/currency-input/currency-input.component';
import { Currency } from '../../../../shared/components/currency-input/currencys';
import { UserStore } from '../../user.store';

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
export class RegisterComponent implements ComponentCanDeactivate {
  #store = inject(UserStore);
  #confirmationService = inject(ConfirmationService);
  #translateService = inject(TranslateService);

  registerStatus = this.#store.createStatus;

  credentialsFormGroup: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.validateConfirmPassword(),
    ]),
  });
  settingsFormGroup: FormGroup = new FormGroup({
    currency: new FormControl<Currency | undefined>(undefined, [
      Validators.required,
    ]),
  });

  constructor() {
    effect(() => {
      const createStatus = this.#store.createStatus();

      if (createStatus.status == 'success') {
        this.credentialsFormGroup.reset();
        this.settingsFormGroup.reset();
      }
    });
  }

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
    this.#store.createUser({
      password: this.credentialsFormGroup.get('password')?.value,
      username: this.credentialsFormGroup.get('username')?.value,
      settings: {
        currency: currency?.code ?? '',
      },
    });
  }
}
