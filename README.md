# b8one Technical Test

![Preview da pagina de ofertas](image.png)

Aplicacao desenvolvida com `Next.js`, `React`, `TypeScript` e `Tailwind CSS` para entregar uma vitrine de ofertas com filtros e paginacao usando `App Router`.

## Visao Geral

O projeto implementa a rota `/ofertas` com foco em uma estrutura simples, organizada e coerente com uma aplicacao full-stack em `Next.js`.

Principais entregas:

- banner estatico no topo
- titulo `Ofertas da Semana`
- vitrine de produtos em grid responsivo
- filtro por categoria via query string
- paginacao de 6 itens por pagina
- rota interna `GET /api/products`
- tratamento para categoria invalida com mensagem visual

Os dados sao mockados localmente em `src/db/product.json`.

## Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`

## Requisitos

- `Node.js 20+`
- `npm`

## Como Executar

### Instalacao

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra no navegador:

- `http://localhost:3000`
- `http://localhost:3000/ofertas`

### Producao

```bash
npm run build
npm run start
```

## Scripts Disponiveis

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Rotas e Exemplos

- `/ofertas`
  Lista principal de produtos
- `/ofertas?page=2`
  Segunda pagina da listagem
- `/ofertas?category=electronics`
  Lista filtrada por categoria
- `/ofertas?category=electronics&page=2`
  Filtro e paginacao combinados
- `/ofertas?category=qualquer-coisa`
  Categoria invalida retorna lista vazia e mensagem visual
- `/api/products`
  Endpoint interno com suporte a `page` e `category`

## Arquitetura e Fluxo

O projeto segue uma organizacao modular em camadas dentro do proprio `Next.js`:

1. a pagina `/ofertas` le `searchParams.page` e `searchParams.category`
2. `parsePage` valida a pagina, e a rota interna usa `parseCategory` para interpretar a categoria
3. `src/lib/api.ts` consome a rota interna `/api/products`
4. `src/app/api/products/route.ts` le o mock local, aplica filtro e paginacao
5. a UI renderiza com `CategoryFilter`, `ProductGrid`, `ProductCard` e `Pagination`

## Estrutura do Projeto

```txt
src/
  app/
    api/products/route.ts
    ofertas/page.tsx
  components/
    CategoryFilter.tsx
    HeroBanner.tsx
    Pagination.tsx
    ProductCard.tsx
    ProductGrid.tsx
  db/
    product.json
  lib/
    api.ts
  types/
    product.ts
  utils/
    createOffersHref.ts
    parseCategory.ts
    parsePage.ts
```

Arquivos principais:

- `src/app/ofertas/page.tsx`
  Pagina principal da vitrine
- `src/app/api/products/route.ts`
  Endpoint interno de produtos
- `src/components/CategoryFilter.tsx`
  Interface do filtro por categoria
- `src/components/Pagination.tsx`
  Navegacao entre paginas
- `src/lib/api.ts`
  Camada de acesso aos dados
- `src/utils/parseCategory.ts`
  Validacao de categoria
- `src/utils/createOffersHref.ts`
  Montagem compartilhada das URLs

## Documentacao Complementar

- [objectives.md](/C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/docs/objectives.md)
- [filter-guide.md](/C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/docs/filter-guide.md)
- [pagination-guide.md](/C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/docs/pagination-guide.md)
