// ==========================================
// Parte 1 – Manipulação e Validação de Dados
// ==========================================
console.log("--- Parte 1: Manipulação de Dados ---");

const pedidos = [
    { cliente: "Ana", valor: 150.50, status: "pago" },
    { cliente: "", valor: 50.00, status: "pago" }, // Inválido (cliente vazio)
    { cliente: "Carlos", valor: -10, status: "pendente" }, // Inválido (valor < 0)
    { cliente: "Bia", valor: 120.00, status: "pago" },
    { cliente: "João", valor: 300.00, status: "cancelado" },
    { cliente: "Maria", valor: 80.00, status: "pago" }
];

// 1. Validar pedidos (cliente não vazio e valor numérico maior que 0)
const pedidosValidos = pedidos.filter(pedido => {
    return typeof pedido.cliente === 'string' && 
           pedido.cliente.trim() !== "" && 
           typeof pedido.valor === 'number' && 
           pedido.valor > 0;
});

// 2. Dos pedidos válidos, filtrar apenas status "pago"
const pedidosPagos = pedidosValidos.filter(pedido => pedido.status === "pago");

// 3. Calcular o total faturado utilizando reduce
const totalFaturado = pedidosPagos.reduce((acumulador, pedido) => acumulador + pedido.valor, 0);

// 4. Gerar textos formatados (Bia - R$ 120.00)
console.log("Pedidos Faturados (Válidos e Pagos):");
pedidosPagos.forEach(pedido => {
    console.log(`${pedido.cliente} - R$ ${pedido.valor.toFixed(2)}`);
});

console.log(`\nTotal Faturado: R$ ${totalFaturado.toFixed(2)}`);


// ==========================================
// Parte 2 – Mini Projeto: Buscador de CEP
// ==========================================
const formCep = document.getElementById("form-cep");
const inputCep = document.getElementById("input-cep");
const btnCep = document.getElementById("btn-cep");
const statusCep = document.getElementById("status-cep");
const resultadoCep = document.getElementById("resultado-cep");
const listaHistoricoCep = document.getElementById("historico-cep");

const historicoCeps = []; // Bônus: Array para guardar o histórico

formCep.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Validação de entrada
    let cepBruto = inputCep.value.trim();
    let cepLimpo = cepBruto.replace(/\D/g, ""); // RegEx: remove tudo que não for dígito
    
    if (cepLimpo.length !== 8) {
        mostrarStatusCep("CEP inválido! Deve conter exatamente 8 dígitos.", true);
        return;
    }

    // Estado: Carregando
    mostrarStatusCep("Buscando...", false);
    btnCep.disabled = true;
    resultadoCep.replaceChildren(); // Limpa resultado anterior

    try {
        const url = `https://viacep.com.br/ws/${cepLimpo}/json/`;
        const response = await fetch(url);
        
        // Estado: Erro (falha HTTP)
        if (!response.ok) {
            throw new Error(`Falha na requisição HTTP: ${response.status}`);
        }

        const data = await response.json();

        // Estado: Vazio/Não Encontrado (API do ViaCEP retorna { erro: true })
        if (data.erro) {
            mostrarStatusCep("CEP não encontrado.", true);
            return;
        }

        // Estado: Sucesso
        statusCep.textContent = ""; // Limpa a mensagem de carregando/erro
        
        // Criação dinâmica com createElement e append
        criarItemDefinicaoCep(resultadoCep, "Logradouro", data.logradouro || "Não informado");
        criarItemDefinicaoCep(resultadoCep, "Bairro", data.bairro || "Não informado");
        criarItemDefinicaoCep(resultadoCep, "Cidade/UF", `${data.localidade} - ${data.uf}`);
        
        // Bônus: Salvar histórico
        adicionarHistoricoCep(cepLimpo, `${data.logradouro || data.localidade}`);

    } catch (error) {
        // Estado: Erro (sem internet, timeout, etc)
        mostrarStatusCep(`Erro na conexão: ${error.message}`, true);
    } finally {
        btnCep.disabled = false;
        inputCep.value = ""; // Limpa input
    }
});

function mostrarStatusCep(mensagem, isError) {
    statusCep.textContent = mensagem;
    statusCep.className = isError ? "status error" : "status";
}

function criarItemDefinicaoCep(listaDl, termo, descricao) {
    const dt = document.createElement("dt");
    dt.textContent = termo;
    const dd = document.createElement("dd");
    dd.textContent = descricao;
    listaDl.append(dt, dd);
}

function adicionarHistoricoCep(cep, local) {
    // Evitar duplicações no histórico
    const jaExiste = historicoCeps.some(item => item.cep === cep);
    if (!jaExiste) {
        historicoCeps.push({ cep, local });
        atualizarHistoricoCepDOM();
    }
}

function atualizarHistoricoCepDOM() {
    listaHistoricoCep.replaceChildren();
    historicoCeps.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `CEP: ${item.cep} - ${item.local}`;
        listaHistoricoCep.append(li);
    });
}


// ==========================================
// Parte 3 – Tarefa de Casa: Desafio Mini Pokédex
// ==========================================
const formPokemon = document.getElementById("form-pokemon");
const inputPokemon = document.getElementById("input-pokemon");
const btnPokemon = document.getElementById("btn-pokemon");
const statusPokemon = document.getElementById("status-pokemon");
const resultadoPokemon = document.getElementById("resultado-pokemon");

formPokemon.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Validação: checa vazio e converte para minúsculo
    const nomePokemon = inputPokemon.value.trim().toLowerCase();
    if (!nomePokemon) {
        mostrarStatusPokemon("Por favor, insira o nome de um Pokémon.", true);
        return;
    }

    // Estado: Carregando
    mostrarStatusPokemon("Buscando Pokémon...", false);
    btnPokemon.disabled = true;
    resultadoPokemon.replaceChildren();

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`);
        
        // Estado: Erro / Não encontrado (404)
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Pokémon não encontrado.");
            }
            throw new Error(`Erro na comunicação com a PokéAPI. Código: ${response.status}`);
        }

        const data = await response.json();

        // Estado: Sucesso
        statusPokemon.textContent = "";

        // Título H3 com nome do Pokémon
        const nomeEl = document.createElement("h3");
        nomeEl.textContent = `#${data.id} - ${data.name.toUpperCase()}`;

        // Imagem
        const imgEl = document.createElement("img");
        imgEl.src = data.sprites.front_default;
        imgEl.alt = `Imagem do Pokémon ${data.name}`;
        imgEl.className = "pokemon-img";

        // Parágrafo de Tipos
        const tiposP = document.createElement("p");
        // Extrai os tipos, converte os nomes e junta numa string com vírgulas
        const tiposFormatados = data.types.map(item => item.type.name).join(", ");
        tiposP.innerHTML = `<strong>Tipos:</strong> ${tiposFormatados}`;

        resultadoPokemon.append(nomeEl, imgEl, tiposP);

    } catch (error) {
        // Estado: Erro tratado
        mostrarStatusPokemon(error.message, true);
    } finally {
        btnPokemon.disabled = false;
        inputPokemon.value = ""; // Limpa campo
    }
});

function mostrarStatusPokemon(mensagem, isError) {
    statusPokemon.textContent = mensagem;
    statusPokemon.className = isError ? "status error" : "status";
}

