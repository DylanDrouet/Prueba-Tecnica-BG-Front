import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <div class="card">
        <h2>Iniciar sesión</h2>
        <p class="subtitle">Ingresa tus credenciales para continuar</p>

        <form (ngSubmit)="onSubmit()">
          <label>Usuario</label>
          <input [(ngModel)]="username" name="username" placeholder="cliente1" />

          <label>Contraseña</label>
          <input [(ngModel)]="password" name="password" type="password" placeholder="••••••••" />

          <button type="submit" [disabled]="loading">
            {{ loading ? 'Ingresando...' : 'Ingresar' }}
          </button>
        </form>

        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>
  `,
  styles: [`
    .page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f6f8;
      font-family: system-ui, sans-serif;
    }
    .card {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      width: 100%;
      max-width: 340px;
    }
    h2 { margin: 0 0 4px; color: #1a1a1a; }
    .subtitle { margin: 0 0 24px; color: #777; font-size: 14px; }
    form { display: flex; flex-direction: column; gap: 6px; }
    label { font-size: 13px; color: #555; margin-top: 8px; }
    input {
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
    }
    input:focus { outline: none; border-color: #4f6ef7; }
    button {
      margin-top: 20px;
      padding: 11px;
      border: none;
      border-radius: 8px;
      background: #4f6ef7;
      color: white;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    button:disabled { opacity: 0.6; cursor: default; }
    button:hover:not(:disabled) { background: #3d5ce0; }
    .error {
      margin-top: 16px;
      padding: 10px;
      background: #fdecec;
      color: #c0392b;
      border-radius: 8px;
      font-size: 13px;
      text-align: center;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: () => {
        this.errorMessage = 'Usuario o contraseña incorrectos.';
        this.loading = false;
      }
    });
  }
}