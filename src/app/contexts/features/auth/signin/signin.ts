import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ExternalLogin } from '../../../../shared/ui/external-login/external-login';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../signup/notification-service';
import { TranslocoDirective } from '@jsverse/transloco';
import { TranslocoService } from '@jsverse/transloco';
import { HealthzService } from 'app/contexts/components/land/services/healthz-service';
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
    CommonModule,
    TranslocoDirective,
  ],
  templateUrl: './signin.html',
  styleUrls: ['./signin.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signin implements ErrorStateMatcher, OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private healthzService = inject(HealthzService);
  private notificationService = inject(NotificationService);
  private translocoService = inject(TranslocoService);
  protected successMessage: string = '';

  hidePassword = true;
  matcher = new MyErrorStateMatcher();

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = !!(form && form.submitted);
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  ngOnInit(): void {
    this.healthzService.checkHealthz().subscribe({
      next: (response) => {
        if (response?.status === 200) {
          console.log('Http Status:', response.status);
          console.log('Backend server successfully !');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.successMessage = this.notificationService.successMessage();
    this.notificationService.successMessage.set('');
  }

  // console.log('Response received');
  //         console.log('Http Status:', response.status);
  //         if (response.status === 200) {
  //           console.log('Backend server successfully');
  //         }

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
