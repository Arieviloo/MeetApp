<h1 align="center">
    <img alt="Go Stack logo" src="https://github.com/Arieviloo/MeetApp-Backend-/blob/master/src/assets/images/logo-gostack.png" />
    <br>
      MeetaApp-Backend
</h1>
<h4 align="center">
  A challenge for [RocketSeat GoStack Bootcamp](https://rocketseat.com.br/bootcamp) Certificate
</h4>

Essa aplicação será utilizada para se inscrever em meetups e de criar meetups. Essa aplicação é a API utilizada para que a aplicação WEB e MOBILE possam consumir as informações.
A versão WEB será utilizada para gerenciar meetups e a versão MOBILE será utilizada para se inscrever em meetups.

## :information_source: How To Use

```bash
# Clone this repository
$ git clone https://github.com/Arieviloo/MeetaApp-Backend

# Go into the front path
$ cd MeetaApp-Backend

# Install dependencies
$ yarn

# Run
$ yarn dev

# Docker

    docker run --name meetapp -e MYSQL_ROOT_PASSWORD=docker -d mysql:tag // Postgres
    docker run --name meetappredis -p 6379:6379 -d -t redis:alpine // Redis

# Redis

Para executar o Redis é necessário abrir um outro terminal e executar o comando abaixo:

    yarn queue

```

## :information_source: Database

-   É necessário criar o banco de dados como nome `meetapp`.
-   Para criar as tabelas na base de dados criada anteriormente execute o seguinte comando:

        yarn sequelize db:migrate

## :information_source: Enviroment Variables

O arquivo de configuração das variáveis se encontra em um arquivo na raiz do projeto com o nome de `.env.example`.
Faça uma cópia do arquivo antes de executar o servidor e o renomeie para `.env` e faça as seguintes alterações descritas abaixo:

-   Para executar o servidor da aplicação certifique-se de configurar as variáveis de ambiente que são usadas no **envio de e-mail**, credenciais para acesso ao **banco de dados**, **redis** e também a **URL** da aplicação.

          APP_URL=http://localhost:3001

          # DATABASE

          DB_DRIVER=postgres
          DB_HOST=localhost
          DB_PORT=3306
          DB_USER=postgres
          DB_PASS=docker
          DB_NAME=meetapp

          # MAIL

          MAIL_HOST=smtp.mailtrap.io
          MAIL_PORT=2525
          MAIL_USER=
          MAIL_PASS=

          # REDIS

          REDIS_HOST=localhost
          REDIS_PORT=6379

## :rocket: Routes

### `/sessions`

| **Verb** | **URL**      | **Action** | **Route Name** |
| -------- | ------------ | ---------- | -------------- |
| POST     | `/sessions/` | store      | sessions.store |

### `/meetups`

| **Verb** | **URL**             | **Action** | **Route Name**  |
| -------- | ------------------- | ---------- | --------------- |
| GET      | `/meetups`          | index      | meetups.index   |
| GET      | `/meetups/{meetup}` | show       | meetups.show    |
| POST     | `/meetups/`         | store      | meetups.store   |
| PUT      | `/meetups/{meetup}` | update     | meetups.update  |
| DELETE   | `/meetups/{meetup}` | delete     | meetups.destroy |
| GET      | `/meetups/owner`    | owner      | meetups.owner   |

### `/users`

| **Verb** | **URL**   | **Action** | **Route Name** |
| -------- | --------- | ---------- | -------------- |
| POST     | `/users/` | store      | users.store    |
| PUT      | `/users/` | update     | users.update   |

### `/subscriptions`

| **Verb** | **URL**                   | **Action** | **Route Name**        |
| -------- | ------------------------- | ---------- | --------------------- |
| GET      | `/subscriptions/`         | index      | subscriptions.index   |
| POST     | `/subscriptions/`         | store      | subscriptions.store   |
| DELETE   | `/subscriptions/{meetup}` | delete     | subscriptions.destroy |

## :computer: Technologies

-   NodeJS (Express)
-   Sequelize ORM
-   Nodemailer (Handlerbars)
-   Redis
-   Multer (Upload de Arquivos)
-   Json Web Tokens (Autenticação JWT)
-   Yup (Validação de Campos)

## :computer: My Setup DEV

-   Editor Config
-   ESLint
-   Prettier
