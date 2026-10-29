# Central OBI UFABC · Protótipo Interativo de IHC
> Aplicação Web Mobile-First desenvolvida para a disciplina de **Interação Humano-Computador (UFABC 2026.3)** com foco em Design Universal, Design Ético e conformidade com WCAG 2.1 nível AA.

---

## 🎯 Objetivo do Protótipo
Democratizar e simplificar o acesso de estudantes da educação básica (com ênfase especial na rede pública do Grande ABC) às informações, inscrições, materiais de estudo e polos de apoio da Olimpíada Brasileira de Informática (OBI).

---

## 🧭 Documentação e Especificações Técnicas

Para assegurar consistência de IHC, acessibilidade e harmonia de código entre todos os membros da equipe:

1. **[Guia da Equipe & Acordo de Estilo](./GUIA_DA_EQUIPE.md)**: Padrão oficial de cores claras, tokens CSS compartilhados, checklist de acessibilidade e boas práticas de IHC.
2. **[Especificação Técnica de IHC](./ESPECIFICACAO_IHC.md)**: Detalhamento dos fluxos, heurísticas de usabilidade de Nielsen, persistência ética e acessibilidade de cada uma das telas.
3. **[Modelo Base de Tela](./telas/template-base/index.html)**: Padrão visual limpo com moldura mobile de 390px-420px, barra de acessibilidade integrada (`[ A- | A+ ]`, `[ ◐ Contraste ]`) e navegação padronizada.

---

## 📱 Hub de Telas do Projeto

Abra o arquivo [`index.html`](./index.html) no navegador para acessar o painel de navegação completo com todas as telas do protótipo:

| Módulo | Telas | Escopo & Descrição | Status |
| :--- | :--- | :--- | :--- |
| **Acolhimento & Editais** | **Telas 01 a 05** | Home da Jornada, Calendário Acessível com Timeline e .ICS, Trilha de Estudos/Checklist Interativo, Editais Descomplicados e Kit do Monitor | **100% Funcional e Integrado** |
| **Diagnóstico & Apoio UFABC** | **Telas 06 a 12** | Fluxo contínuo completo: Quiz de Nível (Modalidade, Lógica/Código, Série/Escola), Resultado Acessível com conexões diretas, Solicitação de Apoio Escolar, Confirmação com Protocolo/Comprovante e Central de Apoio WhatsApp/Materiais/FAQ | **100% Funcional e Integrado** |

---

## ♿ Recursos de Acessibilidade Padronizados
- **Barra de Acessibilidade Universal**: Controles de redimensionamento dinâmico de texto (`[ A- | A+ ]`) e alternância imediata de alto contraste (`[ ◐ Contraste ]`).
- **Alvos de Toque Confortáveis (Touch Targets)**: Altura mínima de **48px** em todos os botões, links de ação e cartões de opção.
- **Navegação Semântica por Teclado**: Todo elemento interativo exibe `:focus-visible` com indicador de foco nítido.
- **Leitores de Tela**: Estrutura semântica com um único `<h1>` por tela, `<fieldset>/<legend>` para opções, rotulagem em ícones via `aria-hidden` e atualizações dinâmicas anunciadas por `aria-live="polite"`.
- **Design Ético**: Zero obrigatoriedade de cadastro prévio, ausência de rankings comparativos ou contadores de pressão, e dados mantidos localmente no navegador (`localStorage`).

---

## 🚀 Como Executar Localmente
O protótipo foi construído em HTML5, CSS3 e JavaScript puro, sem dependências de frameworks ou processos de compilação:

```bash
# Opção 1: Iniciar servidor local leve via Python
python3 -m http.server 8000

# Opção 2: Iniciar servidor local via Node.js (se instalado)
npx serve .

# Acesse no navegador:
# http://localhost:8000
```
