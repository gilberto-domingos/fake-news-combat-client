import { CommonModule } from '@angular/common'; // ✅
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
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

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule, // ✅ necessário para *ngIf
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

  hidePassword = true;
  hideConfirmPassword = true;

  passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;

    return password === confirm ? null : { mismatch: true };
  };

  form = new FormGroup(
    {
      full_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
      terms: new FormControl(false, [Validators.requiredTrue]),
    },
    { validators: this.passwordMatchValidator },
  );

  submit() {
    if (this.form.invalid) return;

    const { full_name, email, password } = this.form.value;

    this.authService.signup(full_name!, email!, password!).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error(err),
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
