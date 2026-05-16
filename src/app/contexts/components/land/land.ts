import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { TranslocoService } from '@jsverse/transloco';
import { InvestService } from '../invest/invest-service';

@Component({
  selector: 'app-land',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    CommonModule,
    FormsModule,
    TranslocoDirective,
  ],
  templateUrl: './land.html',
  styleUrl: './land.scss',
})
export class Land implements OnInit {
  active: string = 'en';
  title: string = '';
  currentLang: string = '';

  private translocoService = inject(TranslocoService);
  private investService = inject(InvestService);

  isLoading = true;

  setLang(lang: string): void {
    this.translocoService.setActiveLang(lang);
    localStorage.setItem('lang', lang);
  }

  getLang(): string {
    return (this.currentLang = this.translocoService.getActiveLang());
  }

  ngOnInit(): void {
    this.getLang();
  }

  openInvestDialog(): void {
    this.investService
      .open()
      .afterClosed()
      .subscribe((result) => {
        if (!result) {
          return;
        }
      });
  }
}
