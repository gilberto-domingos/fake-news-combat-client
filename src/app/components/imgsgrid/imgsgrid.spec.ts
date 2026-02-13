import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Imgsgrid } from './imgsgrid';

describe('Imgsgrid', () => {
  let component: Imgsgrid;
  let fixture: ComponentFixture<Imgsgrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Imgsgrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Imgsgrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
