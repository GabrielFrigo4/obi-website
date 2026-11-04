# Protocolo de Compilação Incremental: PDF para Markdown (PROMPT.md)

Este documento define o **prompt padronizado** e o protocolo técnico que qualquer agente de inteligência artificial ou desenvolvedor deve seguir para converter materiais didáticos, slides e apostilas em formato PDF (armazenados em `PDFs/`) para arquivos Markdown estruturados em `PDFs/markdown/`.

---

## 🎯 Objetivo
Transformar apresentações em PDF e documentos teóricos da disciplina de IHC em arquivos Markdown legíveis, semanticamente enriquecidos e otimizados para consumo por agentes e estudantes, garantindo:
1. **Fidelidade Integral:** Preservação de todo o conteúdo textual, títulos, tópicos e conceitos-chave.
2. **Execução Incremental (Sem Desperdício de Tempo):** Processar apenas arquivos novos ou alterados, consultando um manifesto de integridade (`PDFs/manifest.json`).
3. **Formatação Padronizada:** Separação clara por slides/páginas, destaque para termos teóricos (heurísticas, leis de usabilidade, critérios ergonômicos) e remoção de artefatos de quebra de linha indesejados.

---

## 📋 Prompt para o Agente Compilador

Ao solicitar a compilação a um agente, utilize o seguinte prompt como instrução direta:

```markdown
Você é um agente especialista em processamento de documentos e síntese de IHC.
Sua tarefa é executar a compilação incremental de todos os PDFs da pasta `PDFs/` para arquivos Markdown em `PDFs/markdown/`.

Siga estritamente este fluxo:
1. Verifique o arquivo `PDFs/manifest.json`. Para cada arquivo `.pdf` em `PDFs/`:
   - Calcule o hash SHA-256 do arquivo.
   - Se o hash coincidir com o registrado no manifesto e o arquivo `.md` correspondente existir, PULE o arquivo e informe que ele já está atualizado.
   - Se o arquivo for novo ou o hash tiver mudado, processe-o.
2. Para extração de texto:
   - Utilize ferramentas de layout fiel (ex.: `/usr/bin/pdftotext -layout <arquivo.pdf> -` ou bibliotecas com suporte a OCR/textos embutidos).
   - Para slides com imagens de texto rasterizadas (como slides do Gamma), consulte os dados estruturados de extração (ex.: `all_slides_content.json`) para recuperar o texto completo.
3. Formate a saída Markdown com:
   - Cabeçalho Frontmatter YAML com título, data, fonte e quantidade de páginas/slides.
   - Divisões semânticas por slide/página: `## Slide X: [Título do Slide]`.
   - Listas demarcadas com marcadores (`*` ou `-`), tabelas em Markdown e blocos de citação (`>`) para definições e leis de IHC.
   - Seção final de "Conceitos-Chave e Aplicações em IHC" sintetizando o conteúdo relevante para o projeto.
4. Ao concluir, atualize o `PDFs/manifest.json` com os novos hashes e timestamps.
5. Emita um sumário dos arquivos processados e dos que foram ignorados por estarem inalterados.
```

---

## ⚙️ Execução Automatizada via Script Python

Para compilação rápida via terminal ou CI/CD, execute o script oficial integrado ao projeto:

```bash
# Compilar todos os materiais novos ou modificados
python3 compilar_materiais.py

# Forçar recompilação completa (ignora cache)
python3 compilar_materiais.py --force
```

### Estrutura do Manifesto (`PDFs/manifest.json`)
```json
{
  "Slide 01.pdf": {
    "sha256": "4a7b...",
    "data_compilacao": "2026-11-03T23:15:00Z",
    "saida_md": "PDFs/markdown/Slide_01_Introducao_IHC.md",
    "total_paginas": 26
  }
}
```

---

## 🛡️ Regras de Qualidade na Saída Markdown
- **Zero Alucinação:** Não invente tópicos ou mude afirmações teóricas dos autores/professores.
- **Limpeza de Caracteres Especiais:** Eliminar caracteres `\x0c` (form feeds), hífenes de separação silábica incorretos e espaços múltiplos.
- **Destaque Teórico:** Toda menção a normas (ex.: ABNT, ISO 9241, WCAG), autores (ex.: Jakob Nielsen, Don Norman, Bastien & Scapin) e princípios (Acessibilidade, Affordance, Carga Cognitiva, Feedback) deve estar em negrito ou bloco destacado.

