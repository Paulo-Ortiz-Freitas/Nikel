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

    getTransactions();

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
    getTransactions();
}


function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getTransactions(){
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if(transactions.length){        // Testa se há transações e se tiver percorre a lista
        transactions.forEach((item) => {
            let type = "Entrada";

            if(item.type == "2"){
                type = "Saida";
            }

            transactionsHtml += `
            <tr>
                <th scope="row">${item.date}</th>
                <td>${item.value.toFixed(2)}</td>
                <td>${type}</td>
                <td>${item.description}</td>
            </tr>`
            
        })
    }

    document.getElementById("transactions-list").innerHTML = transactionsHtml;
}


// Salva os dados da transaction(lista) no data.login do usuario
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}


