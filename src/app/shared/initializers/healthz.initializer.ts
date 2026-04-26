import { inject, provideAppInitializer } from '@angular/core';
import { HealthzService } from '../../contexts/components/land/services/healthz-service';

export const healthzInitializer = provideAppInitializer(() => {
  const healthzService = inject(HealthzService);

  healthzService.healthzCheckIfNeeded().subscribe();
  return Promise.resolve();
});
