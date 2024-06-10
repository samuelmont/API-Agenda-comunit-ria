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

## Rodar a aplicação
    node server.js

# Rotas da API

Exemplos das rotas da API abaixo:

## Usuarios - Registrar

### Requisição:
`POST: /login/register`

    {
      “name”: “Seu Nome”,
      “email”: “seu@email.com”,
      “password”: “suaSenha”,
      “contact_number”: “telefone” (Esse é opcional)
    }

### Resposta?
    { success: 'Conta cadastrada com sucesso' }


## Entrar

### Requisição:
`POST /login/login`

    {
      “name”: “Seu Nome”,
      “email”: “seu@email.com”,
      “password”: “suaSenha”,
      “contact_number”: “telefone” `(Esse é opcional)`
    }

### Resposta:

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

    {"id":1,"name":"Foo","status":"new"}
