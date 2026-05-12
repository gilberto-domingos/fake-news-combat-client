import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    LayoutModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TranslocoDirective,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  isMobile = false;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }

  currentLang: string = '';
  activeLocalStorage: string = localStorage.getItem('lang') || 'en';
  private translocoService = inject(TranslocoService);

  getLang(): string {
    this.currentLang = this.translocoService.getActiveLang();
    return this.currentLang;
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToSignin() {
    this.router.navigate(['/signin']);
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  goToContact() {
    this.router.navigate(['/contact']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToShare() {
    const message = 'Sistema de combate a fake news ! Usem e divulguem : ';
    const url = window.location.href;
    const text = encodeURIComponent(message + url);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }

  ngOnInit() {
    this.getLang();
  }
}
