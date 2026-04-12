import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { errorInterceptor } from './core/error-interceptor-interceptor';
import { loaderInterceptor } from './core/loader-interceptor';
import { healthzInitializer } from './shared/initializers/healthz.initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    healthzInitializer,
    provideHttpClient(withFetch(), withInterceptors([errorInterceptor, loaderInterceptor])),
  ],
};
