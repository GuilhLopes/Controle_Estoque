const { Pool } = require("pg");

const cliente = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Controle_Estoque',
    password: '123',
    port: 5432,
});

module.exports = cliente;