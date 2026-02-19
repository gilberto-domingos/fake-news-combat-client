import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private api = 'http://localhost:8000/auth';

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, { email, password });
  }

  signup(full_name: string, email: string, password: string) {
    return this.http.post(`${this.api}/signup`, {
      full_name,
      email,
      password,
    });
  }

  googleLogin(idToken: string) {
    return this.http.post(`${this.api}/social/google`, {
      id_token: idToken,
    });
  }
}
