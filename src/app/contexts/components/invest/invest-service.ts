import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Invest } from './invest';

@Injectable({
  providedIn: 'root',
})
export class InvestService {
  private dialog = inject(MatDialog);

  open() {
    return this.dialog.open(Invest, { panelClass: 'invest-dialog-panel' });
  }
}
