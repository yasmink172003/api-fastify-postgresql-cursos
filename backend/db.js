require('dotenv').config()
const { Pool } = require('pg');
let pool;

if (!pool) {
  pool = new Pool({//configuraçoes do banco de dados
    user: 'postgres',//usuario do banco de dados 
    host: '127.0.0.1',//host do banco de dados
    database: 'cursos_dev',//nome do banco de dados
    password: '#Yas200322',//senha do banco de dados
    port: 5431,//porta do banco de dados
    max: 100,//numero maximo de conexoes com o banco de dados
    idleTimeoutMillis: 5000,//tempo para liberar conexoes ociosas
    connectionTimeoutMillis: 40000,//tempo para conectar o banco de dados 
    statement_timeout: 20000, // Timeout para execução de queries
  });
}

module.exports = {
    pool
};