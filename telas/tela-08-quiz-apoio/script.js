/**
 * Tela 08: Quiz - Pergunta 3 (Série e Apoio Escolar)
 * Conformidade com Padrão Ouro, WCAG 2.1 AA e Design Ético
 */

'use strict';

const CHAVE_RESPOSTA = 'escola_apoio';

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
    const input = cartao.querySelector('input[name="escola_apoio"]');
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

  exibirFeedback('Situação escolar selecionada: ' + tituloOpcao + '.', 'info');
}

function restaurarRespostaSalva() {
  if (typeof obterRespostas !== 'function') return;

  const respostas = obterRespostas();
  const valorSalvo = respostas[CHAVE_RESPOSTA];

  if (valorSalvo) {
    const radio = document.querySelector('input[name="escola_apoio"][value="' + valorSalvo + '"]');
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

function concluirQuiz() {
  const selecionado = document.querySelector('input[name="escola_apoio"]:checked');

  if (!selecionado) {
    exibirFeedback('Atenção: Por favor, selecione sua série e situação escolar antes de ver seu resultado.', 'aviso');
    const primeiro = document.querySelector('input[name="escola_apoio"]');
    if (primeiro) primeiro.focus();
    return;
  }

  const valor = selecionado.value;
  if (typeof salvarResposta === 'function') {
    salvarResposta(CHAVE_RESPOSTA, valor);
  }

  window.location.href = '../tela-09-resultado-nivel/index.html';
}

document.addEventListener('DOMContentLoaded', function () {
  restaurarRespostaSalva();

  const radios = document.querySelectorAll('input[name="escola_apoio"]');
  radios.forEach(function (radio) {
    radio.addEventListener('change', manipularSelecao);
  });

  const btnFinalizar = document.getElementById('btn-finalizar');
  if (btnFinalizar) {
    btnFinalizar.addEventListener('click', concluirQuiz);
  }
});

// Exportações globais limpas
if (typeof window !== 'undefined') {
  window.restaurarRespostaSalva = restaurarRespostaSalva;
  window.concluirQuiz = concluirQuiz;
}
