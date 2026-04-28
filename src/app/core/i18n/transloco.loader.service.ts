import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Translation, TranslocoLoader, TranslocoLoaderData } from '@jsverse/transloco';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslocoLoaderService implements TranslocoLoader {
  http = inject(HttpClient);

  getTranslation(
    lang: string,
    data?: TranslocoLoaderData,
  ): Observable<Translation> | Promise<Translation> {
    return this.http.get(`/assets/i18n/${lang}.json`);
  }
}
