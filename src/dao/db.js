const db = require("pg");

const cliente = new db.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Controle_Estoque',
    password: '123',
    port: 5432,
});

module.exports = cliente;