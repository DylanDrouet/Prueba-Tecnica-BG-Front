import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order, OrderSummary } from '../models/models';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  constructor(private http: HttpClient) {}

  checkout(): Observable<Order> {
    return this.http.post<Order>(`${environment.apiUrl}/orders`, {});
  }

  getHistory(): Observable<OrderSummary[]> {
    return this.http.get<OrderSummary[]>(`${environment.apiUrl}/orders`);
  }

  getDetail(id: number): Observable<Order> {
    return this.http.get<Order>(`${environment.apiUrl}/orders/${id}`);
  }
}