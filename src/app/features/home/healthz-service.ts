import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HealthzService {
  private healthzUrl = 'https://fake-news-combat-agency.onrender.com/healthz';

  private readonly TTL = 14 * 60 * 1000;
  private readonly STORAGE_KEY = 'lastHealthzCheck';

  constructor(private http: HttpClient) {}

  checkHealthz() {
    return this.http.get(this.healthzUrl).pipe(
      catchError((err) => {
        console.error('Error wakeup server', err);
        return of(null);
      }),
    );
  }

  healthzCheckIfNeeded() {
    const now = Date.now();
    const lastHealthzCheck = Number(localStorage.getItem(this.STORAGE_KEY));

    const shouldCheck =
      !lastHealthzCheck || isNaN(lastHealthzCheck) || now - lastHealthzCheck > this.TTL;

    if (!shouldCheck) {
      console.log('[HealthzCheck] Skip - already agreed upon recently');
      return of(null);
    }

    console.log('[HealthzCheck] Triggering wakeup from the backend...');

    return this.http.get(this.healthzUrl).pipe(
      tap(() => {
        localStorage.setItem(this.STORAGE_KEY, now.toString());
        console.log('[HealthzCheck] Triggering wakeup from the backend...');
      }),
      catchError((err) => {
        console.error('[HealthzCheck] Error: waking up HealthzCheck:', err);
        return of(null);
      }),
    );
  }
}
