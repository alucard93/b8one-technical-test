# Guia da Paginacao

Este documento explica como a paginacao da rota `/ofertas` foi implementada.

## Objetivo

Exibir os produtos em blocos de 6 itens por pagina, mantendo a navegacao simples e a URL compartilhavel.

Exemplos:

- `/ofertas`
- `/ofertas?page=2`
- `/ofertas?page=3`

## Arquivos envolvidos

- `src/app/ofertas/page.tsx`
- `src/lib/api.ts`
- `src/app/api/products/route.ts`
- `src/components/Pagination.tsx`
- `src/types/product.ts`
- `src/utils/parsePage.ts`
- `src/db/product.json`

## Visao geral

A paginacao foi dividida em cinco partes:

1. a pagina le a query string
2. `src/utils/parsePage.ts` valida o parametro
3. a camada `api.ts` consome a rota interna
4. a rota interna calcula a pagina atual e devolve os itens corretos
5. o componente `Pagination` renderiza os links

## 1. Leitura da pagina atual

Em `src/app/ofertas/page.tsx`, a pagina recebe `searchParams`.

O valor de `page` passa pela funcao compartilhada `parsePage`, em `src/utils/parsePage.ts`, que:

- converte o valor para numero
- garante que o numero seja inteiro
- impede valores menores que `1`

Se o parametro for invalido, a pagina volta para `1`.

Essa mesma funcao tambem e reutilizada em `src/app/api/products/route.ts`, evitando codigo duplicado entre a pagina e a API.

## 2. Consumo da rota interna

Depois de validar a pagina, `src/app/ofertas/page.tsx` chama:

```ts
await getProductCards(requestedPage)
```

Essa funcao fica em `src/lib/api.ts`.

Ela:

- monta a URL base da aplicacao
- chama `/api/products?page=n`
- usa `async/await`
- transforma o retorno da API no formato que a UI precisa

O retorno final para a pagina e:

```ts
{
  products,
  currentPage,
  totalPages
}
```

## 3. Paginacao na rota `/api/products`

Em `src/app/api/products/route.ts`, a rota:

- le os produtos de `src/db/product.json`
- reutiliza `parsePage` de `src/utils/parsePage.ts`
- define `PRODUCTS_PER_PAGE = 6`
- calcula `totalItems`
- calcula `totalPages`
- limita a pagina atual a um valor seguro
- usa `slice` para devolver apenas os itens da pagina atual

O calculo principal e:

```ts
const startIndex = (safeCurrentPage - 1) * PRODUCTS_PER_PAGE
const paginatedProducts = products.slice(
  startIndex,
  startIndex + PRODUCTS_PER_PAGE,
)
```

Exemplo com `6` produtos por pagina:

- pagina 1: indices `0` a `5`
- pagina 2: indices `6` a `11`
- pagina 3: indices `12` a `17`

## 4. Resposta da API

A rota retorna este formato:

```json
{
  "currentPage": 1,
  "totalPages": 4,
  "totalItems": 20,
  "data": []
}
```

Campos:

- `currentPage`: pagina atual valida
- `totalPages`: total de paginas disponiveis
- `totalItems`: total de produtos no banco mockado
- `data`: produtos da pagina atual

## 5. Renderizacao do componente `Pagination`

`src/components/Pagination.tsx` recebe:

- `currentPage`
- `totalPages`

Com base nisso, o componente:

- nao renderiza nada se houver apenas 1 pagina
- cria a lista de paginas com `Array.from`
- renderiza `Ant.`
- renderiza os numeros das paginas
- renderiza `Prox.`

Os links sao gerados por:

```ts
function createPageHref(page: number) {
  return page === 1 ? '/ofertas' : `/ofertas?page=${page}`
}
```

Isso evita `?page=1` na primeira pagina e deixa a URL mais limpa.

## 6. Comportamento no mobile

No mobile, a paginacao foi mantida em uma unica linha com controles menores:

- labels curtos: `Ant.` e `Prox.`
- botoes compactos
- sem scroll horizontal

Como o layout nao varia por breakpoint, o componente ficou mais simples.

## Tipos usados

Em `src/types/product.ts`, os tipos relacionados a paginacao sao:

- `PaginatedProductsResponse`
- `ProductCardsResult`

Eles separam:

- o formato retornado pela rota
- o formato consumido pela interface

## Por que essa abordagem

Essa implementacao foi escolhida porque:

- usa a URL como fonte de verdade da pagina atual
- funciona bem com App Router e Server Components
- evita estado extra no client
- deixa a regra de paginacao no lugar certo, que e a camada de dados
- mantem a UI focada em renderizacao

## Como explicar na entrevista

Uma resposta curta:

`A paginacao usa query string, entao a URL representa a pagina atual. A pagina /ofertas le o parametro page, chama a camada de acesso em src/lib/api.ts e consome a rota interna /api/products. Essa rota le o banco mockado em src/db/product.json, calcula o slice de 6 itens e devolve currentPage, totalPages e data. O componente Pagination so renderiza os links com base nesses metadados.`

## Possiveis evolucoes

- combinar paginacao com filtro por categoria
- adicionar estado visual de loading ao trocar de pagina
- adicionar tratamento visual de erro
- reduzir a quantidade de links se o total de paginas crescer muito
