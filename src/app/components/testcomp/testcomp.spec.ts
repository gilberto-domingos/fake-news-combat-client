import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testcomp } from './testcomp';

describe('Testcomp', () => {
  let component: Testcomp;
  let fixture: ComponentFixture<Testcomp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testcomp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testcomp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
