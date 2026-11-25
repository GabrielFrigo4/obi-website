'use strict';

function sincronizarAbasAcessiveis(lista, selecionada) {
  if (!lista || !selecionada) return;
  lista.querySelectorAll('[role="tab"]').forEach(function atualizarAba(aba) {
    const ativa = aba === selecionada;
    aba.tabIndex = ativa ? 0 : -1;
    aba.setAttribute('aria-selected', String(ativa));
  });
  const painel = document.getElementById(selecionada.getAttribute('aria-controls'));
  if (painel) painel.setAttribute('aria-labelledby', selecionada.id);
}

function iniciarAbasAcessiveis(lista) {
  const abas = Array.from(lista.querySelectorAll('[role="tab"]'));
  if (!abas.length) return;
  sincronizarAbasAcessiveis(lista, abas.find(aba => aba.getAttribute('aria-selected') === 'true') || abas[0]);
  lista.addEventListener('keydown', function navegarAbas(evento) {
    const indice = abas.indexOf(evento.target);
    if (indice < 0 || evento.altKey || evento.ctrlKey || evento.metaKey) return;
    let destino;
    if (evento.key === 'ArrowRight') destino = (indice + 1) % abas.length;
    else if (evento.key === 'ArrowLeft') destino = (indice + abas.length - 1) % abas.length;
    else if (evento.key === 'Home') destino = 0;
    else if (evento.key === 'End') destino = abas.length - 1;
    else return; // Enter/Espaço mantêm a ativação nativa do botão.
    evento.preventDefault();
    abas.forEach(function moverParadaTab(aba, i) { aba.tabIndex = i === destino ? 0 : -1; });
    abas[destino].focus();
  });
  lista.addEventListener('click', function selecionarAba(evento) {
    const aba = evento.target.closest('[role="tab"]');
    if (abas.includes(aba)) sincronizarAbasAcessiveis(lista, aba);
  });
  lista.addEventListener('focusout', function manterEntradaNaAbaAtiva(evento) {
    if (evento.relatedTarget && lista.contains(evento.relatedTarget)) return;
    const ativa = abas.find(aba => aba.getAttribute('aria-selected') === 'true');
    sincronizarAbasAcessiveis(lista, ativa);
  });
}

document.addEventListener('DOMContentLoaded', function iniciarAcessibilidade() {
  document.querySelectorAll('[role="tablist"]').forEach(iniciarAbasAcessiveis);
  const atalho = document.querySelector('.skip-link');
  if (atalho) atalho.addEventListener('click', function pularParaConteudo(evento) {
    const destino = document.getElementById(atalho.getAttribute('href').slice(1));
    if (!destino) return;
    evento.preventDefault();
    destino.focus({ preventScroll: true });
    destino.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
});
