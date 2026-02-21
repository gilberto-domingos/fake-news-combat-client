import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MyErrorStateMatcher } from '../signin/signin';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    RecaptchaModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  providers: [],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signup {
  siteKey = '6Lf-lXIsAAAAAIgPn-2Eg6vZNywBbx7thWNv8u1l';
  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(NonNullableFormBuilder);

  hidePassword = true;
  hideConfirmPassword = true;
  matcher = new MyErrorStateMatcher();

  passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  };

  form = this.fb.group(
    {
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
      recaptcha: ['', Validators.required],
    },
    { validators: this.passwordMatchValidator },
  );

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) return;

    const { full_name, email, password, recaptcha } = this.form.getRawValue();

    this.authService.signup(full_name, email, password, recaptcha).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error('Signup error:', err),
    });
  }

  onCaptchaResolved(token: string | null) {
    this.form.controls['recaptcha'].setValue(token || '');
    this.form.controls['recaptcha'].markAsTouched();
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
