// ==========================================
// Bloco 1 - Arrays e Métodos (map, filter, reduce, forEach)
// ==========================================
console.log("--- Bloco 1 ---");

// 1. Array nomes
const nomes = ["Ana", "Carlos", "Beatriz"];
console.log("Saudação com forEach:");
nomes.forEach(nome => {
    console.log(`Olá, ${nome}!`);
});

const nomesMaiusculos = nomes.map(nome => nome.toUpperCase());
console.log("Nomes em maiúsculas (map):", nomesMaiusculos);

// 2. Array precos
const precos = [10, 25, 40, 5, 60];
const precosAcimaDe20 = precos.filter(preco => preco > 20);
console.log("Preços acima de 20 (filter):", precosAcimaDe20);

const somaPrecos = precos.reduce((acumulador, preco) => acumulador + preco, 0);
console.log("Soma de todos os preços (reduce):", somaPrecos);

// 3. Array de objetos produtos
const produtos = [
    { nome: "Caderno", preco: 15 },
    { nome: "Mochila", preco: 120 },
    { nome: "Caneta", preco: 5 },
    { nome: "Livro", preco: 45 }
];

const nomesProdutos = produtos.map(produto => produto.nome);
console.log("Nomes dos produtos (map):", nomesProdutos);

const produtosMenoresQue50 = produtos.filter(produto => produto.preco < 50);
console.log("Produtos com preço menor que 50 (filter):", produtosMenoresQue50);

const somaPrecosProdutos = produtos.reduce((acc, produto) => acc + produto.preco, 0);
console.log("Soma do preço dos produtos (reduce):", somaPrecosProdutos);

console.log("Lista de produtos com forEach:");
produtos.forEach(produto => {
    console.log(`Nome: ${produto.nome} - R$ ${produto.preco}`);
});


// ==========================================
// Bloco 2 - Manipulação do DOM (querySelector, createElement, classList)
// ==========================================
console.log("\n--- Bloco 2 ---");

// 1. Seleção do h1 e alteração de texto
const titulo = document.querySelector("#titulo");
if (titulo) {
    titulo.textContent = "Blog do Sabryna"; 
}

// 2. Seleção de todos os parágrafos
const paragrafos = document.querySelectorAll(".texto");
console.log("Textos dos parágrafos (.texto):");
paragrafos.forEach(p => console.log(p.textContent));

// 3. Uso do innerHTML para inserir 2 itens na lista
const lista = document.querySelector("#lista");
if (lista) {
    lista.innerHTML += `
        <li>Item inserido via innerHTML 1</li>
        <li>Item inserido via innerHTML 2</li>
    `;

    // 4. Criação de um <li> com createElement
    const novoItem = document.createElement("li");
    novoItem.textContent = "Terceiro item";
    lista.append(novoItem);

    // 5. Uso do classList.add
    novoItem.classList.add("destaque");
    console.log("O novo item possui a classe 'destaque'?", novoItem.classList.contains("destaque"));

    // 6. Array de tarefas
    const tarefas = ["Estudar JS", "Fazer exercícios", "Revisar DOM"];
    tarefas.forEach(tarefa => {
        const liTarefa = document.createElement("li");
        liTarefa.textContent = tarefa;
        lista.append(liTarefa);
    });

    // Aplicação da classe 'feito' ao primeiro <li>
    const primeiroLi = document.querySelector("li");
    if (primeiroLi) {
        primeiroLi.classList.add("feito");
    }

    // Impressão da quantidade total de itens
    const totalItens = document.querySelectorAll("li").length;
    console.log("Quantidade total de itens da lista:", totalItens);
}


// ==========================================
// Bloco 3 - Eventos e Event Delegation (addEventListener, submit, e.target)
// ==========================================
console.log("\n--- Bloco 3 ---");

// 1. e 2. Listeners de click e mouseover no botão
const botao = document.querySelector("#botao");
if (botao) {
    botao.addEventListener("click", () => {
        console.log("Clicou!");
    });

    botao.addEventListener("mouseover", () => {
        botao.textContent = "Pode clicar!";
    });
}

// 3. Listener de keyup no campo #nome
const inputNome = document.querySelector("#nome");
if (inputNome) {
    inputNome.addEventListener("keyup", () => {
        console.log("Valor do campo #nome:", inputNome.value);
    });
}

// 4. Event Delegation na #lista
if (lista) {
    lista.addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("feito");
            console.log("Item clicado (Event Delegation):", e.target.textContent);
        }
    });

    // Criação de um novo <li> via JS para testar
    const liDinamico = document.createElement("li");
    liDinamico.textContent = "Novo item dinâmico para testar o clique";
    lista.append(liDinamico);
}

// 5. Formulário
const formulario = document.querySelector("#formulario");
const inputTarefa = document.querySelector("#tarefa");

if (formulario && inputTarefa) {
    formulario.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita recarregamento da página

        const textoTarefa = inputTarefa.value.trim();

        if (textoTarefa !== "") {
            const novaLi = document.createElement("li");
            novaLi.textContent = textoTarefa;
            lista.append(novaLi);
            
            inputTarefa.value = ""; // Limpa o campo
        }
    });
}

