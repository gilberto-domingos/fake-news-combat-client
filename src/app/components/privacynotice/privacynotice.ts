import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-privacynotice',
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './privacynotice.html',
  styleUrl: './privacynotice.scss',
})
export class Privacynotice {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
