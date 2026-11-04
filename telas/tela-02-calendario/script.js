/**
 * Tela 02: Calendário Oficial OBI 2026
 * Conformidade com Padrão Ouro, WCAG 2.1 AA e Design Ético
 */

'use strict';

function formatarDataIcs(str) {
  return str.replace(/-/g, '') + 'T120000Z';
}

function adicionarEventoAgenda(titulo, dataInicio, dataFim, descricao) {
  const conteudoIcs = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Central OBI UFABC//Calendario Acessivel//PT',
    'BEGIN:VEVENT',
    'SUMMARY:' + titulo,
    'DESCRIPTION:' + descricao,
    'DTSTART:' + formatarDataIcs(dataInicio),
    'DTEND:' + formatarDataIcs(dataFim),
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  try {
    const blob = new Blob([conteudoIcs], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', titulo.toLowerCase().replace(/[^a-z0-9]/g, '_') + '.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (e) {
    console.warn('Download do arquivo de agenda não disponível no ambiente atual:', e);
  }
}

function alternarModalidade(modalidade) {
  const tabIni = document.getElementById('tab-iniciacao');
  const tabProg = document.getElementById('tab-programacao');
  const dataFase1Texto = document.getElementById('data-fase1-texto');

  if (modalidade === 'iniciacao') {
    if (tabIni) {
      tabIni.classList.add('active');
      tabIni.setAttribute('aria-selected', 'true');
    }
    if (tabProg) {
      tabProg.classList.remove('active');
      tabProg.setAttribute('aria-selected', 'false');
    }
    if (dataFase1Texto) {
      dataFase1Texto.textContent = '15 de novembro de 2026 (Iniciação Júnior, 1 e 2 - No Papel)';
    }
  } else {
    if (tabProg) {
      tabProg.classList.add('active');
      tabProg.setAttribute('aria-selected', 'true');
    }
    if (tabIni) {
      tabIni.classList.remove('active');
      tabIni.setAttribute('aria-selected', 'false');
    }
    if (dataFase1Texto) {
      dataFase1Texto.textContent = '15 de novembro de 2026 (Programação Júnior, 1, 2 e Sênior - No Computador)';
    }
  }

  if (typeof salvarResposta === 'function') {
    salvarResposta('calendario_modalidade_visualizada', modalidade);
  }
}

function salvarAvisoLembrete(ativo) {
  try {
    localStorage.setItem('obi_lembrete_48h', ativo ? 'true' : 'false');
  } catch (e) {}
}

function salvarAlertaGeral(ativo) {
  try {
    localStorage.setItem('obi_lembrete_todas_fases', ativo ? 'true' : 'false');
  } catch (e) {}
}

document.addEventListener('DOMContentLoaded', function () {
  // 1. Restaurar estados salvos dos lembretes
  let avisoSalvo = false;
  let geralSalvo = false;
  try {
    avisoSalvo = localStorage.getItem('obi_lembrete_48h') === 'true';
    geralSalvo = localStorage.getItem('obi_lembrete_todas_fases') === 'true';
  } catch (e) {}

  const switchAviso = document.getElementById('switch-aviso-48h');
  const chkGeral = document.getElementById('chk-alertas-todos');

  if (switchAviso) {
    switchAviso.checked = avisoSalvo;
    switchAviso.addEventListener('change', function () {
      salvarAvisoLembrete(switchAviso.checked);
    });
  }

  if (chkGeral) {
    chkGeral.checked = geralSalvo;
    chkGeral.addEventListener('change', function () {
      salvarAlertaGeral(chkGeral.checked);
    });
  }

  // 2. Vincular abas de modalidade
  const botoesAba = document.querySelectorAll('.mod-tab[data-modalidade]');
  botoesAba.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const mod = btn.getAttribute('data-modalidade');
      alternarModalidade(mod);
    });
  });

  // 3. Vincular botões de adicionar à agenda
  const botoesAgenda = document.querySelectorAll('.btn-agenda[data-agenda-titulo]');
  botoesAgenda.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const titulo = btn.getAttribute('data-agenda-titulo');
      const inicio = btn.getAttribute('data-agenda-inicio');
      const fim = btn.getAttribute('data-agenda-fim');
      const desc = btn.getAttribute('data-agenda-desc');
      adicionarEventoAgenda(titulo, inicio, fim, desc);
    });
  });

  // 4. Adaptar modalidade padrão com base em respostas anteriores do quiz
  const respostas = typeof obterRespostas === 'function' ? obterRespostas() : {};
  if (respostas.preferencia === 'logica' || respostas.ano_escolar === 'fundamental_1') {
    alternarModalidade('iniciacao');
  }
});

// Exportações globais para compatibilidade e testes E2E
if (typeof window !== 'undefined') {
  window.adicionarEventoAgenda = adicionarEventoAgenda;
  window.alternarModalidade = alternarModalidade;
  window.salvarAvisoLembrete = salvarAvisoLembrete;
  window.salvarAlertaGeral = salvarAlertaGeral;
}
