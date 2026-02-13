import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-imgsgrid',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './imgsgrid.html',
  styleUrl: './imgsgrid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Imgsgrid {}
