import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MonthLabels } from '../../../shared/types/month-labels.const';
import { Month } from '../../../shared/types/months.type';
import { Months } from './../../../shared/types/months.type';

import { RenderCaptcha } from '../../../shared/render-captcha/render-captcha';
import { Gender, Genders } from '../../../shared/types/genders.type';
import { Profession, Professionals } from '../../../shared/types/professions.type';
import { AuthService } from '../auth.service';
import { MyErrorStateMatcher } from '../signin/signin';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatOption,
    MatSelectModule,
    FormsModule,
    InputMaskModule,
    InputTextModule,
    RenderCaptcha,
  ],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signup implements OnInit {
  isLoading = false;
  errorMessage = '';
  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(NonNullableFormBuilder);

  hidePassword = true;
  hideConfirmPassword = true;
  matcher = new MyErrorStateMatcher();

  protected readonly AllGenders = Object.values(Genders) as Gender[];
  protected readonly AllProfessionals = Object.values(Professionals) as Profession[];
  protected readonly AllMonths = (Object.values(Months) as Month[]).map((month) => ({
    value: month,
    label: MonthLabels[month],
  }));

  days = Array.from({ length: 31 }, (_, i) => i + 1);
  currentYear = new Date().getFullYear();
  years = Array.from({ length: 100 }, (_, i) => this.currentYear - i);

  form = this.fb.group(
    {
      name: this.fb.control('', Validators.required),
      lastname: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),

      day: this.fb.control<number | null>(null, Validators.required),
      month: this.fb.control<number | null>(null, Validators.required),
      year: this.fb.control<number | null>(null, Validators.required),

      gender: this.fb.control('', Validators.required),
      profession: this.fb.control('', Validators.required),

      phone: this.fb.control('', [
        Validators.required,
        Validators.pattern(/^\(\d{2}\)\s9\d{4}-\d{4}$/),
      ]),

      password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.fb.control('', Validators.required),

      termsAccepted: this.fb.control(false, Validators.requiredTrue),
      captchaToken: this.fb.control('', Validators.required),
    },
    { validators: this.passwordMatchValidator },
  );
  isDisabled: any;

  get f() {
    return this.form.controls;
  }

  private passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.form.disable();

    const payload = this.buildPayload();

    this.authService.signup(payload).subscribe({
      next: () => {
        this.router.navigate(['/signin']);
      },
      error: (err) => {
        console.error('Erro no signup:', err);

        this.errorMessage =
          err?.error?.detail || 'Não foi possível criar sua conta. Tente novamente.';

        this.form.enable();
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  private buildPayload() {
    const {
      name,
      lastname,
      email,
      day,
      month,
      year,
      gender,
      profession,
      phone,
      password,
      termsAccepted,
      captchaToken,
    } = this.form.getRawValue();

    const birthdate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    return {
      name,
      lastname,
      email,
      birthdate,
      gender,
      profession,
      phone,
      password,
      termsAccepted,
      captchaToken,
    };
  }

  ngOnInit(): void {}

  fillMockData(): void {
    this.form.patchValue({
      name: 'Gilberto',
      lastname: 'Domingos',
      email: 'test@gmail.com',
      day: this.days[11],
      month: this.AllMonths[8].value,
      year: this.years[0],
      gender: this.AllGenders[0],
      profession: this.AllProfessionals[0],
      phone: '(11) 99999-9999',
      password: '12345678',
      confirmPassword: '12345678',
    });
  }

  goToSignin() {
    this.router.navigate(['/signin']);
  }

  goPrivacy() {
    this.router.navigate(['/privacy']);
  }

  goConditions() {
    this.router.navigate(['/conditions']);
  }

  googlePrivacy() {
    window.location.href = 'https://policies.google.com/privacy';
  }

  googleTerms() {
    window.location.href = 'https://policies.google.com/terms';
  }
}
