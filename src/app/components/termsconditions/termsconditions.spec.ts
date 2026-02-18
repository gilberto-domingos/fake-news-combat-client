import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Termsconditions } from './termsconditions';

describe('Termsconditions', () => {
  let component: Termsconditions;
  let fixture: ComponentFixture<Termsconditions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Termsconditions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Termsconditions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
