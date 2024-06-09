import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
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

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    StepperModule,
    ReactiveFormsModule,
    PasswordModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class RegisterComponent implements OnInit {
  credentialsFormGroup!: FormGroup;
  settingsFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.credentialsFormGroup = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.validateConfirmPassword(),
      ]),
    });
    this.settingsFormGroup = this.formBuilder.group({
      currency: new FormControl('', [Validators.required]),
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
    console.log('TODO');
    this.credentialsFormGroup.reset();
    this.settingsFormGroup.reset();
  }
}
