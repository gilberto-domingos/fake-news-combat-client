import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerLoading } from './spinner-loading';

describe('SpinnerLoading', () => {
  let component: SpinnerLoading;
  let fixture: ComponentFixture<SpinnerLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerLoading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerLoading);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
