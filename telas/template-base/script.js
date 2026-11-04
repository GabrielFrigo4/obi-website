/**
 * ==========================================================================
 * Central OBI UFABC · Template Base (Padrão Ouro)
 * Lógica Comportamental Pura e Desacoplada
 * Conformidade com Diretrizes de IHC, WCAG 2.1 AA e Design Ético
 * ==========================================================================
 */

'use strict';

// Chave semântica para persistência no localStorage ético do projeto
const CHAVE_RESPOSTA_TEMPLATE = 'opcao_template_base';

/**
 * Atualiza a área de feedback acessível (aria-live="polite" / role="status").
 * Comunica alterações dinâmicas para usuários videntes e usuários de leitores de tela.
 *
 * @param {string} mensagem - Texto amigável e conciso a ser anunciado.
 * @param {'info' | 'sucesso' | 'aviso'} tipo - Categoria semântica do feedback.
 */
function exibirFeedback(mensagem, tipo = 'info') {
  const containerFeedback = document.getElementById('status-feedback');
  if (!containerFeedback) return;

  containerFeedback.className = 'feedback-status visible status-' + tipo;
  containerFeedback.textContent = mensagem;
}

/**
 * Atualiza visualmente o estado ativo (.selected) nos cartões de opção.
 * Mantém a apresentação visual estritamente sincronizada com o estado dos inputs.
 *
 * @param {string} valorSelecionado - Valor do input radio que se encontra selecionado.
 */
function atualizarClassesCartoes(valorSelecionado) {
  const cartoes = document.querySelectorAll('.option-card');
  cartoes.forEach(function (cartao) {
    const input = cartao.querySelector('input[type="radio"]');
    if (input) {
      const estaMarcado = input.value === valorSelecionado;
      cartao.classList.toggle('selected', estaMarcado);
    }
  });
}

/**
 * Manipula a seleção de uma opção de formulário.
 * Acionada pelo evento 'change' nos inputs de rádio.
 *
 * @param {Event} evento - Evento de alteração emitido pelo input.
 */
function manipularSelecaoOpcao(evento) {
  const input = evento.target;
  if (!input || !input.checked) return;

  const valor = input.value;
  const cartao = input.closest('.option-card');
  const elementoTitulo = cartao ? cartao.querySelector('strong') : null;
  const tituloOpcao = elementoTitulo ? elementoTitulo.textContent.trim() : valor;

  // 1. Sincroniza classes visuais
  atualizarClassesCartoes(valor);

  // 2. Persistência ética local (sem cookies, sem servidores remotos)
  if (typeof salvarResposta === 'function') {
    salvarResposta(CHAVE_RESPOSTA_TEMPLATE, valor);
  }

  // 3. Feedback acessível imediato
  exibirFeedback('Opção selecionada: ' + tituloOpcao + '.', 'info');
}

/**
 * Restaura o estado salvo previamente no navegador pelo usuário.
 * Aplica o princípio de continuidade e respeito ao tempo do estudante.
 */
function restaurarRespostaSalva() {
  if (typeof obterRespostas !== 'function') return;

  const respostasSalvas = obterRespostas();
  const valorSalvo = respostasSalvas[CHAVE_RESPOSTA_TEMPLATE];

  if (valorSalvo) {
    const radioCorrespondente = document.querySelector(
      'input[name="opcao_template"][value="' + valorSalvo + '"]'
    );

    if (radioCorrespondente) {
      radioCorrespondente.checked = true;
      atualizarClassesCartoes(valorSalvo);

      const cartao = radioCorrespondente.closest('.option-card');
      const elementoTitulo = cartao ? cartao.querySelector('strong') : null;
      const tituloOpcao = elementoTitulo ? elementoTitulo.textContent.trim() : valorSalvo;

      exibirFeedback('Sua seleção anterior foi restaurada: ' + tituloOpcao + '.', 'info');
    }
  }
}

/**
 * Valida a etapa atual antes de autorizar o avanço.
 * Fornece mensagens claras e compreensíveis (Heurística 9 de Nielsen).
 *
 * @returns {boolean} Verdadeiro se válido; falso caso contrário.
 */
function validarEtapa() {
  const selecionado = document.querySelector('input[name="opcao_template"]:checked');

  if (!selecionado) {
    exibirFeedback('Atenção: Por favor, selecione uma opção antes de prosseguir.', 'aviso');

    // Retorna foco para o primeiro input radio disponível (Acessibilidade por teclado)
    const primeiroRadio = document.querySelector('input[name="opcao_template"]');
    if (primeiroRadio) primeiroRadio.focus();

    return false;
  }

  // Persistência garantida
  if (typeof salvarResposta === 'function') {
    salvarResposta(CHAVE_RESPOSTA_TEMPLATE, selecionado.value);
  }

  exibirFeedback('Etapa concluída com sucesso! Sua preferência foi salva.', 'sucesso');

  /**
   * Em telas de produção do fluxo, o redirecionamento ocorre aqui:
   * window.location.href = '../proxima-etapa/index.html';
   */
  return true;
}

/**
 * Inicialização dos eventos do template após montagem completa do DOM.
 */
function inicializarTemplate() {
  // 1. Restaura seleções salvas em sessões anteriores
  restaurarRespostaSalva();

  // 2. Registra manipuladores para alterações de rádio
  const radios = document.querySelectorAll('input[name="opcao_template"]');
  radios.forEach(function (radio) {
    radio.addEventListener('change', manipularSelecaoOpcao);
  });

  // 3. Registra manipulador para o botão de avançar etapa
  const botaoAvancar = document.getElementById('btn-avancar');
  if (botaoAvancar) {
    botaoAvancar.addEventListener('click', function () {
      validarEtapa();
    });
  }
}

// Inicialização automática protegida
document.addEventListener('DOMContentLoaded', inicializarTemplate);

// Exportações limpas para testes e auditoria no console do navegador
if (typeof window !== 'undefined') {
  window.inicializarTemplate = inicializarTemplate;
  window.manipularSelecaoOpcao = manipularSelecaoOpcao;
  window.validarEtapa = validarEtapa;
  window.restaurarRespostaSalva = restaurarRespostaSalva;
}
