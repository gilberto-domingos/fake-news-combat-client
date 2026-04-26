import { TestBed } from '@angular/core/testing';

import { HealthzService } from './healthz-service';

describe('HealthzService', () => {
  let service: HealthzService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
