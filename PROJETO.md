# Padrões do Projeto e Diretrizes de Arquitetura

> Documento simples de referência com os padrões arquiteturais, diretrizes de Clean Code e convenções adotadas na Central OBI UFABC.

---

## 1. Princípios Gerais e Clean Code

- **Stack Simples e Nativa**: HTML5 semântico, CSS3 puro (com variáveis/design tokens) e JavaScript nativo. Zero frameworks pesados (React, Vue, Tailwind) ou dependências de build/npm para rodar.
- **Auditabilidade Imediata**: Qualquer avaliador, professor ou estudante consegue abrir os arquivos diretamente no navegador ou inspecionar o código fonte sem etapas de transpilação.
- **Nomenclatura Limpa e em Português**:
  - Funções com verbos diretos: `salvarResposta()`, `obterRespostas()`, `obterProtocolo()`, `alternarAltoContraste()`, `alterarTamanhoFonte()`.
  - Variáveis claras e autoexplicativas, evitando abreviações confusas.
- **Funções Pequenas e com Responsabilidade Única**: Cada função do script faz apenas uma tarefa (ex.: calcular modalidade, salvar dados no storage, copiar texto).

---

## 2. Design System e Tokens Globais

Toda tela importa no `<head>` a mesma base compartilhada:

```html
<link rel="stylesheet" href="../../assets/css/tokens.css">
<link rel="stylesheet" href="../../assets/css/base.css">
<script src="../../assets/js/utils.js" defer></script>
```

- **`tokens.css`**: Define todas as variáveis globais (cores primárias, de sucesso, neutras, tamanhos de fonte, raios de borda e temas claro/alto contraste).
- **`base.css`**: Implementa a moldura mobile-first padronizada (390px a 420px de largura máxima), barra de acessibilidade, tipografia padrão do sistema, alvos de toque mínimos de 48px e estilos de botões (`.btn-primary`, `.btn-secondary`).
- **`utils.js`**: Reúne utilitários compartilhados de redimensionamento de fonte (`A-` / `A+`), alternância de contraste, manipulação segura do `localStorage` e cálculo da modalidade da OBI.

---

## 3. Diretrizes de Acessibilidade (WCAG 2.1 AA)

- **Controle de Fonte e Contraste**: Presente em todas as telas via barra no topo com persistência local.
- **Alvos de Toque (Touch Targets)**: Altura e largura mínimas de 48px em qualquer botão, link ou cartão interativo para uso confortável no celular.
- **Foco Visível**: Navegação com teclado (`Tab`) sempre destacada com `:focus-visible` nítido.
- **Semântica HTML5**:
  - Apenas 1 título `<h1>` por tela.
  - Opções estruturadas com `<fieldset>` e `<legend>` ou cartões associados a inputs.
  - Elementos visuais decorativos sinalizados com `aria-hidden="true"`.
  - Atualizações dinâmicas e confirmações anunciadas por `aria-live="polite"`.

---

## 4. Diretrizes de Design Ético

- **Zero Barreiras de Entrada**: Nenhuma tela exige login, senha, e-mail obrigatório ou cadastro para navegação, diagnóstico ou consulta.
- **Privacidade por Padrão**: As respostas do quiz, o progresso do checklist e os dados da solicitação ficam salvos exclusivamente no navegador do usuário (`localStorage`), sem telemetria ou envio para servidores terceiros.
- **Ambiente Acolhedor**: Ausência de cronômetros regressivos estressantes, contadores de pressão ou placares/rankings comparativos entre estudantes.

---

## 5. Organização das Telas

O projeto é dividido em dois blocos complementares e integrados:

- **Módulo 1: Acolhimento, Calendário e Editais (Telas 01 a 05)**:
  - `tela-01-home`: Ponto de entrada, painel da jornada e atalhos.
  - `tela-02-calendario`: Linha do tempo com datas, agenda `.ics` e lembrete local.
  - `tela-03-checklist`: Trilha de conteúdos interativa por categoria com barra de progresso.
  - `tela-04-editais`: Regras resumidas e materiais permitidos em linguagem simples.
  - `tela-05-kit-monitor`: Mensagens prontas para cópia e aviso rápido para professores.
- **Módulo 2: Diagnóstico, Polo & Comunidade (Telas 06 a 12)**:
  - `tela-06-quiz-pergunta-1`: Pergunta de ano/série escolar (Iniciação vs Programação).
  - `tela-07-quiz-logica`: Preferência entre desafios lógicos no papel ou código no computador.
  - `tela-08-quiz-apoio`: Mapeamento de apoio docente na escola.
  - `tela-09-resultado-nivel`: Categoria recomendada, o que estudar e atalhos.
  - `tela-10-solicitacao-escola`: Formulário ético para apoio e contato com escola pública.
  - `tela-11-confirmacao-polo`: Comprovante com protocolo gerado, resumo e opção de impressão.
  - `tela-12-comunidade-extensao`: Grupo de apoio no WhatsApp, materiais oficiais UNICAMP e FAQ.
