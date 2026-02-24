import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MonthLabels } from './../../shared/types/month-labels.const';

import { RecaptchaLoaderService } from '../../services/recaptcha-loader-service';
import { RecaptchaService } from '../../services/recaptcha-service';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { MatOption } from '@angular/material/select';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MyErrorStateMatcher } from '../signin/signin';

import { MatSelectModule } from '@angular/material/select';

import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { Gender, Genders } from '../../shared/types/genders.type';
import { Month, Months } from '../../shared/types/months.type';
import { Profession, Professionals } from '../../shared/types/professions.type';

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
export class Signup implements AfterViewInit {
  protected readonly AllGenders = Object.values(Genders) as Gender[];
  protected readonly AllProfessionals = Object.values(Professionals) as Profession[];
  protected readonly AllMonths = Object.values(Months) as Month[];
  protected readonly MonthLabels = MonthLabels;

  @ViewChild('captchaContainer') captchaRef!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    this.loader.load().then(() => {
      this.renderCaptcha();
    });
  }

  siteKey = '6Lf-lXIsAAAAAIgPn-2Eg6vZNywBbx7thWNv8u1l';

  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(NonNullableFormBuilder);
  private loader = inject(RecaptchaLoaderService);
  private recaptchaService = inject(RecaptchaService);

  hidePassword = true;
  hideConfirmPassword = true;
  matcher = new MyErrorStateMatcher();

  widgetId?: number;

  passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };

  form = this.fb.group(
    {
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      gender: ['', Validators.required],
      profession: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s9\d{4}-\d{4}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
      recaptcha: ['', Validators.required],
    },
    { validators: this.passwordMatchValidator },
  );

  days = Array.from({ length: 31 }, (_, i) => i + 1);

  currentYear = new Date().getFullYear();
  years = Array.from({ length: 100 }, (_, i) => this.currentYear - i);

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.loader.load().then(() => {
      this.renderCaptcha();
    });
  }

  renderCaptcha() {
    const element = this.captchaRef.nativeElement;

    this.widgetId = this.recaptchaService.render(element, this.siteKey, {
      success: (token: string) => this.onCaptchaResolved(token),
      expired: () => this.form.controls.recaptcha.setValue(''),
      error: () => console.error('Erro no captcha'),
    });
  }

  submit() {
    if (this.form.invalid) return;

    const { name, last_name, email, password, recaptcha } = this.form.getRawValue();

    this.authService.signup(name, last_name, email, password, recaptcha).subscribe({
      next: () => {
        this.recaptchaService.reset(this.widgetId);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Signup error:', err);
        this.recaptchaService.reset(this.widgetId);
      },
    });
  }

  onCaptchaResolved(token: string | null) {
    this.form.controls.recaptcha.setValue(token || '');
    this.form.controls.recaptcha.markAsTouched();
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
