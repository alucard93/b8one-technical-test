# Guia dos Filtros

Este documento explica como o filtro por categoria da rota `/ofertas` foi implementado.

## Objetivo

Permitir que a listagem de produtos seja refinada por categoria, mantendo a URL compartilhavel e o estado do filtro explicito.

Exemplos:

- `/ofertas`
- `/ofertas?category=electronics`
- `/ofertas?category=jewelery`
- `/ofertas?category=electronics&page=2`

## Arquivos envolvidos

- `src/app/ofertas/page.tsx`
- `src/components/CategoryFilter.tsx`
- `src/components/Pagination.tsx`
- `src/app/api/products/route.ts`
- `src/lib/api.ts`
- `src/types/product.ts`
- `src/utils/parseCategory.ts`
- `src/utils/createOffersHref.ts`
- `src/db/product.json`

## Visao geral

O filtro segue a mesma arquitetura usada na paginacao:

1. a URL guarda o estado atual
2. a pagina le `searchParams.category`
3. `parseCategory` valida o valor recebido
4. `api.ts` chama a rota interna com o filtro atual
5. `/api/products` aplica o filtro nos dados
6. `CategoryFilter` renderiza os links da interface

## 1. Categoria na URL

A categoria atual fica na query string:

```txt
/ofertas?category=electronics
```

Isso foi escolhido porque:

- deixa o estado compartilhavel
- evita estado extra no client
- funciona bem com Server Components
- combina com a abordagem ja usada para `page`

## 2. Validacao da categoria

Em `src/utils/parseCategory.ts`, a categoria recebida pela URL passa por validacao.

A funcao:

- retorna `null` quando nao existe categoria
- retorna `null` quando o valor nao pertence ao dominio
- retorna uma `ProductCategory` valida quando a categoria existe

As categorias aceitas ficam centralizadas em `src/types/product.ts`:

- `electronics`
- `jewelery`
- `men's clothing`
- `women's clothing`

## 3. Leitura do filtro na pagina

Em `src/app/ofertas/page.tsx`, a pagina:

- recebe `searchParams`
- le `category`
- valida com `parseCategory`
- chama `getProductCards(requestedPage, requestedCategory)`

Assim, a pagina nao decide como filtrar. Ela apenas interpreta a URL e delega a busca.

## 4. Aplicacao do filtro na API interna

Em `src/app/api/products/route.ts`, a rota:

- le os produtos de `src/db/product.json`
- valida `category`
- filtra os produtos antes da paginacao

O ponto principal e este:

```ts
const filteredProducts = selectedCategory
  ? products.filter((product) => product.category === selectedCategory)
  : products
```

Essa ordem e importante porque `totalItems` e `totalPages` precisam refletir o conjunto ja filtrado.

## 5. Componente de interface

`src/components/CategoryFilter.tsx` e responsavel apenas pela interface.

Ele:

- recebe `categories`
- recebe `selectedCategory`
- renderiza a opcao `Todas`
- renderiza um link para cada categoria
- destaca a categoria ativa

O componente nao aplica a regra do filtro. Ele apenas monta links para a URL correta.

## 6. Relacao com a paginacao

O filtro e a paginacao compartilham o utilitario `src/utils/createOffersHref.ts`.

Isso garante que:

- a categoria seja preservada ao trocar de pagina
- a pagina volte para `1` ao trocar de categoria
- a URL continue limpa, sem `?page=1`

Exemplo:

- filtro ativo: `/ofertas?category=electronics`
- segunda pagina do mesmo filtro: `/ofertas?category=electronics&page=2`

## 7. Resposta da API

A rota `/api/products` devolve, alem dos produtos:

- `availableCategories`
- `selectedCategory`

Esses campos permitem que a UI saiba:

- quais categorias podem ser exibidas no filtro
- qual categoria esta atualmente ativa

## Por que essa abordagem

Essa implementacao foi escolhida porque:

- mantem a regra no backend da propria aplicacao
- deixa os componentes focados em renderizacao
- evita duplicacao de validacao
- preserva consistencia com a arquitetura atual

## Como explicar na entrevista

Uma resposta curta:

`O filtro por categoria usa query string, entao a URL representa o estado atual da listagem. A pagina /ofertas le category, valida com parseCategory e chama a camada de acesso em src/lib/api.ts. A rota interna /api/products aplica o filtro no banco mockado, recalcula totalItems e totalPages e devolve selectedCategory junto com os produtos. O componente CategoryFilter so renderiza os links com base nesses dados.`

## Possiveis evolucoes

- permitir filtro combinado por categoria e marca
- adicionar contagem de produtos por categoria
- exibir mensagem visual quando o filtro nao encontrar itens
- mover os labels das categorias para uma camada de configuracao de apresentacao
