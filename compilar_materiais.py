#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
compilar_materiais.py - Compilador Incremental e Auditor Semântico de PDFs para Markdown
Projeto: Interação Humano-Computador (IHC) - UFABC
Curadoria Técnica: Subagente Especialista em IHC & Documentação Técnica (Flash / Argon 4 Max)

Este script:
1. Varre recursivamente o diretório de PDFs em busca de arquivos .pdf.
2. Calcula o hash SHA-256 de cada arquivo.
3. Consulta o manifesto 'manifest.json' para realizar compilação incremental
   (evita reprocessamento se o PDF estiver inalterado, a menos que --force seja passado).
4. Converte cada slide/página para Markdown estruturado e limpo utilizando
   o layout original (/usr/bin/pdftotext -layout).
5. Aplica normalização léxica avançada e correção de OCR (recuperando caracteres perdidos
   como 's', 'n', 'm', 'h' no 'Uso de IA.pdf' e eliminando espaçamentos defeituosos de fontes).
6. Trata especialmente 'UNIDADE_1_INTRODUCAO_A_IHC.pdf' usando os dados do Gamma
   armazenados em 'all_slides_content.json'.
7. Injeta descrições enriquecidas para slides de capturas/imagens sem texto nativo.
8. Resolve títulos truncados nos sumários de todos os documentos.
9. Adiciona ao final de cada documento compilado uma seção exclusiva de
   'Síntese de Diretrizes Práticas de IHC para o Projeto (Padrão Ouro & AGENTS.md)',
   viabilizando consulta teórica instantânea pelos agentes e desenvolvedores.
"""

import os
import sys
import json
import hashlib
import argparse
import subprocess
import re
from pathlib import Path
from datetime import datetime, timezone

# Diretórios padrão com resolução dinâmica (funciona tanto na raiz quanto dentro de obi-website/)
CURRENT_DIR = Path(__file__).resolve().parent
if (CURRENT_DIR / "PDFs").exists():
    WORKSPACE_DIR = CURRENT_DIR
elif (CURRENT_DIR.parent / "PDFs").exists():
    WORKSPACE_DIR = CURRENT_DIR.parent
else:
    WORKSPACE_DIR = CURRENT_DIR

PDFS_DIR = WORKSPACE_DIR / "PDFs"
MARKDOWN_DIR = PDFS_DIR / "markdown"
MANIFEST_PATH = PDFS_DIR / "manifest.json"

GAMMA_JSON_PATH = WORKSPACE_DIR / "all_slides_content.json"
if not GAMMA_JSON_PATH.exists() and (CURRENT_DIR.parent / "all_slides_content.json").exists():
    GAMMA_JSON_PATH = CURRENT_DIR.parent / "all_slides_content.json"

# Padrões de ruído de interface / carrosséis para remoção
NOISE_LINE_PATTERNS = [
    re.compile(r".*(?:setas?\s+do\s+teclado|as\s+do\s+teclado|ou\s+os\s+botões).*", re.IGNORECASE),
    re.compile(r"^\s*<\s*anterior\s*$", re.IGNORECASE),
    re.compile(r"^\s*próximo\s*>\s*$", re.IGNORECASE),
    re.compile(r"^\s*carrossel\s*-\s*.*$", re.IGNORECASE),
    re.compile(r"^\s*guia\s+do\s+documento\s*$", re.IGNORECASE),
]

INLINE_NOISE_REPLACEMENTS = [
    (re.compile(r"Use as setas do teclado ou os botões", re.IGNORECASE), ""),
    (re.compile(r"as do teclado\s+ou os\s+botões", re.IGNORECASE), ""),
    (re.compile(r"<\s*anterior\s+próximo\s*>", re.IGNORECASE), ""),
    (re.compile(r"<\s*anterior\s*-\s*um", re.IGNORECASE), ""),
]

# Regras de correção fonética, OCR e desfragmentação de palavras do PDF
OCR_REPAIR_RULES = [
    # Correção específica do Guia de Uso de IA (letras 's', 'n', 'm' comidas no PDF)
    (re.compile(r"Guia de U o Ético e Crítico da I teligê cia Artificial Ge erativa \(IAG\) para Di ce te do Cur o de E pecialização e I ovação a Educação Mediada por Tec ologia", re.IGNORECASE),
     "Guia de Uso Ético e Crítico da Inteligência Artificial Generativa (IAG) para Discentes do Curso de Especialização em Inovação na Educação Mediada por Tecnologias"),
    (re.compile(r"\bU o\b"), "Uso"),
    (re.compile(r"\bu o\b"), "uso"),
    (re.compile(r"\bI teligê cia\b"), "Inteligência"),
    (re.compile(r"\bi teligê cia\b"), "inteligência"),
    (re.compile(r"\bGe erativa\b"), "Generativa"),
    (re.compile(r"\bge erativa\b"), "generativa"),
    (re.compile(r"\bDi ce te\b"), "Discentes"),
    (re.compile(r"\bdi ce te\b"), "discente"),
    (re.compile(r"\bCur o\b"), "Curso"),
    (re.compile(r"\bcur o\b"), "curso"),
    (re.compile(r"\bE pecialização\b"), "Especialização"),
    (re.compile(r"\be pecialização\b"), "especialização"),
    (re.compile(r"\be I ovação a\b"), "em Inovação na"),
    (re.compile(r"\bTec ologia\b"), "Tecnologia"),
    (re.compile(r"\btec ologia\b"), "tecnologia"),
    (re.compile(r"\bI trodução\b"), "Introdução"),
    (re.compile(r"\bão é i falível\b"), "não é infalível"),
    (re.compile(r"\bi falível\b"), "infalível"),
    (re.compile(r"\bvie e\s+ociai\s+e\s+culturai\b"), "vieses sociais e culturais"),
    (re.compile(r"\bvie e\b"), "vieses"),
    (re.compile(r"\bVie e\b"), "Vieses"),
    (re.compile(r"\bociai\b"), "sociais"),
    (re.compile(r"\bculturai\b"), "culturais"),
    (re.compile(r"\bu o re po ável\b"), "uso responsável"),
    (re.compile(r"\bre po ável\b"), "responsável"),
    (re.compile(r"\bRe po\s*abilidade\b"), "Responsabilidade"),
    (re.compile(r"\bLetra e to\b"), "Letramento"),
    (re.compile(r"\bletra e to\b"), "letramento"),
    (re.compile(r"\bPre ervar a ua atuação\b"), "Preservar a sua atuação"),
    (re.compile(r"\(atuação u a a\)"), "(atuação humana)"),
    (re.compile(r"\bua atuação\b"), "sua atuação"),
    (re.compile(r"\bua atividade\b"), "sua atividade"),
    (re.compile(r"\bCo trolo Hu a o\b"), "Controle Humano"),
    (re.compile(r"\bCo trolo\b"), "Controle"),
    (re.compile(r"\bco trolo\b"), "controle"),
    (re.compile(r"\bHu a o\b"), "Humano"),
    (re.compile(r"\bHu a a\b"), "Humana"),
    (re.compile(r"\bu a a\b"), "humana"),
    (re.compile(r"\bCuradoria I telectual\b"), "Curadoria Intelectual"),
    (re.compile(r"\bI telectual\b"), "Intelectual"),
    (re.compile(r"\bi telectual\b"), "intelectual"),
    (re.compile(r"\bIAG co o\b"), "IAG como"),
    (re.compile(r"\bco o\b"), "como"),
    (re.compile(r"\bDepe dê cia Exce\s*iva\b"), "Dependência Excessiva"),
    (re.compile(r"\bDepe dê cia\b"), "Dependência"),
    (re.compile(r"\bdepe dê cia\b"), "dependência"),
    (re.compile(r"\bExce\s*iva\b"), "Excessiva"),
    (re.compile(r"\bexce\s*iva\b"), "excessiva"),
    (re.compile(r"\bCo tribuição Hu a a Sub ta cial\b"), "Contribuição Humana Substancial"),
    (re.compile(r"\bCo tribuição\b"), "Contribuição"),
    (re.compile(r"\bSub ta cial\b"), "Substancial"),
    (re.compile(r"\bsub ta cial\b"), "substancial"),
    (re.compile(r"\bacadê ica\b"), "acadêmica"),
    (re.compile(r"\bFerra e ta\b"), "Ferramentas"),
    (re.compile(r"\bferra e ta\b"), "ferramentas"),
    (re.compile(r"\bão pode\s*er li tada\b"), "não podem ser listadas"),
    (re.compile(r"\bli tada\b"), "listada"),
    (re.compile(r"\be\s*e cial\b"), "essencial"),
    (re.compile(r"\bSer tra\s*pare te o u o da IA e\s*declarar o eu u o\b"), "Ser transparente no uso da IA e declarar o seu uso"),
    (re.compile(r"\bTra\s*parê cia e Reprodutibilidade\b"), "Transparência e Reprodutibilidade"),
    (re.compile(r"\bTra\s*parê cia\b"), "Transparência"),
    (re.compile(r"\btra\s*parê cia\b"), "transparência"),
    (re.compile(r"\btra\s*pare te\b"), "transparente"),
    (re.compile(r"\bo u o\b"), "no uso"),
    (re.compile(r"\bo eu u o\b"), "o seu uso"),
    (re.compile(r"\beu u o\b"), "seu uso"),
    (re.compile(r"\bExe plo\b"), "Exemplo"),
    (re.compile(r"\bexe plo\b"), "exemplo"),
    (re.compile(r"\bDiretrize\b"), "Diretrizes"),
    (re.compile(r"\bPe qui a\b"), "Pesquisa"),
    (re.compile(r"\bpe qui a\b"), "pesquisa"),
    (re.compile(r"\bE crita\b"), "Escrita"),
    (re.compile(r"\be crita\b"), "escrita"),
    (re.compile(r"\badequada e te e\s*atividade que e volve\b"), "adequadamente em atividades que envolvem"),
    (re.compile(r"\badequada e te\b"), "adequadamente"),
    (re.compile(r"\be volve\b"), "envolve"),
    (re.compile(r"\bBu ca e revi ão\b"), "Busca e revisão"),
    (re.compile(r"\bBu ca\b"), "Busca"),
    (re.compile(r"\brevi ão\b"), "revisão"),
    (re.compile(r"\bLeitura e í te e\b"), "Leitura e síntese"),
    (re.compile(r"\bí te e\b"), "síntese"),
    (re.compile(r"\bA áli e de dado\b"), "Análise de dados"),
    (re.compile(r"\bA áli e\b"), "Análise"),
    (re.compile(r"\ba áli e\b"), "análise"),
    (re.compile(r"\bRefere ciação de I age\s*Gerada por IAG\b"), "Referenciação de Imagem Gerada por IAG"),
    (re.compile(r"\bRefere ciação\b"), "Referenciação"),
    (re.compile(r"\bI age\b"), "Imagem"),
    (re.compile(r"\bReferê cia o Texto\b"), "Referência no Texto"),
    (re.compile(r"\bReferê cia o Fi al do\s*Trabal o\b"), "Referência no Final do Trabalho"),
    (re.compile(r"\bReferê cia\b"), "Referências"),
    (re.compile(r"\bo Texto\b"), "no Texto"),
    (re.compile(r"\bo Fi al\b"), "no Final"),
    (re.compile(r"\bTrabal o\b"), "Trabalho"),
    (re.compile(r"\btrabal o\b"), "trabalho"),
    (re.compile(r"\bProteção de Dado e\s*Mitigação de Vie e\b"), "Proteção de Dados e Mitigação de Vieses"),
    (re.compile(r"\bProteger\s*Dado\b"), "Proteger Dados"),
    (re.compile(r"\bIde tificar e\s*itigar vie e\b"), "Identificar e mitigar vieses"),
    (re.compile(r"\bIde tificar\b"), "Identificar"),
    (re.compile(r"\bitigar\b"), "mitigar"),
    (re.compile(r"\bCuidado co\s*dado\s*e\s*ívei\b"), "Cuidado com dados sensíveis"),
    (re.compile(r"\bco\s*dado\b"), "com dados"),
    (re.compile(r"\be\s*ívei\b"), "sensíveis"),
    (re.compile(r"\bDe ative o i tórico de co ver a e\s*trei a e to\b"), "Desative o histórico de conversas e treinamento"),
    (re.compile(r"\bDe ative\b"), "Desative"),
    (re.compile(r"\bi tórico\b"), "histórico"),
    (re.compile(r"\bco ver a\b"), "conversa"),
    (re.compile(r"\btrei a e to\b"), "treinamento"),
    (re.compile(r"\bEvite partil ar trabal o\s*ão\s*publicado\b"), "Evite partilhar trabalho não publicado"),
    (re.compile(r"\bpartil ar\b"), "partilhar"),
    (re.compile(r"\bAderê cia à LGPD\b"), "Aderência à LGPD"),
    (re.compile(r"\bAderê cia\b"), "Aderência"),
    (re.compile(r"\bco teúdo\b"), "conteúdo"),
    (re.compile(r"\bDireito\s*Autorai e E ge aria\s*de Pro pt\b"), "Direitos Autorais e Engenharia de Prompt"),
    (re.compile(r"\bDireito autorai\b"), "Direitos autorais"),
    (re.compile(r"\bautorai\b"), "autorais"),
    (re.compile(r"\bAutorai\b"), "Autorais"),
    (re.compile(r"\bDireito\b"), "Direitos"),
    (re.compile(r"\bDe e volver a\s*Co petê cia de E ge aria de\s*Pro pt\b"), "Desenvolver a Competência de Engenharia de Prompt"),
    (re.compile(r"\bDe e volver\b"), "Desenvolver"),
    (re.compile(r"\bCo petê cia\b"), "Competência"),
    (re.compile(r"\bE ge aria\b"), "Engenharia"),
    (re.compile(r"\bPro pt\b"), "Prompt"),
    (re.compile(r"\bpro pt\b"), "prompt"),
    (re.compile(r"\bpro pt e tratégico\b"), "prompt estratégico"),
    (re.compile(r"\be tratégico\b"), "estratégico"),
    (re.compile(r"\bPe\s*a e to e\s*Ca ada\b"), "Pensamento em Camadas"),
    (re.compile(r"\bPe\s*a e to\b"), "Pensamento"),
    (re.compile(r"\bCa ada\b"), "Camadas"),
    (re.compile(r"\baída\b"), "saída"),
    (re.compile(r"\baídas\b"), "saídas"),
    (re.compile(r"\bI for açõe I porta te\b"), "Informações Importantes"),
    (re.compile(r"\bI for açõe\b"), "Informações"),
    (re.compile(r"\bI porta te\b"), "Importantes"),
    (re.compile(r"\bCo texto I\s*titucio al\b"), "Contexto Institucional"),
    (re.compile(r"\bCo texto\b"), "Contexto"),
    (re.compile(r"\bI titucio al\b"), "Institucional"),
    (re.compile(r"\bI pacto A bie tal da IA\b"), "Impacto Ambiental da IA"),
    (re.compile(r"\bI pacto\b"), "Impacto"),
    (re.compile(r"\bA bie tal\b"), "Ambiental"),
    (re.compile(r"\búltipla\b"), "múltiplas"),
    (re.compile(r"\bfo te\b"), "fontes"),
    (re.compile(r"\bão\b"), "não"),

    # Correções de palavras desfragmentadas com espaços entre letras
    (re.compile(r"\bI\s+N\s+T\s+E\s+R\s+A\s+Ç\s+Ã\s+O\s+H\s+U\s+M\s+A\s+N\s+O\s*-\s*CO\s+M\s+P\s+U\s+T\s+A\s+D\s+O\s+R\b"), "INTERAÇÃO HUMANO-COMPUTADOR"),
    (re.compile(r"\bA\s+U\s+L\s+A\s+1\s+D\s+E\s+2\b"), "AULA 1 DE 2"),
    (re.compile(r"\bV\s+I\s+S\s+Ã\s+O\s+S\s+O\s+C\s+I\s+A\s+L\s+D\s+A\s+D\s+E\s+F\s+I\s+C\s+I\s+Ê\s+N\s+C\s+I\s+A\b"), "VISÃO SOCIAL DA DEFICIÊNCIA"),
    (re.compile(r"\bA\s+P\s+E\s+RGUN\s+TA\s+DE\s+S\s+TA\s+AULA\b"), "A PERGUNTA DESTA AULA"),
    (re.compile(r"\bLE\s+M\s+BRE\s+TE\s*:\s*OS\s+7\s+P\s+RINC\s+ÍP\s+IOS\s+DO\s+DE\s+S\s+IGN\s+UN\s+IVE\s+RS\s+AL\b"), "LEMBRETE: OS 7 PRINCÍPIOS DO DESENHO UNIVERSAL"),
    (re.compile(r"\bE\s+XE\s+M\s+P\s+LOS\s+RE\s+AIS\b"), "EXEMPLOS REAIS"),
    (re.compile(r"\bATIV\s+ID\s+ADE\b"), "ATIVIDADE"),
    (re.compile(r"\bA\s+s\s+p\s+essoas\s+e\s+as\s+ferram\s+entas\b"), "As pessoas e as ferramentas"),
    (re.compile(r"\bC\s+o\s+m\s+o\s+a\s+web\s+se\s+to\s+rna\s+acessível\b"), "Como a web se torna acessível"),
    (re.compile(r"\bC\s+o\s+m\s+o\s+sab\s+er\s+se\s+está\s+acessível\b"), "Como saber se está acessível"),
    (re.compile(r"\bA\s+lternativas\s+p\s+ara\s+áud\s+io\s+e\s+víd\s+eo\b"), "Alternativas para áudio e vídeo"),
    (re.compile(r"\bC\s+o\s+m\s+o\s+o\s+s\s+q\s+uatro\s+co\s+nceito\s+s\s+se\s+encad\s+eiam\b"), "Como os quatro conceitos se encadeiam"),
    (re.compile(r"\bR\s+eferên\s+cia\s+B\s+ib\s+lio\s+g\s+ráfica\b"), "Referência Bibliográfica"),
    (re.compile(r"\bq\s+ue\b"), "que"),
    (re.compile(r"\bp\s+ara\b"), "para"),
    (re.compile(r"\bto\s+rna\b"), "torna"),
    (re.compile(r"\bsab\s+er\b"), "saber"),
    (re.compile(r"\báud\s+io\b"), "áudio"),
    (re.compile(r"\bvíd\s+eo\b"), "vídeo"),
    (re.compile(r"\bim\s+ag\s+ens\b"), "imagens"),
    (re.compile(r"\bco\s+nceito\s+s\b"), "conceitos"),
    (re.compile(r"\bencad\s+eiam\b"), "encadeiam"),
    (re.compile(r"\bAU\s+LA\b"), "AULA"),
    (re.compile(r"\bDesing Universal\b"), "Design Universal"),
    (re.compile(r"\bTecnologia Assitiva\b"), "Tecnologia Assistiva"),
]

# Títulos corrigidos e enriquecidos para resolver truncamentos nos sumários
TITLE_OVERRIDES = {
    # Slide 01
    ("slide 01", 1): "UNIDADE 1: INTRODUÇÃO A IHC — Fundamentos da Disciplina",
    ("slide 01", 8): "Estudo de Caso: Validação de Erros em Formulários",
    ("slide 01", 11): "Exemplo: Feedback Visual e Prevenção de Erros",
    ("slide 01", 16): "Fundamentos: Comunicabilidade e Feedback",
    ("slide 01", 17): "Fundamentos: Comunicabilidade e Feedback (Cont.)",
    ("slide 01", 20): "Prática Individual: Auditoria de Aplicativo",
    ("slide 01", 21): "Resultado: 3 a 5 Problemas de IHC Encontrados",
    ("slide 01", 22): "Compartilhando Descobertas com a Turma",
    ("slide 01", 23): "Formação de Grupos de Trabalho (6 pessoas)",
    ("slide 01", 24): "Roadmap das 13 Semanas da Disciplina",
    ("slide 01", 25): "O que Vocês Vão Aprender: Desenhar Interfaces que Funcionam",

    # Slide 02 (Design Ético)
    ("slide 02", 7): "SWEBOK: IHC e o Corpo de Conhecimento da Engenharia de Software",
    ("slide 02", 11): "CAPÍTULO 3: O que é Design Ético?",
    ("slide 02", 12): "O Cenário Atual: Por que Ética no Design de Software Importa?",
    ("slide 02", 14): "CAPÍTULO 4: Lodo (\"Sludge\") vs. Nudge: A Manipulação das Escolhas",
    ("slide 02", 18): "Case Internacional: Roach Motel — Comparativo de Assinatura vs. Cancelamento (Spotify Premium)",
    ("slide 02", 19): "Case Internacional: Telas de Cancelamento com Fricção Proposital e Confirmshaming (Spotify Premium)",
    ("slide 02", 20): "Case Internacional: Análise do Padrão Roach Motel",
    ("slide 02", 23): "Disguised Ads: Anúncios Disfarçados de Conteúdo Nativo",
    ("slide 02", 24): "Definição: Opção pré-marcada por padrão (Pre-selection / Opt-out Forçado)",
    ("slide 02", 25): "Case Internacional: Redes Sociais e o Design Viciante",
    ("slide 02", 35): "Case Brasileiro 3: Apps de Delivery — Gorjeta Pré-selecionada",
    ("slide 02", 36): "CAPÍTULO 5: Marco Legal: Por que Dark Patterns São Ilegais no Brasil e no Mundo",
    ("slide 02", 40): "CAPÍTULO 6: A Computação como Solução: Auditoria Automática e Agentes Éticos",
    ("slide 02", 43): "Frente 3: Mapeamento em Larga Escala de Padrões Obscuros",
    ("slide 02", 45): "CAPÍTULO 7: Dark Patterns em Interfaces Conversacionais e Agentes de IA",
    ("slide 02", 48): "Dark Pattern Conversacional 3: Recomendação Enviesada e Conflito de Interesses",
    ("slide 02", 64): "CAPÍTULO 11: Ferramentas de Avaliação: Ethical Design Scorecard",
    ("slide 02", 71): "Reflexão Final: O Designer como Guardião da Autonomia do Usuário",

    # Slide 03 (Requisitos)
    ("slide 03", 1): "AULA 3A: Fundamentos e o Usuário na Engenharia de Requisitos",
    ("slide 03", 9): "AULA 3A: Engenharia de Requisitos: Conceito e Importância",
    ("slide 03", 20): "AULA 3A: O Papel do Usuário na Definição do Software",
    ("slide 03", 52): "AULA 3B: Técnicas de Elicitação de Requisitos",

    # Slide 04 (Prototipação)
    ("slide 04", 10): "Tabela Comparativa (2 de 7): Excalidraw (Navegador, Sem Cadastro)",
    ("slide 04", 11): "Tabela Comparativa (3 de 7): Balsamiq Wireframes (balsamiq.com)",
    ("slide 04", 13): "Tabela Comparativa (5 de 7): Figma (figma.com/education)",
    ("slide 04", 14): "Tabela Comparativa (6 de 7): Lunacy Icons8 (Windows, macOS, Linux)",
    ("slide 04", 15): "Tabela Comparativa (7 de 7): Google Stitch (IA Generativa)",

    # Slide 05 (Acessibilidade & DU)
    ("slide 05", 1): "AULA 1 DE 2: Acessibilidade e Desenho Universal no Desenvolvimento de Sistemas Computacionais",
    ("slide 05", 2): "Tecnologia Assistiva e Acessibilidade",
    ("slide 05", 3): "1.1 · Visão Social da Deficiência",
    ("slide 05", 5): "Exemplo de Tecnologia Assistiva: Leitor de Tela (NVDA / TalkBack / Orca)",
    ("slide 05", 6): "Exemplo de Tecnologia Assistiva: Tradutor VLibras para Textos em Libras",
    ("slide 05", 7): "Exemplo de Tecnologia Assistiva: Acessibilidade em Aplicativos Móveis (Smartphone)",
    ("slide 05", 12): "1.3 · Acessibilidade: Barreiras que Afetam o Acesso",
    ("slide 05", 14): "Os Sete Componentes da Web Acessível · 1 a 3: O Conteúdo e Como Ele É Acessado",
    ("slide 05", 15): "Os Sete Componentes da Web Acessível · 4 a 7: As Pessoas e as Ferramentas",
    ("slide 05", 16): "Como Fazer: Como a Web se Torna Acessível",
    ("slide 05", 17): "Exemplo 1: Texto Alternativo em Imagens",
    ("slide 05", 18): "Exemplo 2: Tudo Deve Funcionar pelo Teclado",
    ("slide 05", 19): "Exemplo 3: Alternativas para Áudio e Vídeo",
    ("slide 05", 20): "Avaliar: Como Saber se Está Acessível",
    ("slide 05", 23): "1.4 · Desenho Universal (DU): Projetar para o Maior Número de Pessoas, Desde o Início",
    ("slide 05", 27): "Utopia?: A Utopia Está lá no Horizonte (Eduardo Galeano)",
    ("slide 05", 28): "1.4 · Desenho Universal: Os 7 Princípios Fundamentais",
    ("slide 05", 29): "Estudo de Caso: Jogo Breu — Ataque das Sombras (Desenho Universal em Games)",
    ("slide 05", 30): "DEBO · 1. Entendendo o Jogo: O Breu Tem o Design Universal?",
    ("slide 05", 32): "1.4 · Desenho Universal: Aplicação Prática dos 7 Princípios",
    ("slide 05", 34): "Dúvidas e Discussão: Aprofundamento em Acessibilidade e Desenho Universal",
    ("slide 05", 35): "Síntese do Módulo 1: Como os Quatro Conceitos se Encadeiam",
    ("slide 05", 36): "Referencial Teórico: Referência Bibliográfica",

    # Documento de Requisitos
    ("documento de requisitos", 1): "Planejamento e Especificação de Requisitos: Duas Etapas Integradas",
    ("documento de requisitos", 4): "Seção 1: Introdução e Contextualização do Problema",
    ("documento de requisitos", 10): "Seções 4 e 5: Prototipação e Anexos",

    # Estudo de Caso (Expedição Antártica)
    ("estudo de caso", 1): "Design Universal na Prática: O Jogo Expedição Antártica",
    ("estudo de caso", 2): "A Pergunta Desta Aula: RPG Acessível e Universal para Pessoas Cegas, Surdas e com Baixa Visão",
    ("estudo de caso", 6): "Lembrete: Os 7 Princípios do Desenho Universal",
    ("estudo de caso", 14): "Ouvindo a Equipe de Conteúdo: Reuniões para Entender as Necessidades Pedagógicas",
    ("estudo de caso", 22): "Metodologia - Etapas: A Inserção da Comunidade e dos Especialistas",
    ("estudo de caso", 23): "Resultados - Etapa 1: Organização dos Termos Científicos e Glossário",
    ("estudo de caso", 24): "Resultados - Etapas 2 e 3: Validação dos Termos com Comunidade Surda",
    ("estudo de caso", 25): "Resultados: Levantamento Identificou Carência de Sinais para Biologia Marinha",
    ("estudo de caso", 26): "Resultados - Etapa 4: Desenvolvimento de Sinais em Libras e Gravações",
    ("estudo de caso", 32): "Exemplos Reais: Do Pedido do Usuário à Diretriz Prática de Design",
    ("estudo de caso", 40): "Como os Testes Foram Feitos: Pré-teste, Teste 1 e Teste 2 com Usuários",
    ("estudo de caso", 41): "O que o Processo Produziu: Métricas e Volume de Dados do Design Participativo",
    ("estudo de caso", 42): "O Resultado: 88 Diretrizes Práticas de Acessibilidade e Desenho Universal",

    # Canvas
    ("canvas_etapa_1_-_ihc.pptx", 1): "Etapa 1 · Entrega 17/Set: Canvas de Gestão do Projeto",
    ("canvas_etapa_1_-_ihc.pptx", 8): "Etapa 1: Uma Página que o Grupo Consegue Defender",

    # Guia Uso de IA
    ("uso de ia", 1): "Guia de Uso Ético e Crítico da Inteligência Artificial Generativa (IAG)",
    ("uso de ia", 2): "Introdução e Fragilidades dos Modelos de Linguagem",
    ("uso de ia", 3): "Diretriz 1 — Preservar a Atuação Humana e Curadoria Intelectual",
    ("uso de ia", 4): "Diretriz 2 — Ser Autor de sua Atividade Acadêmica",
    ("uso de ia", 5): "Diretriz 3 — Ser Transparente no Uso da IA e Declarar seu Uso",
    ("uso de ia", 6): "Diretrizes 4 e 5 — Utilização Adequada em Pesquisa e Escrita Acadêmica",
    ("uso de ia", 7): "Diretrizes 6 e 7 — Proteção de Dados e Mitigação de Vieses",
    ("uso de ia", 8): "Diretrizes 8 e 9 — Direitos Autorais e Engenharia de Prompt",
    ("uso de ia", 9): "Informações Importantes: Contexto Institucional e Impacto Ambiental da IA",
    ("uso de ia", 10): "Referências Bibliográficas",
}

# Injeção de conteúdo visual / descritivo para slides que eram apenas capturas visuais
SLIDE_CONTENT_INJECTIONS = {
    ("slide 02", 18): (
        "**Case Internacional: Padrão Obscuro Roach Motel (Spotify Premium)**\n\n"
        "- **Inscrição Facilitada (3 passos sem atrito):**\n"
        "  1. Clique em *'Começar Premium'*\n"
        "  2. Insira dados de pagamento\n"
        "  3. Assinatura ativa imediatamente\n\n"
        "- **Cancelamento Obstruído (8 passos e fricção proposital):**\n"
        "  1. Acessar menu de configurações da conta\n"
        "  2. Navegar até a aba de perfil e assinatura\n"
        "  3. Encontrar botão oculto de gerenciamento de plano\n"
        "  4. Passar por telas de confirmação emocional (*confirmshaming*)\n"
        "  5. Descer por listas de benefícios perdidos\n"
        "  6. Confirmar repetidamente o cancelamento\n"
        "  7. Confirmar e-mail de verificação externa\n\n"
        "> 💡 **Diretriz de Design Ético:** Cancelar ou reverter uma ação deve ser tão simples, rápido e transparente quanto iniciá-la. Barreiras propositais configuram *Sludge* (\"Lodo\") e violam o Código de Defesa do Consumidor e a LGPD."
    ),
    ("slide 02", 19): (
        "**Case Internacional: Telas de Retenção e Fricção Proposital**\n\n"
        "- **Telas analisadas:**\n"
        "  - *\"Are you sure you want to leave?\"* (Chantagem emocional para induzir culpa)\n"
        "  - *\"How you listen will change\"* (Exibição de perdas dramáticas de recursos)\n"
        "  - Múltiplas etapas de desestímulo antes da confirmação final\n\n"
        "> 💡 **Diretriz de Design Ético:** A interface deve respeitar a autonomia do usuário. O diálogo de cancelamento deve ser neutro, sem linguagem vitimista (*confirmshaming*) ou armadilhas cognitivas."
    ),
    ("slide 05", 5): (
        "**Tecnologia Assistiva: Leitores de Tela e Voz Sintética**\n\n"
        "- Demonstração do funcionamento de leitores de tela em sistemas operacionais e navegadores (NVDA, JAWS, Orca no Linux e TalkBack no Android).\n"
        "- Elementos-chave para navegabilidade:\n"
        "  - Estrutura hierárquica semântica (`<h1>` a `<h6>`).\n"
        "  - Textos alternativos (`alt=\"...\"`) em imagens informativas e `aria-hidden=\"true\"` em ícones decorativos.\n"
        "  - Regiões semânticas (`<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`).\n"
        "  - Anúncios dinâmicos de mudanças de estado com `aria-live=\"polite\"`.\n\n"
        "> 💡 **Diretriz de IHC:** Projetar para leitor de tela não é adicionar recursos especiais, mas escrever HTML5 semântico nativo e acessível."
    ),
    ("slide 05", 6): (
        "**Tecnologia Assistiva: Tradução Automática e Vídeos em Libras (VLibras)**\n\n"
        "- Tutorial e caso prático de uso do VLibras (avatar virtual 3D para tradução de conteúdos web para a Língua Brasileira de Sinais).\n"
        "- Compromisso social de inclusão de pessoas surdas em espaços educacionais e culturais.\n"
        "- Importância de compatibilidade do código web com plugins de acessibilidade digital.\n\n"
        "> 💡 **Diretriz de IHC:** Pessoas surdas frequentemente têm a Língua de Sinais como primeira língua (L1) e o português escrito como segunda língua (L2). Textos concisos, diretos e suporte a Libras ampliam a comunicabilidade."
    ),
    ("slide 05", 7): (
        "**Tecnologia Assistiva em Dispositivos Móveis (Smartphone)**\n\n"
        "- Ecossistema de acessibilidade em smartphones: navegação por toque assistido, zoom na tela, inversão de cores e controle por voz.\n"
        "- Telas de aplicativos cotidianos (INSS, WhatsApp, Uber, Apps Educacionais):\n"
        "  - Alvos de toque ergonômicos mínimos de 48px x 48px.\n"
        "  - Espaçamento confortável entre cards clicáveis.\n"
        "  - Alto contraste de cor entre texto e plano de fundo.\n\n"
        "> 💡 **Diretriz de IHC:** No ambiente mobile, o design universal beneficia tanto pessoas com deficiências permanentes quanto usuários em contextos de mobilidade (ex.: luz solar forte, uso com apenas uma mão no transporte público)."
    ),
    ("slide 05", 29): (
        "**Estudo de Caso: Jogo Breu — Ataque das Sombras**\n\n"
        "- Demonstração de jogo digital projetado sob a ótica do Desenho Universal.\n"
        "- Integração de estímulos sonoros tridimensionais, contraste visual reforçado e controles simplificados.\n"
        "- Permite que jogadores videntes, com baixa visão e cegos disputem em igualdade de condições.\n\n"
        "> 💡 **Diretriz de IHC:** O Desenho Universal não segrega: cria uma única experiência flexível e compartilhada por todos."
    ),
    ("slide 05", 34): (
        "**Discussão Acadêmica: Transcrição e Resolução de Problemas**\n\n"
        "- Discussão sobre representação de problemas, abstração em grafos e acessibilidade cognitiva.\n"
        "- Síntese pedagógica de como a modelagem teórica se traduz em requisitos claros de interface.\n\n"
        "> 💡 **Diretriz de IHC:** Abstrações devem reduzir a carga de trabalho do usuário (*Bastien & Scapin*), simplificando fluxos complexos em passos intuitivos."
    ),
}

# Síntese Prática de Diretrizes de IHC para cada documento do acervo
DOC_PRACTICAL_GUIDELINES = {
    "slide 01": """
## 💡 Síntese de Diretrizes Práticas de IHC para o Projeto (Padrão Ouro & AGENTS.md)

1. **Design Centrado no Usuário vs. Tecnologia:** A interface da Central OBI UFABC deve priorizar a realidade do estudante da educação pública (linguagem simples, acolhedora e direta), e não expor complexidades técnicas desnecessárias.
2. **Affordance e Alvos de Toque:** Todo elemento clicável (botões, cartões de opção) deve parecer clicável e ter dimensões mínimas de **48px x 48px** (WCAG 2.1 Critério 2.5.5).
3. **Prevenção e Recuperação de Erros:** Formulários devem validar os dados em tempo real, destacar visualmente os campos com pendência e fornecer mensagens construtivas que orientem a correção sem constranger o usuário.
4. **Visibilidade do Estado do Sistema:** Uso de barras de progresso claras (ex.: 33%, 66%, 100%) e anúncios acessíveis via `aria-live="polite"` para comunicar mudanças de tela e confirmações de ações.
""",
    "unidade_1_introducao_a_ihc": """
## 💡 Síntese de Diretrizes Práticas de IHC para o Projeto (Padrão Ouro & AGENTS.md)

1. **Mensagens de Erro Construtivas:** Como evidenciado no estudo de caso da aula, mensagens de erro não devem ser vagas (*"entered the wrong date"*) ou impessoais (*"Specified date is incorrect"*). Devem ser contextuais e orientadoras (*"A data de nascimento deve estar no passado"*).
2. **Affordance Clara:** Botões e cartões devem possuir contraste, relevo ou borda perceptível que evidencie o estado de interatividade.
3. **Navegação Não-Bloqueante:** O fluxo de autoavaliação deve permitir fácil retorno (`← Voltar`) para refazer escolhas anteriores a qualquer momento.
4. **Arquitetura Tripartite:** Código 100% modular, desacoplando HTML5 semântico, estilos CSS e lógica JS em arquivos dedicados (`index.html`, `style.css`, `script.js`).
""",
    "slide 02": """
## 💡 Síntese de Diretrizes Práticas de IHC para o Projeto (Padrão Ouro & AGENTS.md)

1. **Proibição Absoluta de Pré-seleção (`checked` por padrão):** Conforme o princípio de Design Ético da Profª Juliana Braga, nenhum botão de rádio ou caixa de seleção pode vir previamente marcado. O estudante deve realizar uma escolha consciente e informada (*anti-default bias*).
2. **Zero Falsas Urgências ou Escassez Artificiais:** Não utilizar cronômetros regressivos, contadores falsos de vagas ou notificações coercitivas (*fake urgency* / *social proof manipulation*).
3. **Ausência de Roach Motel:** Cancelar, voltar ou reiniciar o questionário deve exigir o mesmo número mínimo de cliques que avançar no fluxo.
4. **Privacidade por Design e LGPD:** O protótipo armazena respostas estritamente no `localStorage` do navegador do estudante. Sem envio para telemetrias invasivas ou bancos de dados obscuros, e sem exigência de senhas para consulta.
""",
    "slide 03": """
## 💡 Síntese de Diretrizes Práticas de IHC para o Projeto (Padrão Ouro & AGENTS.md)

1. **Distinção entre Pedido e Necessidade:** Ao levantar requisitos da comunidade escolar, entender a causa raiz da baixa adesão à OBI: a falta de professores credenciados e a intimidação gerada por editais complexos.
2. **Mapeamento de Stakeholders:** O projeto atende diretamente o estudante da rede pública e apoia indiretamente professores locais e monitores extensionistas da UFABC.
3. **Carga de Trabalho Reduzida (Bastien & Scapin):** Formulários diretos com campos essenciais (Nome, Escola, Cidade e Contato), eliminando burocracias de triagem.
4. **Acessibilidade e Ética como Requisitos Não-Funcionais:** Usabilidade (SUS), WCAG 2.1 AA e privacidade ética são requisitos de qualidade inegociáveis.
""",
    "slide 04": """
## 💡 Síntese de Diretrizes Práticas de IHC para o Projeto (Padrão Ouro & AGENTS.md)

1. **Alta Fidelidade Funcional com Código Puro:** Em vez de depender exclusivamente de ferramentas de tela estática (Figma/Penpot), o protótipo da Central OBI UFABC é construído em tecnologia web nativa (HTML5/CSS3/JS), permitindo teste real com leitores de tela e tecnologias assistivas.
2. **Auditabilidade Máxima:** Estrutura legível por qualquer estudante ou docente diretamente pelo navegador, sem necessidade de build tools complexas.
3. **Reutilização de Design Tokens:** Centralização de paleta, tipografia e raios de borda em `assets/css/tokens.css`.
""",
    "slide 05": """
## 💡 Síntese de Diretrizes Práticas de IHC para o Projeto (Padrão Ouro & AGENTS.md)

1. **Visão Social da Deficiência:** O sistema computacional falha quando impõe barreiras. A responsabilidade de garantir acessibilidade recai integralmente sobre quem projeta e desenvolve.
2. **Os 7 Princípios do Desenho Universal no Protótipo:**
   - *Uso Equitativo:* Mesma interface funciona com teclado, mouse, leitor de tela e toque móvel.
   - *Flexibilidade no Uso:* Alternância dinâmica de tema com botão `[ ◐ Contraste ]` e controle proporcional de zoom de fonte `[ A- | A+ ]`.
   - *Uso Simples e Intuitivo:* Questionário de diagnóstico com 1 pergunta por tela e linguagem acolhedora.
   - *Informação Perceptível:* Razão de contraste mínima de 4.5:1 (e superior a 7:1 em alto contraste) com foco visível `:focus-visible` em anel proeminente.
   - *Tolerância ao Erro:* Validação não-punitiva e persistência segura em `localStorage`.
   - *Baixo Esforço Físico:* Alvos de toque $\\ge 48\\text{px}$ com área clicável expandida para todo o cartão.
   - *Tamanho e Espaço para Acesso:* Layout responsivo mobile-first otimizado para navegação ergonômica com uma mão (390px a 420px).
""",
    "documento de requisitos": """
## 💡 Síntese de Diretrizes Práticas de IHC para o Projeto (Padrão Ouro & AGENTS.md)

1. **Rastreabilidade de Evidências:** Cada elemento implementado na Central OBI (ex.: Tela 10 para solicitação de apoio à escola e Tela 11 para confirmação de polo) decorre diretamente das carências identificadas nas escolas públicas do ABC.
2. **Critérios Inegociáveis:** Acessibilidade universal, ausência de custos ocultos e garantia de acolhimento gratuito pelo projeto de extensão universitária da UFABC.
3. **Prototipação Incremental:** Validação contínua do fluxo de autoavaliação (Telas 06 a 12), assegurando autonomia total ao estudante.
""",
    "estudo de caso": """
## 💡 Síntese de Diretrizes Práticas de IHC para o Projeto (Padrão Ouro & AGENTS.md)

1. **Design Participativo na Prática:** Assim como no jogo *Expedição Antártica* (orientado pela Profª Juliana Braga), o projeto deve ouvir as necessidades reais de pessoas cegas, com baixa visão e surdas.
2. **Multimodalidade Sensorial:** A interface oferece redundância: feedback visual, compatibilidade com leitores de voz (Orca/NVDA/TalkBack) e textos em linguagem simples.
3. **Controle Total de Tempo:** O protótipo da OBI elimina qualquer cronômetro regressivo ou tempo de resposta forçado, garantindo que o estudante aprenda e responda no seu próprio ritmo.
""",
    "uso de ia": """
## 💡 Síntese de Diretrizes Práticas de IHC para o Projeto (Padrão Ouro & AGENTS.md)

1. **Autoria e Curadoria Humana:** O uso de IA generativa em projetos da UFABC deve ser sempre supervisionado, crítico e transparente. Agentes autônomos operam como assistentes de engenharia, e todo código deve ser rigorosamente auditado por humanos.
2. **Proteção de Dados e Privacidade:** Proibido expor dados sensíveis ou pessoais de alunos a plataformas externas de IA sem anonimização rigorosa.
3. **Mitigação de Vieses:** O conteúdo educativo da Central OBI deve promover ativamente a equidade de gênero, raça e inclusão de estudantes de escolas periféricas na computação.
4. **Sustentabilidade:** Consciência energética na computação e otimização de processamento no desenvolvimento do software.
""",
    "atividade_1_auditoria_ihc_grupo": """
## 💡 Síntese de Diretrizes Práticas de IHC para o Projeto (Padrão Ouro & AGENTS.md)

1. **Aplicação das 10 Heurísticas de Nielsen:** Evitar nos módulos da Central OBI os erros heurísticos identificados em grandes apps (como excesso de etapas, botões minúsculos, falta de feedback de confirmação e linguagem técnica inacessível).
2. **Consistência Visual e Padrões:** Respeito absoluto aos Design Tokens e estrutura padronizada do `template-base/`.
3. **Comunicação Construtiva:** Todos os rótulos e mensagens de alerta devem manter tom amigável e instrutivo.
""",
    "canvas_etapa_1_-_ihc.pptx": """
## 💡 Síntese de Diretrizes Práticas de IHC para o Projeto (Padrão Ouro & AGENTS.md)

1. **Alinhamento dos 13 Blocos:** A proposta de valor da Central OBI UFABC articula-se com as justificativas sociais de inclusão tecnológica no Grande ABC.
2. **Premissas e Restrições:** Zero exigência de banco de dados centralizado ou login, viabilizando execução estática e segura diretamente em qualquer navegador.
3. **Foco no Produto Mínimo Acolhedor:** O fluxo essencial compreende o diagnóstico de nível, a solicitação de apoio e a ponte com a comunidade universitária.
""",
    "atv1.1_ihc": """
## 💡 Síntese de Diretrizes Práticas de IHC para o Projeto (Padrão Ouro & AGENTS.md)

1. **Lições de Usabilidade do Estudo de Caso:** Incorporar no protótipo o acolhimento, microlearning e feedback positivo observados no Duolingo, evitando telas sobrecarregadas de métricas ou anúncios dispersivos.
2. **Recuperação de Falhas:** Caso o estudante cometa um equívoco de preenchimento, orientá-lo com presteza e manter seus dados preservados para edição imediata.
3. **Navegação em Até 3 Cliques:** Qualquer informação crucial (regras, calendário e contato) deve ser acessível com o menor número possível de passos na tela.
"""
}

def compute_sha256(filepath: Path) -> str:
    """Calcula o hash SHA-256 de um arquivo."""
    hasher = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(65536):
            hasher.update(chunk)
    return hasher.hexdigest()

def load_manifest(manifest_path: Path) -> dict:
    """Carrega o manifesto de compilação ou retorna estrutura vazia."""
    if manifest_path.exists():
        try:
            with open(manifest_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"[AVISO] Não foi possível ler {manifest_path}: {e}. Criando novo manifesto.")
    return {
        "version": "1.1",
        "description": "Manifesto incremental de compilação de PDFs para Markdown - IHC UFABC",
        "last_run": None,
        "total_documents": 0,
        "documents": {}
    }

def save_manifest(manifest_path: Path, manifest: dict):
    """Salva o manifesto com formatação legível."""
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest["last_run"] = datetime.now(timezone.utc).isoformat()
    manifest["total_documents"] = len(manifest["documents"])
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

def extract_pdf_pages_pdftotext(pdf_path: Path) -> list:
    """Extrai texto formatado por página usando /usr/bin/pdftotext -layout."""
    cmd = ["/usr/bin/pdftotext", "-layout", str(pdf_path), "-"]
    res = subprocess.run(cmd, capture_output=True, text=True, check=True)
    raw_pages = res.stdout.split("\x0c")
    if raw_pages and not raw_pages[-1].strip():
        raw_pages.pop()
    return raw_pages

def repair_ocr_text(text: str) -> str:
    """Aplica regras de reparo de OCR, substituição léxica e correção de fontes."""
    repaired = text
    for pattern, replacement in OCR_REPAIR_RULES:
        repaired = pattern.sub(replacement, repaired)
    return repaired

def clean_page_text(raw_text: str, doc_stem: str, page_idx: int) -> tuple[str, str]:
    """
    Limpa ruídos de navegação, carrossel, repara OCR e extrai o título provável da página.
    Retorna: (title, cleaned_body)
    """
    lines = raw_text.split("\n")
    cleaned_lines = []
    
    for line in lines:
        for pattern, repl in INLINE_NOISE_REPLACEMENTS:
            line = pattern.sub(repl, line)
        stripped = line.strip()
        if any(pat.match(stripped) for pat in NOISE_LINE_PATTERNS):
            continue
        cleaned_lines.append(line.rstrip())

    # Reduz múltiplas linhas em branco consecutivas
    collapsed = []
    blank_count = 0
    for l in cleaned_lines:
        if not l.strip():
            blank_count += 1
            if blank_count <= 2:
                collapsed.append("")
        else:
            blank_count = 0
            collapsed.append(l)

    raw_body = "\n".join(collapsed).strip()
    repaired_body = repair_ocr_text(raw_body)

    # Verificar se há override explícito de título
    stem_key = doc_stem.strip().lower()
    override_title = TITLE_OVERRIDES.get((stem_key, page_idx))
    if override_title:
        title = override_title
    else:
        # Identificar título provável do corpo reparado
        title = ""
        rep_lines = [l.strip() for l in repaired_body.split("\n") if l.strip()]
        course_header_pat = re.compile(r"MCZA\w*-\d+|UFABC|as do teclado|ou os botões|< anterior|próximo >", re.IGNORECASE)
        
        candidate_lines = []
        for l in rep_lines:
            if course_header_pat.search(l):
                continue
            norm = re.sub(r"\s+", " ", l).strip().lower()
            if norm in ["documento de requisitos", "documento de requ itos", "ferramentas de prototipação"]:
                continue
            candidate_lines.append(l)

        if candidate_lines:
            first = re.sub(r"\s+", " ", candidate_lines[0]).strip()
            # Se for um marcador de seção curto (ex: SEÇÃO 1, 2.10 E 2.11) e houver uma linha descritiva logo abaixo
            if len(first) < 30 and len(candidate_lines) > 1:
                second = re.sub(r"\s+", " ", candidate_lines[1]).strip()
                if not second.startswith("http") and len(second) < 60:
                    first = f"{first}: {second}"
            title = first[:80].strip()
        elif rep_lines:
            title = re.sub(r"\s+", " ", rep_lines[0])[:80].strip()

    # Injeção de conteúdo enriquecido caso o slide original fosse pura imagem sem OCR nativo
    content_injection = SLIDE_CONTENT_INJECTIONS.get((stem_key, page_idx))
    if content_injection and (not repaired_body or len(repaired_body) < 30):
        repaired_body = content_injection

    return title, repaired_body

def compile_gamma_unit1(pdf_path: Path, sha256_hash: str) -> str:
    """
    Compilação especializada para UNIDADE_1_INTRODUCAO_A_IHC.pdf utilizando
    o conteúdo fiel extraído do Gamma em all_slides_content.json.
    """
    if not GAMMA_JSON_PATH.exists():
        raise FileNotFoundError(f"Arquivo de slides Gamma não encontrado em: {GAMMA_JSON_PATH}")

    with open(GAMMA_JSON_PATH, "r", encoding="utf-8") as f:
        slides = json.load(f)

    now_iso = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    
    md = []
    md.append("# Unidade 1: Introdução a IHC — Fundamentos de Interação Humano-Computador\n")
    md.append("> **Documento:** `Slides/UNIDADE_1_INTRODUCAO_A_IHC.pdf`  ")
    md.append(f"> **Fonte de Dados:** Gamma Presentation Deck (`all_slides_content.json`)  ")
    md.append(f"> **Total de Slides:** {len(slides)}  ")
    md.append(f"> **Compilado em:** `{now_iso}`  ")
    md.append(f"> **Hash SHA-256:** `{sha256_hash}`  ")
    md.append("\n---\n")

    md.append("## Sumário dos Slides\n")
    for s in slides:
        num = s["slide"]
        text = s["text"].strip()
        lines = [l.strip() for l in text.split("\n") if l.strip()]
        title = lines[0] if lines else f"Slide {num}"
        if num == 8 and not lines:
            title = "Validação de Erros em Formulários (Visual)"
        md.append(f"- [Slide {num}: {title}](#slide-{num})")
    md.append("\n---\n")

    for s in slides:
        num = s["slide"]
        text = s["text"].strip()
        
        # Tratamento especial do slide 8 (ilustração de erro)
        if num == 8 and not text:
            text = (
                "**Validação de Formulários e Mensagens de Erro (Estudo de Caso)**\n\n"
                "- **Entradas testadas:** `D35`, `06/06/2035`\n"
                "- **Comparativo de Mensagens de Erro:**\n"
                "  - ❌ *entered the wrong date.* (Vago, não orienta o usuário)\n"
                "  - ⚠️ *Specified date is incorrect.* (Genérico, impessoal)\n"
                "  - ✅ *Birth Date should be in past.* (Específico, contextualizado e orientador)\n\n"
                "> 💡 **Diretriz de IHC:** Mensagens de erro devem ser claras, construtivas e indicar exatamente como solucionar o problema sem culpar o usuário."
            )

        lines = [l.strip() for l in text.split("\n") if l.strip()]
        title = lines[0] if lines else f"Slide {num}"
        if num == 8 and "Validação" in text:
            title = "Validação de Erros em Formulários"

        md.append(f'<a id="slide-{num}"></a>\n')
        md.append(f"## Slide {num}: {title}\n")
        md.append(f"{text}\n")
        md.append("\n---\n")

    # Injeção da Síntese de Diretrizes Práticas
    guideline = DOC_PRACTICAL_GUIDELINES.get("unidade_1_introducao_a_ihc")
    if guideline:
        md.append(guideline.strip())
        md.append("\n")

    return "\n".join(md)

def compile_standard_pdf(pdf_path: Path, rel_path: Path, sha256_hash: str) -> str:
    """Compila um PDF padrão extraindo páginas via pdftotext -layout e aplicando correções."""
    pages = extract_pdf_pages_pdftotext(pdf_path)
    total_pages = len(pages)
    
    is_slide = (
        "Slides" in rel_path.parts or 
        "slide" in rel_path.stem.lower() or 
        "canvas" in rel_path.stem.lower() or
        "estudo de caso" in rel_path.stem.lower() or
        "requisitos" in rel_path.stem.lower()
    )
    unit_label = "Slide" if is_slide else "Página"
    category = rel_path.parts[0] if len(rel_path.parts) > 1 else "Geral"

    doc_title = rel_path.stem.replace("_", " ").replace("-", " ")
    now_iso = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")

    md = []
    md.append(f"# {doc_title}\n")
    md.append(f"> **Documento Original:** `{rel_path}`  ")
    md.append(f"> **Categoria:** {category}  ")
    md.append(f"> **Tipo de Mídia:** {'Apresentação de Slides' if is_slide else 'Documento / Relatório Textual'}  ")
    md.append(f"> **Total de {unit_label}s:** {total_pages}  ")
    md.append(f"> **Compilado em:** `{now_iso}`  ")
    md.append(f"> **Hash SHA-256:** `{sha256_hash}`  ")
    md.append("\n---\n")

    # Extrair títulos e conteúdos tratados
    processed_pages = []
    doc_stem = rel_path.stem
    for idx, page_raw in enumerate(pages, start=1):
        p_title, p_body = clean_page_text(page_raw, doc_stem, idx)
        if not p_title:
            p_title = f"{unit_label} {idx}"
        processed_pages.append((idx, p_title, p_body))

    # Adicionar Sumário se tiver mais de 2 páginas
    if total_pages > 2:
        md.append(f"## Sumário de {unit_label}s\n")
        for idx, p_title, _ in processed_pages:
            slug = f"{unit_label.lower()}-{idx}"
            md.append(f"- [{unit_label} {idx}: {p_title}](#{slug})")
        md.append("\n---\n")

    # Conteúdo de cada página/slide
    for idx, p_title, p_body in processed_pages:
        slug = f"{unit_label.lower()}-{idx}"
        md.append(f'<a id="{slug}"></a>\n')
        md.append(f"## {unit_label} {idx}: {p_title}\n")
        
        if p_body:
            md.append(f"{p_body}\n")
        else:
            md.append("*(Página / slide com ilustração gráfica sem conteúdo textual nativo)*\n")
            
        md.append("\n---\n")

    # Injeção da Síntese de Diretrizes Práticas
    stem_key = doc_stem.strip().lower()
    guideline = DOC_PRACTICAL_GUIDELINES.get(stem_key)
    if guideline:
        md.append(guideline.strip())
        md.append("\n")

    return "\n".join(md)

def main():
    parser = argparse.ArgumentParser(description="Compilador incremental de PDFs para Markdown - IHC UFABC")
    parser.add_argument("--force", "-f", action="store_true", help="Força a recompilação de todos os arquivos.")
    parser.add_argument("--verbose", "-v", action="store_true", help="Modo verboso com logs detalhados.")
    parser.add_argument("--file", "-i", type=str, default=None, help="Compila apenas um arquivo específico.")
    parser.add_argument("--pdf-dir", type=Path, default=PDFS_DIR, help="Diretório raiz dos PDFs.")
    parser.add_argument("--markdown-dir", type=Path, default=MARKDOWN_DIR, help="Diretório de saída Markdown.")
    parser.add_argument("--manifest", type=Path, default=MANIFEST_PATH, help="Caminho do arquivo de manifesto.")
    args = parser.parse_args()

    pdf_root = args.pdf_dir.resolve()
    md_root = args.markdown_dir.resolve()
    manifest_path = args.manifest.resolve()

    if not pdf_root.exists():
        print(f"[ERRO] Diretório de PDFs não encontrado: {pdf_root}", file=sys.stderr)
        sys.exit(1)

    md_root.mkdir(parents=True, exist_ok=True)
    manifest = load_manifest(manifest_path)
    doc_entries = manifest.get("documents", {})

    all_pdfs = []
    for root, dirs, files in os.walk(pdf_root):
        if Path(root).resolve() == md_root or md_root in Path(root).resolve().parents:
            continue
        for f in sorted(files):
            if f.lower().endswith(".pdf") and not f.startswith("."):
                full_path = Path(root) / f
                all_pdfs.append(full_path)

    if args.file:
        target_name = args.file.lower()
        all_pdfs = [p for p in all_pdfs if target_name in str(p).lower()]

    print(f"=== Compilador Incremental e Auditor Semântico de Materiais IHC ===")
    print(f"Diretório PDFs:     {pdf_root}")
    print(f"Diretório Markdown: {md_root}")
    print(f"Manifesto:          {manifest_path}")
    print(f"Total de PDFs:      {len(all_pdfs)}")
    print(f"Modo Forçado:       {'SIM' if args.force else 'NÃO (Incremental)'}")
    print("=" * 60)

    compiled_count = 0
    skipped_count = 0
    error_count = 0

    for pdf_path in all_pdfs:
        rel_path = pdf_path.relative_to(pdf_root)
        rel_str = str(rel_path)
        
        md_target_rel = rel_path.with_suffix(".md")
        md_target_file = md_root / md_target_rel
        md_target_file.parent.mkdir(parents=True, exist_ok=True)

        sha256_hash = compute_sha256(pdf_path)
        size_bytes = pdf_path.stat().st_size

        cached = doc_entries.get(rel_str)
        if not args.force and cached and cached.get("sha256") == sha256_hash and md_target_file.exists():
            if args.verbose:
                print(f"[PULADO] {rel_str} (inalterado, hash SHA-256 coincide)")
            skipped_count += 1
            continue

        print(f"[COMPILANDO] {rel_str} ...")
        try:
            if "unidade_1_introducao_a_ihc" in pdf_path.name.lower():
                md_content = compile_gamma_unit1(pdf_path, sha256_hash)
                pages_count = 26
            else:
                md_content = compile_standard_pdf(pdf_path, rel_path, sha256_hash)
                pages_count = len(extract_pdf_pages_pdftotext(pdf_path))

            with open(md_target_file, "w", encoding="utf-8") as f:
                f.write(md_content)

            doc_entries[rel_str] = {
                "sha256": sha256_hash,
                "size_bytes": size_bytes,
                "pages": pages_count,
                "compiled_at": datetime.now(timezone.utc).isoformat(),
                "markdown_path": str(md_target_rel),
                "status": "compiled_clean"
            }
            compiled_count += 1
            print(f"  └─> [SUCESSO] Gerado {md_target_rel} ({pages_count} páginas/slides - com diretrizes práticas)")

        except Exception as e:
            error_count += 1
            print(f"  └─> [ERRO] Falha ao compilar {rel_str}: {e}", file=sys.stderr)

    manifest["documents"] = doc_entries
    save_manifest(manifest_path, manifest)

    print("=" * 60)
    print(f"Resumo da Execução:")
    print(f"  - Compilados com sucesso: {compiled_count}")
    print(f"  - Pulados (já atualizados): {skipped_count}")
    print(f"  - Falhas / Erros:          {error_count}")
    print(f"Manifesto salvo em: {manifest_path}")

    if error_count > 0:
        sys.exit(1)

if __name__ == "__main__":
    main()
