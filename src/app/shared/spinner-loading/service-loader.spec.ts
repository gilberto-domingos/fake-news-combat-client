import { TestBed } from '@angular/core/testing';

import { ServiceLoader } from './service-loader';

describe('ServiceLoader', () => {
  let service: ServiceLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
