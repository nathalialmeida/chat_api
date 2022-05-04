//var results = document.getElementById('mensagens');
//var mensagensSalvas = document.getElementById('mensagens_salvas');

var mensagem = document.getElementById('mensagem');
var origem = document.getElementById('origem');
var destino = document.getElementById('destino');

var mostrar = document.getElementById('mostrar');
var exibir = document.getElementById('exibir');

var obj = {};
var objUsuario = {};

var intervalo = undefined;
var response = undefined;

var email = document.getElementById('email');
var senha = document.getElementById('senha');
var hiddenSenha = document.getElementById('senha');
var hiddenMensagem = document.getElementById('hiddenMensagem');

var consultar = function (){
    var xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
    `https://barth.com.br/ApiChatCliqx/chat/verificarMensagem.php?origem=${origem.value}&destino=${destino.value}`
    );
    
    xhr.send(null);
        
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) { 
                mostrar.innerHTML = " ";

                response = JSON.parse(xhr.responseText);
                for (var i = 0; i < response.length; i++) {
                    
                    var li = document.createElement("li");

                    var dt = document.createElement("dt");
                    console.log(response[i]);
                    var dtText = document.createTextNode(`${response[i].origem}`);
                    dt.appendChild(dtText);
                    li.appendChild(dt);
          
                    var dd = document.createElement("dd");
                    var ddText = document.createTextNode(`${response[i].mensagem}`);
                    dd.appendChild(ddText);
                    li.appendChild(dd);

                    mostrar.appendChild(li);
                } 
            }         
        }
    } 
}   


var enviar = function(){
    clearInterval(intervalo);

    obj = {   
        origem : origem.value,
        destino : destino.value,
        mensagem : mensagem.value,
    }
    console.log(obj.destino);

    var xhr = new XMLHttpRequest();
    xhr.open(
        "POST",
    `https://barth.com.br/ApiChatCliqx/chat/inserirMensagem.php`
    );
    xhr.send(JSON.stringify(obj));
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
               intervalo = setInterval(function(){
                consultar()
               },3000); 
            }
        }
    } 
}


var exibirUsuario = function(){
    var xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
    `https://barth.com.br/ApiChatCliqx/chat/verificarLogin.php?email=${email.value}&senha=${senha.value}`
    );
    
    xhr.send(null);
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                response = JSON.parse(xhr.responseText);
                console.log(response)
                console.log(email.value)
                console.log(senha.value)
                email.innerHTML = response.email;
                senha.innerHTML = response.senha;
                
                if(response.login === true){
                  window.location.href = `./exibir.html?nome=${email.value}`;
                }
                if(response.mensagem){
                    hiddenSenha = true;
                    hiddenMensagem = false;
                    mensagem.innerText = response.mensagem;                     
                }
            }
        } 
    }
}    
var consultarCadrastro = function(){

    var select = document.createElement('select');
    var option = document.createElement('option');             
    
    objUsuario = {
        nome: undefined,
    }
    var xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
    `https://barth.com.br/ApiChatCliqx/chat/receberUsuarios.php`
    );
    xhr.send(null);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                response = JSON.parse(xhr.responseText); 
               nome.innerHTML = response.nome;
            }
            for (var i = 0; i < response.length; i++){
                if( obj.login != response[i].nome){
                    var nomeUsuario = document.createTextNode(`${response[i].nome}`);
                    option.appendChild(nomeUsuario);
                    select.appendChild(option);           
                }
                else{
                    console.log('Usuario não cadastrado')
                }
            }            
            exibir.appendChild(select);
        } 
    }
}