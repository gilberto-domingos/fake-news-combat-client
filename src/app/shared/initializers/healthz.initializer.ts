import { inject, provideAppInitializer } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HealthzService } from '../../features/home/healthz-service';

export const healthzInitializer = provideAppInitializer(() => {
  const healthzService = inject(HealthzService);
  return firstValueFrom(healthzService.healthzCheckIfNeeded());
});
