# Guia da Paginacao

Para o detalhamento especifico do filtro por categoria, veja [filter-guide.md](/C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/docs/filter-guide.md).

Este documento explica como a rota `/ofertas` combina paginacao e filtro por categoria.

## Objetivo

Exibir os produtos em blocos de 6 itens por pagina, mantendo a URL compartilhavel e permitindo filtrar a listagem por categoria.

Exemplos:

- `/ofertas`
- `/ofertas?page=2`
- `/ofertas?category=electronics`
- `/ofertas?category=electronics&page=2`
- `/ofertas?category=qualquer-coisa`

## Arquivos envolvidos

- `src/app/ofertas/page.tsx`
- `src/lib/api.ts`
- `src/app/api/products/route.ts`
- `src/components/CategoryFilter.tsx`
- `src/components/Pagination.tsx`
- `src/types/product.ts`
- `src/utils/parsePage.ts`
- `src/utils/parseCategory.ts`
- `src/utils/createOffersHref.ts`
- `src/db/product.json`

## Visao geral

O fluxo foi dividido em seis partes:

1. a pagina le a query string
2. `parsePage` valida a pagina
3. `parseCategory` valida a categoria
4. `api.ts` consome a rota interna
5. a rota interna filtra e pagina os produtos
6. `CategoryFilter` e `Pagination` renderizam os links

## 1. Leitura da URL

Em `src/app/ofertas/page.tsx`, a pagina recebe `searchParams` com:

- `page`
- `category`

`page` passa por `src/utils/parsePage.ts`, que garante um inteiro maior ou igual a `1`.

`category` e encaminhada para a rota interna, onde `src/utils/parseCategory.ts` aceita apenas categorias validas do dominio.

## 2. Consumo da rota interna

Depois da validacao, a pagina chama:

```ts
await getProductCards(requestedPage, requestedCategory)
```

Essa funcao fica em `src/lib/api.ts`.

Ela:

- monta a URL base da aplicacao
- chama `/api/products`
- envia `page`
- envia `category` quando houver filtro ativo
- transforma o retorno da API no formato usado pela UI

O retorno final para a pagina e:

```ts
{
  products,
  currentPage,
  totalPages,
  availableCategories,
  hasInvalidCategory,
  selectedCategory
}
```

## 3. Filtro e paginacao na rota `/api/products`

Em `src/app/api/products/route.ts`, a rota:

- le os produtos de `src/db/product.json`
- reutiliza `parsePage`
- reutiliza `parseCategory`
- define `PRODUCTS_PER_PAGE = 6`
- detecta quando a categoria informada e invalida
- filtra os produtos por categoria
- calcula `totalItems`
- calcula `totalPages`
- limita a pagina atual a um valor seguro
- usa `slice` para devolver apenas os itens da pagina atual

A ordem da regra e importante:

1. validar categoria
2. detectar categoria invalida
3. filtrar os produtos
4. calcular total de paginas
5. aplicar a paginacao

Isso evita `totalPages` incorreto quando um filtro reduz a quantidade de itens e impede que categorias inexistentes caiam no fallback de lista completa.

## 4. Resposta da API

A rota retorna este formato:

```json
{
  "currentPage": 1,
  "totalPages": 1,
  "totalItems": 0,
  "availableCategories": [],
  "hasInvalidCategory": true,
  "selectedCategory": null,
  "data": []
}
```

Campos:

- `currentPage`: pagina atual valida
- `totalPages`: total de paginas disponiveis para o recorte atual
- `totalItems`: total de produtos apos aplicar o filtro
- `availableCategories`: categorias disponiveis para a interface
- `hasInvalidCategory`: indica se a categoria informada na URL nao existe
- `selectedCategory`: categoria ativa
- `data`: produtos da pagina atual

## 5. Renderizacao dos componentes de navegacao

`src/components/CategoryFilter.tsx` recebe:

- `categories`
- `hasInvalidCategory`
- `selectedCategory`

O componente:

- renderiza a opcao `Todas`
- renderiza uma opcao por categoria
- reseta a pagina ao trocar de categoria
- nao marca nenhuma categoria como ativa quando a query string e invalida

`src/components/Pagination.tsx` recebe:

- `currentPage`
- `totalPages`
- `selectedCategory`

Os links de filtro e paginacao usam `src/utils/createOffersHref.ts`.

Assim:

- a primeira pagina continua sem `?page=1`
- a categoria e preservada ao navegar entre paginas
- a troca de categoria volta para a primeira pagina

## 6. Por que essa abordagem

Essa implementacao foi escolhida porque:

- usa a URL como fonte de verdade do estado atual
- funciona bem com App Router e Server Components
- evita estado extra no client
- deixa a regra de filtro e paginacao na camada de dados
- mantem os componentes focados em renderizacao

## Como explicar na entrevista

Uma resposta curta:

`A listagem usa query string para pagina e categoria, entao a URL representa o estado atual. A pagina /ofertas le esses parametros, chama src/lib/api.ts e consome a rota interna /api/products. Essa rota le o banco mockado em src/db/product.json, detecta categoria invalida, aplica o filtro por categoria quando necessario, calcula a paginacao de 6 em 6 e devolve currentPage, totalPages, availableCategories, hasInvalidCategory e data. Os componentes CategoryFilter e Pagination so renderizam os links com base nesses metadados.`

## Possiveis evolucoes

- combinar categoria com filtro por marca
- adicionar estado visual de loading ao trocar de pagina
- adicionar tratamento visual de erro
- reduzir a quantidade de links se o total de paginas crescer muito
