# b8one Technical Test

Projeto desenvolvido com `Next.js`, `TypeScript`, `Tailwind CSS` e `json-server` para simular a API local de produtos.

## Requisitos

- `Node.js`
- `npm`

## Instalação

```bash
npm install
```

## Como rodar o projeto

Para subir o frontend e a API fake ao mesmo tempo:

```bash
npm run start:all
```

O projeto ficará disponível em:

- Frontend: `http://localhost:3000`
- API fake: `http://localhost:4000/products`

## Rodando separadamente

Frontend:

```bash
npm run dev
```

API fake:

```bash
npm run api
```

## Scripts disponíveis

```bash
npm run dev
npm run api
npm run start:all
npm run lint
npm run build
```

## Rota principal

A página do desafio está em:

```text
http://localhost:3000/ofertas
```

## Problema comum: porta 4000 em uso

Se ao rodar `npm run start:all` aparecer erro de porta ocupada, significa que já existe outro processo usando a porta `4000`.

### Como resolver

#### 1. Matar o processo na porta 4000

No Windows (PowerShell):

```powershell
netstat -ano | findstr :4000
```

Vai aparecer algo assim:

```text
TCP    0.0.0.0:4000   ...   LISTENING   1234
```

O número final (`1234`) é o `PID`.

Agora finalize o processo:

```powershell
taskkill /PID 1234 /F
```

#### 2. Descobrir o processo pelo PowerShell

```powershell
Get-NetTCPConnection -LocalPort 4000 | Select-Object LocalPort, OwningProcess, State
```

Depois:

```powershell
Get-Process -Id <PID>
```

E, se necessário:

```powershell
Stop-Process -Id <PID>
```

#### 3. Trocar a porta da API

Se preferir, altere o script `api` no arquivo [package.json](C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/package.json) para outra porta, por exemplo:

```json
"api": "json-server --watch product.json --port 4001"
```

Depois ajuste também a URL usada pela aplicação em [src/lib/api.ts](C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/src/lib/api.ts).
