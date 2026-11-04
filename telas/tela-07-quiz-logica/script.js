/**
 * Tela 07: Quiz - Pergunta 2 (Preferência de Desafios)
 * Conformidade com Padrão Ouro, WCAG 2.1 AA e Design Ético
 */

'use strict';

const CHAVE_RESPOSTA = 'preferencia';

function exibirFeedback(mensagem, tipo) {
  tipo = tipo || 'info';
  const container = document.getElementById('status-feedback');
  if (!container) return;
  container.className = 'feedback-status visible status-' + tipo;
  container.textContent = mensagem;
}

function atualizarClassesCartoes(valorSelecionado) {
  const cartoes = document.querySelectorAll('.option-card');
  cartoes.forEach(function (cartao) {
    const input = cartao.querySelector('input[name="preferencia"]');
    if (input) {
      const estaMarcado = input.value === valorSelecionado;
      cartao.classList.toggle('selected', estaMarcado);
    }
  });
}

function manipularSelecao(evento) {
  const input = evento.target;
  if (!input || !input.checked) return;

  const valor = input.value;
  atualizarClassesCartoes(valor);

  if (typeof salvarResposta === 'function') {
    salvarResposta('preferencia', valor);
    salvarResposta('preferencia_estudo', valor);
  }

  const cartao = input.closest('.option-card');
  const elementoTitulo = cartao ? cartao.querySelector('strong') : null;
  const tituloOpcao = elementoTitulo ? elementoTitulo.textContent.trim() : valor;

  exibirFeedback('Preferência selecionada: ' + tituloOpcao + '.', 'info');
}

function restaurarRespostaSalva() {
  if (typeof obterRespostas !== 'function') return;

  const respostas = obterRespostas();
  const valorSalvo = respostas['preferencia'] || respostas['preferencia_estudo'];

  if (valorSalvo) {
    const radio = document.querySelector('input[name="preferencia"][value="' + valorSalvo + '"]');
    if (radio) {
      radio.checked = true;
      atualizarClassesCartoes(valorSalvo);

      const cartao = radio.closest('.option-card');
      const elementoTitulo = cartao ? cartao.querySelector('strong') : null;
      const tituloOpcao = elementoTitulo ? elementoTitulo.textContent.trim() : valorSalvo;

      exibirFeedback('Opção restaurada: ' + tituloOpcao + '.', 'info');
    }
  }
}

function avancarParaApoio() {
  const selecionado = document.querySelector('input[name="preferencia"]:checked');

  if (!selecionado) {
    exibirFeedback('Atenção: Por favor, selecione sua preferência de desafios antes de prosseguir.', 'aviso');
    const primeiro = document.querySelector('input[name="preferencia"]');
    if (primeiro) primeiro.focus();
    return;
  }

  const valor = selecionado.value;
  if (typeof salvarResposta === 'function') {
    salvarResposta('preferencia', valor);
    salvarResposta('preferencia_estudo', valor);
  }

  window.location.href = '../tela-08-quiz-apoio/index.html';
}

document.addEventListener('DOMContentLoaded', function () {
  restaurarRespostaSalva();

  const radios = document.querySelectorAll('input[name="preferencia"]');
  radios.forEach(function (radio) {
    radio.addEventListener('change', manipularSelecao);
  });

  const btnAvancar = document.getElementById('btn-avancar');
  if (btnAvancar) {
    btnAvancar.addEventListener('click', avancarParaApoio);
  }
});

// Exportações globais limpas
if (typeof window !== 'undefined') {
  window.restaurarRespostaSalva = restaurarRespostaSalva;
  window.avancarParaApoio = avancarParaApoio;
}
