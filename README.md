# Delimenu × Maison: ejemplo de menú con la API de Delimenu

Un menú de restaurante hecho con **Next.js** que lee sus datos de la
[API pública de Delimenu](https://delimenu.co/developers). El diseño replica la
plantilla [Maison](https://maisonmenu.framer.website/menu): dos columnas, grid de
platos, pills de categoría y wordmark gigante. El contenido es el del menú de
demostración de Delimenu, [Delicias Urbanas](https://delimenu.co/demo).

## Cómo funciona

Toda la integración está en [`lib/delimenu.ts`](lib/delimenu.ts). Es un único `fetch`:

```ts
const res = await fetch('https://delimenu.co/api/v1/menus/demo', {
  next: { revalidate: 300 },
})
const { restaurant, categories } = await res.json()
```

- **No hace falta API key.** Leer el menú publicado de un restaurante con plan
  activo es público. La key (`dmk_…`) solo se necesita para los endpoints que
  editan el menú o leen productos ocultos, y siempre desde el servidor, nunca en
  el navegador.
- **Los precios vienen en unidades mayores** de la moneda del restaurante
  (`6.25` = US$6.25, `12500` = COP $12.500), nunca en centavos.
- **Los productos ocultos ya vienen filtrados**, y las categorías llegan en el
  orden que definió el dueño.
- **Errores.** La API responde `404 NOT_FOUND` si el identificador no existe y
  `403 RESTAURANT_UNAVAILABLE` si el restaurante no tiene plan. La página muestra
  un estado de "menú no disponible" en ambos casos.
- **Caché.** La página se regenera como máximo cada 5 minutos (ISR), así que un
  cambio en el dashboard de Delimenu tarda hasta 5 minutos en verse aquí.
- **Imágenes.** Delimenu ya las sirve redimensionadas (1080×1080 las de
  producto, 512×512 el logo), por eso `next.config.ts` desactiva la Image
  Optimization de Next.

## Correrlo

```bash
pnpm install
pnpm dev
```

Abre http://localhost:3000/menu.

## Usar otro menú

Copia `.env.example` a `.env.local` y cambia `DELIMENU_MENU` por el identificador
del restaurante (el slug de `delimenu.co/<identificador>`).

## Estructura

| Archivo | Qué hace |
|---|---|
| `lib/delimenu.ts` | Tipos de la respuesta, `fetchMenu`, formato de precios y link de WhatsApp |
| `app/menu/page.tsx` | Página (server component): pide el menú y arma el layout |
| `components/Sidebar.tsx` | Columna izquierda: logo, navegación, CTA, favoritos y wordmark |
| `components/MenuBrowser.tsx` | Pills de categoría (`?categoria=`) y grid de productos |
| `components/ProductCard.tsx` | Tarjeta: foto, nombre, precio o promo; la descripción aparece al hacer hover |
| `components/Wordmark.tsx` | Nombre del restaurante ajustado al ancho de la columna (fit-text) |
| `components/ScrollPane.tsx` | Columna derecha con scroll propio y barra de progreso |

## Créditos

El diseño está basado en la plantilla de Framer "Maison". Las fotos, textos y
marca que se ven son los del menú de demostración de Delimenu. De la plantilla
no se usa ningún asset.
