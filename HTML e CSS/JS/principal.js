let inome = "Gerente";
let isenha = "123";

function login(){
    const form = document.forms.myForm;
    const nome = form.nome.value;
    const senha = form.senha.value;

    if (nome == inome && senha == isenha){
        window.location.pathname="file:///C:/Users/guilh/Desktop/WEB/Controle_Estoque/HTML%20e%20CSS/p.html";
    }else if(nome == "" || senha == ""){
        alert('Informar Usuário ou senha válidos!!');
    }
}

