'use strict';

function escaparTextoIcs(texto) {
  return String(texto || '').replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
}
function dataAgendaValida(valor) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) throw new Error('Data inválida');
  const data = new Date(valor + 'T00:00:00Z');
  if (!Number.isFinite(data.getTime()) || data.toISOString().slice(0, 10) !== valor) throw new Error('Data inválida');
  return data;
}
function dobrarLinhaIcs(linha) {
  let resultado = '', trecho = '', bytes = 0;
  for (const caractere of linha) {
    const tamanho = new TextEncoder().encode(caractere).length;
    if (bytes + tamanho > 75) {
      resultado += trecho + '\r\n'; trecho = ' '; bytes = 1;
    }
    trecho += caractere; bytes += tamanho;
  }
  return resultado + trecho;
}
function gerarEventoIcs(titulo, inicio, fim, descricao, lembrete, id) {
  dataAgendaValida(inicio);
  const final = dataAgendaValida(fim);
  if (fim < inicio) throw new Error('Fim anterior ao início');
  final.setUTCDate(final.getUTCDate() + 1);
  const identidade = id || Array.from(titulo).map(c => c.codePointAt(0).toString(16)).join('-');
  const linhas = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Central OBI UFABC//Agenda//PT', 'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT', 'UID:' + identidade + '-' + inicio + '@central-obi-ufabc',
    'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z'),
    'DTSTART;VALUE=DATE:' + inicio.replace(/-/g, ''),
    'DTEND;VALUE=DATE:' + final.toISOString().slice(0, 10).replace(/-/g, ''),
    'SUMMARY:' + escaparTextoIcs(titulo),
    'DESCRIPTION:' + escaparTextoIcs(descricao),
    'URL:' + window.OBICalendario.fonte, 'TRANSP:TRANSPARENT'
  ];
  if (lembrete) linhas.push('BEGIN:VALARM', 'ACTION:DISPLAY', 'TRIGGER:-P2D', 'DESCRIPTION:' + escaparTextoIcs('Lembrete: ' + titulo), 'END:VALARM');
  linhas.push('END:VEVENT', 'END:VCALENDAR');
  return linhas.map(dobrarLinhaIcs).join('\r\n') + '\r\n';
}
// Links de criação: abrem o formulário do serviço, sem acesso à conta pelo site.
function gerarLinksAgenda(titulo, inicio, fim, descricao) {
  dataAgendaValida(inicio);
  const final = dataAgendaValida(fim);
  if (fim < inicio) throw new Error('Fim anterior ao início');
  final.setUTCDate(final.getUTCDate() + 1);
  const fimExclusivo = final.toISOString().slice(0, 10);
  const google = new URL('https://calendar.google.com/calendar/render');
  google.search = new URLSearchParams({ action: 'TEMPLATE', text: titulo,
    dates: inicio.replace(/-/g, '') + '/' + fimExclusivo.replace(/-/g, ''),
    details: descricao, ctz: 'America/Sao_Paulo' }).toString();
  const outlook = new URL('https://outlook.live.com/calendar/0/deeplink/compose');
  outlook.search = new URLSearchParams({ path: '/calendar/action/compose', rru: 'addevent',
    subject: titulo, startdt: inicio + 'T00:00:00', enddt: fimExclusivo + 'T00:00:00',
    allday: 'true', body: descricao }).toString();
  return { google: google.href, outlook: outlook.href };
}
function informarAgenda(texto) {
  const status = document.getElementById('agenda-status');
  if (status) status.textContent = texto;
}
function adicionarEventoAgenda(titulo, inicio, fim, descricao, lembrete = false, id) {
  try {
    const conteudo = gerarEventoIcs(titulo, inicio, fim, descricao, lembrete, id);
    const url = URL.createObjectURL(new Blob([conteudo], { type: 'text/calendar;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = (id || 'evento-obi') + '.ics';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function liberarArquivo() { URL.revokeObjectURL(url); }, 30000);
    informarAgenda('Arquivo solicitado. Abra-o no seu aplicativo de calendário para adicionar o evento.');
    return true;
  } catch (erro) {
    informarAgenda('Não foi possível baixar o evento. Tente novamente ou consulte o calendário oficial.');
    return false;
  }
}
function alternarModalidade(modalidade) {
  const calendario = window.OBICalendario;
  const dados = calendario.modalidades[modalidade];
  if (!dados) return;
  document.querySelectorAll('.mod-tab').forEach(function atualizarAba(botao) {
    const ativa = botao.dataset.modalidade === modalidade;
    botao.classList.toggle('active', ativa); botao.setAttribute('aria-selected', String(ativa));
  });
  if (typeof sincronizarAbasAcessiveis === 'function') sincronizarAbasAcessiveis(document.querySelector('.mod-tabs'), document.getElementById('tab-' + modalidade));
  const containers = {principal:document.getElementById('timeline-container'),complementar:document.getElementById('timeline-complementar'),internacional:document.getElementById('timeline-internacional')};
  Object.values(containers).forEach(el=>el.replaceChildren());
  calendario.listar(modalidade).forEach(function criarEvento(evento) {
    const card = document.createElement('article'); card.className = 'timeline-item'; card.dataset.evento = evento.id;
    const header = document.createElement('div'); header.className = 'timeline-header';
    const titulo = document.createElement('h2'); titulo.className = 'timeline-title'; titulo.textContent = evento.titulo;
    const selo = document.createElement('span'); const estado = calendario.estado(evento);
    selo.className = 'timeline-badge ' + (estado === 'Encerrado' ? 'badge-concluido' : estado === 'Em breve' ? 'badge-breve' : 'badge-andamento'); selo.textContent = estado;
    header.append(titulo,selo);
    const data = document.createElement('p'); data.className = 'timeline-date'; data.textContent = calendario.periodo(evento) + (evento.horaLimite ? ' · prazo final às '+evento.horaLimite+' (Brasília)' : '');
    const detalhe = document.createElement('p'); detalhe.className = 'evento-detalhe'; detalhe.textContent = evento.descricao;
    const botao = document.createElement('button'); botao.type = 'button'; botao.className = 'btn-agenda'; botao.textContent = 'Adicionar à agenda';
    botao.setAttribute('aria-label','Adicionar '+evento.titulo+' à agenda');
    botao.dataset.agendaTitulo = evento.titulo+' — OBI '+calendario.edicao+' — '+dados.nome;
    botao.dataset.agendaInicio = evento.inicio; botao.dataset.agendaFim = evento.fim;
    botao.dataset.agendaId = 'obi-'+calendario.edicao+'-'+modalidade+'-'+evento.id;
    botao.dataset.agendaDesc = evento.descricao+'\nPeríodo oficial em evento de dia inteiro. Confirme e ajuste o horário no aplicativo.\nFonte: '+calendario.fontes[evento.fonte];
    botao.dataset.tipo = evento.tipo;
    card.append(header,data,detalhe,botao); containers[evento.grupo].append(card);
  });
  document.getElementById('calendario-fonte-data').textContent = 'Edição '+calendario.edicao+' · Datas conferidas em '+calendario.formatar(calendario.conferidoEm);
  if (typeof salvarResposta === 'function') salvarResposta('calendario_modalidade_visualizada', modalidade);
}
document.addEventListener('DOMContentLoaded', function iniciarCalendario() {
  document.querySelectorAll('.mod-tab').forEach(function vincularAba(botao) {
    botao.addEventListener('click', function selecionarModalidade() { alternarModalidade(botao.dataset.modalidade); });
  });
  const dialogoAgenda = document.getElementById('escolher-agenda');
  let origemAgenda, eventoAgenda;
  document.getElementById('agenda-cancelar').addEventListener('click', function cancelarAgenda() { dialogoAgenda.close(); });
  dialogoAgenda.addEventListener('close', function devolverFocoAgenda() { if (origemAgenda) origemAgenda.focus({ preventScroll: true }); });
  document.getElementById('agenda-arquivo').addEventListener('click', function exportarAgenda() {
    if (!eventoAgenda) return;
    const e = eventoAgenda;
    const sucesso = adicionarEventoAgenda(e.titulo, e.inicio, e.fim, e.descricao, e.lembrete, e.id);
    if (sucesso) dialogoAgenda.close();
  });
  ['agenda-google', 'agenda-outlook'].forEach(function vincularServico(id) {
    document.getElementById(id).addEventListener('click', function abrirServico() {
      dialogoAgenda.close();
      informarAgenda('Conclua a inclusão na aba do calendário: confira o período, configure o lembrete e clique em Salvar. O site não recebe confirmação do salvamento.');
    });
  });
  document.getElementById('painel-calendario').addEventListener('click', function abrirOpcoesAgenda(evento) {
    const botao = evento.target.closest('.btn-agenda');
    if (!botao) return;
    const dados = botao.dataset;
    const lembrete = false;
    const links = gerarLinksAgenda(dados.agendaTitulo,dados.agendaInicio,dados.agendaFim,dados.agendaDesc);
    document.getElementById('agenda-google').href = links.google;
    document.getElementById('agenda-outlook').href = links.outlook;
    origemAgenda = botao;
    eventoAgenda = {titulo:dados.agendaTitulo,inicio:dados.agendaInicio,fim:dados.agendaFim,descricao:dados.agendaDesc,lembrete,id:dados.agendaId};
    dialogoAgenda.showModal();
  });
  const respostas = typeof obterRespostas === 'function' ? obterRespostas() : {};
  const salva = respostas.calendario_modalidade_visualizada;
  alternarModalidade(window.OBICalendario.modalidades[salva] ? salva : (respostas.preferencia === 'logica' ? 'iniciacao' : 'programacao'));
});
