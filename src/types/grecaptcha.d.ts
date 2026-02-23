declare global {
  interface Window {
    grecaptcha: Grecaptcha;
  }

  interface Grecaptcha {
    render(
      container: string | HTMLElement,
      parameters: {
        sitekey: string;
        callback?: (token: string) => void;
        'expired-callback'?: () => void;
        'error-callback'?: () => void;
      },
    ): number;

    reset(widgetId?: number): void;
    getResponse(widgetId?: number): string;
  }
}

export {};
