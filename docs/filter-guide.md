# Guia dos Filtros

Este documento explica como o filtro por categoria da rota `/ofertas` foi implementado.

## Objetivo

Permitir que a listagem de produtos seja refinada por categoria, mantendo a URL compartilhável e o estado do filtro explícito.

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

## Visão geral

O filtro segue a mesma arquitetura usada na paginação:

1. a URL guarda o estado atual
2. a página lê `searchParams.category`
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

- deixa o estado compartilhável
- evita estado extra no client
- funciona bem com Server Components
- combina com a abordagem já usada para `page`

## 2. Validação da categoria

Em `src/utils/parseCategory.ts`, a categoria recebida pela URL passa por validação.

A função:

- retorna `null` quando não existe categoria
- retorna `null` quando o valor não pertence ao domínio
- retorna uma `ProductCategory` válida quando a categoria existe

Esse retorno isolado não diferencia "sem filtro" de "filtro inválido". Essa distinção acontece na rota, comparando o valor bruto da query string com o resultado de `parseCategory`.

As categorias aceitas ficam centralizadas em `src/types/product.ts`:

- `electronics`
- `jewelery`
- `men's clothing`
- `women's clothing`

## 3. Leitura do filtro na página

Em `src/app/ofertas/page.tsx`, a página:

- recebe `searchParams`
- lê `category`
- chama `getProductCards(requestedPage, requestedCategory)`

Assim, a página não decide como filtrar. Ela apenas encaminha o valor recebido e delega a interpretação final para a API.

## 4. Aplicação do filtro na API interna

Em `src/app/api/products/route.ts`, a rota:

- lê os produtos de `src/db/product.json`
- valida `category`
- detecta quando a categoria informada é inválida
- filtra os produtos antes da paginação

O ponto principal agora é este:

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
- `category` válida: lista filtrada
- `category` inválida: lista vazia

Essa ordem é importante porque `totalItems` e `totalPages` precisam refletir o conjunto final que será exibido.

## 5. Componente de interface

`src/components/CategoryFilter.tsx` é responsável apenas pela interface.

Ele:

- recebe `categories`
- recebe `hasInvalidCategory`
- recebe `selectedCategory`
- renderiza a opção `Todas`
- renderiza um link para cada categoria
- destaca a categoria ativa
- evita marcar `Todas` como ativa quando a query string contém uma categoria inválida

O componente não aplica a regra do filtro. Ele apenas monta links para a URL correta.

## 6. Relação com a paginação

O filtro e a paginação compartilham o utilitário `src/utils/createOffersHref.ts`.

Isso garante que:

- a categoria seja preservada ao trocar de página
- a página volte para `1` ao trocar de categoria
- a URL continue limpa, sem `?page=1`

Exemplo:

- filtro ativo: `/ofertas?category=electronics`
- segunda página do mesmo filtro: `/ofertas?category=electronics&page=2`

## 7. Resposta da API

A rota `/api/products` devolve, além dos produtos:

- `availableCategories`
- `hasInvalidCategory`
- `selectedCategory`

Esses campos permitem que a UI saiba:

- quais categorias podem ser exibidas no filtro
- se a categoria informada na URL é inválida
- qual categoria está atualmente ativa

Quando `hasInvalidCategory` é `true`, a interface mostra uma mensagem informando que a categoria não existe no cadastro.

## Por que essa abordagem

Essa implementação foi escolhida porque:

- mantém a regra no backend da própria aplicação
- deixa os componentes focados em renderização
- evita duplicação de validação
- preserva consistência com a arquitetura atual

## Como explicar na entrevista

Uma resposta curta:

`O filtro por categoria usa query string, então a URL representa o estado atual da listagem. A página /ofertas encaminha category para src/lib/api.ts, e a rota interna /api/products decide se ela é válida, ausente ou inválida. Quando a categoria existe, a rota filtra os produtos; quando é inválida, devolve lista vazia com um sinalizador para a UI. O componente CategoryFilter só renderiza os links com base nesses dados.`

## Possíveis evoluções

- permitir filtro combinado por categoria e marca
- adicionar contagem de produtos por categoria
- exibir mensagem visual quando o filtro não encontrar itens
- mover os labels das categorias para uma camada de configuração de apresentação
