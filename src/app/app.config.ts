import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners,
  provideAppInitializer,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { errorInterceptor } from './core/error-interceptor-interceptor';
import { loaderInterceptor } from './core/loader-interceptor';
import { provideTransloco } from '@jsverse/transloco';
import { translocoConfig } from './core/i18n/transloco.config';
import { TranslocoLoaderService } from './core/i18n/transloco.loader.service';
import { firstValueFrom } from 'rxjs';
import { HealthzService } from './contexts/components/land/services/healthz-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    provideHttpClient(withFetch(), withInterceptors([errorInterceptor, loaderInterceptor])),

    provideTransloco({
      config: translocoConfig,
      loader: TranslocoLoaderService,
    }),

    provideAppInitializer(() => {
      const healthzService = inject(HealthzService);

      return firstValueFrom(healthzService.healthzCheckIfNeeded()).catch(() => undefined);
    }),
  ],
};
