# Especificação Técnica e Diretrizes de IHC: Central OBI UFABC
**Universidade Federal do ABC (UFABC) · Bacharelado em Ciência da Computação**  
**Disciplina:** Interação Humano-Computador (IHC 2026.3)

---

## 1. Princípio Fundamental: Minimalismo, Cores Claras e Código Auditável
- **Visual Minimalista e Moderno**: Fundo claro (`#ffffff` e `#f8fafc`), bordas sutis (`#e2e8f0`), tipografia nítida do sistema e espaçamento generoso. Ausência proposital de ruído visual, animações distrativas ou elementos decorativos supérfluos.
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
- **Privacidade e Transparência**: Persistência transparente e local das respostas exclusivamente no navegador do estudante via `localStorage`, sem telemetria invasiva.

---

## 4. Arquitetura do Fluxo de Diagnóstico & Apoio UFABC (Telas 06 a 12)

O fluxo principal do protótipo é composto por sete telas encadeadas que guiam o estudante da educação básica desde a autoavaliação inicial até a garantia de participação pelo polo universitário:

### Tela 06 (`telas/tela-06-quiz-pergunta-1/index.html`): Início do Diagnóstico
- **Objetivo**: Primeira pergunta do questionário diagnóstico (Barra em 33%).
- **IHC**: Introdução acolhedora à OBI com opções claras entre desafios no papel ou no computador.
- **Persistência**: Armazena a resposta inicial e avança para a Tela 07.

### Tela 07 (`telas/tela-07-quiz-logica/index.html`): Diagnóstico de Preferência
- **Objetivo**: Identificar afinidade entre lógica conceitual/enigmas ou desenvolvimento de código (Barra em 66%).
- **IHC**: Linguagem simples e sem jargões computacionais avançados.
- **Persistência**: `salvarResposta('preferencia', ...)` e avanço para a Tela 08.

### Tela 08 (`telas/tela-08-quiz-apoio/index.html`): Mapeamento Escolar & Suporte
- **Objetivo**: Identificar a série escolar e a existência de professor cadastrado na OBI na escola do aluno (Barra em 100%).
- **IHC**: Mapeamento do perfil e diagnóstico de carência de apoio institucional na escola de origem.
- **Persistência**: Salva as respostas consolidadas e direciona para a Tela 09.

### Tela 09 (`telas/tela-09-resultado-nivel/index.html`): Resultado & Categoria Recomendada
- **Objetivo**: Anunciar a modalidade indicada (Iniciação vs. Programação) e o respectivo nível.
- **IHC**: Feedback imediato via `aria-live="polite"`, cartão em destaque e atalhos rápidos para o edital e cronograma.
- **Ação Social**: Botão de apoio para estudantes cujas escolas não participam oficialmente, conduzindo à Tela 10.

### Tela 10 (`telas/tela-10-solicitacao-escola/index.html`): Solicitação de Apoio Institucional
- **Objetivo**: Formulário simplificado e ético para inclusão da escola pelo projeto de extensão da UFABC.
- **IHC**: Campos diretos com validação contextual em tempo real, sem burocracia ou dados sensíveis desnecessários.
- **Persistência**: Geração do número de protocolo através de `obterProtocolo()` e direcionamento para a Tela 11.

### Tela 11 (`telas/tela-11-confirmacao-polo/index.html`): Confirmação de Solicitação & Polo UFABC
- **Objetivo**: Confirmação visual e semântica com o número do protocolo registrado e garantia de participação como competidor independente.
- **IHC**:
  - Exibição do protocolo com botão de cópia rápida (`copiarProtocolo()`) e suporte a fallback.
  - Resumo contextual dos dados registrados lendo `obterRespostas()` (`solicitacao_estudante`, `solicitacao_escola`, `solicitacao_cidade`, `solicitacao_data`).
  - Botão de impressão limpa `window.print()` estilizado com folha de estilo de impressão (`@media print`) para geração de comprovante físico ou PDF oficial.
  - Três diretrizes claras explicando o contato com a escola em 7 dias, a garantia de realização no polo universitário da UFABC e o acesso imediato aos treinos aos sábados.
- **Navegação**: Conduz à comunidade na Tela 12 ou de volta ao Hub Central.

### Tela 12 (`telas/tela-12-comunidade-extensao/index.html`): Hub Comunitário & Extensão UFABC
- **Objetivo**: Central de acolhimento e suporte contínuo para os participantes.
- **IHC**:
  - Botão de alto contraste com alvo de toque amplo ($\ge 52\text{px}$) para o grupo de apoio no WhatsApp, moderado por docentes e alunos da UFABC.
  - Seção com links diretos para os **Materiais Gratuitos de Treino Oficiais** da UNICAMP (provas anteriores com gabarito e apostilas didáticas de programação).
  - Seção de Dúvidas Frequentes (FAQ) nativa em HTML5 semântico com `<details>` e `<summary>`, focando em respostas de até duas linhas e navegação por teclado.
  - Botão de retorno ao Hub Central.

---

## 5. Módulo de Editais e Apoio ao Monitor (Telas 04 e 05)

As duas telas formam um par navegável por abas (`<nav aria-label="Seções da Central OBI">`, com `aria-current="page"` na aba ativa). Ambas seguem a moldura mobile, a barra de acessibilidade padrão (`[ A- | A+ ]` e `[ ◐ Contraste ]`) e o rodapé de privacidade. Não coletam nem gravam dados do usuário: o texto digitado na Tela 05 não é salvo.

### Tela 04 (`telas/tela-04-editais/index.html`): Editais Simplificados
- **Objetivo**: ajudar o estudante a descobrir sua categoria/modalidade e o que levar no dia da prova, em linguagem simples.
- **Conteúdo**:
  - Categoria por etapa de ensino: Fundamental → Iniciação (Júnior, Nível 1 ou 2); Médio/Técnico → Programação Nível 1 ou 2 (Sênior no 4º ano do Técnico); Graduação → Programação Sênior.
  - Regras básicas: material permitido (lápis, caneta ou lapiseira, borracha, régua e papel de rascunho), proibido (calculadora) e linguagens da Programação (C, C++, Java e Python).
  - Itens que o regulamento não cita (celular, relógio inteligente, anotações, garrafa de água) aparecem sinalizados como **"a confirmar"** com a coordenação da escola.
- **Transparência**: data de conferência do resumo e botão para o regulamento oficial da OBI (não foi localizado PDF oficial do edital).
- **Rodapé**: aviso de privacidade, link "Reportar erro ou dúvida" (leva à Tela 12) e link para o site oficial da OBI.
- **IHC/Acessibilidade**: `<h1>` oculto visualmente (`sr-only`) e títulos de seção em `<h2>`; emojis apenas decorativos (`aria-hidden="true"`); links externos com aviso de nova aba; alvos de toque de 48px ou mais; adaptação ao alto contraste.

### Tela 05 (`telas/tela-05-kit-monitor/index.html`): Kit do Monitor / Professor
- **Objetivo**: oferecer mensagens prontas para voluntários e professores copiarem e enviarem em grupos de WhatsApp ou Discord.
- **Cartões**:
  1. **Aviso: data da Fase 1**: o monitor preenche a data oficial num campo e a mensagem é atualizada na hora. Sem data, a cópia é bloqueada, o campo recebe `aria-invalid` e o foco. A data não vem pré-preenchida porque a Fase 1 de 2026 já ocorreu e a data da próxima edição ainda não está publicada.
  2. **Links e exercícios de treino**: lista `LINKS_DE_TREINO` no script, com apenas links oficiais verificados (para incluir outro, basta acrescentar um item).
  3. **Guia: qual é minha categoria?**: link para o diagnóstico (Tela 06); o endereço completo é calculado pelo navegador.
- **Cópia**: função `copiarTexto()` usa a Clipboard API e, se falhar, `document.execCommand('copy')`. Se as duas falharem, o texto aparece selecionado numa caixa para cópia manual e **nenhum sucesso é anunciado**.
- **Feedback**: cada cartão tem `role="status"` com `aria-live="polite"`; o botão mostra "Copiado!" por 2,5 s apenas quando a cópia realmente ocorreu.
- **Teclado**: botões nativos (`<button>`), acionáveis por Enter e Espaço, com foco visível.

### Pendências de confirmação (Telas 04 e 05)
- Data da Fase 1 da próxima edição da OBI.
- Regras sobre celular, relógio inteligente, anotações e garrafa de água.
- Link oficial em PDF do edital, se existir.
- Outros links de treino (por exemplo, Neps Academy e Beecrowd) ainda não verificados.

---

## 6. Módulos de Entrada, Calendário & Checklist (Telas 01, 02 e 03)

### Tela 01 (`telas/tela-01-home/index.html`): Home / Painel da Jornada
- **Objetivo**: Ponto de entrada do usuário no protótipo, apresentando boas-vindas, cartão "O que fazer agora?" e acessos rápidos.
- **IHC**:
  - Cartão de destaque temporal informando a situação atual da Fase 1.
  - Atalhos claros de acesso rápido com ícones descritivos e setas indicativas de navegação.
  - Seção "Dúvida comum de iniciante" com botão de ação direta conectando à Tela 06 (Diagnóstico).
  - Rodapé com links para a comunidade/suporte (Tela 12) e para o portal oficial.

### Tela 02 (`telas/tela-02-calendario/index.html`): Calendário Oficial OBI 2026
- **Objetivo**: Linha do tempo dinâmica e acessível com todas as datas oficiais da OBI 2026.
- **IHC**:
  - Alternador de modalidade em Segmented Control (Iniciação vs. Programação) que sincroniza automaticamente com as escolhas feitas no diagnóstico.
  - Linha do tempo visual com anéis de estado (Concluído, Em andamento, Aberta, Em breve).
  - Exportação direta de compromissos para a agenda do celular/computador via arquivo `.ics` nativo.
  - Lembrete local de 48h antes da prova com persistência no `localStorage`.
  - Links de conexão rápida para o Diagnóstico de Nível (Tela 06) e para a Trilha de Estudos (Tela 03).

### Tela 03 (`telas/tela-03-checklist/index.html`): Trilha de Estudos & Checklist
- **Objetivo**: Acompanhamento individual de estudos sem exigência de login ou dados pessoais.
- **IHC**:
  - 5 abas por categoria (`Iniciação`, `Prog. Júnior`, `Nível 1`, `Nível 2`, `Sênior`) com detecção automática da categoria recomendada pelo quiz (Tela 09).
  - Checklist interativo com persistência instantânea no `localStorage` por categoria.
  - Barra de progresso dinâmica em tempo real calculando a porcentagem de conteúdos concluídos.
  - Links oficiais para juízes online (Neps Academy e Beecrowd) e cadernos de provas anteriores em PDF com gabarito oficial UNICAMP.
  - Botão ético de reset para permitir que o aluno recomece seus estudos quando desejar.

---

## 7. Mapa de Conexões e Interoperabilidade (Telas 01 a 12)

Todas as 12 telas operam de forma integrada e bidirecional:
1. **Hub Central (`index.html`)** ⇄ **Todas as Telas (01 a 12)**: Acesso e retorno pelo cabeçalho de acessibilidade em todas as páginas.
2. **Tela 01 (Home)** ➔ **Telas 02, 03, 04, 05, 06 e 12**: Acessos rápidos da jornada.
3. **Telas 06 ➔ 07 ➔ 08 ➔ 09**: Fluxo contínuo de diagnóstico com passagem e persistência de dados.
4. **Tela 09 (Resultado)** ➔ **Telas 03 (Checklist do nível), 02 (Calendário), 04 (Edital), 10 (Apoio) e 01 (Home)**.
5. **Tela 10 (Solicitação de Apoio)** ➔ **Tela 11 (Comprovante com Protocolo)**.
6. **Tela 11 (Confirmação de Polo)** ➔ **Tela 12 (Comunidade WhatsApp/FAQ) e Tela 01 (Home)**.
7. **Tela 12 (Comunidade)** ➔ **Tela 01 (Home) e Tela 03 (Trilha de Estudos)**.

