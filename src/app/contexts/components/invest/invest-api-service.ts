import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InvestCrtDto } from './invest-crt-dto';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvestApiService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/invest`;

  create(invest: InvestCrtDto): Observable<InvestCrtDto> {
    console.log('SERVICE:', invest);
    return this.http.post<InvestCrtDto>(this.apiUrl, invest).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Invest API Error:', error);

    let message = 'Unexpected error';

    if (error.error?.detail) {
      message = error.error.detail;
    } else if (error.status === 0) {
      message = 'Server unavailablel';
    } else if (error.status === 404) {
      message = 'Invest not Found';
    }

    return throwError(() => new Error(message));
  }
}
