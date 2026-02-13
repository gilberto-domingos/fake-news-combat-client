import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  isImage?: boolean;
  title?: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
