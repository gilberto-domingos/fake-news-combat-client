import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecaptchaService {
  private platformId = inject(PLATFORM_ID);

  private get grecaptcha() {
    if (!isPlatformBrowser(this.platformId)) {
      throw new Error('reCAPTCHA cannot run on the server');
    }

    if (!window.grecaptcha) {
      throw new Error('reCAPTCHA not loaded');
    }

    return window.grecaptcha;
  }

  render(
    container: HTMLElement,
    siteKey: string,
    callbacks: {
      success: (token: string) => void;
      expired: () => void;
      error: () => void;
    },
  ): number {
    return this.grecaptcha.render(container, {
      sitekey: siteKey,
      callback: callbacks.success,
      'expired-callback': callbacks.expired,
      'error-callback': callbacks.error,
    });
  }

  reset(widgetId?: number): void {
    this.grecaptcha.reset(widgetId);
  }

  getResponse(widgetId?: number): string | null {
    const response = this.grecaptcha.getResponse(widgetId);
    return response || null;
  }
}
