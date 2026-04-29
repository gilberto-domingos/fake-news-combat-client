import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LanguageStorageService {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private translocoService = inject(TranslocoService);

  initLang(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.translocoService.setActiveLang('en');
      return;
    }

    const saved = localStorage.getItem('lang');

    if (saved) {
      this.translocoService.setActiveLang(saved);
      return;
    }

    const defaultLang = 'en';
    this.translocoService.setActiveLang(defaultLang);
    localStorage.setItem('lang', defaultLang);
  }

  clearLang() {
    localStorage.clear();
  }
}
