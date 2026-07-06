import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../Environments/environment';
import { Cart } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient) {}

  addItem(productId: number, quantity: number): Observable<Cart> {
    return this.http.post<Cart>(`${environment.apiUrl}/cart/items`, { productId, quantity });
  }
}