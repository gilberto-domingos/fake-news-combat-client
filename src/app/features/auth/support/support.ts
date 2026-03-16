import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-support',
  imports: [MatToolbarModule, MatCardModule, MatButtonModule],
  templateUrl: './support.html',
  styleUrl: './support.scss',
})
export class Support {}
