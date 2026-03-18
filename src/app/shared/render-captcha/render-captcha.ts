import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';

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
})
export class RenderCaptcha implements AfterViewInit {
  private loader = inject(RecaptchaLoaderService);
  private recaptchaService = inject(RecaptchaService);

  @ViewChild('captchaContainer') captchaRef!: ElementRef<HTMLDivElement>;

  siteKey = environment.recaptchaSiteKey;
  widgetId?: number;
  captchaToken: string = '';

  @Output() resolved = new EventEmitter<string>();

  ngAfterViewInit(): void {
    this.loader.load().then(() => {
      setTimeout(() => this.renderCaptcha(), 0);
    });
  }

  renderCaptcha() {
    if (!this.captchaRef) return;

    this.widgetId = this.recaptchaService.render(this.captchaRef.nativeElement, this.siteKey, {
      success: (token: string) => this.onCaptchaResolved(token),
      expired: () => (this.captchaToken = ''),
      error: () => console.error('Erro no CAPTCHA'),
    });
  }

  onCaptchaResolved(token: string | null) {
    this.captchaToken = token || '';
    console.log('Captcha resolvido:', this.captchaToken);
  }
}

///////////// For other components /////////////

//imports: [CommonModule, RecaptchaComponent],

// <form (ngSubmit)="submit()">
//   <!-- outros campos do form -->

//   <app-recaptcha (resolved)="onCaptchaResolved($event)"></app-recaptcha>

//   <button type="submit">Enviar</button>
// </form>

// captchaToken: string = '';

// onCaptchaResolved(token: string) {
//   this.captchaToken = token;
// }

// submit() {
//   if (!this.captchaToken) {
//     console.warn('Captcha não resolvido!');
//     return;
//   }

//   console.log('Enviando formulário com token:', this.captchaToken);

// }
