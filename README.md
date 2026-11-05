# Linky!

**Linky** é um encurtador de URLs que permite encurtar links de forma simples e eficiente.

## Funcionalidades

- Encurte URLs longas em links curtos e fáceis de compartilhar.
- Defina o tempo de expiração dos links encurtados de forma opcional.
- Gere URLs únicas de forma rápida e segura.

## Tecnologias Utilizadas

### Frontend

- **Next.js 16**: Utilizado como framework para a aplicação frontend, garantindo renderização eficiente e experiência otimizada.
- **React 19**: Biblioteca JavaScript utilizada para construir interfaces de usuário interativas e dinâmicas.
- **Tailwind CSS 4**: Framework de CSS utilitário que facilita a criação de layouts responsivos e estilizados.
- **React Spring**: Biblioteca de animações usada para criar transições suaves e animações no frontend.

### Backend

- **nanoid**: Utilizado para gerar identificadores únicos e seguros que compõem as URLs encurtadas.
- **Upstash Redis**: O Redis como serviço foi integrado com o **Upstash** para armazenar e gerenciar os links encurtados, oferecendo uma solução escalável e de baixa latência para a aplicação.

## Como Instalar e Rodar o Projeto Localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/reinaldo-silva/linky.git
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd linky
   ```

3. Instale as dependências (o projeto usa [pnpm](https://pnpm.io/) e requer Node.js 22 ou superior):

   ```bash
   pnpm install
   ```

4. Rode o projeto localmente:

   ```bash
   pnpm dev
   ```

5. Acesse o app no navegador:

   ```
   http://localhost:3000
   ```

## Utilizando o Upstash

Para utilizar o Upstash como solução de armazenamento Redis, siga os passos abaixo:

1. Crie uma conta no [Upstash](https://upstash.com/).
2. Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis de ambiente:

   ```bash
   UPSTASH_REDIS_REST_URL=<sua-url-upstash>
   UPSTASH_REDIS_REST_TOKEN=<seu-token-upstash>
   ```

3. Após configurar as variáveis de ambiente, o projeto estará pronto para utilizar o Upstash Redis como banco de dados para os links encurtados.

Sem essas variáveis, em desenvolvimento o projeto usa um armazenamento em memória (os links são perdidos ao reiniciar o servidor). Em produção elas são obrigatórias.

## Scripts

- `pnpm dev`: servidor de desenvolvimento
- `pnpm build` / `pnpm start`: build e servidor de produção
- `pnpm lint`: ESLint
- `pnpm test`: testes com Jest

## Como Contribuir

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Esse projeto está sob a licença MIT. Para mais detalhes, consulte o arquivo [LICENSE](LICENSE).
