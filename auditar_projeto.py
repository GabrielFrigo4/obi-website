#!/usr/bin/env python3
"""
Auditoria Automatizada de IHC, Acessibilidade (WCAG 2.1 AA) e Engenharia de Software
Central OBI UFABC · Repositório de Interação Humano-Computador

Verifica:
1. Conformidade semântica (tags semânticas, ausência de estilos inline, ausência de scripts inline).
2. Rótulos acessíveis, atributos ARIA, leitores de tela e ausência de dark patterns.
3. Alvos de toque (touch targets >= 48px) e variáveis CSS de acessibilidade.
4. Integridade de navegação entre telas (links relativos, botões voltar e redirecionamentos).
"""

import os
import re
import sys
from bs4 import BeautifulSoup
from urllib.parse import urlparse

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if os.path.exists(os.path.join(BASE_DIR, "telas")):
    OBI_DIR = BASE_DIR
else:
    OBI_DIR = os.path.join(BASE_DIR, "obi-website")

class AuditoriaIHC:
    def __init__(self):
        self.total_testes = 0
        self.sucessos = 0
        self.avisos = []
        self.erros = []
        self.detalhes = {}

    def registrar_sucesso(self, categoria, descricao):
        self.total_testes += 1
        self.sucessos += 1
        self.detalhes.setdefault(categoria, []).append(("SUCESSO", descricao))

    def registrar_aviso(self, categoria, descricao):
        self.total_testes += 1
        self.avisos.append(f"[{categoria}] {descricao}")
        self.detalhes.setdefault(categoria, []).append(("AVISO", descricao))

    def registrar_erro(self, categoria, descricao):
        self.total_testes += 1
        self.erros.append(f"[{categoria}] {descricao}")
        self.detalhes.setdefault(categoria, []).append(("ERRO", descricao))

    def executar(self):
        print("=" * 80)
        print("🔍 INICIANDO AUDITORIA HEURÍSTICA & TÉCNICA DE IHC (WCAG 2.1 AA)")
        print(f"Diretório base: {OBI_DIR}")
        print("=" * 80)

        self.auditar_separacao_tripartite()
        self.auditar_semantica_e_aria()
        self.auditar_dark_patterns()
        self.auditar_alvos_de_toque_e_css()
        self.auditar_integridade_navegacao()
        self.auditar_persistencia_e_etica()

        self.exibir_relatorio()
        return len(self.erros) == 0

    def auditar_separacao_tripartite(self):
        cat = "Separação Tripartite"
        for root, _, files in os.walk(OBI_DIR):
            for file in files:
                if file.endswith(".html"):
                    path = os.path.join(root, file)
                    rel = os.path.relpath(path, OBI_DIR)
                    with open(path, "r", encoding="utf-8") as f:
                        conteudo = f.read()

                    # 1. Tags <style>
                    if "<style" in conteudo:
                        self.registrar_erro(cat, f"Arquivo {rel} contém tag <style> embutida.")
                    else:
                        self.registrar_sucesso(cat, f"{rel}: Sem tags <style> embutidas.")

                    # 2. Scripts inline sem src
                    soup = BeautifulSoup(conteudo, "html.parser")
                    scripts = soup.find_all("script")
                    scripts_inline = [s for s in scripts if not s.get("src") and (s.string or "").strip()]
                    if scripts_inline:
                        self.registrar_erro(cat, f"Arquivo {rel} contém bloco <script> inline.")
                    else:
                        self.registrar_sucesso(cat, f"{rel}: Sem blocos <script> inline.")

                    # 3. Atributos inline style="..."
                    elements_with_style = soup.find_all(lambda el: el.has_attr("style"))
                    if elements_with_style:
                        self.registrar_erro(cat, f"Arquivo {rel} contém estilos inline nos atributos: {[el.get('style') for el in elements_with_style]}")
                    else:
                        self.registrar_sucesso(cat, f"{rel}: Zero estilos inline em atributos.")

    def auditar_semantica_e_aria(self):
        cat = "Semântica e Acessibilidade ARIA"
        for root, _, files in os.walk(OBI_DIR):
            for file in files:
                if file.endswith(".html"):
                    path = os.path.join(root, file)
                    rel = os.path.relpath(path, OBI_DIR)
                    with open(path, "r", encoding="utf-8") as f:
                        soup = BeautifulSoup(f.read(), "html.parser")

                    # 1. Estrutura semântica obrigatória
                    if not soup.find("main"):
                        self.registrar_erro(cat, f"{rel}: Ausência de tag semântica <main>.")
                    else:
                        self.registrar_sucesso(cat, f"{rel}: Contém elemento semântico <main>.")

                    # 2. H1 único
                    h1s = soup.find_all("h1")
                    if len(h1s) != 1:
                        self.registrar_erro(cat, f"{rel}: Deve conter exatamente um <h1> (encontrados: {len(h1s)}).")
                    else:
                        self.registrar_sucesso(cat, f"{rel}: Cabeçalho <h1> único ('{h1s[0].get_text(strip=True)}').")

                    # 3. Barra de progresso acessível
                    progress_bars = soup.find_all(role="progressbar")
                    for pb in progress_bars:
                        val = pb.get("aria-valuenow")
                        label = pb.get("aria-label") or pb.get("aria-labelledby")
                        valuetext = pb.get("aria-valuetext")
                        if not val or not label:
                            self.registrar_erro(cat, f"{rel}: Barra de progresso sem aria-valuenow ou aria-label/labelledby.")
                        else:
                            self.registrar_sucesso(cat, f"{rel}: Barra de progresso acessível ({val}%, label='{label}').")

                    # 4. Botões e alvos clicáveis
                    buttons = soup.find_all("button")
                    for btn in buttons:
                        btn_txt = btn.get_text(strip=True)
                        btn_label = btn.get("aria-label") or btn.get("aria-labelledby")
                        if not btn_txt and not btn_label:
                            self.registrar_erro(cat, f"{rel}: Botão sem texto nem rótulo acessível: {btn}")
                        else:
                            self.registrar_sucesso(cat, f"{rel}: Botão acessível '{btn_txt or btn_label}'.")

                    # 5. SVGs decorativos com aria-hidden="true"
                    svgs = soup.find_all("svg")
                    for svg in svgs:
                        is_hidden = svg.get("aria-hidden") == "true"
                        has_title = svg.find("title") or svg.get("aria-label")
                        if not is_hidden and not has_title:
                            self.registrar_erro(cat, f"{rel}: SVG sem aria-hidden='true' nem título acessível: {svg}")
                        else:
                            self.registrar_sucesso(cat, f"{rel}: SVG decorativo com proteção acessível.")

                    # 6. Inputs e seus labels
                    inputs = soup.find_all(["input", "select", "textarea"])
                    for inp in inputs:
                        if inp.get("type") == "hidden":
                            continue
                        inp_id = inp.get("id")
                        has_label = False
                        if inp_id:
                            has_label = bool(soup.find("label", attrs={"for": inp_id}))
                        if not has_label and inp.parent and inp.parent.name == "label":
                            has_label = True
                        if not has_label:
                            self.registrar_erro(cat, f"{rel}: Campo de formulário {inp.name} (id='{inp_id}') sem <label> associado.")
                        else:
                            self.registrar_sucesso(cat, f"{rel}: Campo '{inp_id}' com rótulo semântico associado.")

    def auditar_dark_patterns(self):
        cat = "Design Ético e Ausência de Dark Patterns"
        # Profa. Juliana Braga: zero pré-marcação coercitiva em opções diagnósticas
        telas_quiz = [
            "telas/tela-06-quiz-pergunta-1/index.html",
            "telas/tela-07-quiz-logica/index.html",
            "telas/tela-08-quiz-apoio/index.html"
        ]
        for t in telas_quiz:
            full_path = os.path.join(OBI_DIR, t)
            if not os.path.exists(full_path):
                continue
            with open(full_path, "r", encoding="utf-8") as f:
                soup = BeautifulSoup(f.read(), "html.parser")
            radios = soup.find_all("input", type="radio")
            for r in radios:
                if r.has_attr("checked"):
                    self.registrar_erro(cat, f"{t}: Input '{r.get('id')}' possui 'checked' hardcoded no HTML (Dark Pattern: opção pré-marcada por padrão).")
                else:
                    self.registrar_sucesso(cat, f"{t}: Opção '{r.get('id')}' sem pré-marcação coercitiva.")

    def auditar_alvos_de_toque_e_css(self):
        cat = "Ergonomia e Tokens CSS"
        # 1. Checar se tokens.css define alvo de toque mínimo de 48px
        tokens_path = os.path.join(OBI_DIR, "assets", "css", "tokens.css")
        with open(tokens_path, "r", encoding="utf-8") as f:
            tokens_content = f.read()

        if "--alvo-toque-minimo: 48px" in tokens_content or "--alvo-toque-minimo: 48px;" in tokens_content:
            self.registrar_sucesso(cat, "tokens.css define explicitamente --alvo-toque-minimo: 48px.")
        else:
            self.registrar_erro(cat, "tokens.css não define --alvo-toque-minimo como 48px.")

        if "--anel-foco" in tokens_content:
            self.registrar_sucesso(cat, "tokens.css define token de foco acessível (--anel-foco).")
        else:
            self.registrar_erro(cat, "tokens.css não define --anel-foco.")

        # 2. Checar base.css e estilos de cada tela
        for root, _, files in os.walk(OBI_DIR):
            for file in files:
                if file.endswith(".css"):
                    path = os.path.join(root, file)
                    rel = os.path.relpath(path, OBI_DIR)
                    with open(path, "r", encoding="utf-8") as f:
                        css = f.read()

                    # Verificar se há min-height abaixo de 48px em botões ou alvos clicáveis
                    # (ignorando elementos explicitamente internos ou de feedback)
                    min_heights = re.findall(r'(\.[\w-]+)\s*\{[^}]*min-height\s*:\s*(\d+)px', css)
                    for classe, altura in min_heights:
                        h = int(altura)
                        if h < 48 and any(term in classe for term in ["btn", "option", "card", "link", "input", "control"]):
                            self.registrar_erro(cat, f"{rel}: Classe {classe} define min-height de {h}px (inferior ao limite WCAG de 48px).")

                    # Verificar suporte a alto contraste
                    if "high-contrast" in css:
                        self.registrar_sucesso(cat, f"{rel}: Possui regras contextuais para body.high-contrast.")

    def auditar_integridade_navegacao(self):
        cat = "Integridade de Navegação"
        for root, _, files in os.walk(OBI_DIR):
            for file in files:
                if file.endswith(".html"):
                    html_path = os.path.join(root, file)
                    rel_html = os.path.relpath(html_path, OBI_DIR)
                    with open(html_path, "r", encoding="utf-8") as f:
                        soup = BeautifulSoup(f.read(), "html.parser")

                    # Links <a>
                    links = soup.find_all("a")
                    for a in links:
                        href = a.get("href")
                        if not href or href.startswith("#") or href.startswith("javascript:"):
                            continue
                        if href.startswith("http://") or href.startswith("https://") or href.startswith("mailto:") or href.startswith("tel:"):
                            # Link externo: verificar target="_blank" e rel
                            target = a.get("target")
                            rel = a.get("rel") or ""
                            aria_label = a.get("aria-label") or a.get_text(strip=True)
                            if target == "_blank":
                                if "noopener" not in rel:
                                    self.registrar_erro(cat, f"{rel_html}: Link externo '{href}' com target='_blank' sem rel='noopener noreferrer'.")
                                else:
                                    self.registrar_sucesso(cat, f"{rel_html}: Link externo com target='_blank' e proteção noopener.")
                                if "nova aba" not in aria_label.lower():
                                    self.registrar_aviso(cat, f"{rel_html}: Link externo '{aria_label}' não indica abertura em nova aba no rótulo acessível.")
                        else:
                            # Link local relativo: verificar se o arquivo existe
                            parsed = urlparse(href)
                            destino_rel = parsed.path
                            destino_abs = os.path.normpath(os.path.join(os.path.dirname(html_path), destino_rel))
                            if not os.path.exists(destino_abs):
                                self.registrar_erro(cat, f"{rel_html}: Link quebrado para '{href}' (arquivo não existe em {destino_abs}).")
                            else:
                                self.registrar_sucesso(cat, f"{rel_html}: Link relativo funcional para '{href}'.")

    def auditar_persistencia_e_etica(self):
        cat = "Persistência e Privacidade Ética"
        # Verificar se utils.js utiliza estritamente localStorage sem cookies ou telemetria
        utils_path = os.path.join(OBI_DIR, "assets", "js", "utils.js")
        with open(utils_path, "r", encoding="utf-8") as f:
            js = f.read()

        if "document.cookie" in js:
            self.registrar_erro(cat, "utils.js manipula document.cookie (deve utilizar estritamente localStorage local).")
        else:
            self.registrar_sucesso(cat, "utils.js: Livre de cookies invasivos de rastreamento.")

        if "localStorage.setItem" in js and "localStorage.getItem" in js:
            self.registrar_sucesso(cat, "utils.js: Persistência ética auditável em localStorage.")
        else:
            self.registrar_erro(cat, "utils.js não implementa persistência em localStorage.")

        if "fetch(" in js or "XMLHttpRequest" in js:
            self.registrar_aviso(cat, "utils.js realiza chamadas de rede externas (verificar privacidade).")
        else:
            self.registrar_sucesso(cat, "utils.js: 100% autônomo e local, sem telemetria externa.")

    def exibir_relatorio(self):
        print("\n" + "=" * 80)
        print("📊 RESULTADO CONSOLIDADO DA AUDITORIA IHC")
        print("=" * 80)
        print(f"Total de testes executados: {self.total_testes}")
        print(f"✅ Sucessos: {self.sucessos}")
        print(f"⚠️  Avisos:   {len(self.avisos)}")
        print(f"❌ Erros:    {len(self.erros)}")
        print("-" * 80)

        for cat, itens in self.detalhes.items():
            print(f"\n📂 Categoria: {cat}")
            sucessos_cat = sum(1 for status, _ in itens if status == "SUCESSO")
            erros_cat = sum(1 for status, _ in itens if status == "ERRO")
            avisos_cat = sum(1 for status, _ in itens if status == "AVISO")
            print(f"   Subtotais: {sucessos_cat} Sucessos | {erros_cat} Erros | {avisos_cat} Avisos")

        if self.avisos:
            print("\n⚠️ AVISOS DETECTADOS:")
            for av in self.avisos:
                print(f"  - {av}")

        if self.erros:
            print("\n❌ ERROS DETECTADOS:")
            for er in self.erros:
                print(f"  - {er}")
            print("\n❌ AUDITORIA REPROVADA! Foram identificadas não-conformidades.")
        else:
            print("\n🎉 AUDITORIA 100% APROVADA! Projeto está impecável ('zero bala')!")
        print("=" * 80)


if __name__ == "__main__":
    auditor = AuditoriaIHC()
    sucesso = auditor.executar()
    sys.exit(0 if sucesso else 1)
