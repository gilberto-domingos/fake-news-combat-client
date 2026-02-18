import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-termsconditions',
  imports: [MatCardModule, MatButtonModule, MatDividerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './termsconditions.html',
  styleUrl: './termsconditions.scss',
})
export class Termsconditions {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
