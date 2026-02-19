import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Externallogin } from './externallogin';

describe('Externallogin', () => {
  let component: Externallogin;
  let fixture: ComponentFixture<Externallogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Externallogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Externallogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
