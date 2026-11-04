# 🏛️ Padrão Ouro: Arquitetura de Referência de Telas
**Central OBI UFABC · Interação Humano-Computador (IHC — UFABC 2026.3)**  
*Documento de Especificação Técnica, Acessibilidade e Engenharia de Interface*

---

## 🎯 1. Propósito e Filosofia do Padrão Ouro

O diretório `telas/template-base/` constitui a **arquitetura de referência oficial e inegociável** da Central OBI UFABC. Qualquer tela, formulário, etapa de diagnóstico ou módulo informativo desenvolvido no ecossistema deve obrigatoriamente espelhar este padrão em sua integridade.

A arquitetura foi concebida sob os seguintes pilares:
1. **Design Universal e Acessibilidade Radical**: Conformidade plena com a **WCAG 2.1 Nível AA** e princípios do Desenho Universal, garantindo equidade de acesso para estudantes com diversas habilidades sensoriais, motoras e cognitivas.
2. **Separação Tripartite Estrita de Responsabilidades**: Desacoplamento absoluto entre estrutura semântica (HTML5), apresentação estética parametrizada (CSS) e lógica comportamental pura (JavaScript).
3. **Código Limpo, Auditável e Livre de Dependências**: Sem dependência de bibliotecas ou frameworks externos pesados; qualquer avaliador, docente ou estudante pode auditar a solução diretamente pelo inspecionador de código do navegador.
4. **Design Ético**: Respeito à privacidade do estudante, persistência transparente e estritamente local (`localStorage`), sem dark patterns, sem publicidade, sem telemetria invasiva e sem barreiras forçadas de autenticação.

---

## 📁 2. Arquitetura Tripartite de Arquivos

Cada tela do projeto reside em seu próprio diretório isolado e deve conter impreterivelmente três arquivos fundamentais:

```
telas/template-base/
├── index.html        # Estrutura semântica HTML5 e árvore de acessibilidade
├── style.css         # Estilização contextual modular consumindo Design Tokens
├── script.js         # Lógica comportamental pura e persistência ética
└── README.md         # Documentação técnica e guia de replicação
```

### 2.1. `index.html` (Marcação Semântica e Acessível)
- **Proibição Estrita**: É terminantemente proibido o uso de blocos `<style>` embutidos ou atributos `style="..."` inline, bem como blocos de código executável `<script>` embutidos.
- **Landmarks Nativos**: Uso rigoroso de elementos estruturais semânticos do HTML5:
  - `<header class="accessibility-bar">`: Contém o link institucional e os controles globais de acessibilidade (`A-`, `A+`, `◐ Contraste`).
  - `<nav class="page-header">`: Navegação contextual de retorno para o Hub ou tela anterior, com seta indicadora enriquecida com `aria-hidden="true"`.
  - `<main class="mobile-viewport">`: Delimita a moldura de visualização mobile-first.
  - `<section class="screen-content">`: Conteúdo específico da etapa, rotulado via `aria-labelledby`.
  - `<form novalidate>` e `<fieldset class="options-group">`: Agrupamento lógico de campos com legenda contextual (`<legend>`).
  - `<label class="option-card" for="id-exclusivo">` e `<input type="radio" id="id-exclusivo">`: Associação explícita por atributos `for` e `id`.
  - `<div id="status-feedback" role="status" aria-live="polite">`: Área reservada para comunicação de status a tecnologias assistivas sem interrupção abrupta da fala.
  - `<button type="button">`: Todos os botões interativos possuem atributo `type="button"` explícito para prevenir submissões indesejadas de formulário.

### 2.2. `style.css` (Apresentação e Tokens de Design)
- **Consumo de Tokens Compartilhados**: Todos os valores de cor, espaçamento, tipografia, borda e sombras provêm exclusivamente dos tokens globais (`../../assets/css/tokens.css` e `../../assets/css/base.css`).
- **Dimensões e Alvos de Toque (Touch Targets)**:
  - Conformidade estrita com a **WCAG 2.1 Critério 2.5.5**: Dimensões mínimas de **48px x 48px** (`--alvo-toque-minimo`) para botões, links, inputs e cartões clicáveis.
- **Estados de Interação Visíveis e Contrastantes**:
  - `:hover`: Realce suave de borda e tonalidade de fundo.
  - `:focus-visible`: Anel de foco obrigatório com `--anel-foco` (`3px solid #2563eb` no modo padrão e `#facc15` no alto contraste) acompanhado de `outline-offset: 2px`.
  - `.selected`: Indicação evidente e tridimensional da opção ativa.
- **Suporte Nativo a Alto Contraste**:
  - Estilização completa para a classe `body.high-contrast`, garantindo fundo escuro profundo (`#000000`), texto em branco absoluto (`#ffffff`), bordas reforçadas e cores vivas de foco e destaque.

### 2.3. `script.js` (Comportamento Puro e Persistência Ética)
- **Encapsulamento**: Toda a execução é inicializada estritamente no evento `DOMContentLoaded`.
- **Nomenclatura Semântica em Português**: Métodos expressivos e autoexplicativos (`inicializarTemplate()`, `manipularSelecaoOpcao()`, `validarEtapa()`, `restaurarRespostaSalva()`, `exibirFeedback()`).
- **Persistência Transparente**: Uso dos utilitários centralizados `salvarResposta(chave, valor)` e `obterRespostas()` (`../../assets/js/utils.js`), armazenando dados exclusivamente na máquina do estudante.
- **Sincronização de Estados**: Atualização dinâmica da classe `.selected` e propagação de mensagens informativas para o elemento de status com `aria-live="polite"`.

---

## 📚 3. Fundamentação Teórica em IHC

O Padrão Ouro foi estruturado a partir da base pedagógica e científica da disciplina de IHC da UFABC:

### 3.1. 10 Heurísticas de Usabilidade de Nielsen
1. **Visibilidade do Estado do Sistema**: Barra de progresso dinâmica (`role="progressbar"`) com etapa atual e porcentagem, além de feedback instantâneo ao selecionar alternativas.
2. **Correspondência entre o Sistema e o Mundo Real**: Vocabulário simples, direto, sem terminologias herméticas de programação nas orientações iniciais.
3. **Controle e Liberdade do Usuário**: Botão "Voltar" acessível em todas as telas, permitindo revisão ou alteração de respostas a qualquer momento sem penalidades.
4. **Consistência e Padrões**: Mesmo layout, mesma barra superior, mesmos estilos de botões e mesma mecânica de seleção em todas as telas da plataforma.
5. **Prevenção de Erros**: Cartões de seleção amplos (área clicável integral de 48px), impossibilitando toques acidentais fora do alvo; validação prévia com mensagens orientativas antes do avanço.
6. **Reconhecimento em vez de Memorização**: Opções acompanhadas de títulos destacados (`<strong>`) e descrições explicativas de apoio (`<span>`).
7. **Flexibilidade e Eficiência de Uso**: Navegação fluida tanto por toque/mouse quanto integralmente pelo teclado (`Tab`, `Shift+Tab`, `Space`, `Enter`).
8. **Design Estético e Minimalista**: Layout limpo, foco total na decisão da etapa, livre de distrações, popups ou propagandas.
9. **Ajudar os Usuários a Reconhecer, Diagnosticar e Recuperar-se de Erros**: Mensagens de aviso com contraste adequado, ícones conceituais e instruções claras sobre o que é necessário para continuar.
10. **Ajuda e Documentação**: Rótulos descritivos contextuais (`aria-describedby`) e este README arquitetural completo.

### 3.2. Critérios Ergonômicos de Bastien & Scapin
- **Agrupamento e Distinção entre Itens**: Uso semântico de `<fieldset>` e `<legend>`, delimitando visual e estruturalmente as perguntas das opções de resposta.
- **Presteza**: Resposta imediata da interface à ação do usuário (alteração visual de cor no card e feedback sonoro/textual em leitor de tela).
- **Carga de Trabalho Reduzida**: Apenas uma decisão cognitiva relevante por tela (etapas curtas e progressivas).
- **Legibilidade**: Contraste superior a 4.5:1 para texto normal, fontes do sistema de renderização rápida e ajuste de tamanho de fonte dinâmico.

### 3.3. Diretrizes de Design Ético (Profa. Juliana Braga · UFABC)
- **Ausência de Dark Patterns**: Nenhum botão com pegadinha, sem opções pré-selecionadas enganosas, sem contadores regressivos para criar ansiedade.
- **Privacidade e Soberania dos Dados**: Não há rastreamento via cookies de terceiros ou Google Analytics; os dados do quiz permanecem exclusivamente no `localStorage` do dispositivo.
- **Sem Barreiras de Entrada**: Acesso livre e irrestrito sem exigência prévia de cadastro ou login com senha para realizar o diagnóstico de nível.

### 3.4. Estudo de Caso Expedição Antártica (Design Universal)
Inspirado nos aprendizados de acessibilidade multissensorial do projeto Expedição Antártica:
- Garantia de que informações visuais (cores) nunca sejam a única pista de estado: a opção selecionada possui marcador radio preenchido, borda colorida e feedback textual.
- Controle direto pelo usuário sobre sua experiência de leitura (aumento/diminuição tipográfica e contraste alto).

---

## ✅ 4. Checklist Inegociável de Conformidade

Antes de considerar qualquer tela pronta para homologação, verifique cada item:

| Categoria | Requisito Obrigatório | Status |
| :--- | :--- | :---: |
| **Semântica HTML5** | Utilização de `<header>`, `<nav>`, `<main>`, `<section>`, `<fieldset>`, `<legend>` e `<button>` | ✅ |
| **Acessibilidade ARIA** | Barra de progresso com `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"` | ✅ |
| **Acessibilidade ARIA** | Área de feedback em tempo real com `role="status"` e `aria-live="polite"` | ✅ |
| **Acessibilidade ARIA** | Ícones decorativos acompanhados de `aria-hidden="true"` | ✅ |
| **Alvos de Toque (WCAG 2.5.5)** | Todos os botões, cards e controles com área mínima de **48px x 48px** | ✅ |
| **Teclado e Foco Visível** | `:focus-visible` ativo em todos os elementos focáveis com anel de 3px e deslocamento de 2px | ✅ |
| **Contraste de Cores (WCAG 1.4.3)** | Relação de contraste mínima de 4.5:1 para texto padrão e 3:1 para componentes de interface | ✅ |
| **Modo Alto Contraste** | Suporte total em `body.high-contrast` consumindo tokens específicos | ✅ |
| **Formulários Acessíveis** | Todos os `<input>` estritamente associados aos seus respectivos `<label>` via `id` e `for` | ✅ |
| **Separação de Código** | Zero estilos inline, zero tags `<style>`, zero scripts inline | ✅ |
| **Persistência Ética** | Uso de `salvarResposta()` e `obterRespostas()` do `utils.js` | ✅ |

---

## 🚀 5. Guia Passo a Passo: Criando uma Nova Tela a Partir Deste Template

Siga este procedimento para criar uma nova tela com garantia total de conformidade:

### Passo 1: Duplicação do Diretório
Copie o diretório `telas/template-base/` para o novo identificador de tela:
```bash
cp -r /home/felipe/Documents/IHC/obi-website/telas/template-base /home/felipe/Documents/IHC/obi-website/telas/tela-XX-nome-da-etapa
```

### Passo 2: Configuração de Metadados em `index.html`
1. Atualize a tag `<title>`:
   ```html
   <title>Nome da Etapa · Central OBI UFABC</title>
   ```
2. Verifique os caminhos relativos para os assets compartilhados:
   ```html
   <link rel="stylesheet" href="../../assets/css/tokens.css">
   <link rel="stylesheet" href="../../assets/css/base.css">
   <link rel="stylesheet" href="style.css">
   <script src="../../assets/js/utils.js" defer></script>
   <script src="script.js" defer></script>
   ```
3. Atualize o link de retorno no `<nav class="page-header">`:
   ```html
   <a href="../tela-anterior/index.html" class="btn-back" aria-label="Voltar para a etapa anterior">
     <span aria-hidden="true">&larr;</span> Voltar
   </a>
   ```

### Passo 3: Ajuste da Barra de Progresso e Conteúdo
1. Atualize o indicador de progresso no `<div class="progress-container">`:
   ```html
   <span id="label-progresso-etapa">Etapa 2 de 3</span>
   <div class="progress-bar-track" 
        role="progressbar" 
        aria-valuenow="66" 
        aria-valuemin="0" 
        aria-valuemax="100" 
        aria-labelledby="label-progresso-etapa"
        aria-valuetext="Etapa 2 de 3: 66 por cento concluído">
     <div class="progress-bar-fill" style="width: 66%;"></div>
   </div>
   ```
2. Ajuste o título `<h1 class="screen-title">` e subtítulo `<p class="screen-subtitle">`.

### Passo 4: Customização das Opções do Formulário
1. Defina um identificador temático para o grupo (ex.: `name="nivel_experiencia"`).
2. Garanta que cada `<label for="...">` coincida exatamente com o `<input id="...">`:
   ```html
   <label class="option-card" for="opt-iniciante">
     <input type="radio" id="opt-iniciante" name="nivel_experiencia" value="iniciante" checked>
     <div class="option-text">
       <strong>Nunca programei antes</strong>
       <span>Quero aprender a lógica e resolver problemas sem código no início.</span>
     </div>
   </label>
   ```

### Passo 5: Ajuste da Lógica Comportamental em `script.js`
1. Altere a constante que define a chave de armazenamento:
   ```javascript
   const CHAVE_RESPOSTA = 'meu_diagnostico_etapa_2';
   ```
2. Configure a rota de destino na função `validarEtapa()`:
   ```javascript
   function validarEtapa() {
     const selecionado = document.querySelector('input[name="nivel_experiencia"]:checked');
     if (!selecionado) {
       exibirFeedback('Por favor, selecione uma opção para continuar.', 'aviso');
       return false;
     }

     salvarResposta(CHAVE_RESPOSTA, selecionado.value);
     exibirFeedback('Resposta salva! Redirecionando...', 'sucesso');
     
     // Navegação acessível para a etapa subsequente:
     window.location.href = '../tela-08-quiz-apoio/index.html';
     return true;
   }
   ```

### Passo 6: Auditoria e Validação Técnica
Abra o arquivo no navegador e certifique-se de que:
- O zoom de fonte (`A-` e `A+`) altera proporcionalmente os textos sem quebrar o layout.
- O modo `◐ Contraste` inverte as cores com nitidez absoluta.
- Pressionar a tecla `Tab` percorre todos os elementos na ordem lógica esperada com foco visível destacado.
- O leitor de tela anuncia as legendas de progresso e as mensagens de feedback sem falhas.

---

*Central OBI UFABC — Padrão Ouro de Engenharia de Interface e IHC (2026).*
