/**
 * Central OBI UFABC - Utilitários Simples e Auditáveis de Acessibilidade
 * Código limpo, sem dependências, fácil de ler e modificar.
 * Conformidade estrita com WCAG 2.1 Nível AA e Diretrizes de IHC.
 */

'use strict';

// 1. Gerenciamento de Tamanho da Fonte (A- / A+)
function atualizarBotoesZoom(escala) {
  const btnIn = document.getElementById('btn-zoom-in');
  const btnOut = document.getElementById('btn-zoom-out');
  if (btnIn) {
    if (escala >= 2.00) {
      btnIn.setAttribute('aria-disabled', 'true');
    } else {
      btnIn.removeAttribute('aria-disabled');
    }
  }
  if (btnOut) {
    if (escala <= 0.85) {
      btnOut.setAttribute('aria-disabled', 'true');
    } else {
      btnOut.removeAttribute('aria-disabled');
    }
  }
}

function alterarTamanhoFonte(variacao) {
  const chave = 'obi_escala_fonte';
  let escalaAtual = parseFloat(document.documentElement.style.fontSize) / 16 || 1;
  
  try {
    escalaAtual = parseFloat(document.documentElement.style.fontSize) / 16 || 1;
    const salva = Number.parseFloat(localStorage.getItem(chave));
    if (Number.isFinite(salva)) escalaAtual = salva;
  } catch (e) {}
  
  // Limites simples e seguros: entre 85% e 200%
  escalaAtual = Math.min(Math.max(escalaAtual + variacao, 0.85), 2.00);
  document.documentElement.style.fontSize = (16 * escalaAtual) + 'px';
  
  try {
    localStorage.setItem(chave, escalaAtual.toFixed(2));
  } catch (e) {}
  atualizarBotoesZoom(escalaAtual);
}

// 2. Modo Alto Contraste com Acessibilidade Completa (WCAG 4.1.2)
function atualizarEstadoAcessibilidadeContraste(estaAtivo) {
  const botoes = document.querySelectorAll('#btn-contrast');
  botoes.forEach(function (btn) {
    btn.setAttribute('aria-pressed', String(estaAtivo));
    const estado = btn.querySelector('.reading-toggle-state');
    if (estado) estado.textContent = estaAtivo ? 'Ativado' : 'Desativado';
  });
}

function alternarAltoContraste() {
  const estaAtivo = document.body.classList.toggle('high-contrast');
  try {
    localStorage.setItem('obi_alto_contraste', estaAtivo ? 'true' : 'false');
  } catch (e) {}
  atualizarEstadoAcessibilidadeContraste(estaAtivo);
  return estaAtivo;
}

// 3. Persistência Ética das Respostas (Simples e Transparente)
function salvarResposta(pergunta, valor) {
  try {
    const dados = JSON.parse(localStorage.getItem('obi_quiz_respostas') || '{}');
    dados[pergunta] = valor;
    localStorage.setItem('obi_quiz_respostas', JSON.stringify(dados));
  } catch (e) {
    console.warn('Erro ao salvar resposta no storage local:', e);
  }
}

function obterRespostas() {
  try {
    return JSON.parse(localStorage.getItem('obi_quiz_respostas') || '{}');
  } catch (e) {
    return {};
  }
}

// 4. Gerador Simples de Protocolo para a Solicitação
function gerarNovoProtocolo() {
  const chave = 'obi_protocolo_atual';
  const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);
  const protocolo = 'OBI-UFABC-' + numeroAleatorio;
  try {
    localStorage.setItem(chave, protocolo);
  } catch (e) {}
  return protocolo;
}

function obterProtocolo() {
  const chave = 'obi_protocolo_atual';
  let protocolo = null;
  try {
    protocolo = localStorage.getItem(chave);
  } catch (e) {}
  if (!protocolo) {
    protocolo = gerarNovoProtocolo();
  }
  return protocolo;
}

// 5. Cálculo Oficial da Modalidade OBI com base nas Respostas
function calcularModalidadeOBI() {
  // Edição 2026: https://olimpiada.ic.unicamp.br/info/regulamento/
  // Recomenda o nível da faixa escolar, mesmo havendo níveis superiores elegíveis.
  const r = obterRespostas(), ano = r.ano_escolar;
  const preferencia = r.preferencia || r.preferencia_estudo;
  const ef = /^ef_[1-9]$/.test(ano || '') ? Number(ano.slice(3)) : 0;
  if ((!ef && !['em_1','em_2','em_3','tecnico_4','superior_1','outro'].includes(ano)) ||
      !['ate_20','acima_20'].includes(r.faixa_idade) || !['logica','codigo'].includes(preferencia) || !r.escola_apoio) return null;
  const precisaApoio = !['fundamental_com_apoio','medio_com_apoio','escola_participa'].includes(r.escola_apoio);
  const senior = ['tecnico_4','superior_1'].includes(ano);
  if (ano === 'outro' || (!senior && r.faixa_idade === 'acima_20')) return {
    elegivel: false, nivelCodigo: null, precisaApoio,
    titulo: 'Não foi possível indicar um nível para a OBI 2026',
    resumo: ano === 'outro' ? 'A escolaridade informada não corresponde às faixas previstas neste quiz. Consulte o regulamento e o coordenador da sua escola.' : 'Os níveis para sua escolaridade exigem no máximo 20 anos em 1º de julho de 2026. O Nível Sênior tem critérios escolares próprios.', topicosEstudo: []
  };
  let codigo, nivel, modalidade = 'Programação';
  if (ef >= 4 && preferencia === 'logica') {
    modalidade = 'Iniciação'; codigo = ef <= 5 ? 'iniciacao_jr' : ef <= 7 ? 'iniciacao_1' : 'iniciacao_2';
    nivel = ef <= 5 ? 'Júnior' : ef <= 7 ? '1' : '2';
  } else {
    codigo = senior ? 'prog_sr' : ef ? (ef <= 7 ? 'prog_mirim' : 'prog_jr') : ano === 'em_1' ? 'prog_1' : 'prog_2';
    nivel = {prog_sr:'Sênior',prog_mirim:'Mirim',prog_jr:'Júnior',prog_1:'1',prog_2:'2'}[codigo];
  }
  const escola = ef ? ef + 'º ano do Ensino Fundamental' : {em_1:'1º ano do Ensino Médio',em_2:'2º ano do Ensino Médio',em_3:'3º ano do Ensino Médio',tecnico_4:'4º ano do Ensino Técnico',superior_1:'1º ano da graduação, cursado pela primeira vez'}[ano];
  let resumo = 'Recomendação para o ' + escola + ', conforme as faixas escolares da OBI 2026. ';
  resumo += modalidade === 'Iniciação' ? 'Problemas de lógica no papel, sem programação.' : 'Problemas resolvidos com programação no computador.';
  if (modalidade === 'Programação' && preferencia === 'logica') resumo += ' Sua preferência por lógica ajuda na preparação, mas não altera o nível definido pela escolaridade.';
  return {elegivel:true,titulo:'Modalidade '+modalidade+' — Nível '+nivel,resumo,nivelCodigo:codigo,precisaApoio,
    topicosEstudo: modalidade === 'Iniciação' ? ['Raciocínio lógico e dedução','Ordenação e relações entre elementos','Problemas de caminhos e contagem'] : ['Entrada, saída e estruturas condicionais','Repetição, vetores e resolução de problemas','Provas anteriores do nível recomendado']};
}

// 6. Inicialização automática ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
  // Restaurar fonte salva
  let escalaSalva = 1.0;
  try {
    const salva = Number.parseFloat(localStorage.getItem('obi_escala_fonte'));
    escalaSalva = Number.isFinite(salva) ? Math.min(2, Math.max(.85, salva)) : 1;
  } catch (e) {}

  atualizarBotoesZoom(escalaSalva);

  // Restaurar alto contraste salvo e atualizar acessibilidade (aria-pressed)
  let altoContrasteAtivo = false;
  try {
    altoContrasteAtivo = localStorage.getItem('obi_alto_contraste') === 'true';
  } catch (e) {}

  if (altoContrasteAtivo) {
    document.body.classList.add('high-contrast');
  }
  atualizarEstadoAcessibilidadeContraste(altoContrasteAtivo);

  // Vincular botões da barra de acessibilidade (se existirem na tela)
  const botaoAumentar = document.getElementById('btn-zoom-in');
  const botaoDiminuir = document.getElementById('btn-zoom-out');
  const botaoContraste = document.getElementById('btn-contrast');

  if (botaoAumentar) {
    botaoAumentar.addEventListener('click', function () { alterarTamanhoFonte(0.1); });
  }
  if (botaoDiminuir) {
    botaoDiminuir.addEventListener('click', function () { alterarTamanhoFonte(-0.1); });
  }
  if (botaoContraste) {
    botaoContraste.addEventListener('click', alternarAltoContraste);
  }

  // Comportamento simples e acessível dos cartões de seleção (.option-card)
  // Prevenção rigorosa de conflitos de listeners: se o cartão for uma tag <label>,
  // o clique já ativa o input nativamente pelo navegador.
  const cartoes = document.querySelectorAll('.option-card');
  cartoes.forEach(function (cartao) {
    const input = cartao.querySelector('input[type="radio"], input[type="checkbox"]');
    if (input) {
      if (cartao.tagName !== 'LABEL') {
        cartao.addEventListener('click', function (evento) {
          if (evento.target !== input) {
            if (input.type === 'radio') {
              input.checked = true;
            } else {
              input.checked = !input.checked;
            }
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
      }

      input.addEventListener('change', function () {
        if (input.type === 'radio') {
          document.querySelectorAll('input[name="' + input.name + '"]').forEach(function (radio) {
            const cardPai = radio.closest('.option-card');
            if (cardPai) {
              cardPai.classList.toggle('selected', radio.checked);
            }
          });
        } else {
          cartao.classList.toggle('selected', input.checked);
        }
      });

      if (input.checked) {
        cartao.classList.add('selected');
      }
    }
  });

  // Injetar Barra de Navegação Inferior Unificada
  injetarBarraNavegacaoInferior();
});

// 7. Barra de Navegação Inferior Unificada (App Bottom Navigation)
function injetarBarraNavegacaoInferior() {
  const container = document.querySelector('.mobile-viewport');
  if (!container || document.querySelector('.app-bottom-nav')) {
    return;
  }

  // Detectar localização relativa da tela atual
  const pathname = (typeof window !== 'undefined' && window.location && window.location.pathname) ? window.location.pathname : '';
  const emTelas = pathname.includes('/telas/') || Boolean(document.querySelector('link[href^="../../assets"]'));

  const linkInicio = emTelas ? '../../index.html' : 'index.html';
  const prefixoTelas = emTelas ? '../' : 'telas/';

  let linkNivel = prefixoTelas + 'tela-06-quiz-pergunta-1/index.html';
  try {
    const respostas = JSON.parse(localStorage.getItem('obi_quiz_respostas') || '{}');
    if (respostas.ano_escolar && (respostas.preferencia || respostas.preferencia_estudo) && respostas.escola_apoio) {
      linkNivel = prefixoTelas + 'tela-09-resultado-nivel/index.html';
    }
  } catch (e) {}

  const linkDatas = prefixoTelas + 'tela-02-calendario/index.html';
  const linkEstudos = prefixoTelas + 'tela-03-checklist/index.html';
  const linkApoio = prefixoTelas + 'tela-12-comunidade-extensao/index.html';

  // Identificar qual aba está ativa com base na URL
  let abaAtiva = 'inicio';
  if (pathname.includes('tela-06') || pathname.includes('tela-07') || pathname.includes('tela-08') || pathname.includes('tela-09')) {
    abaAtiva = 'nivel';
  } else if (pathname.includes('tela-02-calendario')) {
    abaAtiva = 'datas';
  } else if (pathname.includes('tela-03-checklist')) {
    abaAtiva = 'estudos';
  } else if (pathname.includes('tela-10') || pathname.includes('tela-11')) {
    abaAtiva = 'escola';
  } else if (pathname.includes('tela-04')) {
    abaAtiva = 'regras';
  } else if (pathname.includes('tela-05')) {
    abaAtiva = 'professor';
  } else if (pathname.includes('tela-12')) {
    abaAtiva = 'apoio';
  } else if (pathname.includes('tela-01-home') || !emTelas || pathname === '/' || pathname === '') {
    abaAtiva = 'inicio';
  } else {
    abaAtiva = '';
  }

  const nav = document.createElement('nav');
  nav.className = 'app-bottom-nav';
  nav.setAttribute('aria-label', 'Menu Principal do Aplicativo');

  const abas = [
    {
      id: 'inicio',
      rotulo: 'Início',
      svg: '<svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
      href: linkInicio
    },
    {
      id: 'nivel',
      rotulo: 'Nível',
      svg: '<svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>',
      href: linkNivel
    },
    {
      id: 'datas',
      rotulo: 'Calendário', curto: 'Datas',
      svg: '<svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
      href: linkDatas
    },
    {
      id: 'estudos',
      rotulo: 'Trilha de estudos', curto: 'Estudos',
      svg: '<svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
      href: linkEstudos
    },
    {
      id: 'apoio',
      rotulo: 'Ajuda e comunidade', curto: 'Ajuda',
      svg: '<svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
      href: linkApoio
    }
  ];

  const iconeDocumento = '<svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>';
  abas.splice(4, 0,
    { id: 'regras', rotulo: 'Regras e materiais', href: prefixoTelas + 'tela-04-editais/index.html', svg: iconeDocumento, desktop: true },
    { id: 'professor', rotulo: 'Área do professor', href: prefixoTelas + 'tela-05-kit-monitor/index.html', svg: iconeDocumento, desktop: true },
    { id: 'escola', rotulo: 'Apoio escolar', href: prefixoTelas + 'tela-10-solicitacao-escola/index.html', svg: abas[4].svg, desktop: true }
  );
  abas.forEach(function (aba) {
    const item = document.createElement('a');
    item.href = aba.href;
    item.className = 'bottom-nav-item' + (aba.desktop ? ' desktop-nav-only' : '') + (abaAtiva === aba.id ? ' active' : '');
    item.dataset.navId = aba.id;
    if (abaAtiva === aba.id) {
      item.setAttribute('aria-current', 'page');
    }
    item.setAttribute('aria-label', aba.rotulo + (abaAtiva === aba.id ? ' (página atual)' : ''));
    item.innerHTML = aba.svg + '<span class="nav-text nav-label-full">' + aba.rotulo + '</span>' + '<span class="nav-text nav-label-short" aria-hidden="true">' + (aba.curto || aba.rotulo) + '</span>';
    nav.appendChild(item);
  });

  function atualizarAbaResponsiva() {
    const desktop = window.matchMedia('(min-width: 960px)').matches;
    const grupoMobile = { escola: 'apoio', regras: 'estudos', professor: 'apoio' };
    const destinoAtivo = desktop ? abaAtiva : (grupoMobile[abaAtiva] || abaAtiva);
    nav.querySelectorAll('.bottom-nav-item').forEach(function atualizarItem(item) {
      const ativo = item.dataset.navId === destinoAtivo;
      item.classList.toggle('active', ativo);
      item.removeAttribute('aria-current');
      if (ativo) item.setAttribute('aria-current', destinoAtivo === abaAtiva ? 'page' : 'location');
      const aba = abas.find(function encontrar(a) { return a.id === item.dataset.navId; });
      item.setAttribute('aria-label', aba.rotulo + (ativo ? (destinoAtivo === abaAtiva ? ' (página atual)' : ' (seção atual)') : ''));
    });
  }
  if (typeof window.matchMedia === 'function') {
    atualizarAbaResponsiva();
    const mediaMenu = window.matchMedia('(min-width: 960px)');
    if (mediaMenu.addEventListener) mediaMenu.addEventListener('change', atualizarAbaResponsiva);
    else window.addEventListener('resize', atualizarAbaResponsiva);
  }
  container.appendChild(nav);

  // Reserva a altura real do menu para não encobrir o fim da página.
  function atualizarEspacoDoMenu() {
    container.style.setProperty('--altura-menu-inferior', nav.getBoundingClientRect().height + 'px');
  }
  atualizarEspacoDoMenu();
  if (typeof ResizeObserver !== 'undefined') {
    const observadorMenu = new ResizeObserver(atualizarEspacoDoMenu);
    observadorMenu.observe(nav);
  } else {
    window.addEventListener('resize', atualizarEspacoDoMenu);
  }
}

// Exportações globais estritas para navegadores e ambientes modulares
if (typeof window !== 'undefined') {
  window.alterarTamanhoFonte = alterarTamanhoFonte;
  window.atualizarBotoesZoom = atualizarBotoesZoom;
  window.alternarAltoContraste = alternarAltoContraste;
  window.atualizarEstadoAcessibilidadeContraste = atualizarEstadoAcessibilidadeContraste;
  window.salvarResposta = salvarResposta;
  window.obterRespostas = obterRespostas;
  window.gerarNovoProtocolo = gerarNovoProtocolo;
  window.obterProtocolo = obterProtocolo;
  window.calcularModalidadeOBI = calcularModalidadeOBI;
  window.injetarBarraNavegacaoInferior = injetarBarraNavegacaoInferior;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    alterarTamanhoFonte,
    atualizarBotoesZoom,
    alternarAltoContraste,
    atualizarEstadoAcessibilidadeContraste,
    salvarResposta,
    obterRespostas,
    gerarNovoProtocolo,
    obterProtocolo,
    calcularModalidadeOBI,
    injetarBarraNavegacaoInferior
  };
}

// Mantém as âncoras e o foco abaixo do cabeçalho, inclusive com fonte ampliada.
document.addEventListener('DOMContentLoaded', function observarAlturaCabecalho() {
  const cabecalho = document.querySelector('.accessibility-bar');
  if (!cabecalho) return;
  function atualizarAlturaCabecalho() {
    document.documentElement.style.setProperty('--altura-cabecalho', cabecalho.getBoundingClientRect().height + 'px');
  }
  atualizarAlturaCabecalho();
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(atualizarAlturaCabecalho).observe(cabecalho);
  } else {
    window.addEventListener('resize', atualizarAlturaCabecalho);
  }
});
