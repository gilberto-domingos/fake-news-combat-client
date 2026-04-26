import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecaptchaLoaderService {
  private document = inject(DOCUMENT);
  private loaded = false;

  load(): Promise<void> {
    if (this.loaded) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const script = this.document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.loaded = true;
        resolve();
      };

      script.onerror = reject;

      this.document.head.appendChild(script);
    });
  }
}
