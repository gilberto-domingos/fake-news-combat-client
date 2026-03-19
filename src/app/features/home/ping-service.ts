import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PingService {
  constructor(private http: HttpClient) {}

  pingBackend() {
    return this.http.get('/api/ping');
  }
}
