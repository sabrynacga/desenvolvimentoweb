# Exercício da Semana 4 - JavaScript Intermediário

Este projeto consolida os conhecimentos em métodos avançados de array, manipulação de DOM e captura de eventos com JavaScript.

## Métodos de Array Utilizados

O projeto utiliza amplamente métodos funcionais para trabalhar com arrays:

- **`map()`**: Utilizado para transformar elementos de um array, criando e retornando um novo array do mesmo tamanho com os dados transformados. Foi usado para criar um array com nomes em maiúsculas e para extrair os nomes dos objetos produtos.
- **`filter()`**: Utilizado para criar um novo array contendo apenas os elementos que passam em uma condição de teste (retornando `true`). Foi usado para filtrar preços maiores que 20 e produtos que custam menos que 50.
- **`reduce()`**: Utilizado para iterar sobre o array e acumular um valor final, reduzindo o array a um único resultado. Foi utilizado para somar o valor total de todos os preços.
- **`forEach()`**: Utilizado apenas para iterar sobre os elementos do array e executar uma ação para cada um, sem gerar um novo array em retorno. Foi usado para imprimir saudações e adicionar dinamicamente elementos `<li>` no DOM a partir de um array.

## Lógica de Manipulação do DOM

O **DOM (Document Object Model)** é manipulado diretamente via JavaScript para alterar a página dinamicamente sem necessidade de recarregá-la. Utilizamos as seguintes lógicas:
- `querySelector` e `querySelectorAll` para buscar elementos pelos seus seletores CSS (`#id`, `.classe` ou tags).
- Alteração de conteúdo textual e estrutural via `textContent` e `innerHTML`.
- Criação de novos nós no DOM através de `document.createElement()`, inseridos dinamicamente na página através do método `append()`.
- Modificação de estilos dinamicamente usando a propriedade `classList` (métodos `add`, `toggle`, `contains`) para alterar o estado visual dos elementos na tela.

## Importância do *Event Delegation*

No Bloco 3, implementamos o conceito de **Event Delegation** (Delegação de Eventos). Em vez de adicionar um `addEventListener` individual para cada `<li>` da lista, adicionamos apenas **UM listener** no elemento pai (`<ul id="lista">`). 

**Por que isso é essencial e importante?**
1. **Performance e Memória**: Reduz drasticamente o uso de memória do navegador, já que criamos apenas 1 listener no elemento pai ao invés de dezenas ou centenas nos elementos filhos.
2. **Elementos Dinâmicos**: Permite que elementos filhos criados *depois* que a página já carregou (via JavaScript ou formulários) também respondam aos eventos sem que precisemos anexar um novo listener a cada nova inserção no DOM. O evento "sobe" ou "borbulha" (*event bubbling*) do elemento filho onde ocorreu a ação do usuário até o elemento pai, que o intercepta e verifica quem disparou a ação através da propriedade `e.target`.

