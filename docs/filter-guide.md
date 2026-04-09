# Guia dos Filtros

Este documento explica como o filtro por categoria da rota `/ofertas` foi implementado.

## Objetivo

Permitir que a listagem de produtos seja refinada por categoria, mantendo a URL compartilhavel e o estado do filtro explicito.

Exemplos:

- `/ofertas`
- `/ofertas?category=electronics`
- `/ofertas?category=jewelery`
- `/ofertas?category=electronics&page=2`
- `/ofertas?category=qualquer-coisa`

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

Esse retorno isolado nao diferencia "sem filtro" de "filtro invalido". Essa distincao acontece na rota, comparando o valor bruto da query string com o resultado de `parseCategory`.

As categorias aceitas ficam centralizadas em `src/types/product.ts`:

- `electronics`
- `jewelery`
- `men's clothing`
- `women's clothing`

## 3. Leitura do filtro na pagina

Em `src/app/ofertas/page.tsx`, a pagina:

- recebe `searchParams`
- le `category`
- chama `getProductCards(requestedPage, requestedCategory)`

Assim, a pagina nao decide como filtrar. Ela apenas encaminha o valor recebido e delega a interpretacao final para a API.

## 4. Aplicacao do filtro na API interna

Em `src/app/api/products/route.ts`, a rota:

- le os produtos de `src/db/product.json`
- valida `category`
- detecta quando a categoria informada e invalida
- filtra os produtos antes da paginacao

O ponto principal agora e este:

```ts
const hasInvalidCategory =
  requestedCategory !== null &&
  requestedCategory !== '' &&
  selectedCategory === null

const filteredProducts = hasInvalidCategory
  ? []
  : selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products
```

Com isso:

- sem `category`: lista completa
- `category` valida: lista filtrada
- `category` invalida: lista vazia

Essa ordem e importante porque `totalItems` e `totalPages` precisam refletir o conjunto final que sera exibido.

## 5. Componente de interface

`src/components/CategoryFilter.tsx` e responsavel apenas pela interface.

Ele:

- recebe `categories`
- recebe `hasInvalidCategory`
- recebe `selectedCategory`
- renderiza a opcao `Todas`
- renderiza um link para cada categoria
- destaca a categoria ativa
- evita marcar `Todas` como ativa quando a query string contem uma categoria invalida

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
- `hasInvalidCategory`
- `selectedCategory`

Esses campos permitem que a UI saiba:

- quais categorias podem ser exibidas no filtro
- se a categoria informada na URL e invalida
- qual categoria esta atualmente ativa

Quando `hasInvalidCategory` e `true`, a interface mostra a mensagem `A categoria informada nao existe no cadastro.`.

## Por que essa abordagem

Essa implementacao foi escolhida porque:

- mantem a regra no backend da propria aplicacao
- deixa os componentes focados em renderizacao
- evita duplicacao de validacao
- preserva consistencia com a arquitetura atual

## Como explicar na entrevista

Uma resposta curta:

`O filtro por categoria usa query string, entao a URL representa o estado atual da listagem. A pagina /ofertas encaminha category para src/lib/api.ts, e a rota interna /api/products decide se ela e valida, ausente ou invalida. Quando a categoria existe, a rota filtra os produtos; quando e invalida, devolve lista vazia com um sinalizador para a UI. O componente CategoryFilter so renderiza os links com base nesses dados.`

## Possiveis evolucoes

- permitir filtro combinado por categoria e marca
- adicionar contagem de produtos por categoria
- exibir mensagem visual quando o filtro nao encontrar itens
- mover os labels das categorias para uma camada de configuracao de apresentacao
