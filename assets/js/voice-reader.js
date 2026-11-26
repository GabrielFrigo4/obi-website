/* Leitor em voz alta nativo (Web Speech API) — Central OBI UFABC */
'use strict';

(function inicializarLeitorDeVoz() {
  const CHAVE_VELOCIDADE = 'obi_leitor_velocidade';
  const VELOCIDADES_VALIDAS = ['0.85', '1', '1.25', '1.5'];
  const TAMANHO_MAX_BLOCO = 220;
  const SELETORES_BLOCOS = 'h1, h2, h3, h4, p, li, legend, label, dt, dd, th, td, summary, figcaption, blockquote';
  const SELETORES_IGNORADOS = '.accessibility-bar, .app-bottom-nav, .skip-link, .scroll-hint, #tts-player-bar, dialog, script, style, noscript, svg, [hidden], [aria-hidden="true"], [vw], .vw-plugin-wrapper';

  function suporteDisponivel() {
    return typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      typeof window.SpeechSynthesisUtterance !== 'undefined';
  }

  function lerVelocidadeSalva() {
    try {
      const salva = localStorage.getItem(CHAVE_VELOCIDADE);
      if (VELOCIDADES_VALIDAS.includes(salva)) return salva;
    } catch (e) {}
    return '1';
  }

  function salvarVelocidade(valor) {
    const segura = VELOCIDADES_VALIDAS.includes(valor) ? valor : '1';
    try {
      localStorage.setItem(CHAVE_VELOCIDADE, segura);
    } catch (e) {}
    return segura;
  }

  function carregarVozPtBr(synth) {
    if (!synth || typeof synth.getVoices !== 'function') return null;
    const vozes = synth.getVoices() || [];
    if (!vozes.length) return null;
    const naturais = ['google', 'microsoft', 'luciana', 'francisca', 'thalita', 'maria', 'felipe', 'natural'];
    const ptBr = vozes.filter(function (v) {
      return v.lang === 'pt-BR' || v.lang === 'pt_BR';
    });
    const preferida = ptBr.find(function (v) {
      const nome = (v.name || '').toLowerCase();
      return naturais.some(function (termo) { return nome.includes(termo); });
    });
    if (preferida) return preferida;
    if (ptBr.length) return ptBr[0];
    return vozes.find(function (v) { return (v.lang || '').toLowerCase().startsWith('pt'); }) || null;
  }

  function elementoVisivel(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.hasAttribute('hidden') || el.getAttribute('aria-hidden') === 'true') return false;
    if (typeof window.getComputedStyle === 'function') {
      const estilo = window.getComputedStyle(el);
      if (estilo.display === 'none' || estilo.visibility === 'hidden') return false;
    }
    return true;
  }

  function extrairTextoVisivel(no) {
    if (!no) return '';
    if (no.nodeType === 3) return no.nodeValue || '';
    if (no.nodeType !== 1) return '';
    if (no.matches && no.matches(SELETORES_IGNORADOS)) return '';
    if (!elementoVisivel(no)) return '';
    let acumulado = '';
    const filhos = no.childNodes || [];
    for (let i = 0; i < filhos.length; i++) {
      acumulado += ' ' + extrairTextoVisivel(filhos[i]);
    }
    return acumulado.replace(/\s+/g, ' ').trim();
  }

  function fatiarTexto(texto, elemento) {
    const limpo = (texto || '').replace(/\s+/g, ' ').trim();
    if (!limpo) return [];
    if (limpo.length <= TAMANHO_MAX_BLOCO) {
      return [{ texto: limpo, elemento: elemento || null }];
    }
    const partes = limpo.match(/[^.!?…;\n]+[.!?…;]?/g) || [limpo];
    const blocos = [];
    let buffer = '';
    for (let i = 0; i < partes.length; i++) {
      const trecho = partes[i].trim();
      if (!trecho) continue;
      if (!buffer) {
        if (trecho.length <= TAMANHO_MAX_BLOCO) {
          buffer = trecho;
        } else {
          const palavras = trecho.split(/\s+/);
          let linha = '';
          for (let j = 0; j < palavras.length; j++) {
            const prox = linha ? linha + ' ' + palavras[j] : palavras[j];
            if (prox.length > TAMANHO_MAX_BLOCO && linha) {
              blocos.push({ texto: linha, elemento: elemento || null });
              linha = palavras[j];
            } else {
              linha = prox;
            }
          }
          if (linha) buffer = linha;
        }
      } else if ((buffer + ' ' + trecho).length <= TAMANHO_MAX_BLOCO) {
        buffer += ' ' + trecho;
      } else {
        blocos.push({ texto: buffer, elemento: elemento || null });
        buffer = trecho.length <= TAMANHO_MAX_BLOCO ? trecho : '';
        if (!buffer) {
          const extras = fatiarTexto(trecho, elemento);
          for (let k = 0; k < extras.length; k++) blocos.push(extras[k]);
        }
      }
    }
    if (buffer) blocos.push({ texto: buffer, elemento: elemento || null });
    return blocos;
  }

  function coletarBlocosContainer(container) {
    if (!container) return [];
    const candidatos = Array.from(container.querySelectorAll(SELETORES_BLOCOS));
    const blocos = [];
    for (let i = 0; i < candidatos.length; i++) {
      const el = candidatos[i];
      if (el.closest(SELETORES_IGNORADOS)) continue;
      if (!elementoVisivel(el)) continue;
      const filhosBloco = Array.from(el.querySelectorAll(SELETORES_BLOCOS));
      const temFilhoVisivel = filhosBloco.some(function (filho) {
        return !filho.closest(SELETORES_IGNORADOS) && elementoVisivel(filho);
      });
      if (temFilhoVisivel) continue;
      const texto = extrairTextoVisivel(el);
      if (!texto) continue;
      const fatiados = fatiarTexto(texto, el);
      for (let j = 0; j < fatiados.length; j++) blocos.push(fatiados[j]);
    }
    if (!blocos.length) {
      const fallback = extrairTextoVisivel(container);
      if (fallback) return fatiarTexto(fallback, container);
    }
    return blocos;
  }

  function criarBarraFlutuante() {
    let barra = document.getElementById('tts-player-bar');
    if (!barra) {
      barra = document.createElement('div');
      barra.id = 'tts-player-bar';
      barra.className = 'tts-player-bar';
      barra.setAttribute('role', 'region');
      barra.setAttribute('aria-label', 'Leitor em voz alta');
      barra.setAttribute('hidden', '');
      barra.innerHTML =
        '<button type="button" id="tts-bar-selection" class="tts-bar-btn tts-bar-primary">' +
          '<svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>' +
          '<span>Ouvir seleção</span>' +
        '</button>' +
        '<span id="tts-bar-status" class="tts-bar-status" hidden></span>' +
        '<div id="tts-bar-actions" class="tts-bar-actions" hidden>' +
          '<button type="button" id="tts-bar-pause" class="tts-bar-btn" aria-pressed="false">Pausar</button>' +
          '<button type="button" id="tts-bar-stop" class="tts-bar-btn">Parar</button>' +
        '</div>';
      document.body.appendChild(barra);
    }
    let live = document.getElementById('tts-live-status');
    if (!live) {
      live = document.createElement('p');
      live.id = 'tts-live-status';
      live.className = 'visually-hidden';
      live.setAttribute('role', 'status');
      live.setAttribute('aria-live', 'polite');
      document.body.appendChild(live);
    }
    return { barra: barra, live: live };
  }

  function selecaoValidaDoUsuario() {
    if (typeof window.getSelection !== 'function') return '';
    const sel = window.getSelection();
    if (!sel) return '';
    const texto = sel.toString().replace(/\s+/g, ' ').trim();
    if (texto.length < 2) return '';
    const ancora = sel.anchorNode ? (sel.anchorNode.nodeType === 1 ? sel.anchorNode : sel.anchorNode.parentElement) : null;
    if (ancora) {
      if (ancora.closest('.accessibility-bar, .app-bottom-nav, #ajustes-leitura, #tts-player-bar')) return '';
      if (!ancora.closest('main')) return '';
    }
    return texto;
  }

  function movimentoReduzido() {
    if (document.documentElement.getAttribute('data-leitura-movimento') === 'reduzir') return true;
    return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function iniciarModulo() {
    const synth = suporteDisponivel() ? window.speechSynthesis : null;
    const btnToggle = document.getElementById('btn-tts-toggle');
    const btnPause = document.getElementById('btn-tts-pause');
    const selVelocidade = document.getElementById('leitura-voz-velocidade');
    const btnRestaurar = document.getElementById('restaurar-leitura');
    const dialogoAjustes = document.getElementById('ajustes-leitura');
    const statusAjustes = document.getElementById('ajustes-status');

    const { barra, live } = criarBarraFlutuante();
    const btnBarSelection = document.getElementById('tts-bar-selection');
    const spanBarStatus = document.getElementById('tts-bar-status');
    const divBarActions = document.getElementById('tts-bar-actions');
    const btnBarPause = document.getElementById('tts-bar-pause');
    const btnBarStop = document.getElementById('tts-bar-stop');

    let estado = 'inativo'; // 'inativo' | 'lendo' | 'pausado'
    let velocidade = lerVelocidadeSalva();
    let blocos = [];
    let indice = 0;
    let sessaoId = 0;
    let vozPtBr = null;
    let ultimaSelecao = '';
    let elementoDestacado = null;
    let preservandoSelecao = false;

    if (selVelocidade) selVelocidade.value = velocidade;

    function anunciar(mensagem) {
      if (dialogoAjustes && dialogoAjustes.open && statusAjustes) {
        statusAjustes.textContent = mensagem;
      } else if (live) {
        live.textContent = mensagem;
      }
    }

    function limparDestaque() {
      if (elementoDestacado) {
        elementoDestacado.classList.remove('tts-lendo');
        elementoDestacado = null;
      }
    }

    function destacarElemento(el) {
      limparDestaque();
      if (!el || !el.classList) return;
      el.classList.add('tts-lendo');
      elementoDestacado = el;
      if (typeof el.scrollIntoView === 'function') {
        try {
          el.scrollIntoView({ block: 'nearest', behavior: movimentoReduzido() ? 'auto' : 'smooth' });
        } catch (e) {
          el.scrollIntoView();
        }
      }
    }

    function atualizarInterface() {
      const ativo = estado !== 'inativo';
      const pausado = estado === 'pausado';
      const indisponivel = !synth;

      if (btnToggle) {
        btnToggle.setAttribute('aria-pressed', String(ativo));
        if (indisponivel) btnToggle.setAttribute('aria-disabled', 'true');
        else btnToggle.removeAttribute('aria-disabled');
        const rotuloEstado = btnToggle.querySelector('.reading-voice-state');
        if (rotuloEstado) {
          rotuloEstado.textContent = pausado ? 'Pausado' : (ativo ? 'Lendo' : 'Desativado');
        }
      }

      if (btnPause) {
        btnPause.setAttribute('aria-pressed', String(pausado));
        btnPause.setAttribute('aria-disabled', String(indisponivel || !ativo));
      }

      if (btnBarPause) {
        btnBarPause.setAttribute('aria-pressed', String(pausado));
      }

      if (ativo) {
        barra.removeAttribute('hidden');
        if (btnBarSelection) btnBarSelection.setAttribute('hidden', '');
        if (spanBarStatus) {
          spanBarStatus.removeAttribute('hidden');
          spanBarStatus.textContent = pausado
            ? 'Leitura pausada'
            : ('Lendo ' + (indice + 1) + ' de ' + blocos.length);
        }
        if (divBarActions) divBarActions.removeAttribute('hidden');
      } else if (ultimaSelecao && !indisponivel) {
        barra.removeAttribute('hidden');
        if (btnBarSelection) btnBarSelection.removeAttribute('hidden');
        if (spanBarStatus) spanBarStatus.setAttribute('hidden', '');
        if (divBarActions) divBarActions.setAttribute('hidden', '');
      } else {
        barra.setAttribute('hidden', '');
      }
    }

    function obterBlocosLeitura(forcarPagina) {
      const selAtual = !forcarPagina ? (selecaoValidaDoUsuario() || ultimaSelecao) : '';
      if (selAtual) {
        return { modo: 'selecao', blocos: fatiarTexto(selAtual, null) };
      }

      const outroDialogo = Array.from(document.querySelectorAll('dialog[open]')).find(function (d) {
        return d.id !== 'ajustes-leitura';
      });
      if (outroDialogo) {
        return { modo: 'dialogo', blocos: coletarBlocosContainer(outroDialogo) };
      }

      const principal = document.querySelector('main');
      return { modo: 'pagina', blocos: coletarBlocosContainer(principal) };
    }

    function falarBlocoAtual(idSessao) {
      if (!synth || idSessao !== sessaoId || estado !== 'lendo') return;
      if (indice >= blocos.length) {
        parar(true);
        anunciar('Leitura concluída.');
        return;
      }

      const bloco = blocos[indice];
      if (!vozPtBr) vozPtBr = carregarVozPtBr(synth);
      destacarElemento(bloco.elemento);
      atualizarInterface();

      const fala = new window.SpeechSynthesisUtterance(bloco.texto);
      fala.lang = 'pt-BR';
      fala.rate = Number.parseFloat(velocidade) || 1;
      if (vozPtBr) fala.voice = vozPtBr;

      fala.onend = function aoTerminarBloco() {
        if (idSessao !== sessaoId || estado !== 'lendo') return;
        indice += 1;
        falarBlocoAtual(idSessao);
      };

      fala.onerror = function aoErroBloco(evento) {
        if (evento && (evento.error === 'canceled' || evento.error === 'interrupted')) return;
        if (idSessao !== sessaoId || estado !== 'lendo') return;
        parar(true);
        anunciar('Não foi possível continuar a leitura em voz alta.');
      };

      synth.speak(fala);
    }

    function iniciar(opcoes) {
      if (!synth) {
        anunciar('Leitura em voz alta indisponível neste navegador.');
        atualizarInterface();
        return false;
      }
      const forcarPagina = Boolean(opcoes && opcoes.forcarPagina);
      const resultado = obterBlocosLeitura(forcarPagina);
      if (!resultado.blocos.length) {
        anunciar('Nenhum texto disponível para leitura nesta tela.');
        return false;
      }

      sessaoId += 1;
      const idAtual = sessaoId;
      synth.cancel();
      blocos = resultado.blocos;
      indice = 0;
      estado = 'lendo';
      ultimaSelecao = '';
      atualizarInterface();
      anunciar(resultado.modo === 'selecao' ? 'Lendo seleção em voz alta.' : 'Leitura da página iniciada.');
      falarBlocoAtual(idAtual);
      return true;
    }

    function pausar() {
      if (!synth || estado !== 'lendo') return;
      sessaoId += 1;
      estado = 'pausado';
      synth.cancel();
      atualizarInterface();
      anunciar('Leitura pausada.');
    }

    function retomar() {
      if (!synth || estado !== 'pausado') return;
      sessaoId += 1;
      const idAtual = sessaoId;
      estado = 'lendo';
      atualizarInterface();
      anunciar('Leitura retomada.');
      falarBlocoAtual(idAtual);
    }

    function alternarPausa() {
      if (!synth || estado === 'inativo') return;
      if (estado === 'lendo') pausar();
      else retomar();
    }

    function parar(silencioso) {
      sessaoId += 1;
      if (synth) synth.cancel();
      estado = 'inativo';
      blocos = [];
      indice = 0;
      limparDestaque();
      atualizarInterface();
      if (!silencioso) anunciar('Leitura interrompida.');
    }

    function atualizarSelecao() {
      const sel = selecaoValidaDoUsuario();
      if (sel) {
        ultimaSelecao = sel;
        atualizarInterface();
      } else if (!preservandoSelecao && ultimaSelecao) {
        ultimaSelecao = '';
        atualizarInterface();
      }
    }

    if (synth) {
      vozPtBr = carregarVozPtBr(synth);
      if ('onvoiceschanged' in synth) {
        synth.addEventListener('voiceschanged', function () {
          vozPtBr = carregarVozPtBr(synth);
        });
      }
    }

    document.addEventListener('pointerdown', function marcarPreservacao(evento) {
      const alvo = evento.target;
      preservandoSelecao = Boolean(alvo && alvo.closest && alvo.closest('#btn-reading-settings, #ajustes-leitura, #tts-player-bar'));
    }, true);

    document.addEventListener('selectionchange', atualizarSelecao);
    document.addEventListener('mouseup', atualizarSelecao);
    document.addEventListener('keyup', atualizarSelecao);

    if (btnToggle) {
      btnToggle.addEventListener('click', function () {
        if (!synth) {
          anunciar('Leitura em voz alta indisponível neste navegador.');
          return;
        }
        if (estado !== 'inativo') parar();
        else iniciar();
      });
    }

    if (btnPause) {
      btnPause.addEventListener('click', function () {
        if (!synth || estado === 'inativo') return;
        alternarPausa();
      });
    }

    if (btnBarSelection) {
      btnBarSelection.addEventListener('click', function () {
        iniciar();
      });
    }

    if (btnBarPause) {
      btnBarPause.addEventListener('click', alternarPausa);
    }

    if (btnBarStop) {
      btnBarStop.addEventListener('click', function () {
        parar();
      });
    }

    if (selVelocidade) {
      selVelocidade.addEventListener('change', function () {
        velocidade = salvarVelocidade(selVelocidade.value);
        if (estado === 'lendo' && synth) {
          sessaoId += 1;
          const idAtual = sessaoId;
          synth.cancel();
          falarBlocoAtual(idAtual);
        }
        anunciar('Velocidade da voz ajustada.');
      });
    }

    if (btnRestaurar) {
      btnRestaurar.addEventListener('click', function () {
        parar(true);
        velocidade = salvarVelocidade('1');
        if (selVelocidade) selVelocidade.value = velocidade;
      });
    }

    window.addEventListener('keydown', function aoPressionarEsc(evento) {
      if (evento.key !== 'Escape' || estado === 'inativo') return;
      if (document.querySelector('dialog[open]')) return;
      parar();
    });

    window.addEventListener('pagehide', function () { parar(true); });
    window.addEventListener('beforeunload', function () { parar(true); });

    atualizarInterface();

    window.OBILeitorVoz = {
      iniciar: iniciar,
      pausar: pausar,
      retomar: retomar,
      parar: parar,
      obterEstado: function () {
        return {
          estado: estado,
          velocidade: velocidade,
          indice: indice,
          totalBlocos: blocos.length,
          suportado: Boolean(synth),
          temSelecao: Boolean(ultimaSelecao)
        };
      }
    };
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', iniciarModulo);
    } else {
      iniciarModulo();
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      suporteDisponivel: suporteDisponivel,
      fatiarTexto: fatiarTexto,
      coletarBlocosContainer: coletarBlocosContainer,
      carregarVozPtBr: carregarVozPtBr
    };
  }
})();
