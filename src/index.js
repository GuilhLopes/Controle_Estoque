const express = require('express');
const session = require('express-session');
const bodyparser = require('body-parser');
const control = require('./controller.js');

const port = 3000;
var path = require('path');
const app = express();

app.use(session({secret:'2h1vbjwbqndj2b1i4k1n4'}));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));



app.post('/', function(req,res){
    control.fazerLogin(req.body.password, req.body.login, res);
});

app.post('/produtos', (req,res)=>{
    prod = req.body;
    control.cadastrarProduto(prod.nome, prod.quantidade, prod.preco);
    res.json({ success: true });
});

app.post('/funcionarios', (req,res)=>{
    prod = req.body;
    control.cadastrarUsuario(prod.nome, prod.senha, prod.telefone, prod.salario, prod.email);
    res.json({success:true});
})

app.get('/recUsuarios', (req,res)=>{
    control.recuperarUsuario(res);
});

app.get('/recProdutos', (req,res)=>{
    control.recuperarProduto(res);
});

app.get('/funcionarios', (req,res)=>{
    res.render('users');
});

app.delete('/funcionarios', (req,res)=>{
    control.deletarUsuario(req.body.id);
    res.json({success:true});
});

app.get('/produtos', (req,res)=>{
    res.render('home');
});

app.delete('/produtos', (req,res)=>{
    control.deletarProdutos(req.body.id);
    res.json({success:true});
});

app.get('/', function(req,res){
        res.render('index');
});

app.listen(port, ()=>{
    console.log('Site está rodando no localhost:3000');
});