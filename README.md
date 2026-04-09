# b8one Technical Test

![alt text](image.png)

Aplicacao desenvolvida com `Next.js`, `React`, `TypeScript` e `Tailwind CSS`.

O projeto implementa a rota `/ofertas` com:

- banner estatico no topo
- titulo `Ofertas da Semana`
- filtro por categoria via query string
- vitrine de produtos
- paginacao de 6 itens por pagina

Os dados sao mockados localmente em `src/db/product.json` e expostos por uma rota interna `GET /api/products`.

## Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`

## Requisitos

- `Node.js 20+`
- `npm`

## Instalacao

```bash
npm install
```

## Como rodar em desenvolvimento

```bash
npm run dev
```

Abra:

- `http://localhost:3000`
- `http://localhost:3000/ofertas`

## Rotas importantes

- `/ofertas`: pagina principal do desafio
- `/api/products`: rota interna com os produtos paginados
- `/api/products?page=2`: exemplo de segunda pagina
- `/ofertas?category=electronics`: exemplo com filtro por categoria
- `/ofertas?category=electronics&page=2`: exemplo combinando filtro e paginacao
- `/ofertas?category=qualquer-coisa`: categoria invalida retorna lista vazia e mensagem visual

## Scripts disponiveis

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Build de producao

```bash
npm run build
npm run start
```

## Estrutura resumida

- `src/app/ofertas/page.tsx`: pagina da vitrine
- `src/app/api/products/route.ts`: rota interna dos produtos
- `src/components/HeroBanner.tsx`: banner principal
- `src/components/CategoryFilter.tsx`: filtro de categorias
- `src/components/ProductGrid.tsx`: grid da vitrine
- `src/components/ProductCard.tsx`: card do produto
- `src/components/Pagination.tsx`: controles de paginacao
- `src/lib/api.ts`: camada de acesso aos dados
- `src/utils/parseCategory.ts`: validacao compartilhada da categoria
- `src/utils/parsePage.ts`: util compartilhado para validacao da pagina atual
- `src/utils/createOffersHref.ts`: montagem compartilhada das URLs de filtro e paginacao
- `src/db/product.json`: base mockada
- `src/types/product.ts`: tipagens de dominio

## Fluxo resumido

1. A pagina `/ofertas` le `searchParams.page` e `searchParams.category`.
2. `src/utils/parsePage.ts` valida a pagina, e `src/utils/parseCategory.ts` apoia a validacao da categoria na rota interna.
3. `src/lib/api.ts` consome a rota interna `/api/products`.
4. `src/app/api/products/route.ts` le `src/db/product.json`, distingue categoria valida, ausente ou invalida, aplica o filtro e depois a paginacao.
5. A pagina recebe os produtos, as categorias disponiveis e o status do filtro atual.
6. `CategoryFilter`, `ProductGrid`, `ProductCard` e `Pagination` renderizam a interface, incluindo a mensagem para categoria invalida.

## Documentacao

Os arquivos `.md` sao a referencia atual da documentacao.

- [objectives.md](/C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/docs/objectives.md)
- [filter-guide.md](/C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/docs/filter-guide.md)
- [pagination-guide.md](/C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/docs/pagination-guide.md)
