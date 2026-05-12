import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpinnerLoading } from './shared/spinner-loading/spinner-loading';
import { Navbar } from './shared/ui/navbar/navbar';
import { Footer } from './shared/ui/footer/footer';
import { TranslocoService } from '@jsverse/transloco';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, FontAwesomeModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('Fake News Combat');

  private translocoService = inject(TranslocoService);
  savedLanguage: string = localStorage.getItem('lang') || 'en';

  ngOnInit() {
    this.translocoService.setActiveLang(this.savedLanguage);
    console.log('PANSSANDO NO APP', this.savedLanguage);
  }
}
