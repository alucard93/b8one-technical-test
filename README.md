# b8one Technical Test

Projeto desenvolvido com `Next.js`, `TypeScript` e `Tailwind CSS`.

Os dados da vitrine são servidos internamente pelo próprio projeto a partir do arquivo [product.json](C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/product.json), via rota [route.ts](C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/src/app/api/products/route.ts).

## Requisitos

- `Node.js`
- `npm`

## Instalação

```bash
npm install
```

## Como rodar o projeto

```bash
npm run dev
```

Aplicação:

- `http://localhost:3000`

Rota do desafio:

- `http://localhost:3000/ofertas`

Rota interna de produtos:

- `http://localhost:3000/api/products`

## Scripts disponíveis

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Estrutura dos dados

- [product.json](C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/product.json): base local dos produtos
- [api.ts](C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/src/lib/api.ts): transformação dos dados para a vitrine
- [route.ts](C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/src/app/api/products/route.ts): endpoint interno `/api/products`
