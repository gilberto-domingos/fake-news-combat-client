import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  chartData = [
    { investment: 35, loss: 40, profit: 30, maintenance: 0 },
    { investment: 125, loss: 15, profit: 145, maintenance: 0 },
    { investment: 35, loss: 15, profit: 35, maintenance: 75 },
    { investment: 35, loss: 35, profit: 35, maintenance: 0 },
    { investment: 35, loss: 65, profit: 20, maintenance: 0 },
    { investment: 80, loss: 40, profit: 105, maintenance: 115 },
    { investment: 35, loss: 80, profit: 100, maintenance: 0 },
    { investment: 20, loss: 25, profit: 10, maintenance: 0 },
    { investment: 35, loss: 15, profit: 65, maintenance: 0 },
    { investment: 45, loss: 85, profit: 45, maintenance: 0 },
    { investment: 15, loss: 25, profit: 30, maintenance: 150 },
    { investment: 75, loss: 80, profit: 5, maintenance: 0 },
  ];

  stocks = [
    {
      name: 'Bajaj Finery',
      status: '10% Profit',
      price: '$1839.00',
      up: true,
    },
    {
      name: 'TTML',
      status: '10% Loss',
      price: '$100.00',
      up: false,
    },
    {
      name: 'Reliance',
      status: '10% Profit',
      price: '$200.00',
      up: true,
    },
    {
      name: 'ATGL',
      status: '10% Loss',
      price: '$189.00',
      up: false,
    },
    {
      name: 'Stolon',
      status: '10% Profit',
      price: '$210.00',
      up: true,
    },
  ];

  $index: any;

  getTotalHeight(item: any): number {
    return item.investment + item.loss + item.profit + item.maintenance;
  }
}
