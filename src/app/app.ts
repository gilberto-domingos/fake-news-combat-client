import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpinnerLoading } from './shared/spinner-loading/spinner-loading';
import { Navbar } from './shared/ui/navbar/navbar';
import { Footer } from './shared/ui/footer/footer';
import { TranslocoService } from '@jsverse/transloco';
import { HealthzService } from './contexts/components/land/services/healthz-service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, FontAwesomeModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('Fake News Combat');

  private healthzService = inject(HealthzService);
  private translocoService = inject(TranslocoService);
  savedLanguage: string = localStorage.getItem('lang') || 'en';

  ngOnInit(): void {
    const start = performance.now();

    this.healthzService.checkHealthz().subscribe({
      next: () => {
        console.log('Healthz backend :');
        const duration = performance.now() - start;
        console.log(`Time to check healthz OK :', ${duration}ms`);
      },
      error: () => {
        console.warn('Check healthz backend is no wakeup, Warning !');
        const duration = performance.now() - start;
        console.warn(`Error check healthz backend after ${duration} ms`);
      },
    });

    this.translocoService.setActiveLang(this.savedLanguage);
  }
}
