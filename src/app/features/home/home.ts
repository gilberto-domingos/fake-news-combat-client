import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HealthzService } from './healthz-service';

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
  standalone: true,
})
export class Home implements OnInit {
  isLoading = true;

  constructor(private healthzService: HealthzService) {}

  ngOnInit(): void {
    const start = performance.now();

    this.healthzService.checkHealthz().subscribe({
      next: () => {
        console.log('Healthz backend :');
        const duration = performance.now() - start;
        console.log(`Time to check healthz OK :', ${duration}ms`);
      },
      error: () => {
        console.warn('Check healthz backend is no wakeup, Warning !');
        const duration = performance.now() - start;
        console.warn(`Error check healthz backend after ${duration} ms`);
      },
    });
  }
}
