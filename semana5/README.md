# Exercício da Semana 5 - Consumo de APIs e Assincronismo

Este repositório finaliza o mini projeto aplicando conceitos essenciais de desenvolvimento web moderno com JavaScript, focando principalmente no assincronismo e na comunicação com serviços externos.

## O que foi desenvolvido

- **Parte 1 (Manipulação de Dados):** Exercício lógico no `app.js` usando funções de alta ordem de arrays (`filter`, `reduce`, `forEach`) para validar regras de negócio, limpar entradas, filtrar pedidos por status de pagamento e gerar relatórios financeiros. O resultado pode ser visto no `console` (F12).
- **Parte 2 (Buscador de CEP):** Uma aplicação integrada à API pública **ViaCEP**. O input do usuário foi higienizado utilizando expressões regulares e o método `trim()`. Foram tratados com rigor os 4 estados cruciais de uma requisição assíncrona: "Carregando", "Erro" (erros de rede com blocos try/catch), "Não encontrado" (tratando a resposta da API que envia a propriedade `erro` para CEPs inexistentes) e "Sucesso". Inclui funcionalidade bônus com o histórico de pesquisas!
- **Parte 3 (Mini Pokédex):** Aplicação integrada à **PokéAPI**. Este projeto aprimora o tratamento de exceções, checando especificamente a propriedade `response.ok` no retorno do `fetch()`, contornando a limitação nativa do fetch, que não rejeita as *Promises* automaticamente perante retornos de erros de protocolo (como código 404 Not Found), garantindo que mensagens úteis de feedback cheguem ao usuário ("Pokémon não encontrado").

## Parte 4 - Reflexão (Para Pensar)

**Pergunta:** Por que `Promise.all` pode ser mais rápido que vários `await` seguidos?

**Resposta:**
A diferença na performance está no fluxo de execução imposto ao Javascript:

Quando utilizamos **vários `await` sequenciais**, nós bloqueamos o andamento do código intencionalmente. Uma requisição só começa quando a requisição anterior termina:
```javascript
const user = await fetch('/api/user');     // Demora 2 segundos
const posts = await fetch('/api/posts');   // Só começa depois de 2s. Demora mais 2s.
// Tempo total de espera: 4 segundos
```

Quando utilizamos o **`Promise.all`**, repassamos um array contendo todas as *Promises* pendentes. Neste caso, o Javascript envia **todas as requisições em paralelo (simultaneamente)**. A execução irá travar apenas na linha do `await Promise.all(...)`, esperando a requisição mais demorada finalizar:
```javascript
const [user, posts] = await Promise.all([
    fetch('/api/user'),   // Demora 2 segundos (inicia no instante 0)
    fetch('/api/posts')   // Demora 2 segundos (inicia no instante 0)
]);
// Tempo total de espera: Apenas 2 segundos!
```

**Conclusão:** O `Promise.all` é significativamente mais rápido em cenários em que as requisições **não dependem** do resultado umas das outras, pois ele extrai o máximo proveito da rede paralelizando a comunicação, enquanto os vários `await` forçam ociosidade na rede ao esperar por requisições que poderiam estar rodando livremente.

