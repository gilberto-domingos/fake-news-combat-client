import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsAccess } from './analytics-access';

describe('AnalyticsAccess', () => {
  let component: AnalyticsAccess;
  let fixture: ComponentFixture<AnalyticsAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsAccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsAccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
