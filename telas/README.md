# Catálogo Técnico e Mapa de Navegação das Telas
> **Central OBI UFABC · Repositório de Telas do Protótipo de IHC (UFABC 2026.3)**  
> **Arquitetura:** Tripartite Desacoplada (`index.html`, `style.css`, `script.js`)  
> **Referência Oficial do Padrão Ouro:** [`template-base/`](./template-base/)

---

## 🧭 1. Visão Geral da Pasta de Telas

O diretório `obi-website/telas/` abriga os módulos de tela independentes do protótipo web da Central OBI UFABC. Cada módulo opera como uma unidade coesa, autônoma e totalmente desacoplada, compartilhando apenas os tokens de estilo globais ([`tokens.css`](../assets/css/tokens.css)), os estilos estruturais mobile ([`base.css`](../assets/css/base.css)) e a biblioteca central de utilitários ([`utils.js`](../assets/js/utils.js)).

### Estrutura de Diretórios
```text
obi-website/telas/
├── README.md                      # Este catálogo técnico e guia de contratos de dados
├── template-base/                 # [PADRÃO OURO] Molde normativo para criação de novas telas
├── tela-01-home/                  # Início: Painel da Jornada & Atalhos Rápidos
├── tela-02-calendario/            # Calendário: Datas Oficiais, Lembretes & Exportação .ics
├── tela-03-checklist/             # Trilha de Estudos: Checklist por Nível & Prática Online
├── tela-04-editais/               # Editais Descomplicados: Linguagem Simples & Materiais Permitidos
├── tela-05-kit-monitor/           # Kit do Monitor: Avisos Prontos para Compartilhamento
├── tela-06-quiz-pergunta-1/       # Pergunta 1: Ano Escolar (Barra em 33%)
├── tela-07-quiz-logica/           # Pergunta 2: Lógica vs. Código (Barra em 66%)
├── tela-08-quiz-apoio/            # Pergunta 3: Mapeamento de Apoio Escolar (Barra em 100%)
├── tela-09-resultado-nivel/       # Diagnóstico: Categoria OBI Recomendada & Tópicos de Estudo
├── tela-10-solicitacao-escola/    # Formulário Ético: Solicitação de Apoio para Escola Pública
├── tela-11-confirmacao-polo/      # Confirmação: Protocolo Dinâmico, Comprovante & Polo UFABC
└── tela-12-comunidade-extensao/   # Hub Social: WhatsApp Oficial, Treinos UNICAMP & FAQ
```

---

## 🔄 2. Diagrama de Fluxo e Transferência de Dados

O fluxo do usuário é contínuo, intuitivo e acolhedor. Ele guia o estudante da educação básica desde a autoavaliação diagnóstica até a garantia de participação pelo polo universitário:

```mermaid
flowchart TD
    Hub["Hub Central (index.html)"] -->|Iniciar Fluxo| T6["Tela 06: Quiz Pergunta 1<br>(Ano Escolar)"]
    
    T6 -->|salvarResposta('ano_escolar')| T7["Tela 07: Quiz Pergunta 2<br>(Lógica vs Código)"]
    T7 -->|Voltar| T6
    
    T7 -->|salvarResposta('preferencia')| T8["Tela 08: Quiz Pergunta 3<br>(Apoio na Escola)"]
    T8 -->|Voltar| T7
    
    T8 -->|salvarResposta('escola_apoio')| T9["Tela 09: Resultado do Nível<br>(calcularModalidadeOBI)"]
    T9 -->|Voltar| T8
    
    T9 -->|Se escola não participa| T10["Tela 10: Solicitação de Apoio<br>(Formulário de Inclusão)"]
    T9 -->|Se já tem apoio| T12["Tela 12: Hub Comunitário<br>(WhatsApp, UNICAMP & FAQ)"]
    
    T10 -->|Voltar| T9
    T10 -->|enviarSolicitacao() + gerar protocolo| T11["Tela 11: Confirmação & Protocolo<br>(Comprovante de Polo UFABC)"]
    
    T11 -->|Ir para Comunidade| T12
    T11 -->|Imprimir Comprovante| Print["Recibo / PDF Oficial (@media print)"]
    T12 -->|Voltar ao Início| Hub
```

---

## 💾 3. Contratos de Dados Persistidos (`localStorage`)

Para garantir os princípios de **Design Ético** e respeito estrito à **LGPD**, a aplicação opera com armazenamento exclusivamente local no navegador do estudante, com zero envio de dados para servidores terceiros e sem necessidade de autenticação.

### 3.1. Dicionário de Chaves Globais

| Chave de Armazenamento | Tipo de Dado | Valores Possíveis / Formato | Descrição & Utilização |
| :--- | :--- | :--- | :--- |
| `obi_escala_fonte` | `String` (float) | `'0.85'` a `'1.30'` (padrão `'1.00'`) | Escala proporcional de redimensionamento tipográfico da tag `<html>`, manipulada pelos botões `[ A- | A+ ]`. |
| `obi_alto_contraste` | `String` (boolean) | `'true'` \| `'false'` | Flag que ativa a classe CSS `.high-contrast` no elemento `<body>`, invertendo a paleta para conformidade WCAG AAA. |
| `obi_quiz_respostas` | `String` (JSON) | Objeto serializado (ver seção 3.2) | Repositório central de todas as respostas do diagnóstico e dados cadastrais da solicitação escolar. |
| `obi_protocolo_atual` | `String` | `'OBI-UFABC-XXXX'` (ex.: `'OBI-UFABC-4921'`) | Código formal único gerado por `obterProtocolo()` para rastreio da solicitação e impressão do comprovante. |
| `obi_lembrete_48h` | `String` (boolean) | `'true'` \| `'false'` | Lembrete local no navegador para avisos com 48h de antecedência da prova (Tela 02). |
| `obi_lembrete_todas_fases` | `String` (boolean) | `'true'` \| `'false'` | Configuração local de alertas para todas as fases da OBI (Tela 02). |
| `obi_checklist_{categoria}` | `String` (JSON) | Objeto mapeando índices de tópicos (ex.: `{"0":true,"1":true}`) | Armazena o progresso de estudos assinalado pelo competidor por categoria (Tela 03). |

---

### 3.2. Estrutura do Objeto `obi_quiz_respostas`

O objeto JSON armazenado na chave `'obi_quiz_respostas'` possui o seguinte schema de contratos de dados:

```json
{
  "ano_escolar": "fundamental_2",
  "preferencia": "logica",
  "preferencia_estudo": "logica",
  "escola_apoio": "fundamental_sem_apoio",
  "solicitacao_estudante": "Mariana da Silva",
  "solicitacao_escola": "E.E. Professora Maria Amélia",
  "solicitacao_cidade": "Santo André",
  "solicitacao_contato": "(11) 98765-4321",
  "solicitacao_data": "03/11/2026",
  "solicitacao_protocolo": "OBI-UFABC-4921"
}
```

#### Especificação dos Campos:

1. **`ano_escolar`** (definido na Tela 06):
   - `'fundamental_1'`: Ensino Fundamental I (6º e 7º ano)
   - `'fundamental_2'`: Ensino Fundamental II (8º e 9º ano)
   - `'medio'`: Ensino Médio ou Técnico integrado
   - `'superior'`: 1º ano da graduação
2. **`preferencia` / `preferencia_estudo`** (definido na Tela 07):
   - `'logica'`: Prefere enigmas, jogos de dedução e raciocínio lógico no papel
   - `'codigo'`: Deseja escrever programas e resolver desafios com código no computador
3. **`escola_apoio`** (definido na Tela 08):
   - `'fundamental_com_apoio'` / `'medio_com_apoio'`: A escola possui professor cadastrado e oferece aplicação local.
   - `'fundamental_sem_apoio'` / `'medio_sem_apoio'`: A escola pública não possui aplicação oficial da OBI (dispara necessidade de Polo UFABC).
4. **`dados_apoio_solicitacao`** (`solicitacao_*`, definidos na Tela 10):
   - `solicitacao_estudante`: Nome completo informado pelo estudante.
   - `solicitacao_escola`: Nome da unidade escolar pública de origem.
   - `solicitacao_cidade`: Município do Grande ABC (Santo André, São Bernardo, São Caetano, Diadema, Mauá, Ribeirão Pires, Rio Grande da Serra).
   - `solicitacao_contato`: Telefone WhatsApp ou e-mail institucional de retorno.
   - `solicitacao_data`: Data do registro da solicitação.
   - `solicitacao_protocolo`: Número de protocolo associado à vaga de polo.

---

## 📁 4. Papel e Responsabilidades de Cada Arquivo por Módulo

Em conformidade estrita com o **Padrão Ouro**, cada pasta de tela implementa a separação tripartite:

### 4.0. `template-base/` (Padrão Ouro de Referência)
- [`index.html`](./template-base/index.html): Estrutura semântica canônica contendo a moldura `.mobile-viewport`, cabeçalho com barra de acessibilidade universal, link semântico de retorno, barra de progresso, `<fieldset>` acessível com `<legend>` e área de ações.
- [`style.css`](./template-base/style.css): Importações de design tokens e estilos específicos do componente de progresso e cartões.
- [`script.js`](./template-base/script.js): Inicialização segura sob `DOMContentLoaded`, manipulação de cliques e escuta de eventos.

---

### 4.1. `tela-06-quiz-pergunta-1/` (Início do Diagnóstico)
- [`index.html`](./tela-06-quiz-pergunta-1/index.html):
  - Barra de progresso configurada em 33% (`aria-valuenow="33"`).
  - Título semântico `<h1>` com linguagem acolhedora.
  - `<fieldset>` com 4 opções de série/ano (`fundamental_1`, `fundamental_2`, `medio`, `superior`).
- [`style.css`](./tela-06-quiz-pergunta-1/style.css):
  - Estilização limpa dos cartões de seleção e espaçamentos padronizados.
- [`script.js`](./tela-06-quiz-pergunta-1/script.js):
  - `restaurarRespostaSalva()`: Recupera o valor previamente marcado em `'ano_escolar'` e reatribui a classe `.selected`.
  - `avancarParaPergunta2()`: Salva a opção escolhida via `salvarResposta('ano_escolar', valor)` e redireciona para a Tela 07.

---

### 4.2. `tela-07-quiz-logica/` (Preferência de Desafios)
- [`index.html`](./tela-07-quiz-logica/index.html):
  - Barra de progresso configurada em 66% (`aria-valuenow="66"`).
  - Seleção binária entre "Desafios Lógicos no Papel" (Modalidade Iniciação) e "Programação no Computador".
- [`style.css`](./tela-07-quiz-logica/style.css):
  - Layout ergonômico dos cartões com alvos de toque $\ge 56\text{px}$.
- [`script.js`](./tela-07-quiz-logica/script.js):
  - `restaurarRespostaSalva()`: Lê e sincroniza a preferência persistida.
  - `avancarParaApoio()`: Salva em `preferencia` e navega para a Tela 08.

---

### 4.3. `tela-08-quiz-apoio/` (Mapeamento Escolar & Suporte)
- [`index.html`](./tela-08-quiz-apoio/index.html):
  - Barra de progresso em 100% (`aria-valuenow="100"`).
  - Opções que identificam a disponibilidade de professor ou carência institucional na escola.
- [`style.css`](./tela-08-quiz-apoio/style.css):
  - Destaque visual acessível para opções com suporte institucional e opções com carência de apoio.
- [`script.js`](./tela-08-quiz-apoio/script.js):
  - `concluirQuiz()`: Salva `'escola_apoio'` e despacha o estudante para o cálculo do resultado na Tela 09.

---

### 4.4. `tela-09-resultado-nivel/` (Resultado da Análise & Categoria)
- [`index.html`](./tela-09-resultado-nivel/index.html):
  - Área de resultado anunciada para leitores de tela com `aria-live="polite"`.
  - Elementos `#nome-categoria` e `#descricao-categoria`.
  - Lista de tópicos recomendados de estudo (`#lista-topicos-estudo`).
  - Banner dinâmico com link de apoio social para a UFABC.
- [`style.css`](./tela-09-resultado-nivel/style.css):
  - Cartão de destaque do resultado com borda primária, badge de nível e lista estilizada de estudos.
- [`script.js`](./tela-09-resultado-nivel/script.js):
  - Executa `calcularModalidadeOBI()` consumindo as respostas salvas.
  - Popula dinamicamente a interface e ajusta o botão de ação principal (se o estudante precisa de polo, direciona para a Tela 10; se já possui apoio, oferece atalho para a Tela 12).

---

### 4.5. `tela-10-solicitacao-escola/` (Solicitação de Apoio para Escola)
- [`index.html`](./tela-10-solicitacao-escola/index.html):
  - Card de modelo de mensagem pré-formatada para o professor com botão de cópia rápida.
  - Formulário acessível (`#form-apoio`) com `<label>` explícito para Nome, Escola, Cidade do ABC e Contato.
  - Caixa de feedback acessível com `role="alert"` para validação semântica.
- [`style.css`](./tela-10-solicitacao-escola/style.css):
  - Estilização do quadro de cópia de mensagem, classes `.input-erro` para campos inválidos e estados dos botões.
- [`script.js`](./tela-10-solicitacao-escola/script.js):
  - `copiarMensagemProfessor()`: Utiliza `navigator.clipboard` com fallback para `execCommand`, atualizando o botão para *"✓ Mensagem copiada!"*.
  - `validarFormulario()`: Validação não-bloqueante em português com foco no primeiro campo com erro.
  - `enviarSolicitacao()`: Persiste os dados de solicitação, gera o protocolo e navega para a Tela 11.

---

### 4.6. `tela-11-confirmacao-polo/` (Confirmação de Solicitação & Polo)
- [`index.html`](./tela-11-confirmacao-polo/index.html):
  - Exibição destacada do código de protocolo em `#protocolo-display`.
  - Botão de cópia rápida e botão de impressão do comprovante.
  - Resumo dos dados cadastrados (`#resumo-estudante`, `#resumo-escola`, `#resumo-cidade`, `#resumo-data`).
  - Cartão explicativo com as garantias de apoio da UFABC.
- [`style.css`](./tela-11-confirmacao-polo/style.css):
  - Folha de estilo de tela e bloco de regras para impressão `@media print` (esconde botões, ajusta fontes para preto e branco e garante que o comprovante caiba em 1 folha A4 limpa).
- [`script.js`](./tela-11-confirmacao-polo/script.js):
  - `inicializarProtocoloEResumo()`: Recupera o protocolo e preenche as informações do estudante.
  - `copiarProtocolo()`: Cópia imediata com feedback tátil e textual.

---

### 4.7. `tela-12-comunidade-extensao/` (Hub Comunitário & Extensão)
- [`index.html`](./tela-12-comunidade-extensao/index.html):
  - Botão de alto contraste de entrada no grupo do WhatsApp institucional.
  - Cartões com links externos oficiais para materiais de treino gratuitos da UNICAMP (provas anteriores e apostilas).
  - Seção de Dúvidas Frequentes (FAQ) nativa com `<details>` e `<summary>`.
- [`style.css`](./tela-12-comunidade-extensao/style.css):
  - Estilização de acordeom acessível, foco limpo nos elementos `<summary>` e botão destacado de comunidade.
- [`script.js`](./tela-12-comunidade-extensao/script.js):
  - Gestão de acessibilidade de expansão/colapso para tecnologias assistivas.

---

## 🛠️ 5. Guia para Desenvolvimento de Novas Telas

Para implementar uma nova tela (por exemplo, as Telas 01 a 05 da Jornada):

1. **Duplique o Template Base**:
   ```bash
   cp -r /home/felipe/Documents/IHC/obi-website/telas/template-base \
         /home/felipe/Documents/IHC/obi-website/telas/tela-01-home
   ```
2. **Atualize o Título e a Semântica**:
   - Altere a tag `<title>` e o `<h1>` para refletir o objetivo da nova tela.
   - Atualize a barra de progresso ou remova-a se a tela não for de etapas lineares.
3. **Consuma os Tokens Globais**:
   - Nunca declare cores fixas (*hardcoded*). Utilize `var(--cor-primaria)`, `var(--cor-fundo)`, etc.
4. **Isole a Lógica em `script.js`**:
   - Qualquer evento deve ser registrado via `addEventListener` dentro do bloco `DOMContentLoaded`.
   - Utilize as funções compartilhadas de `utils.js` para persistência e acessibilidade.
5. **Cadastre no Hub**:
   - Adicione o card de atalho correspondente em [`obi-website/index.html`](../index.html).
