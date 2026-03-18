import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderCaptcha } from './render-captcha';

describe('RenderCaptcha', () => {
  let component: RenderCaptcha;
  let fixture: ComponentFixture<RenderCaptcha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenderCaptcha]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderCaptcha);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
