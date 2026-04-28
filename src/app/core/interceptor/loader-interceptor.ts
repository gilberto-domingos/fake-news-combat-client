import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { ServiceLoader } from '../../shared/spinner-loading/service-loader';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(ServiceLoader);
  service.show();
  return next(req).pipe(finalize(() => service.Hide()));
};
