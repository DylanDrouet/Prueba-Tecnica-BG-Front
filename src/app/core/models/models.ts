export interface Product {
  id: number;
  code: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CartItem {
  productId: number;
  productName: string;
  productCode: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  availableStock: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  total: number;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: number;
  createdAt: string;
  subtotal: number;
  discountAmount: number;
  total: number;
  items: OrderItem[];
}

export interface OrderSummary {
  id: number;
  createdAt: string;
  total: number;
  itemCount: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: string;
  expiresAt: string;
}