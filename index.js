const express = require('express');
const session = require('express-session');
const bodyparser = require('body-parser');

const port = 3000;
var path = require('path');
const app = express();

var login = 'gerente';
var senha = '123';

app.use(session({secret:'2h1vbjwbqndj2b1i4k1n4'}));
app.use(bodyparser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));

app.post('/', function(req,res){

    if(req.body.password == senha && req.body.login == login ){
        req.session.login = login;
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