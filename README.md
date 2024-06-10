# API - Agenda Comunitária

Essa é uma API para o projeto extensão do meu curso de ADS na UniFecaf.

A aplicação foi completamente escrita em `Javascript` e foi usado o banco de
dados noSQL `MongoDB`.

Usei as seguintes dependencias:

`Mongoose` para fazer as buscas e a conexão com o banco de dados;

`Express` Para subir um servidor local;

`DotEnv` Para as variáveis de ambiente;

`Jsonwebtoken` Para criar tokens de sessão que serão usadas como valição para
ver se o usuário está logado;

`Bcryptjs` Para transformar as senhas em hash quando for salvar no banco;

`Validator` para fazer validação de email e outros paramentos;

`Multer` para receber e guardar as imagens localmente;

## Instalar
    npm i

## Viriaveis de ambiente

Crie um arquivo `.env` no diretório raiz do projeto

Nele você deverá criar quatro variáveis:

    APP_PORT=5001
    DB_HOST="mongodb://localhost:27017/agenda_comunitaria"
    TOKEN_EXPIRATION=1d
    TOKEN_SECRET=dsfjfhllfsd2oih90ghfhg0uik23j9vjfdsiqh2uh

APP_PORT é a porta do servidor local do express;

DB_HOST é a rota para o Database do mongoDB;

TOKEN_EXPIRATION é quantidade de tempo para o token de autentificação;

TOKEN_SECRET é um código para a geração dos tokens de autentificação;


## Rodar a aplicação
    node server.js

# Rotas da API

Exemplos das rotas da API abaixo:


## Usuários - Registrar
### Requisição:
`POST: /login/register`

    Body:
    {
      “name”: “Seu Nome”,
      “email”: “seu@email.com”,
      “password”: “suaSenha”,
      “contact_number”: “telefone” (Esse é opcional)
    }

### Resposta:
    { "success": 'Conta cadastrada com sucesso' }


## Usuários - Entrar
### Requisição:
`POST /login/login`

    Body:
    {
      “email”: “seu@email.com”,
      “password”: “suaSenha”
    }

### Resposta:
    { "success": "Aqui irá ter seu token de autentificação do login" }


## Usuários - Atualizar
### Requisição:
`PUT /login/update`

Nessa Rota é necessario ter entrado na conta:

    HEADERS 'Authorization': `Bearer ${seu token vai aqui}`

    Body:
    {
      “name”: “Seu Nome”,
      “email”: “seu@email.com”,
      “password”: “suaSenha”,
      “contact_number”: “telefone” `(Esse é opcional)`
    }

### Resposta:
    { "success": "Dados atualizados com sucesso" }


## Usuários - Apagar
### Requisição:
`DELETE /login/delete`

Nessa Rota é necessario ter entrado na conta:

    HEADERS 'Authorization': `Bearer ${seu token vai aqui}`

### Resposta:
    { "success": "Conta excluida com sucesso" }


## Eventos - Criar
### Requisição:
`POST /events/create`

Nessa Rota é necessario ter entrado na conta:

    HEADERS 'Authorization': `Bearer ${seu token vai aqui}`

    Body:
    {
        "name": "Nome do evento",
        "type": "Tipo do evento",
        "description": "Descrição do evento",
        "requisites": "Requisitos do evento",
        "cep": "01001-000",
        "place_number": "10",
        "contact_number": "11940028922",
        "date": "10:30 11-07-2024",
        "quantity_tickets": "50",
        "file": Arquivo de imagem,
     }

### Resposta:
    {
	  "events": {
        "name": "Nome do evento",
        "type": "Tipo do evento",
        "description": "Descrição do evento",
        "requisites": "Requisitos do evento",
        "cep": "01001-000",
        "place_number": "10",
        "contact_number": "11940028922",
        "date": "10:30 11-07-2024",
        "quantity_tickets": "50",
        "file": "uploads/1717987126155.jpeg",
        "owner_id": "666665c4781abbaf1e3f44fe",
        "_id": "666667366d9781dbcdd51e4d",
        "participants": [],
        "__v": 0
      }
    }


## Eventos - Atualizar
### Requisição:
`PUT /events/update`

Nessa Rota é necessario ter entrado na conta:

    HEADERS 'Authorization': `Bearer ${seu token vai aqui}`

    Body:
      {
        "name": "Nome do evento",
        "type": "Tipo do evento",
        "description": "Descrição do evento",
        "requisites": "Requisitos do evento",
        "cep": "01001-000",
        "place_number": "10",
        "contact_number": "11940028922",
        "date": "10:30 11-07-2024",
        "quantity_tickets": "50",
        "file": Arquivo de imagem,
        "id": "Id do evento"
      }

### Resposta:
    {
	  "events": {
		  "acknowledged": true,
		  "modifiedCount": 1,
		  "upsertedId": null,
		  "upsertedCount": 0,
		  "matchedCount": 1
	  }
    }


## Eventos - Entrar
### Requisição:
`POST /events/enter`

Nessa Rota é necessario ter entrado na conta:

    HEADERS 'Authorization': `Bearer ${seu token vai aqui}`

    Body:
      { "id": "666758c4c244178ca438943c" }

### Resposta:
    { success: "Você esta participando do evento" }


## Eventos - Apagar
### Requisição:
`DELETE /events/delete`

Nessa Rota é necessario ter entrado na conta:

    HEADERS 'Authorization': `Bearer ${seu token vai aqui}`

    Body:
      { "id": "666758c4c244178ca438943c" }

### Resposta:
    { success: "O seu evento foi apagado com sucesso" }


## Eventos - Mostrar todos
### Requisição:
`GET: /events/`

### Resposta:
    {
	  "events": [
        {
          "_id": "666667366d9781dbcdd51e4d",
          "name": "Nome do evento",
          "type": "Tipo do evento",
          "description": "Descrição do evento",
          "requisites": "Requisitos do evento",
          "cep": "01001-000",
          "place_number": "10",
          "contact_number": "11940028922",
          "date": "10:30 11-07-2024",
          "quantity_tickets": "50",
          "file": "uploads/1717987126155.jpeg",
          "owner_id": "",
          "participants": [],
          "__v": 0
        },
        {
          "_id": "666667366d9781dbcdd51e4a",
          "name": "Nome do evento",
          "type": "Tipo do evento",
          "description": "Descrição do evento",
          "requisites": "Requisitos do evento",
          "cep": "01001-000",
          "place_number": "10",
          "contact_number": "11940028922",
          "date": "10:30 11-07-2024",
          "quantity_tickets": "50",
          "file": "uploads/1717987126155.jpeg",
          "owner_id": "",
          "participants": [],
          "__v": 0
        }
      ]
    }


## Eventos - Mostrar todos em que você é dono
### Requisição:
`POST /events/allmine`

Nessa Rota é necessario ter entrado na conta:

    HEADERS 'Authorization': `Bearer ${seu token vai aqui}`

### Resposta:
    {
	  "events": [
        {
          "_id": "666667366d9781dbcdd51e4d",
          "name": "Nome do evento",
          "type": "Tipo do evento",
          "description": "Descrição do evento",
          "requisites": "Requisitos do evento",
          "cep": "01001-000",
          "place_number": "10",
          "contact_number": "11940028922",
          "date": "10:30 11-07-2024",
          "quantity_tickets": "50",
          "file": "uploads/1717987126155.jpeg",
          "owner_id": "id do dono",
          "participants": [{ idParticipants: "id dos participantes" }],
          "__v": 0
        },
        {
          "_id": "666667366d9781dbcdd51e4a",
          "name": "Nome do evento",
          "type": "Tipo do evento",
          "description": "Descrição do evento",
          "requisites": "Requisitos do evento",
          "cep": "01001-000",
          "place_number": "10",
          "contact_number": "11940028922",
          "date": "10:30 11-07-2024",
          "quantity_tickets": "50",
          "file": "uploads/1717987126155.jpeg",
          "owner_id": "id do dono",
          "participants": [{ idParticipants: "id dos participantes" }],
          "__v": 0
        }
      ]
    }


## Eventos - Mostrar um
### Requisição:
`POST /events/one`

Nessa Rota é necessario ter entrado na conta:

    Body: { "id": "666667366d9781dbcdd51e4d" }

### Resposta:
    {
	  "events": {
        "_id": "666667366d9781dbcdd51e4d",
        "name": "Nome do evento",
        "type": "Tipo do evento",
        "description": "Descrição do evento",
        "requisites": "Requisitos do evento",
        "cep": "01001-000",
        "place_number": "10",
        "contact_number": "11940028922",
        "date": "10:30 11-07-2024",
        "quantity_tickets": "50",
        "file": "uploads/1717987126155.jpeg",
        "owner_id": "",
        "participants": [],
        "__v": 0
      }
    }


## Eventos - Mostrar um em que você é dono
### Requisição:
`POST /events/onemine`

Nessa Rota é necessario ter entrado na conta:

    HEADERS 'Authorization': `Bearer ${seu token vai aqui}`

    Body: { "id": "666667366d9781dbcdd51e4d" }

### Resposta:
    {
	  "events": {
        "_id": "666667366d9781dbcdd51e4d",
        "name": "Nome do evento",
        "type": "Tipo do evento",
        "description": "Descrição do evento",
        "requisites": "Requisitos do evento",
        "cep": "01001-000",
        "place_number": "10",
        "contact_number": "11940028922",
        "date": "10:30 11-07-2024",
        "quantity_tickets": "50",
        "file": "uploads/1717987126155.jpeg",
        "owner_id": "id do dono",
        "participants": [{ idParticipants: "id dos participantes" }],
        "__v": 0
      }
    }
