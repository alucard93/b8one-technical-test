# Checklist do Desafio

Checklist atualizado com base no estado atual do projeto.

## Base do projeto

- [x] Criar projeto com Next.js
- [x] Configurar Tailwind CSS
- [x] Configurar TypeScript
- [x] Ajustar `metadata` da aplicação
- [x] Remover o conteúdo padrão do template inicial
- [x] Configurar as fontes do projeto
- [x] Criar o banner da página de ofertas

## Rota principal

- [x] Criar a rota `/ofertas`
- [x] Garantir que a página abre sem erro
- [x] Definir estrutura principal da página

## Layout da página

- [x] Adicionar banner estático no topo
- [x] Adicionar o título `Ofertas da Semana`
- [x] Criar a seção da vitrine de produtos
- [x] Organizar os produtos em grid responsivo

## Dados dos produtos

- [x] Estruturar base mockada em `src/db/product.json`
- [x] Expor rota interna `GET /api/products`
- [x] Tipar o retorno dos produtos
- [x] Exibir somente 6 produtos por página
- [x] Separar a camada de acesso em `src/lib/api.ts`
- [x] Extrair a validação da página para `src/utils/parsePage.ts`

## Card de produto

- [x] Exibir imagem do produto
- [x] Exibir nome do produto
- [x] Exibir preço do produto
- [x] Adicionar botão `Comprar`
- [x] Padronizar altura e espaçamento dos cards

## Boas práticas

- [x] Usar HTML semântico
- [x] Separar componentes reutilizáveis
- [x] Manter o código organizado
- [x] Garantir tipagem consistente
- [x] Deixar a interface clara e fácil de entender

## Responsividade

- [x] Ajustar layout para mobile
- [x] Ajustar layout para tablet
- [x] Ajustar layout para desktop
- [x] Validar leitura, espaçamento e clique dos botões em telas menores

## Extras

- [x] Implementar paginação de 6 em 6 produtos
- [x] Implementar lazy loading nas imagens dos cards
- [x] Implementar filtro por categoria

## Revisão final

- [x] Conferir se a rota `/ofertas` está funcionando
- [x] Conferir se o banner aparece corretamente
- [x] Conferir se o título está correto
- [x] Conferir se os produtos vêm da rota interna `/api/products`
- [x] Conferir se todos os cards têm imagem, nome, preço e botão
- [x] Conferir se a página está responsiva
- [x] Rodar lint
- [x] Revisar nomes de componentes, pastas e arquivos

## Entrega

- [x] Subir o projeto no GitHub
- [x] Fazer deploy na Vercel
- [x] Validar se o deploy está funcionando
- [x] Validar se o repositório está acessível
- [x] Enviar link do GitHub para o recrutador
- [x] Enviar link da Vercel para o recrutador

## Preparação para apresentação

- [x] Conseguir explicar a estrutura do projeto
- [x] Conseguir explicar como os dados são buscados
- [x] Conseguir explicar filtros
- [x] Conseguir explicar paginação

## Apoio

- [filter-guide.md](/C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/docs/filter-guide.md)
- [pagination-guide.md](/C:/Users/Vinicius/Documents/GitHub/b8one-technical-test/docs/pagination-guide.md)
