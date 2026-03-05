# React + TypeScript + Vite


# Frontend — Challenge

## Requisitos
- **npm** >= 10

---

# Configuración inicial

1. Clonar el proyecto del **frontend**.
2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` en la raíz del proyecto y configurar:

```env
VITE_API_URL=http://localhost:3000
```

> El frontend utiliza:
>
> - **VITE_API_URL** para peticiones HTTP a la API

---

# Cómo ejecutar el proyecto

## Desarrollo

```bash
npm run dev
```

Luego abrir el navegador en:

```
http://localhost:5173
```

(o el puerto que indique **Vite**)

### Navegación principal

El layout superior permite navegar entre las siguientes secciones:

| Ruta | Descripción |
|-----|-------------|
| `/products` | Catálogo de productos |
| `/products/new` | Crear nuevo producto |
| `/products/variants/new` | Crear variante de producto |

---

# Eventos de dominio implementados

El backend emite eventos de dominio y el frontend se suscribe a ellos utilizando **Server‑Sent Events (SSE)**.

Esto permite reflejar cambios en tiempo real sin recargar la página.

El endpoint SSE utilizado es:

```
/events
```

---

# 1. `product.created`

## Cuándo se emite

Cada vez que se crea un **nuevo producto**.

## Consumidores

### Servicio SSE

Publica el evento en `/events`.

### Frontend

La página **CatalogPage** está suscrita al stream SSE.

Cuando recibe `product.created`:

1. Ejecuta `refetch()`
2. Vuelve a pedir la lista de productos
3. Actualiza el catálogo automáticamente

# 2. `product.variation.created`

## Cuándo se emite

Cada vez que se crea una **variación de producto**.

# Cómo probar los eventos desde el frontend

# Probar `product.created`

1. Abrir el catálogo:

```
http://localhost:5173/products
```

2. Dejar esta pestaña abierta.

El catálogo queda suscrito al stream SSE.

3. En otra pestaña abrir:

```
http://localhost:5173/products/new
```

4. Completar el formulario y crear un producto.

5. Volver a la pestaña de catálogo.

Resultado esperado:

- El backend emite `product.created`
- El frontend recibe el evento
- Se ejecuta `refetch()`
- El nuevo producto aparece **sin recargar la página**

---

# Probar `product.variation.created` + inventario

1. Mantener abierta la pestaña de catálogo:

```
http://localhost:5173/products
```

2. En el catálogo cambiar el toggle superior a:

```
Inventario
```

3. Abrir en otra pestaña:

```
http://localhost:5173/products/variants/new
```

4. Crear una variante utilizando:

- `productId` existente
- `sizeCode`
- `colorName`
- `imageUrls` (separadas por coma)

5. Enviar el formulario.

Resultado esperado:

- Backend emite `product.variation.created`
- Frontend recibe el evento
- Se ejecuta `refetch()` del inventario
- Aparece un nuevo registro en la vista **Inventario**

Campos visibles:

- `productVariationId`
- `countryCode`
- `quantity`