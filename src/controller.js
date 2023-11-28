const db = require('./dao/db');

async function fazerLogin(pass, login, app){
    
    var nome, senha;
    await db.query({
        name: 'fetch-user',
        text: 'select * from funcionarios where nome = $1',
        values: [login],
    })
    .then(results => {
        nome = results.rows[0]['nome'];
        senha = results.rows[0]['senha'];
        if(nome == undefined || senha == undefined){
            app.redirect('/');
        }else{
            if(login == nome && pass == senha){
                app.redirect('/produtos');
            }else{
                app.redirect('/');
            }
        }
    });
}

async function cadastrarProduto(nome, quantidade, preco){
    await db.query('insert into produtos (nome,quantidade,preco) values($1,$2,$3)', [nome,quantidade,preco])
    .then(console.log('Produto cadastrado com sucesso!!'));
}
async function cadastrarUsuario(nome,senha,numero,salario,email){
    await db.query('insert into funcionarios (nome,senha,telefone,salario,email) values ($1,$2,$3,$4,$5)', [nome,senha,numero,salario,email])
    .then(console.log('Usuário cadastrado com sucesso!!'));
}

async function recuperarUsuario(res){
    let dados = await db.query('select * from funcionarios');
    res.json(dados.rows);
}

async function recuperarProduto(res){
    let dados = await db.query('select * from produtos');
    res.json(dados.rows);
}

async function deletarUsuario(id){
    (await db.query('delete from funcionarios where id = $1',[id]));
}

async function deletarProdutos(id){
    (await db.query('delete from produtos where id = $1',[id]));
}

module.exports ={
    fazerLogin: fazerLogin,
    cadastrarProduto: cadastrarProduto,
    cadastrarUsuario: cadastrarUsuario,
    recuperarUsuario: recuperarUsuario,
    recuperarProduto: recuperarProduto,
    deletarUsuario: deletarUsuario,
    deletarProdutos: deletarProdutos
}