# Especificação Técnica e Diretrizes de IHC: Central OBI UFABC
**Universidade Federal do ABC (UFABC) · Bacharelado em Ciência da Computação**  
**Disciplina:** Interação Humano-Computador (IHC 2026.3)

---

## 1. Princípio Fundamental: Minimalismo, Cores Claras, Arquitetura Tripartite e Código Auditável
- **Visual Minimalista e Moderno**: Fundo claro (`#ffffff` e `#f8fafc`), bordas sutis (`#e2e8f0`), tipografia nítida do sistema e espaçamento generoso. Ausência proposital de ruído visual, animações distrativas ou elementos decorativos supérfluos.
- **Arquitetura Tripartite Estrita (O Padrão Ouro)**:
  - Definida e padronizada em `telas/template-base/`.
  - Cada tela é isolada em um diretório com exatamente três arquivos:
    1. `index.html`: Apenas HTML5 semântico limpo. **Proibido o uso de `<style>` ou `<script>` embutidos/inline**.
    2. `style.css`: Estilos contextuais modulares, consumindo variáveis e tokens de `../../assets/css/tokens.css` e `../../assets/css/base.css`.
    3. `script.js`: Lógica pura, manipulando eventos dentro do listener `DOMContentLoaded`, garantindo desacoplamento total.
- **Auditabilidade Máxima do Código**:
  - Funções com nomes intuitivos e em português (ex.: `salvarResposta()`, `obterRespostas()`, `obterProtocolo()`, `alternarAltoContraste()`, `alterarTamanhoFonte()`).
  - Variáveis autoexplicativas e sem abreviações obscuras.
  - HTML5 semântico puro (`<header>`, `<main>`, `<nav>`, `<fieldset>`, `<legend>`, `<details>`, `<summary>`), sem dependência de frameworks ou bibliotecas externas pesadas. Qualquer avaliador, docente ou estudante consegue auditar o código diretamente pelo inspecionador do navegador.
- **Sustentabilidade e Manutenibilidade**: Estrutura modular e previsível, onde cada tela opera como módulo autônomo baseado em Design Tokens compartilhados.

---

## 2. Acessibilidade Obrigatória em Todas as Telas (WCAG 2.1 Nível AA)
- **Barra de Acessibilidade no Topo**:
  - Botões `[ A- | A+ ]` para diminuir e aumentar o tamanho da fonte com persistência no `localStorage`.
  - Botão `[ ◐ Contraste ]` para alternância imediata para a paleta de Alto Contraste.
- **Alvos de Toque Confortáveis (Touch Targets)**: Altura e largura mínimas de **48px** em todos os botões, links de ação e cartões de opção.
- **Navegação por Teclado e Foco Visível**: Todo elemento interativo possui indicador `:focus-visible` nítido com anel azul (ou amarelo em alto contraste) e deslocamento de 2px.
- **Compatibilidade com Leitores de Tela (NVDA / TalkBack / Orca)**:
  - Um único `<h1>` semântico por tela descrevendo o propósito principal.
  - Cartões de opção estruturados com `<fieldset>` e `<legend>` ou marcação de seleção acessível.
  - Anúncio de confirmações, protocolos e alterações dinâmicas via `aria-live="polite"`.
  - Elementos estritamente visuais ou decorativos anotados com `aria-hidden="true"`.

---

## 3. Diretrizes de Design Ético
- **Sem Barreiras de Entrada**: Zero exigência de login, cadastro prévio ou coleta de senhas para consulta ou diagnóstico.
- **Ambiente Acolhedor e Não Punitivo**: Ausência de rankings comparativos ou contadores de tempo regressivos estressantes.
- **Ausência de Dark Patterns e Pré-seleção Forçada**: Proibição terminante de caixas de seleção ou botões de rádio pré-marcados (`checked`) por padrão. O consentimento e a escolha do estudante devem ser informados, conscientes e ativos (*zero default bias*).
- **Transparência e Ausência de Falsas Urgências**: Sem mensagens manipulativas (*confirmshaming*), sem custos ocultos ou caminhos labirínticos (*roach motel*).
- **Privacidade e LGPD na Prática**: Persistência transparente e local das respostas exclusivamente no navegador do estudante via `localStorage`, sem telemetria invasiva ou cookies desnecessários.

---

## 4. Arquitetura do Fluxo de Diagnóstico & Apoio UFABC (Telas 06 a 12)

O fluxo principal do protótipo é composto por sete telas encadeadas (todas seguindo a tríade `index.html`, `style.css` e `script.js`) que guiam o estudante da educação básica desde a autoavaliação inicial até a garantia de participação pelo polo universitário:

### Tela 06 (`telas/tela-06-quiz-pergunta-1/`): Início do Diagnóstico
- **Arquivos**: `index.html`, `style.css`, `script.js`.
- **Objetivo**: Primeira pergunta do questionário diagnóstico (Barra em 33%).
- **IHC**: Introdução acolhedora à OBI com opções claras entre desafios no papel ou no computador.
- **Persistência**: Armazena a resposta inicial e avança para a Tela 07.

### Tela 07 (`telas/tela-07-quiz-logica/`): Diagnóstico de Preferência
- **Arquivos**: `index.html`, `style.css`, `script.js`.
- **Objetivo**: Identificar afinidade entre lógica conceitual/enigmas ou desenvolvimento de código (Barra em 66%).
- **IHC**: Linguagem simples e sem jargões computacionais avançados.
- **Persistência**: `salvarResposta('preferencia', ...)` e avanço para a Tela 08.

### Tela 08 (`telas/tela-08-quiz-apoio/`): Mapeamento Escolar & Suporte
- **Arquivos**: `index.html`, `style.css`, `script.js`.
- **Objetivo**: Identificar a série escolar e a existência de professor cadastrado na OBI na escola do aluno (Barra em 100%).
- **IHC**: Mapeamento do perfil e diagnóstico de carência de apoio institucional na escola de origem.
- **Persistência**: Salva as respostas consolidadas e direciona para a Tela 09.

### Tela 09 (`telas/tela-09-resultado-nivel/`): Resultado & Categoria Recomendada
- **Arquivos**: `index.html`, `style.css`, `script.js`.
- **Objetivo**: Anunciar a modalidade indicada (Iniciação vs. Programação) e o respectivo nível.
- **IHC**: Feedback imediato via `aria-live="polite"`, cartão em destaque e atalhos rápidos para o edital e cronograma.
- **Ação Social**: Botão de apoio para estudantes cujas escolas não participam oficialmente, conduzindo à Tela 10.

### Tela 10 (`telas/tela-10-solicitacao-escola/`): Solicitação de Apoio Institucional
- **Arquivos**: `index.html`, `style.css`, `script.js`.
- **Objetivo**: Formulário simplificado e ético para inclusão da escola pelo projeto de extensão da UFABC.
- **IHC**: Campos diretos com validação contextual em tempo real, sem burocracia ou dados sensíveis desnecessários.
- **Persistência**: Geração do número de protocolo através de `obterProtocolo()` e direcionamento para a Tela 11.

### Tela 11 (`telas/tela-11-confirmacao-polo/`): Confirmação de Solicitação & Polo UFABC
- **Arquivos**: `index.html`, `style.css`, `script.js`.
- **Objetivo**: Confirmação visual e semântica com o número do protocolo registrado e garantia de participação como competidor independente.
- **IHC**:
  - Exibição do protocolo com botão de cópia rápida (`copiarProtocolo()`) e suporte a fallback.
  - Resumo contextual dos dados registrados lendo `obterRespostas()` (`solicitacao_estudante`, `solicitacao_escola`, `solicitacao_cidade`, `solicitacao_data`).
  - Botão de impressão limpa `window.print()` estilizado com folha de estilo de impressão (`@media print` em `style.css`) para geração de comprovante físico ou PDF oficial.
  - Três diretrizes claras explicando o contato com a escola em 7 dias, a garantia de realização no polo universitário da UFABC e o acesso imediato aos treinos aos sábados.
- **Navegação**: Conduz à comunidade na Tela 12 ou de volta ao Hub Central.

### Tela 12 (`telas/tela-12-comunidade-extensao/`): Hub Comunitário & Extensão UFABC
- **Arquivos**: `index.html`, `style.css`, `script.js`.
- **Objetivo**: Central de acolhimento e suporte contínuo para os participantes.
- **IHC**:
  - Botão de alto contraste com alvo de toque amplo ($\ge 52\text{px}$) para o grupo de apoio no WhatsApp, moderado por docentes e alunos da UFABC.
  - Seção com links diretos para os **Materiais Gratuitos de Treino Oficiais** da UNICAMP (provas anteriores com gabarito e apostilas didáticas de programação).
  - Seção de Dúvidas Frequentes (FAQ) nativa em HTML5 semântico com `<details>` e `<summary>`, focando em respostas de até duas linhas e navegação por teclado.
  - Botão de retorno ao Hub Central.
