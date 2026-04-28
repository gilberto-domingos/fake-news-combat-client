import { TranslocoConfig } from '@jsverse/transloco';

export const translocoConfig: TranslocoConfig = {
  availableLangs: ['en', 'fr', 'es', 'pt'],
  defaultLang: 'en',
  fallbackLang: 'en',
  reRenderOnLangChange: true,
  prodMode: false,
  failedRetries: 1,
  flatten: {
    aot: false,
  },
  missingHandler: {
    logMissingKey: false,
    useFallbackTranslation: true,
    allowEmpty: true,
  },
  interpolation: ['{{', '}}'],
  scopes: {},
};
