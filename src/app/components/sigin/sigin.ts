import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';

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

declare const google: any;

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sigin',
  imports: [
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './sigin.html',
  styleUrl: './sigin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sigin implements ErrorStateMatcher, AfterViewInit {
  constructor(private router: Router) {}

  hidePassword = true;
  matcher = new MyErrorStateMatcher();

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = !!(form && form.submitted);
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  ngAfterViewInit(): void {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: 'SEU_CLIENT_ID_AQUI',
        callback: (response: any) => this.handleGoogleLogin(response),
      });

      google.accounts.id.renderButton(document.getElementById('googleBtn'), {
        theme: 'outline',
        size: 'large',
        shape: 'rectangular',
        text: 'signin_with',
        width: 280,
      });
    }
  }

  handleGoogleLogin(response: any) {
    const idToken = response.credential;

    console.log('Google Token:', idToken);

    // this.http.post('/auth/google', { token: idToken }).subscribe();
  }

  loginWithGoogle(): void {
    google.accounts.id.initialize({
      client_id: 'SEU_CLIENT_ID',
      callback: (response: any) => this.handleGoogleLogin(response),
    });

    google.accounts.id.prompt();
  }

  goToConditions() {
    this.router.navigate(['/conditions']);
  }

  goToPrivacy() {
    this.router.navigate(['/privacy']);
  }
}
