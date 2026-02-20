import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MyErrorStateMatcher } from '../sigin/sigin';

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
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signup {
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
    },
    { validators: this.passwordMatchValidator },
  );

  /** Getter limpo para template */
  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) return;

    const { full_name, email, password } = this.form.getRawValue();

    this.authService.signup(full_name, email, password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error('Signup error:', err),
    });
  }

  goToLogin() {
    alert('testando !!!');
    this.router.navigate(['/signin']);
  }
}
