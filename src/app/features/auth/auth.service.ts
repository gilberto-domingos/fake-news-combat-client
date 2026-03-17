import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_ROUTES } from 'app/shared/constants/api-routes';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private api = `${environment.apiUrl}/auth`;

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, { email, password });
  }

  signup(payload: {
    name: string;
    lastname: string;
    email: string;
    birthdate: string;
    gender: string;
    profession: string;
    phone: string;
    password: string;
    termsAccepted: boolean;
    captchaToken: string;
  }) {
    return this.http.post(`${this.api}${API_ROUTES.auth.signup}`, payload);
  }

  googleLogin(idToken: string) {
    return this.http.post(`${this.api}/social/google`, {
      id_token: idToken,
    });
  }
}
