import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AppHeaderComponent } from '../../../../shared/components/app-header/app-header.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    AppHeaderComponent,
    FloatLabelModule,
    TranslateModule,
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  private destroy$ = new Subject<boolean>();
  formGroup!: FormGroup;
  loading$ = this.#authService.status$.pipe(
    map((status) => status.value == 'running'),
  );

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit() {
    this.formGroup = this.#formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.#authService.status$
      .pipe(takeUntil(this.destroy$))
      .subscribe((status) => {
        if (status.value == 'success') {
          const returnUrl =
            this.#route.snapshot.queryParams['returnUrl'] || '/features';
          this.#router.navigate([returnUrl]);
          this.formGroup.reset();
        }
      });
  }

  submit() {
    if (!this.formGroup.valid) return;

    this.#authService.login(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.formGroup.get('username')!.value,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.formGroup.get('password')!.value,
    );
  }
}
