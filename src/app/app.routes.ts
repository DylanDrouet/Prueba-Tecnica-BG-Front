import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products.component').then(m => m.ProductsComponent),
    canActivate: [authGuard]
  },
  {
  path: 'cart',
  loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent),
  canActivate: [authGuard]
},
{
  path: 'orders',
  loadComponent: () => import('./features/orders/order-history.component').then(m => m.OrderHistoryComponent),
  canActivate: [authGuard]
},
{
  path: 'orders/:id',
  loadComponent: () => import('./features/orders/order-detail.component').then(m => m.OrderDetailComponent),
  canActivate: [authGuard]
}
];