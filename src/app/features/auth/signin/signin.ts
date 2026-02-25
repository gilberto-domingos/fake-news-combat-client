import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ExternalLogin } from '../../../shared/ui/external-login/external-login';
import { AuthService } from '../auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signin',
  imports: [
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    ExternalLogin,
  ],
  templateUrl: './signin.html',
  styleUrls: ['./signin.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signin implements ErrorStateMatcher {
  private router = inject(Router);
  private authService = inject(AuthService);

  hidePassword = true;
  matcher = new MyErrorStateMatcher();

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = !!(form && form.submitted);
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  submit() {
    if (this.emailFormControl.invalid || this.passwordFormControl.invalid) return;

    this.authService
      .login(this.emailFormControl.value!, this.passwordFormControl.value!)
      .subscribe({
        next: (res) => {
          console.log('Login OK', res);
          this.router.navigate(['/home']);
        },
        error: (err) => console.error('Erro login', err),
      });
  }

  goToConditions() {
    this.router.navigate(['/conditions']);
  }

  goToPrivacy() {
    this.router.navigate(['/privacy']);
  }

  goSignUp() {
    this.router.navigate(['/signup']);
  }
}
