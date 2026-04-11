import { inject, provideAppInitializer } from '@angular/core';
import { HealthzService } from '../../features/home/healthz-service';

export const healthzInitializer = provideAppInitializer(() => {
  const healthzService = inject(HealthzService);

  healthzService.healthzCheckIfNeeded().subscribe();
  return Promise.resolve();
});
