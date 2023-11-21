const express = require('express');
const session = require('express-session');
const bodyparser = require('body-parser');
const db = require('./dao/db.js');

const port = 3000;
var path = require('path');
const app = express();


var login;
var senha;

app.use(session({secret:'2h1vbjwbqndj2b1i4k1n4'}));
app.use(bodyparser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));

async function fazerLogin(pass, login){
    
    await db.connect();
    var ep = await db.query({
        name: 'fetch-user',
        text: 'select * from funcionarios where nome = $1',
        values: [login],
    });

    var nome = ep.rows[0]['nome'];
    var senha = ep.rows[0]['senha'];

    if(nome == undefined || senha == undefined){
        await db.end();
        return false;
    }else{
        if(login == nome && pass == senha){
            await db.end();
            return true;
        }else{
            await db.end();
            return false;
        }
    }
}

app.post('/', function(req,res){
    
    if(fazerLogin(req.body.password, req.body.login)){
        req.session.login = req.body.login;
        res.redirect('/');
    }else{
        res.render('index');
    }
});

app.get('/', function(req,res){
    if(req.session.login){
        res.render('home');
    }else{
        res.render('index');
    }
});

app.listen(port, ()=>{
    console.log('Site está rodando no localhost:3000');
});