const mymodal = new bootstrap.Modal("#register-modal");     // Linkar modal com JS - para poder fechar a modal
let logged = sessionStorage.getItem("logged");              // logged = nome dado na função sessionStorage
                                                            // para indicar usuario logado
const session = localStorage.getItem("session");            // Usuario salvo na sessão    

checkLogged();  // Checa se tem usuario logado e manda para home.html
/*
// Quando o usuario clicar em ("link-conta") de index.html executa a função
document.getElementById("link-conta").addEventListener("click", function(){
   alert("O usuario clicou em criar conta");
   console.log("O usuario clicou em criar conta");
})
*/
// LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit",function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

                             // Função para verificar se tem usuario logado

    //console.log(email,session);
    const account = getAccount(email);      // Passa para a variavel account o email cadastrado (key)

    if(!account){                           // Se conta não encontrada (testa apenas email cadastrado ou não)
        alert("verifique usuario e senha");
        return;
    }

    if(account){                           // Se conta não encontrada dai testa password   
        if(account.password !== password){
            alert("verifique usuario e senha");
        return;
        }
        
        saveSession(email, checkSession);       // Pega valor boleano do checkbox permanecer logado
                                                // Caso email e senha corretos manda para home.html
        window.location.href = "home.html";     // Se o login for realizado com sucesso manda para home.html
    } 
    

});



// CRIAR CONTA

// Quando o usuario submeter o formulario vai executar um evento de Function (e)
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault(); // preventDefault para o SUBMIT não mandar para outra pagina

    //alert("Enviou o form");

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;
    //alert(email + password);
    //console.log(email, password);

    if(email.length < 10){
        alert("email invalido!");
        return;
    }

    if(password.length < 4){
        alert("Senha com no minimo 4 digitos!");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    mymodal.hide(); // Fecha a modal
    alert("Conta criada com sucesso!");


});





    
    // Função que busca os dados do cadastro no storage armazenamento 
    // Usada para login do usuario
    // key = nosso email
    function getAccount(key){
        const account = localStorage.getItem(key);      // Busca dados da conta no local storage

        if(account){                        // Verifica se conta foi encontrada
            return JSON.parse(account);     // Parse nessessario para transformar string novamente em objeto
        }
        return "";                          // Se não encontrar retorna vazio
    }

    

    // Verifica se usuario está e se deve permanecer logado
    function checkLogged(){
        if(session){
            sessionStorage.setItem("logged", session);  // Salva o true or false na sessão
            logged = session;                            // Salva o"session true ou falso" em "logged"
        }

        if(logged){
            saveSession(logged, session);               // Se usuario marcou para permanecer logado fica logado
            window.location.href = "home.html";         // Salva sessão do usuario
        }
    }

// Função que salva os dados do cadastro no storage armazenamento 
    // Para a criação do usuario
    function saveAccount(data){
        //console.log(data);                // Apenas para mostrar que pegou os dados no console
        localStorage.setItem(data.login, JSON.stringify(data));
    }


    // Função para testar se usuario deve permanecer logado ou não
    function saveSession(data, saveSession){        // data, savesession são nomes livres
        if(saveSession){                            // saveSession pode ser true or false
            localStorage.setItem("session", data);  // Se for true, salva no localstorage 
                                                    // data= email do usuario , "session" onde será salvo
        }
        sessionStorage.setItem("logged", data);     // Caso não marcado checkbox salva na sessão
    }