#  API CRUD de Cursos com Fastify + PostgreSQL

## 📌 Sobre o projeto

Esta é uma API REST desenvolvida utilizando **Node.js** e **Fastify**, com autenticação usando **JWT** e criptografia de senha com **Bcrypt**.

A API permite realizar operações CRUD em cursos armazenados em um banco de dados **PostgreSQL**.

Projeto desenvolvido para fins de **aprendizado e portfólio backend**.

# Tecnologias utilizadas
* Node.js
* Fastify
* PostgreSQL
* JWT (Autenticação)
* Bcrypt (Criptografia de senha)
* CORS
* Dotenv

  
# 📂 Estrutura do Projeto

```
project
│
├── server.js
├── db.js
├── .env
│
├── rotas
│   ├── cursos.js
│   └── usuarios.js
```

---

#  Instalação do projeto

Clone o repositório:

```
git clone https://github.com/seu-usuario/api-fastify-postgresql-cursos.git
```

Entre na pasta do projeto:

```
cd api-fastify-postgresql-cursos
```

Instale as dependências:

```
npm install
```

---

#  Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto:

```
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=cursosdb

JWT_SECRET=seu_segredo
```

---

#  Estrutura do Banco de Dados

### Tabela Cursos

```sql
CREATE TABLE cursos (
 id SERIAL PRIMARY KEY,
 nome VARCHAR(100),
 horas INT,
 ano INT
);
```

# 🔑 Autenticação

A API utiliza **JWT (JSON Web Token)**.

O token possui validade de:

```
1 hora
```

Todas as rotas de cursos exigem autenticação.

---

# 📌 Endpoints da API

## Criar usuário / Login

```
POST /v1/PostUsers
```

Body:

```json
{
 "email": "admin@email.com",
 "senha": "123456"
}
```

Retorno:

```
Token JWT
```

---

## Listar cursos

```
GET /v1/GetCursos
```

---

## Criar curso

```
POST /v1/PostCursos
```

Body:

```json
{
 "nome": "Node.js",
 "horas": 40,
 "ano": 2025
}
```

---

## Atualizar curso

```
PUT /v1/PutCursos/:id
```

---

## Deletar curso

```
DELETE /v1/DeleteCursos/:id
```

---

# 🧪 Testes

Os testes da API podem ser realizados utilizando:

* Postman
Authorization: Bearer SEU_TOKEN

---
# 📚 Conceitos aplicados

* API REST
* CRUD
* Autenticação com JWT
* Criptografia de senha
* Middleware de autenticação
* Conexão com banco PostgreSQL
* Organização de rotas

---

# 👩‍💻 Autora

Projeto desenvolvido por **Yasmin Karolayne** para estudos de **Backend**.
