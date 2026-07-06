import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/models';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <nav class="topbar">
      <a routerLink="/products">Productos</a>
      <a routerLink="/cart">Carrito</a>
      <a routerLink="/orders">Historial</a>
    </nav>

    <div class="page-content">
      <h2>Productos</h2>
      <input
        class="search"
        [(ngModel)]="search"
        (ngModelChange)="onSearchChange()"
        placeholder="Buscar por nombre o código"
      />

      <p *ngIf="loading" class="hint">Cargando...</p>
      <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
      <p *ngIf="addedMessage" class="success">{{ addedMessage }}</p>

      <div class="grid" *ngIf="!loading && products.length > 0">
        <div class="card" *ngFor="let product of products">
          <div class="card-header">
            <strong>{{ product.name }}</strong>
            <span class="tag">{{ product.category }}</span>
          </div>
          <p class="price">{{ product.price | currency }}</p>
          <p class="stock" [class.low]="product.stock === 0">
            {{ product.stock === 0 ? 'Sin stock' : 'Stock: ' + product.stock }}
          </p>
          <button (click)="addToCart(product)" [disabled]="product.stock === 0">
            Agregar al carrito
          </button>
        </div>
      </div>

      <p *ngIf="!loading && products.length === 0" class="hint">No se encontraron productos.</p>
    </div>
  `,
  styles: [`
    .search {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
      margin-bottom: 20px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 16px;
    }
    .card {
      background: white;
      border: 1px solid #eee;
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .card-header { display: flex; justify-content: space-between; align-items: start; gap: 8px; }
    .tag {
      font-size: 11px;
      background: #eef1ff;
      color: #4f6ef7;
      padding: 2px 8px;
      border-radius: 999px;
      white-space: nowrap;
    }
    .price { font-size: 18px; font-weight: 600; margin: 4px 0; }
    .stock { font-size: 13px; color: #666; }
    .stock.low { color: #c0392b; }
    button {
      margin-top: 8px;
      padding: 9px;
      border: none;
      border-radius: 8px;
      background: #4f6ef7;
      color: white;
      font-size: 14px;
      cursor: pointer;
    }
    button:disabled { opacity: 0.5; cursor: default; }
    button:hover:not(:disabled) { background: #3d5ce0; }
    .hint { color: #777; }
    .error { color: #c0392b; }
    .success { color: #1e8449; }
  `]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  search = '';
  loading = false;
  errorMessage = '';
  addedMessage = '';
  private messageTimeout?: ReturnType<typeof setTimeout>;

  constructor(private productsService: ProductsService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  onSearchChange(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productsService.getProducts(this.search, 1, 20).subscribe({
      next: result => {
        this.products = result.items;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar productos.';
        this.loading = false;
      }
    });
  }

  addToCart(product: Product): void {
    this.errorMessage = '';
    clearTimeout(this.messageTimeout);

    this.cartService.addItem(product.id, 1).subscribe({
      next: () => {
        this.addedMessage = `${product.name} agregado al carrito.`;
        this.messageTimeout = setTimeout(() => (this.addedMessage = ''), 3000);
      },
      error: err => {
        this.addedMessage = '';
        this.errorMessage = err.error?.message || 'Error al agregar al carrito.';
        this.messageTimeout = setTimeout(() => (this.errorMessage = ''), 3000);
      }
    });
  }
}