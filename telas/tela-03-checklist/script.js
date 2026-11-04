const TOPICOS_CATEGORIAS = {
      iniciacao: {
        titulo: 'Iniciação (6º ao 9º ano - No Papel)',
        topicos: [
          '1. Lógica proposicional e dedução simples',
          '2. Problemas de ordenação e agrupamento',
          '3. Grafos visuais, caminhos e labirintos',
          '4. Tabela verdade e operadores lógicos',
          '5. Raciocínio combinatório e contagem',
          '6. Resolução de cadernos anteriores da Iniciação'
        ]
      },
      prog_jr: {
        titulo: 'Programação Júnior (6º ao 9º ano)',
        topicos: [
          '1. Entrada e Saída Padrão (cin/cout ou input/print)',
          '2. Estruturas Condicionais (se / senão)',
          '3. Laços de Repetição (for / while)',
          '4. Vetores Unidimensionais (Arrays)',
          '5. Matrizes (Vetores Bidimensionais)',
          '6. Funções e Modularização',
          '7. Recursão Básica e Casos Base'
        ]
      },
      nivel_1: {
        titulo: 'Programação Nível 1 (Até 1º/2º ano do Ensino Médio)',
        topicos: [
          '1. Entrada/Saída rápida e formatação',
          '2. Manipulação de Strings e Vetores',
          '3. Algoritmos de Ordenação (sort) e Comparadores',
          '4. Busca Binária e Dois Ponteiros',
          '5. Algoritmos Gulosos Básicos',
          '6. Teoria dos Números Elementar (Primos, MDC/MMC)'
        ]
      },
      nivel_2: {
        titulo: 'Programação Nível 2 (Até 3º/4º ano Técnico)',
        topicos: [
          '1. Estruturas de Dados STL (vector, set, map, priority_queue)',
          '2. Teoria dos Grafos (BFS, DFS, Dijkstra)',
          '3. Programação Dinâmica Clássica (Mochila, LCS, LIS)',
          '4. Árvores e Menor Ancestral Comum (LCA)',
          '5. Geometria Computacional Básica'
        ]
      },
      senior: {
        titulo: 'Programação Sênior (1º ano da Graduação)',
        topicos: [
          '1. Grafos Avançados (Fluxo Máximo, Componentes Conexos)',
          '2. Programação Dinâmica Avançada e Otimizações',
          '3. Estruturas em Árvore (Segment Tree, Fenwick Tree)',
          '4. Teoria dos Números e Aritmética Modular',
          '5. Algoritmos em Cadeias (KMP, Z-Algorithm)'
        ]
      }
    };

    let categoriaAtual = 'prog_jr';

    function obterChaveChecklist(categoria) {
      return 'obi_checklist_' + categoria;
    }

    function selecionarCategoria(cat) {
      if (!TOPICOS_CATEGORIAS[cat]) return;
      categoriaAtual = cat;

      document.querySelectorAll('.cat-tab').forEach(function(btn) {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      const abaAtiva = document.getElementById('cat-' + cat);
      if (abaAtiva) {
        abaAtiva.classList.add('active');
        abaAtiva.setAttribute('aria-selected', 'true');
      }

      const descEl = document.getElementById('cat-descricao-texto');
      if (descEl) {
        descEl.textContent = TOPICOS_CATEGORIAS[cat].titulo;
      }

      renderizarChecklist();
    }

    function renderizarChecklist() {
      const listaEl = document.getElementById('lista-conteudos');
      if (!listaEl) return;
      listaEl.innerHTML = '';

      const dados = TOPICOS_CATEGORIAS[categoriaAtual];
      const chave = obterChaveChecklist(categoriaAtual);
      const marcados = JSON.parse(localStorage.getItem(chave) || '{}');

      dados.topicos.forEach(function(topico, index) {
        const li = document.createElement('li');
        const label = document.createElement('label');
        label.className = 'checklist-label';
        
        const isChecked = !!marcados[index];
        if (isChecked) {
          label.classList.add('checked');
        }

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.className = 'checklist-input';
        input.checked = isChecked;
        input.addEventListener('change', function() {
          alternarItemChecklist(index, input.checked);
        });

        const span = document.createElement('span');
        span.textContent = topico;

        label.appendChild(input);
        label.appendChild(span);
        li.appendChild(label);
        listaEl.appendChild(li);
      });

      atualizarBarraProgresso();
    }

    function alternarItemChecklist(index, checked) {
      const chave = obterChaveChecklist(categoriaAtual);
      const marcados = JSON.parse(localStorage.getItem(chave) || '{}');
      if (checked) {
        marcados[index] = true;
      } else {
        delete marcados[index];
      }
      localStorage.setItem(chave, JSON.stringify(marcados));
      renderizarChecklist();
    }

    function atualizarBarraProgresso() {
      const dados = TOPICOS_CATEGORIAS[categoriaAtual];
      const chave = obterChaveChecklist(categoriaAtual);
      const marcados = JSON.parse(localStorage.getItem(chave) || '{}');

      const total = dados.topicos.length;
      const concluidos = Object.keys(marcados).length;
      const porcentagem = total > 0 ? Math.round((concluidos / total) * 100) : 0;

      const statTexto = document.getElementById('stat-texto');
      const progressFill = document.getElementById('progress-fill-el');
      const progressBar = document.getElementById('progress-bar-el');

      if (statTexto) {
        statTexto.textContent = concluidos + ' de ' + total + ' tópicos concluídos (' + porcentagem + '%)';
      }
      if (progressFill) {
        progressFill.style.width = porcentagem + '%';
      }
      if (progressBar) {
        progressBar.setAttribute('aria-valuenow', porcentagem);
      }
    }

    function limparProgressoAtual() {
      if (confirm('Deseja limpar todo o progresso dos tópicos desta categoria?')) {
        const chave = obterChaveChecklist(categoriaAtual);
        localStorage.removeItem(chave);
        renderizarChecklist();
      }
    }

    document.addEventListener('DOMContentLoaded', function() {

      const urlParams = new URLSearchParams(window.location.search);
      const catParam = urlParams.get('cat');

      if (catParam && TOPICOS_CATEGORIAS[catParam]) {
        selecionarCategoria(catParam);
        return;
      }

      if (typeof obterRespostas === 'function') {
        const respostas = obterRespostas();
        if (respostas.ano_escolar === 'fundamental_1' && respostas.preferencia === 'logica') {
          selecionarCategoria('iniciacao');
          return;
        } else if (respostas.ano_escolar === 'fundamental_2' && respostas.preferencia === 'logica') {
          selecionarCategoria('iniciacao');
          return;
        } else if (respostas.ano_escolar === 'medio' && (respostas.preferencia === 'codigo' || respostas.preferencia === 'logica')) {
          selecionarCategoria('nivel_1');
          return;
        } else if (respostas.ano_escolar === 'superior') {
          selecionarCategoria('senior');
          return;
        }
      }

      selecionarCategoria('prog_jr');
    });
