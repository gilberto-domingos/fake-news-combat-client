import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
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

  getAll(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
  }): Observable<AnalyticsResDto[]> {
    let httpParams = new HttpParams();

    if (params?.page) httpParams = httpParams.set('page', params.page);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    if (params?.search) httpParams = httpParams.set('search', params.search);

    return this.http
      .get<AnalyticsResDto[]>(this.apiUrl, { params: httpParams })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('User API Error:', error);

    let message = 'Unexpected error';

    if (error.error?.detail) {
      message = error.error.detail;
    } else if (error.status === 0) {
      message = 'Server unavailablel';
    } else if (error.status === 404) {
      message = 'User not Found';
    }

    return throwError(() => new Error(message));
  }
}
