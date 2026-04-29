import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpinnerLoading } from './shared/spinner-loading/spinner-loading';
import { Navbar } from './shared/ui/navbar/navbar';
import { LanguageStorageService } from './core/i18n/language.storage.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, FontAwesomeModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('Fake News Combat');

  private langStorService = inject(LanguageStorageService);

  ngOnInit() {
    this.langStorService.clearLang();
    this.langStorService.initLang();
  }
}
