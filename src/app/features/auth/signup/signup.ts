import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MonthLabels } from '../../../shared/types/month-labels.const';
import { Month } from '../../../shared/types/months.type';

import { RecaptchaLoaderService } from '../recaptcha-loader-service';
import { RecaptchaService } from '../recaptcha-service';

import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

import { environment } from 'environments/environment';
import { Gender, Genders } from '../../../shared/types/genders.type';
import { Months } from '../../../shared/types/months.type';
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
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signup implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(NonNullableFormBuilder);
  private loader = inject(RecaptchaLoaderService);
  private recaptchaService = inject(RecaptchaService);

  @ViewChild('captchaContainer') captchaRef!: ElementRef<HTMLDivElement>;

  siteKey = environment.recaptchaSiteKey;
  apiUrl = environment.apiUrl;

  hidePassword = true;
  hideConfirmPassword = true;
  matcher = new MyErrorStateMatcher();
  widgetId?: number;

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
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      gender: ['', Validators.required],
      profession: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s9\d{4}-\d{4}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue],
      captchaToken: ['', Validators.required],
    },
    { validators: this.passwordMatchValidator },
  );

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.loader.load().then(() => {
      this.renderCaptcha();
      this.cdr.detectChanges();
    });
  }

  private passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  renderCaptcha() {
    if (!this.captchaRef) return;
    this.widgetId = this.recaptchaService.render(this.captchaRef.nativeElement, this.siteKey, {
      success: (token: string) => this.onCaptchaResolved(token),
      expired: () => this.form.controls.captchaToken.setValue(''),
      error: () => console.error('Erro no captcha'),
    });
  }

  submit() {
    if (this.form.invalid) {
      console.warn('Form inválido! Veja os valores atuais:');
      console.table(this.form.getRawValue()); // mostra todos os campos do form
      type FormKeys = keyof typeof this.form.controls;

      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.controls[key as keyof typeof this.form.controls];
        if (control.invalid) {
          console.warn(`Campo inválido: ${key}`, control.errors);
        }
      });
      return;
    }

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

    if (!captchaToken) {
      console.warn('Captcha não resolvido!');
      return;
    }

    const birthdate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const payload = {
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

    this.authService.signup(payload).subscribe({
      next: () => {
        this.recaptchaService.reset(this.widgetId);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro no signup:', err);
        this.recaptchaService.reset(this.widgetId);
      },
    });
  }

  onCaptchaResolved(token: string | null) {
    this.form.controls.captchaToken.setValue(token || '');
    this.form.controls.captchaToken.markAsTouched();
  }

  goToLogin() {
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
