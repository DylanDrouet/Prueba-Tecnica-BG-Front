# Carrito de Compras - Frontend

Aplicación Angular (standalone components) que consume la API del backend para ofrecer login, catálogo de productos, carrito de compras y checkout con historial de compras.

## Stack técnico

- Angular (standalone components, sin NgModules)
- TypeScript
- RxJS
- Angular Router con lazy loading por componente
- HttpClient con interceptor funcional para JWT

## Arquitectura

```
src/app/
├── core/
│   ├── services/         # AuthService, ProductsService, CartService, OrdersService
│   ├── guards/           # authGuard: protege rutas internas
│   ├── interceptors/     # authInterceptor: agrega el JWT a cada petición
│   └── models/           # Interfaces TypeScript (reflejan los DTOs del backend)
├── features/
│   ├── auth/             # Pantalla de login
│   ├── products/          # Listado y búsqueda de productos
│   ├── cart/              # Carrito con cantidades, subtotal, descuento
│   └── orders/            # Historial y detalle de compras
└── shared/                # (reservado para componentes reutilizables)
```

## Requisitos previos

- [Node.js](https://nodejs.org/) (LTS recomendado)
- [Angular CLI](https://angular.dev/tools/cli) instalado globalmente:
  ```bash
  npm install -g @angular/cli
  ```
- El backend corriendo localmente (ver README del backend) — por defecto se espera en `http://localhost:5028`

## Configuración

Antes de ejecutar, verifica que la URL del backend en `src/environments/environment.ts` coincida con el puerto real en que corre tu API:

```typescript
export const environment = {
  apiUrl: 'http://localhost:5028/api'
};
```

## Instalación y ejecución

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd carrito-compras-front

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
ng serve
```

La aplicación queda disponible en:

```
http://localhost:4200
```

> Importante: el backend debe estar corriendo en paralelo para que el login y el resto de funcionalidades trabajen correctamente.

## Usuarios de prueba

Usa las mismas credenciales sembradas en el backend:

| Usuario | Contraseña | Rol |
|---|---|---|
| `admin` | `Admin123!` | Admin |
| `cliente1` | `Cliente123!` | Customer |

## Flujo funcional

1. **Login** (`/login`) — autenticación contra el backend, guarda el JWT en `localStorage`.
2. **Productos** (`/products`) — listado con búsqueda por nombre/código, muestra stock disponible.
3. **Carrito** (`/cart`) — permite modificar cantidades, eliminar items, ver subtotal/descuento/total, y finalizar la compra.
4. **Historial** (`/orders`) — lista de compras pasadas; cada una enlaza a su detalle (`/orders/:id`) con el desglose completo de productos comprados.

Las rutas `/products`, `/cart` y `/orders` están protegidas por un guard: si no hay un token válido, redirige automáticamente a `/login`.

## Decisiones técnicas relevantes

- **Standalone components** (sin `NgModule`) siguiendo el enfoque recomendado actual de Angular, con lazy loading por ruta vía `loadComponent`.
- **Interceptor funcional** (`authInterceptor`) que agrega automáticamente el header `Authorization: Bearer {token}` a toda petición saliente, sin que cada servicio tenga que hacerlo manualmente.
- **Guard funcional** (`authGuard`) que protege las rutas internas verificando la presencia de un token antes de activar la navegación.
- **Servicios por recurso** (`ProductsService`, `CartService`, `OrdersService`), cada uno responsable solo de las llamadas HTTP a su parte de la API — sin lógica de negocio duplicada del backend en el frontend.
- **Sin SSR (Server-Side Rendering)**: se desactivó explícitamente, ya que no aporta valor para el alcance de esta prueba técnica y simplifica el proyecto.

## Notas

- El backend debe tener CORS habilitado para el origen `http://localhost:4200` (ya configurado del lado del backend).
- Si cambias el puerto en que corre el backend, recuerda actualizar `apiUrl` en `environment.ts`.
