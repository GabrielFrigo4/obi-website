# 🤝 Acordo da Equipe: Padrão Visual, Design System e IHC
**Central OBI UFABC · Disciplina de Interação Humano-Computador (UFABC 2026.3)**

Fala, equipe! Para garantir que o nosso protótipo pareça um **produto profissional e unificado** (e não uma colcha de retalhos onde cada um faz de uma cor ou com estilos discrepantes), estruturamos esta base compartilhada.

---

## 🎨 1. Paleta de Cores e Estilo Visual Oficial

Todas as telas devem seguir **exatamente** as mesmas variáveis CSS já definidas em [`assets/css/tokens.css`](assets/css/tokens.css).

* **Tema Geral**: Minimalista, moderno, fundo claro e arejado.
* **Cor de Fundo**: Branco (`#ffffff`) e cinza muito suave (`#f8fafc`). **Nada de fundo preto ou cores saturadas no fundo**.
* **Cor Primária (Identidade OBI/UFABC)**: Azul clássico acessível (`#1d4ed8` / `#2563eb`).
* **Cor de Ação / Sucesso**: Verde acessível (`#047857`).
* **Textos**: Preto azulado de alto contraste (`#0f172a`) e cinza para textos auxiliares (`#475569`).

> [!IMPORTANT]
> **Como usar no seu HTML**:
> Basta importar os dois arquivos CSS e o utilitário compartilhado no `<head>` da sua tela:
> ```html
> <link rel="stylesheet" href="../../assets/css/tokens.css">
> <link rel="stylesheet" href="../../assets/css/base.css">
> <script src="../../assets/js/utils.js" defer></script>
> ```
> Fazendo isso, sua tela ganha automaticamente o container mobile de 390px-420px, a tipografia limpa do sistema e os botões padronizados.

---

## 🚫 2. Boas Práticas de IHC: Linguagem Natural e Foco no Estudante

1. **Chega de "Textão"**:
   * Substitua parágrafos longos por **frases curtas, diretas e acolhedoras**.
   * Use bullet points ou cartões clicáveis com poucas palavras.
2. **Espaçamento e Respiro**:
   * Não empilhe 10 elementos colados um no outro. Deixe margens generosas entre seções (`margin-bottom: 20px;` a `24px;`).
3. **Linguagem Natural e Humana**:
   * Escreva como se estivesse conversando com um estudante do Ensino Médio ou Fundamental: tom encorajador, simples e direto. Evite jargões corporativos ou termos computacionais herméticos desnecessários.
4. **Hierarquia Visual Clara**:
   * Cada tela deve ter apenas 1 botão principal de destaque (`.btn-primary`). Os outros botões devem ser secundários (`.btn-secondary`) para não dispersar a atenção do usuário.

---

## ♿ 3. Checklist Obrigatório de Acessibilidade (Avaliação de IHC)

A professora vai avaliar a conformidade com as heurísticas de Nielsen e acessibilidade WCAG 2.1 AA:

- [x] **Barra de Acessibilidade no Topo**: Toda tela inclui o cabeçalho padronizado com os botões `[ A- | A+ ]` e `[ ◐ Contraste ]`. (Já vem integrado no template!).
- [x] **Alvos de Toque Confortáveis**: Botões e cartões interativos possuem no mínimo **48px de altura** para facilitar o toque no celular.
- [x] **Navegação por Teclado**: Todo botão e link exibe anel de foco visível (`:focus-visible`) ao navegar com a tecla `Tab`.
- [x] **Semântica HTML5**: Um único `<h1>` por tela, formulários com `<label>` associado a cada `<input>` e anúncios dinâmicos com `aria-live="polite"`.

---

## 📁 4. Estrutura de Pastas e Módulos do Protótipo

Organização dos arquivos no repositório:

```text
obi-website/
├── index.html
├── README.md
├── PROJETO.md
├── ESPECIFICACAO_IHC.md
├── GUIA_DA_EQUIPE.md
├── assets/
│   ├── css/tokens.css
│   ├── css/base.css
│   └── js/utils.js
└── telas/
    ├── template-base/
    ├── tela-01-home/
    ├── tela-02-calendario/
    ├── tela-03-checklist/
    ├── tela-04-editais/
    ├── tela-05-kit-monitor/
    ├── tela-06-quiz-pergunta-1/
    ├── tela-07-quiz-logica/
    ├── tela-08-quiz-apoio/
    ├── tela-09-resultado-nivel/
    ├── tela-10-solicitacao-escola/
    ├── tela-11-confirmacao-polo/
    └── tela-12-comunidade-extensao/
```

Descrição dos arquivos e módulos:
- `index.html`: Hub central com visão geral de todas as telas.
- `README.md`: Apresentação do projeto e instruções de execução.
- `PROJETO.md`: Padrões do projeto, Clean Code e convenções.
- `ESPECIFICACAO_IHC.md`: Detalhamento técnico e arquitetura de IHC.
- `GUIA_DA_EQUIPE.md`: Guia de padrões visuais e boas práticas da equipe.
- `assets/css/tokens.css`: Variáveis e design tokens (cores, raios, fontes).
- `assets/css/base.css`: Estilos estruturais e moldura mobile.
- `assets/js/utils.js`: Utilitários de acessibilidade, fonte e protocolo.
- `telas/template-base/`: Modelo base para replicação de novas telas.
- `telas/tela-01-home/`: Home / Painel da Jornada.
- `telas/tela-02-calendario/`: Calendário & Prazos da OBI com exportação `.ics`.
- `telas/tela-03-checklist/`: Trilha de Estudos & Checklist interativo persistente.
- `telas/tela-04-editais/`: Editais Descomplicados em linguagem simples.
- `telas/tela-05-kit-monitor/`: Kit do Monitor Universitário e avisos prontos.
- `telas/tela-06-quiz-pergunta-1/`: Diagnóstico: Pergunta 1 (Modalidade).
- `telas/tela-07-quiz-logica/`: Diagnóstico: Pergunta 2 (Lógica vs Código).
- `telas/tela-08-quiz-apoio/`: Diagnóstico: Pergunta 3 (Série & Apoio).
- `telas/tela-09-resultado-nivel/`: Resultado da Análise & Categoria Recomendada.
- `telas/tela-10-solicitacao-escola/`: Solicitação de Apoio para Escola Pública.
- `telas/tela-11-confirmacao-polo/`: Confirmação de Polo & Comprovante de Inscrição.
- `telas/tela-12-comunidade-extensao/`: Hub Comunitário, WhatsApp & FAQ.

---

## 🚀 5. Como Testar e Contribuir

1. Abra o arquivo [`index.html`](./index.html) diretamente no seu navegador ou via servidor local leve (`python3 -m http.server 8000`).
2. O fluxo interativo completo de autoavaliação e solicitação de apoio pode ser iniciado pelo botão principal do Hub Central (iniciando na Tela 06 e percorrendo até a Tela 12).
3. Todas as telas salvam suas respostas e preferências localmente, sem dependência de banco de dados externo.
