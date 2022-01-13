//alert("entrou no codigo")
const myModal = new bootstrap.Modal("#transaction-modal");  // Linkar modal com JS - para poder fechar a modal
let logged = sessionStorage.getItem("logged");              // logged = nome dado na função sessionStorage
// para indicar usuario logado
const session = localStorage.getItem("session");            // Usuario salvo na sessão    



let data = {
    transactions: []
};

// Verifica se o usuario clicou no botão de sair (logout)
document.getElementById("buttom-logout").addEventListener("click", logout);
document.getElementById("transactions-button").addEventListener("click", function(){
    window.location.href = "transactions.html";
});


// Adicionar lançamentos
document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value; // Pega o valor checado entrada ou saida

    // push adiciona embaixo da lista e unshift adiciona em cima
    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();       // Faz o reset do formulário (clear)
    myModal.hide();         // Esconde o modal apos tudo concluido

    getCashIn();            // Atualiza valores das entradas e saidas
    getCashOut();
    getTotal();

    alert("Lançamento adicionado com sucesso!");
});

checkLogged();

// Verifica se usuario está e se deve permanecer logado
function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);  // Salva o true or false na sessão
        logged = session;                           // Salva o"session true ou falso" em "logged"       
    }

    if (!logged) {
        window.location.href = "index.html";        // Se NÃO estiver logado manda para index.html
    }

    const dataUser = localStorage.getItem(logged);  // Verifica se usuario logado tem transaçãoes (transactions)
    if (dataUser) {                               // Se dataUser == true
        data = JSON.parse(dataUser);            // Reverte strings de dataUser para Objeto novamente
    }

    //console.log(data);
    getCashIn();                                // Pega todas transactions do usuario quando estiver logado
    getCashOut();
    getTotal();
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getCashIn() {
    const transactions = data.transactions;
    // faz um filtro para pegar todas transações apenas de tipo 1 = entradas
    const cashIn = transactions.filter((item) => item.type == "1"); // Type 1 = entrada , Type 2 = saida

    //console.log(cashIn); // Para testar
    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        // Serve para ajustar a quantidade de cashIn e não dar erro ao percorrer array
        if (cashIn.length > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            //console.log(index);           //Para testar
            //console.log(cashIn[index]);   //Para testar
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${cashIn[index].description}</p> 
                                </div>
                            <div class="col-12  col-md-3 d-flex justify-content-end"> 
                            ${cashIn[index].date}
                            </div>
                        </div>  
                    </div>  
                </div>
            </div>                                        
            `
        }

        document.getElementById("cash-in-list").innerHTML = cashInHtml;

    }
}


function getCashOut() {
    const transactions = data.transactions;
    // faz um filtro para pegar todas transações apenas de tipo 1 = entradas
    const cashIn = transactions.filter((item) => item.type == "2"); // Type 1 = entrada , Type 2 = saida

    //console.log(cashOut); // Para testar
    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        // Serve para ajustar a quantidade de cashIn e não dar erro ao percorrer array
        if (cashIn.length > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            //console.log(index);           //Para testar
            //console.log(cashIn[index]);   //Para testar
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row" >
                                <div class="col-12 col-md-8" >
                                    <p>${cashIn[index].description}</p> 
                                </div>
                            <div class="col-12  col-md-3 d-flex justify-content-end"> 
                            ${cashIn[index].date}
                            </div>
                        </div>  
                    </div>  
                </div>
            </div>                                        
            `
        }

        document.getElementById("cash-out-list").innerHTML = cashInHtml;

    }
}

function getTotal() {       // faz um foreach com todas transações
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if(item.type == "1"){
            total += item.value;
        }else{
            total -= item.value;
        }
    });
    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}

// Salva os dados da transaction(lista) no data.login do usuario
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}