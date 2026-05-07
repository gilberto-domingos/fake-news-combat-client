import { TestBed } from '@angular/core/testing';

import { InvestApiService } from './invest-api-service';

describe('InvestApiService', () => {
  let service: InvestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
