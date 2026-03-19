import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  ViewChild,
} from '@angular/core';

import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { environment } from 'environments/environment';
import { RecaptchaLoaderService } from '../../features/auth/recaptcha-loader-service';
import { RecaptchaService } from '../../features/auth/recaptcha-service';

@Component({
  selector: 'app-render-captcha',
  imports: [CommonModule],
  templateUrl: './render-captcha.html',
  styleUrls: ['./render-captcha.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RenderCaptcha),
      multi: true,
    },
  ],
})
export class RenderCaptcha implements AfterViewInit {
  isDisabled = false;
  private loader = inject(RecaptchaLoaderService);
  private recaptchaService = inject(RecaptchaService);

  @ViewChild('captchaContainer') captchaRef!: ElementRef<HTMLDivElement>;

  siteKey = environment.recaptchaSiteKey;
  widgetId?: number;
  captchaToken: string = '';

  private value: string = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngAfterViewInit(): void {
    this.loader.load().then(() => {
      setTimeout(() => this.renderCaptcha(), 0);
    });
  }

  renderCaptcha() {
    if (!this.captchaRef) return;

    this.widgetId = this.recaptchaService.render(this.captchaRef.nativeElement, this.siteKey, {
      success: (token: string) => this.handleSuccess(token),
      expired: () => this.handleExpired(),
      error: () => console.error('Erro no CAPTCHA'),
    });
  }

  private handleSuccess(token: string) {
    this.value = token;

    this.onChange(token);
    this.onTouched();

    console.log('Captcha OK (CVA):', token);
  }

  private handleExpired() {
    this.value = '';

    this.onChange('');

    console.warn('Captcha expirado');
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;

    if (this.widgetId !== undefined && window.grecaptcha) {
      if (isDisabled) {
        window.grecaptcha.reset(this.widgetId);
      }
    }
  }
}

///////////// For other components /////////////

// // imports: [CommonModule, ReactiveFormsModule, RenderCaptcha]

// form = this.fb.group({
//   captchaToken: this.fb.control('', Validators.required),
// });

// // <form [formGroup]="form" (ngSubmit)="submit()">

// //   <app-render-captcha formControlName="captchaToken"></app-render-captcha>

// //   <button type="submit">Enviar</button>
// // </form>

// submit() {
//   if (this.form.invalid) {
//     console.warn('Form inválido!');
//     return;
//   }

//   const { captchaToken } = this.form.getRawValue();

//   if (!captchaToken) {
//     console.warn('Captcha não resolvido!');
//     return;
//   }

//   console.log('Enviando formulário com token:', captchaToken);
// }
