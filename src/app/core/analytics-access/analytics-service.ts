import { environment } from 'src/environments/environment';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AnalyticsCrtDto } from './analytics.model';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = `${environment.apiUrl}/analytics`;

  registerAccess(): Observable<AnalyticsCrtDto> {
    const payload: AnalyticsCrtDto = {
      route: this.router.url,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      sessionId: this.getSessionId(),
      fingerprint: this.generateFingerprint(),
      authenticateUserId: undefined,
    };

    return this.http.post<AnalyticsCrtDto>(this.apiUrl, payload).pipe(catchError(this.handleError));
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('sessionId');

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem('session_id', sessionId);
    }

    return sessionId;
  }

  private generateFingerprint(): string {
    return btoa(
      navigator.userAgent + navigator.language + window.screen.width + window.screen.height,
    );
  }

  private handleError(error: any) {
    console.log('Requisition error:', error);

    return throwError(() => error);
  }
}
