import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { SpinnerLoading } from './shared/spinner-loading/spinner-loading';
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
      next: (response) => {
        if (response?.status === 200) {
          console.log('Http Status:', response.status);
          console.log('Backend server successfully !');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.translocoService.setActiveLang(this.savedLanguage);
  }
}
