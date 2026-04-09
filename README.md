# b8one Technical Test

![Preview da página de ofertas](image.png)

Aplicação desenvolvida com `Next.js`, `React`, `TypeScript` e `Tailwind CSS` para entregar uma vitrine de ofertas com filtros e paginação usando `App Router`.

## Visão Geral

O projeto implementa a rota `/ofertas` com foco em uma estrutura simples, organizada e coerente com uma aplicação full-stack em `Next.js`.

Principais entregas:

- banner estático no topo
- título `Ofertas da Semana`
- vitrine de produtos em grid responsivo
- filtro por categoria via query string
- paginação de 6 itens por página
- rota interna `GET /api/products`
- tratamento para categoria inválida com mensagem visual

Os dados são mockados localmente em `src/db/product.json`.

## Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`

## Requisitos

- `Node.js 20+`
- `npm`

## Como Executar

### Instalação

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

### Produção

```bash
npm run build
npm run start
```

## Scripts Disponíveis

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
  Segunda página da listagem
- `/ofertas?category=electronics`
  Lista filtrada por categoria
- `/ofertas?category=electronics&page=2`
  Filtro e paginação combinados
- `/ofertas?category=qualquer-coisa`
  Categoria inválida retorna lista vazia e mensagem visual
- `/api/products`
  Endpoint interno com suporte a `page` e `category`

## Arquitetura e Fluxo

O projeto segue uma organização modular em camadas dentro do próprio `Next.js`:

1. a página `/ofertas` lê `searchParams.page` e `searchParams.category`
2. `parsePage` valida a página, e a rota interna usa `parseCategory` para interpretar a categoria
3. `src/lib/api.ts` consome a rota interna `/api/products`
4. `src/app/api/products/route.ts` lê o mock local, aplica filtro e paginação
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
  Página principal da vitrine
- `src/app/api/products/route.ts`
  Endpoint interno de produtos
- `src/components/CategoryFilter.tsx`
  Interface do filtro por categoria
- `src/components/Pagination.tsx`
  Navegação entre páginas
- `src/lib/api.ts`
  Camada de acesso aos dados
- `src/utils/parseCategory.ts`
  Validação de categoria
- `src/utils/createOffersHref.ts`
  Montagem compartilhada das URLs

## Documentação Complementar

- [objectives.md](/C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/docs/objectives.md)
- [filter-guide.md](/C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/docs/filter-guide.md)
- [pagination-guide.md](/C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/docs/pagination-guide.md)
