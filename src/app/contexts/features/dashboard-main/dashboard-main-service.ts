import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

import { AnalyticsResDto } from 'app/core/analytics-access/analytics.res.dto';

@Injectable({
  providedIn: 'root',
})
export class DashboardMainService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/analytics_access/find_all`;

  getAll(): Observable<AnalyticsResDto[]> {
    return this.http.get<AnalyticsResDto[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('User API Error:', error);

    let message = 'Unexpected error';

    if (error.error?.detail) {
      message = error.error.detail;
    } else if (error.status === 0) {
      message = 'Server unavailable';
    } else if (error.status === 404) {
      message = 'User not found';
    }

    return throwError(() => new Error(message));
  }
}
