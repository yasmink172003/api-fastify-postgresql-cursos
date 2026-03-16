const fastify = require('fastify')({ logger: true })// importa o fastify
const jwt = require('@fastify/jwt')//importa o jwt
const cors = require('@fastify/cors')//importa o cors
const bcrypt = require('bcrypt')//importa o bcrypt
require('dotenv').config()//importa as variaveis do ambiente
const { pool } = require('./db')//importa a conexa com banco de dados 

const cursos = require('./rotas/cursos.js')//imporat a rota de cursos 
const usuarios = require('./rotas/usuarios.js')//importa a rota de usuarios

const jwtSecret = process.env.JWT_SECRET//variavel de ambiente para jwt

// CORS
fastify.register(cors)//frontend pode acessar a api
// JWT
const jwtSecret = "S3NH@- S3CR3T@"
fastify.register(jwt, {//configura o jwt
    secret: jwtSecret
})

// Middleware autenticação
fastify.decorate("authenticate", async (req, reply) => {
try{
await request.jwtVerify()//verfica se o token é valido
}
catch(err){//se o token for invalido retorna o
reply.send(err)
}
})

// ROTAS
fastify.get('/v1/GetCursos',{preHandler:[fastify.authenticate]},cursos.GetCursos(pool))
fastify.post('/v1/PostCursos',{preHandler:[fastify.authenticate]},cursos.PostCursos(pool))
fastify.put('/v1/PutCursos/:id',{preHandler:[fastify.authenticate]},cursos.PutCursos(pool))
fastify.delete('/v1/DeleteCursos/:id',{preHandler:[fastify.authenticate]},cursos.DeleteCursos(pool))
fastify.post('/v1/PostUsers',usuarios.authUsers(pool,fastify.jwt,bcrypt,jwtSecret))

//Servidor
fastify.listen({port: 3000}, ()=>{
    console.log("Servidor rodando na porta 3000")
});
