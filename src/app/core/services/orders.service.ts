import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../Environments/environment';
import { Order } from '../models/models';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  constructor(private http: HttpClient) {}

  checkout(): Observable<Order> {
    return this.http.post<Order>(`${environment.apiUrl}/orders`, {});
  }
}