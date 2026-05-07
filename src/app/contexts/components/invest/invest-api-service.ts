import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InvestApiService {
  private http = inject(HttpClient);
  private api = `${environment.apiUrl}/invest`;

  createProposal(payload: { name: string; proposal: string; contact: string }) {
    return this.http.post(`${this.api}`, payload);
  }
}
