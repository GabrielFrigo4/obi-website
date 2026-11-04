/**
 * Tela 06: Quiz - Pergunta 1 (Ano Escolar)
 * Conformidade com Padrão Ouro, WCAG 2.1 AA e Design Ético
 */

'use strict';

const CHAVE_RESPOSTA = 'ano_escolar';

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
    const input = cartao.querySelector('input[name="ano_escolar"]');
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
    salvarResposta(CHAVE_RESPOSTA, valor);
  }

  const cartao = input.closest('.option-card');
  const elementoTitulo = cartao ? cartao.querySelector('strong') : null;
  const tituloOpcao = elementoTitulo ? elementoTitulo.textContent.trim() : valor;

  exibirFeedback('Ano escolar selecionado: ' + tituloOpcao + '.', 'info');
}

function restaurarRespostaSalva() {
  if (typeof obterRespostas !== 'function') return;

  const respostas = obterRespostas();
  const valorSalvo = respostas[CHAVE_RESPOSTA];

  if (valorSalvo) {
    const radio = document.querySelector('input[name="ano_escolar"][value="' + valorSalvo + '"]');
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

function avancarParaPergunta2() {
  const selecionado = document.querySelector('input[name="ano_escolar"]:checked');

  if (!selecionado) {
    exibirFeedback('Atenção: Por favor, selecione seu ano escolar antes de prosseguir.', 'aviso');
    const primeiro = document.querySelector('input[name="ano_escolar"]');
    if (primeiro) primeiro.focus();
    return;
  }

  const valor = selecionado.value;
  if (typeof salvarResposta === 'function') {
    salvarResposta(CHAVE_RESPOSTA, valor);
  }

  window.location.href = '../tela-07-quiz-logica/index.html';
}

document.addEventListener('DOMContentLoaded', function () {
  restaurarRespostaSalva();

  const radios = document.querySelectorAll('input[name="ano_escolar"]');
  radios.forEach(function (radio) {
    radio.addEventListener('change', manipularSelecao);
  });

  const btnAvancar = document.getElementById('btn-avancar');
  if (btnAvancar) {
    btnAvancar.addEventListener('click', avancarParaPergunta2);
  }
});

// Exportações globais limpas para compatibilidade e testes
if (typeof window !== 'undefined') {
  window.restaurarRespostaSalva = restaurarRespostaSalva;
  window.avancarParaPergunta2 = avancarParaPergunta2;
}
