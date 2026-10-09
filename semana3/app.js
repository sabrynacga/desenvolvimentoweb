// ==========================================
// Bloco 1 - Fundamentos e Variáveis
// ==========================================
console.log("--- Bloco 1 ---");

// 1. Declaração de uma variável let pontos
let pontos = 50;
pontos += 10;
console.log("Pontos:", pontos);

// 2. Declaração de uma constante MAX_PONTOS e tentativa de reatribuição
const MAX_PONTOS = 100;
try {
  MAX_PONTOS = 200; 
} catch (error) {
  console.error("Erro ao reatribuir constante:", error.name, "-", error.message);
  console.log("Motivo: Constantes (declaradas com 'const') não podem ter seus valores reatribuídos após a inicialização.");
}

// 3. Criação de variáveis para cada tipo primitivo e uso de typeof
let tipoString = "Olá, mundo!";
let tipoNumber = 42;
let tipoBoolean = true;
let tipoUndefined;
let tipoNull = null;

console.log("tipoString:", typeof tipoString);
console.log("tipoNumber:", typeof tipoNumber);
console.log("tipoBoolean:", typeof tipoBoolean);
console.log("tipoUndefined:", typeof tipoUndefined);
console.log("tipoNull:", typeof tipoNull); // Retorna 'object' por causa de um bug histórico do JS

// 4. Template Literals vs Concatenação
let nome = "Sabryna";
let curso = "Desenvolvimento Web";

// Template Literals
let fraseTemplate = `Olá, meu nome é ${nome} e estou estudando ${curso}.`;
console.log("Template Literal:", fraseTemplate);

// Concatenação
let fraseConcat = "Olá, meu nome é " + nome + " e estou estudando " + curso + ".";
console.log("Concatenação:", fraseConcat);


// ==========================================
// Bloco 2 - Funções
// ==========================================
console.log("\n--- Bloco 2 ---");

// 1. Função declarada e Hoisting
console.log("Chamando ehMaiorDeIdade antes da declaração (Hoisting):", ehMaiorDeIdade(20));

function ehMaiorDeIdade(idade) {
  return idade >= 18;
}

// 2. Função de expressão e ReferenceError
try {
  console.log(ehMaiorDeIdadeExpressao(20));
} catch (error) {
  console.error("Erro ao chamar função de expressão antes da declaração:", error.name, "-", error.message);
  console.log("Motivo: Funções de expressão (atribuídas a variáveis) não sofrem hoisting completo de sua inicialização.");
}

const ehMaiorDeIdadeExpressao = function(idade) {
  return idade >= 18;
};

// 3. Função dobro em três formas
function dobroDeclarada(n) {
  return n * 2;
}

const dobroExpressao = function(n) {
  return n * 2;
};

const dobroArrow = n => n * 2;

console.log("Dobro Declarada (5):", dobroDeclarada(5));
console.log("Dobro Expressão (5):", dobroExpressao(5));
console.log("Dobro Arrow (5):", dobroArrow(5));

// 4. Função com parâmetro padrão
const multiplica = (a, b = 1) => a * b;
console.log("Multiplica com 2 argumentos (5, 3):", multiplica(5, 3));
console.log("Multiplica com 1 argumento omitindo o segundo (5):", multiplica(5));


// ==========================================
// Bloco 3 - Controle de Fluxo
// ==========================================
console.log("\n--- Bloco 3 ---");

// 1. Função classificarNota(nota)
function classificarNota(nota) {
  if (nota >= 6) {
    return "Aprovado";
  } else {
    return "Reprovado";
  }
}
console.log("classificarNota(7):", classificarNota(7));
console.log("classificarNota(5):", classificarNota(5));

// 2. Variável corSemaforo com switch
let corSemaforo = "verde";
console.log(`\nCor do semáforo: ${corSemaforo}`);
switch (corSemaforo) {
  case "vermelho":
    console.log("Pare");
    break;
  case "amarelo":
    console.log("Atenção");
    break;
  case "verde":
    console.log("Siga");
    break;
  default:
    console.log("Cor inválida");
}

// 3. Tabuada do 5 com for
console.log("\nTabuada do 5:");
for (let i = 1; i <= 10; i++) {
  console.log(`5 x ${i} = ${5 * i}`);
}

// 4. Contagem regressiva de 5 até 1 com while
console.log("\nContagem Regressiva:");
let contador = 5;
while (contador >= 1) {
  console.log(contador);
  contador--;
}

// 5. Números de 1 a 20 indicando par ou ímpar (for e while)
console.log("\nPar ou Ímpar com for (1 a 20):");
for (let i = 1; i <= 20; i++) {
  if (i % 2 === 0) {
    console.log(`${i} é par`);
  } else {
    console.log(`${i} é ímpar`);
  }
}

console.log("\nPar ou Ímpar com while (1 a 20):");
let num = 1;
while (num <= 20) {
  if (num % 2 === 0) {
    console.log(`${num} é par`);
  } else {
    console.log(`${num} é ímpar`);
  }
  num++;
}

// 6. Função diaDaSemana(numero) com switch
function diaDaSemana(numero) {
  switch (numero) {
    case 1:
      return "Domingo";
    case 2:
      return "Segunda-feira";
    case 3:
      return "Terça-feira";
    case 4:
      return "Quarta-feira";
    case 5:
      return "Quinta-feira";
    case 6:
      return "Sexta-feira";
    case 7:
      return "Sábado";
    default:
      return "Número inválido. Insira um valor entre 1 e 7.";
  }
}

console.log("\ndiaDaSemana(1):", diaDaSemana(1));
console.log("diaDaSemana(4):", diaDaSemana(4));
console.log("diaDaSemana(8):", diaDaSemana(8));

