# Guia e Protocolo de Compilação (COMPILACAO.md)

> **Nota de Referência:** Este arquivo é o guia operacional do protocolo oficial definido em [`PROMPT.md`](./PROMPT.md). Ambos documentam o mesmo pipeline padronizado de compilação incremental de PDFs para Markdown.

---

## 🚀 Como Executar a Compilação

O projeto conta com o script de compilação automatizado [`compilar_materiais.py`](./compilar_materiais.py), que faz a conversão incremental de todos os arquivos em `PDFs/` para `PDFs/markdown/`.

### 1. Compilação Incremental (Padrão)
Executa a verificação dos hashes SHA-256 no arquivo `PDFs/manifest.json`. Processa apenas PDFs novos ou modificados, economizando tempo e evitando retrabalho:

```bash
python3 compilar_materiais.py
```

### 2. Forçar Recompilação Completa
Para reprocessar todos os PDFs do zero e regenerar todos os arquivos Markdown:

```bash
python3 compilar_materiais.py --force
```

### 3. Modo Detalhado (Verbose)
Exibe no console detalhes de cada página, hashes e arquivos ignorados/processados:

```bash
python3 compilar_materiais.py --verbose
```

---

## 📂 Onde Encontrar os Materiais Compilados

Todos os arquivos Markdown gerados encontram-se estruturados em:
- `PDFs/markdown/Slides/`: Apresentações e aulas (Slide 01 a 05, Unidade 1 Gamma).
- `PDFs/markdown/Guia/`: Guias metodológicos, requisitos, estudo de caso e uso ético de IA.
- `PDFs/markdown/Atividades/`: Relatórios de auditoria e modelos de canvas.

Para instruções detalhadas de como orientar um agente de IA a realizar essa conversão sem scripts, consulte o arquivo [`PROMPT.md`](./PROMPT.md).

