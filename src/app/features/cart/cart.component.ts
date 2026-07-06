import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrdersService } from '../../core/services/orders.service';
import { Cart } from '../../core/models/models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="topbar">
      <a routerLink="/products">Productos</a>
      <a routerLink="/cart">Carrito</a>
      <a routerLink="/orders">Historial</a>
    </nav>

    <div class="page-content">
      <h2>Carrito</h2>
      <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>

      <div *ngIf="cart && cart.items.length > 0">
        <div class="row header">
          <span>Producto</span>
          <span>Cantidad</span>
          <span>Precio</span>
          <span>Subtotal</span>
          <span></span>
        </div>

        <div class="row" *ngFor="let item of cart.items">
          <span>{{ item.productName }}</span>
          <input
            type="number"
            min="1"
            [max]="item.availableStock"
            [value]="item.quantity"
            (change)="updateQuantity(item.productId, $event)"
          />
          <span>{{ item.unitPrice | currency }}</span>
          <span>{{ item.subtotal | currency }}</span>
          <button class="link" (click)="removeItem(item.productId)">Quitar</button>
        </div>

        <div class="totals">
          <p>Subtotal: {{ cart.subtotal | currency }}</p>
          <p *ngIf="cart.discountAmount > 0" class="discount">
            Descuento (10%): -{{ cart.discountAmount | currency }}
          </p>
          <p class="total">Total: {{ cart.total | currency }}</p>
        </div>

        <button class="checkout" (click)="checkout()" [disabled]="checkingOut">
          {{ checkingOut ? 'Procesando...' : 'Finalizar compra' }}
        </button>
      </div>

      <p *ngIf="cart && cart.items.length === 0" class="hint">Tu carrito está vacío.</p>
    </div>
  `,
  styles: [`
    .row {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr auto;
      align-items: center;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }
    .row.header { font-size: 12px; color: #888; border-bottom: 2px solid #ddd; }
    .row input {
      width: 60px;
      padding: 6px;
      border: 1px solid #ddd;
      border-radius: 6px;
    }
    .link {
      background: none;
      border: none;
      color: #c0392b;
      cursor: pointer;
      font-size: 13px;
      padding: 0;
    }
    .totals { text-align: right; margin: 20px 0; }
    .totals p { margin: 4px 0; color: #555; }
    .discount { color: #1e8449; }
    .total { font-size: 18px; font-weight: 600; color: #1a1a1a; }
    .checkout {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 8px;
      background: #4f6ef7;
      color: white;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }
    .checkout:disabled { opacity: 0.6; cursor: default; }
    .checkout:hover:not(:disabled) { background: #3d5ce0; }
    .hint { color: #777; }
    .error {
      padding: 10px;
      background: #fdecec;
      color: #c0392b;
      border-radius: 8px;
      font-size: 13px;
    }
  `]
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  errorMessage = '';
  checkingOut = false;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(cart => (this.cart = cart));
  }

  updateQuantity(productId: number, event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.errorMessage = '';

    this.cartService.updateItem(productId, value).subscribe({
      next: cart => (this.cart = cart),
      error: err => {
        this.errorMessage = err.error?.message || 'Error al actualizar cantidad.';
        this.loadCart();
      }
    });
  }

  removeItem(productId: number): void {
    this.cartService.removeItem(productId).subscribe(cart => (this.cart = cart));
  }

  checkout(): void {
    this.checkingOut = true;
    this.errorMessage = '';

    this.ordersService.checkout().subscribe({
      next: order => {
        this.router.navigate(['/orders', order.id]);
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Error al procesar la compra.';
        this.checkingOut = false;
      }
    });
  }
}