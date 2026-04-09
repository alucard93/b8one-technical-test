# Checklist do Desafio

Checklist no estado atual do projeto.

## Base do projeto

- [x] Criar projeto com Next.js
- [x] Configurar Tailwind CSS
- [x] Configurar TypeScript
- [x] Ajustar `metadata` da aplicacao
- [x] Remover o conteudo padrao do template inicial
- [x] Configurar as fontes do projeto
- [x] Gerar a imagem de banner da página de oferta atráves do gemini 

## Rota principal

- [x] Criar a rota `/ofertas`
- [x] Garantir que a pagina abre sem erro
- [x] Definir estrutura principal da pagina

## Layout da pagina

- [x] Adicionar banner estatico no topo
- [x] Adicionar o titulo `Ofertas da Semana`
- [x] Criar a secao da vitrine de produtos
- [x] Organizar os produtos em grid responsivo

## Dados dos produtos

- [x] Estruturar base mockada em `src/db/product.json`
- [x] Expor rota interna `GET /api/products`
- [x] Tipar o retorno dos produtos
- [x] Exibir somente 6 produtos por pagina
- [x] Separar a camada de acesso em `src/lib/api.ts`

## Card de produto

- [x] Exibir imagem do produto
- [x] Exibir nome do produto
- [x] Exibir preco do produto
- [x] Adicionar botao `Comprar`
- [x] Padronizar altura e espacamento dos cards

## Boas praticas

- [x] Usar HTML semantico
- [x] Separar componentes reutilizaveis
- [x] Manter o codigo organizado
- [x] Garantir tipagem consistente
- [x] Deixar a interface clara e facil de entender

## Responsividade

- [x] Ajustar layout para mobile
- [x] Ajustar layout para tablet
- [x] Ajustar layout para desktop
- [x] Validar leitura, espacamento e clique dos botoes em telas menores

## Extras

- [x] Implementar paginacao de 6 em 6 produtos
- [x] Implementar lazy loading nas imagens dos cards

## Revisao final

- [x] Conferir se a rota `/ofertas` esta funcionando
- [x] Conferir se o banner aparece corretamente
- [x] Conferir se o titulo esta correto
- [x] Conferir se os produtos vem da rota interna `/api/products`
- [x] Conferir se todos os cards tem imagem, nome, preco e botao
- [x] Conferir se a pagina esta responsiva
- [x] Rodar lint
- [x] Revisar nomes de componentes, pastas e arquivos

## Entrega

- [x] Subir o projeto no GitHub
- [x] Fazer deploy na Vercel
- [x] Validar se o deploy esta funcionando
- [x] Validar se o repositorio esta acessivel
- [x] Enviar link do GitHub para o recrutador
- [x] Enviar link da Vercel para o recrutador

## Preparacao para apresentacao

- [x] Conseguir explicar a estrutura do projeto
- [x] Conseguir explicar como os dados sao buscados
- [x] Conseguir explicar paginacao
