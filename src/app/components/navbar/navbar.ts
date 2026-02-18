import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LayoutModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  isMobile = false;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goSigin() {
    this.router.navigate(['/sigin']);
  }

  goSignUp() {
    this.router.navigate(['/signup']);
  }

  goContact() {
    this.router.navigate(['/contact']);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  goShare() {
    console.log('Compartilhar...');
  }
}
