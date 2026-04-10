# Guia da Paginação

Para o detalhamento específico do filtro por categoria, veja [filter-guide.md](/C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/docs/filter-guide.md).

Este documento explica como a rota `/ofertas` combina paginação e filtro por categoria.

## Objetivo

Exibir os produtos em blocos de 6 itens por página, mantendo a URL compartilhável e permitindo filtrar a listagem por categoria.

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
- `src/utils/createOffersHref.ts`
- `src/db/product.json`

## Visão geral

O fluxo foi dividido em seis partes:

1. a página lê a query string
2. `parsePage` valida a página
3. a rota valida a categoria
4. `api.ts` consome a rota interna
5. a rota interna filtra e pagina os produtos
6. `CategoryFilter` e `Pagination` renderizam os links

## 1. Leitura da URL

Em `src/app/ofertas/page.tsx`, a página recebe `searchParams` com:

- `page`
- `category`

`page` passa por `src/utils/parsePage.ts`, que garante um inteiro maior ou igual a `1`.

`category` é encaminhada para a rota interna, onde `src/app/api/products/route.ts` aceita apenas categorias válidas do domínio.

## 2. Consumo da rota interna

Depois da validação, a página chama:

```ts
await getProductCards(requestedPage, requestedCategory)
```

Essa função fica em `src/lib/api.ts`.

Ela:

- monta a URL base da aplicação
- chama `/api/products`
- envia `page`
- envia `category` quando houver filtro ativo
- transforma o retorno da API no formato usado pela UI

O retorno final para a página é:

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

## 3. Filtro e paginação na rota `/api/products`

Em `src/app/api/products/route.ts`, a rota:

- lê os produtos de `src/db/product.json`
- reutiliza `parsePage`
- valida `category` diretamente com `PRODUCT_CATEGORIES`
- define `PRODUCTS_PER_PAGE = 6`
- detecta quando a categoria informada é inválida
- filtra os produtos por categoria
- calcula `totalItems`
- calcula `totalPages`
- limita a página atual a um valor seguro
- usa `slice` para devolver apenas os itens da página atual

A ordem da regra é importante:

1. validar categoria
2. detectar categoria inválida
3. filtrar os produtos
4. calcular total de páginas
5. aplicar a paginação

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

- `currentPage`: página atual válida
- `totalPages`: total de páginas disponíveis para o recorte atual
- `totalItems`: total de produtos após aplicar o filtro
- `availableCategories`: categorias disponíveis para a interface
- `hasInvalidCategory`: indica se a categoria informada na URL não existe
- `selectedCategory`: categoria ativa
- `data`: produtos da página atual

## 5. Renderização dos componentes de navegação

`src/components/CategoryFilter.tsx` recebe:

- `categories`
- `hasInvalidCategory`
- `selectedCategory`

O componente:

- renderiza a opção `Todas`
- renderiza uma opção por categoria
- reseta a página ao trocar de categoria
- não marca nenhuma categoria como ativa quando a query string é inválida

`src/components/Pagination.tsx` recebe:

- `currentPage`
- `totalPages`
- `selectedCategory`

Os links de filtro e paginação usam `src/utils/createOffersHref.ts`.

Assim:

- a primeira página continua sem `?page=1`
- a categoria é preservada ao navegar entre páginas
- a troca de categoria volta para a primeira página

## 6. Por que essa abordagem

Essa implementação foi escolhida porque:

- usa a URL como fonte de verdade do estado atual
- funciona bem com App Router e Server Components
- evita estado extra no client
- deixa a regra de filtro e paginação na camada de dados
- mantém os componentes focados em renderização

## Como explicar na entrevista

Uma resposta curta:

`A listagem usa query string para página e categoria, então a URL representa o estado atual. A página /ofertas lê esses parâmetros, chama src/lib/api.ts e consome a rota interna /api/products. Essa rota lê o banco mockado em src/db/product.json, detecta categoria inválida, aplica o filtro por categoria quando necessário, calcula a paginação de 6 em 6 e devolve currentPage, totalPages, availableCategories, hasInvalidCategory e data. Os componentes CategoryFilter e Pagination só renderizam os links com base nesses metadados.`

## Possíveis evoluções

- combinar categoria com filtro por marca
- adicionar estado visual de loading ao trocar de página
- adicionar tratamento visual de erro
- reduzir a quantidade de links se o total de páginas crescer muito
