const {Pool} = require('pg'); 
//importa a classe Pool do módulo pg (pool gerencia conexões com o banco de dados postgreSQL)

const pool = new Pool({ //configuração da conexão com o postgreSQL
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'expressjs'
});

module.exports = { //module.exports exporta funções, objetos ou variáveis
    query: (text, params) => pool.query(text, params)
};
//query recebe os parametros text (query SQL que será executada) e params (valores inseridos na query)
//função query chama pool.query para exeuctar o banco de dados conectado na função pool
