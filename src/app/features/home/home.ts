import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PingService } from './ping-service';

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
export class Home implements OnInit {
  constructor(private pingService: PingService) {}

  ngOnInit(): void {
    const start = performance.now();
    // this.pingService.pingBackend().subscribe({
    //   next: () => {
    //     console.log('Backend Wake Up');
    //     const duration = performance.now() - start;
    //     console.log(`Time to wake up backend: ${duration} ms`);
    //   },
    //   error: () => {
    //     console.warn('Back-end not awake, Warning !');
    //     const duration = performance.now() - start;
    //     console.warn(`Error waking up backend after ${duration} ms`);
    //   },
    // });
  }
}
