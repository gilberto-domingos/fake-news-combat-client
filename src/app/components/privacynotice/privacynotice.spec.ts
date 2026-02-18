import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Privacynotice } from './privacynotice';

describe('Privacynotice', () => {
  let component: Privacynotice;
  let fixture: ComponentFixture<Privacynotice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Privacynotice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Privacynotice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
