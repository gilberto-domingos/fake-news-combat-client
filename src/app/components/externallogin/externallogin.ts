import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-externallogin',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './externallogin.html',
  styleUrl: './externallogin.scss',
})
export class Externallogin {
  phoneControl = new FormControl('', [Validators.required]);

  submit() {
    if (this.phoneControl.invalid) return;

    console.log('Salvar telefone', this.phoneControl.value);
    // chamar backend → /auth/complete-profile
  }
}
