import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { Order } from '../../core/models/models';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="topbar">
      <a routerLink="/products">Productos</a>
      <a routerLink="/cart">Carrito</a>
      <a routerLink="/orders">Historial</a>
    </nav>

    <div class="page-content" *ngIf="order">
      <h2>Detalle de la orden #{{ order.id }}</h2>
      <p class="date">{{ order.createdAt | date: 'medium' }}</p>

      <div class="row header">
        <span>Producto</span>
        <span>Cantidad</span>
        <span>Precio</span>
        <span>Subtotal</span>
      </div>

      <div class="row" *ngFor="let item of order.items">
        <span>{{ item.productName }}</span>
        <span>{{ item.quantity }}</span>
        <span>{{ item.unitPrice | currency }}</span>
        <span>{{ item.subtotal | currency }}</span>
      </div>

      <div class="totals">
        <p>Subtotal: {{ order.subtotal | currency }}</p>
        <p *ngIf="order.discountAmount > 0" class="discount">
          Descuento: -{{ order.discountAmount | currency }}
        </p>
        <p class="total">Total: {{ order.total | currency }}</p>
      </div>
    </div>
  `,
  styles: [`
    .date { color: #777; margin-top: -8px; margin-bottom: 20px; }
    .row {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }
    .row.header { font-size: 12px; color: #888; border-bottom: 2px solid #ddd; }
    .totals { text-align: right; margin-top: 20px; }
    .totals p { margin: 4px 0; color: #555; }
    .discount { color: #1e8449; }
    .total { font-size: 18px; font-weight: 600; color: #1a1a1a; }
  `]
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;

  constructor(private route: ActivatedRoute, private ordersService: OrdersService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ordersService.getDetail(id).subscribe(order => (this.order = order));
  }
}