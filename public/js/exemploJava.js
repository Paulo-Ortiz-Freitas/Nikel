const nome = "Paulo";
let nome2 = "";
let pessoaDefault = {
    nome: "Paulo",
    idade: "33",
    trabalho: "programador"
}
//////////////////////////////////////////



///////////// Lista de nomes /////////////
let nomes = ["Marcelo", "Maria", "Pedro"];

// Imprime toda matriz de nomes
//console.log(nomes);
 
// imprime posição(nome) especifico
//console.log(nomes[0]);

//////////////////////////////////////////



///////////// Lista de pessoas ///////////
let pessoas = [
    {
        nome: "Paulo",
        idade: "33",
        trabalho: "programador"
    },
    {
    nome: "Maria",
    idade: "23",
    trabalho: "UX/UI"
    }
];
//console.log(pessoas);

///////////////////////////////////////////



///////////// Criando Funções /////////////
function alterarNome() {
    nome2 = "Maria";
    console.log("Valor alterado: ");
    console.log(nome2);
}

function recebeEAlteraNome(novoNome){
    nome2 = novoNome;
    console.log("Valor alterado recebendo um nome: ");
    console.log(nome2);
}

// Função para imprimir pessoa
function imprimirPessoa(pessoa){
console.log("Nome: ");
console.log(pessoa.nome);

console.log("Idade: ");
console.log(pessoa.idade);

console.log("Trabalho: ");
console.log(pessoa.trabalho);
}


// Função para adicionar pessoa por matriz

function adicionarPessoa(pessoa) {
    pessoas.push(pessoa);
}




////////////////////////////////////////////


// Função para imprimir pessoas individualmente

function imprimirPessoas(){
    console.log(" ------------- IMPRIMIR PESSOAS ---------- ")
    pessoas.forEach((item) => {
    console.log("Nome:");
    console.log(item.nome);

    console.log("Idade: ");
    console.log(item.idade);

    console.log("Trabalho: ");
    console.log(item.trabalho);
    })
}

imprimirPessoas();

adicionarPessoa({
    nome: "Pedro",
    idade: "28",
    trabalho: "Porteiro"
});

imprimirPessoas();



//////////////////////////////////////////////////////////

//imprimirPessoa(pessoaDefault);


/*
// Imprimindo direto sem usar função
imprimirPessoa({
    nome: "Maria",
    idade: "25",
    trabalho: "UX/UI designer"
    });

*/


