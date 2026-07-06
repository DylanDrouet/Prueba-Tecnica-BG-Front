import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { OrderSummary } from '../../core/models/models';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="topbar">
      <a routerLink="/products">Productos</a>
      <a routerLink="/cart">Carrito</a>
      <a routerLink="/orders">Historial</a>
    </nav>

    <div class="page-content">
      <h2>Historial de compras</h2>

      <div class="row header" *ngIf="orders.length > 0">
        <span>Fecha</span>
        <span>Productos</span>
        <span>Total</span>
        <span></span>
      </div>

      <div class="row" *ngFor="let order of orders">
        <span>{{ order.createdAt | date: 'short' }}</span>
        <span>{{ order.itemCount }} productos</span>
        <span>{{ order.total | currency }}</span>
        <a [routerLink]="['/orders', order.id]">Ver detalle</a>
      </div>

      <p *ngIf="orders.length === 0" class="hint">Aún no tienes compras registradas.</p>
    </div>
  `,
  styles: [`
    .row {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr auto;
      align-items: center;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }
    .row.header { font-size: 12px; color: #888; border-bottom: 2px solid #ddd; }
    .row a { color: #4f6ef7; font-size: 13px; text-decoration: none; }
    .row a:hover { text-decoration: underline; }
    .hint { color: #777; }
  `]
})
export class OrderHistoryComponent implements OnInit {
  orders: OrderSummary[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.getHistory().subscribe(orders => (this.orders = orders));
  }
}