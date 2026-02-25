import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../features/auth/auth.service';

declare const google: any;

@Component({
  selector: 'app-external-login',
  templateUrl: './external-login.html',
  styleUrls: ['./external-login.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalLogin implements AfterViewInit {
  private router = inject(Router);
  private authService = inject(AuthService);

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

    this.authService.googleLogin(idToken).subscribe({
      next: (res) => {
        console.log('Google login OK', res);
        this.router.navigate(['/home']);
      },
      error: (err) => console.error('Erro Google login', err),
    });
  }

  loginWithGoogle(): void {
    google.accounts.id.prompt();
  }
}
