/**
 * Tela 10: Solicitação de Apoio para Escola
 * Conformidade com Padrão Ouro, WCAG 2.1 AA e Design Ético
 */

'use strict';

function copiarMensagemProfessor() {
  var textoEl = document.getElementById('texto-msg-professor');
  var btn = document.getElementById('btn-copiar-msg');
  var btnTexto = document.getElementById('texto-btn-copiar');
  var btnIcone = document.getElementById('icone-copiar');
  var feedback = document.getElementById('feedback-copia-msg');

  if (!textoEl) return;
  var texto = textoEl.textContent.trim();

  function feedbackSucesso() {
    if (btn) btn.classList.add('copied');
    if (btnTexto) btnTexto.textContent = 'Mensagem copiada!';
    if (btnIcone) btnIcone.textContent = '';
    if (feedback) {
      feedback.textContent = 'Mensagem copiada para a área de transferência com sucesso.';
      feedback.classList.remove('is-hidden');
      feedback.style.display = 'block';
    }

    setTimeout(function () {
      if (btn) btn.classList.remove('copied');
      if (btnTexto) btnTexto.textContent = 'Copiar mensagem para o professor';
      if (btnIcone) btnIcone.textContent = '';
      if (feedback) {
        feedback.classList.add('is-hidden');
        feedback.style.display = 'none';
      }
    }, 3000);
  }

  function feedbackErro() {
    if (feedback) {
      feedback.textContent = 'Não foi possível copiar automaticamente. Por favor, selecione e copie o texto acima.';
      feedback.classList.remove('is-hidden');
      feedback.style.display = 'block';
    }
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(texto).then(feedbackSucesso).catch(function () {
      fallbackCopiaTexto(texto, feedbackSucesso, feedbackErro);
    });
  } else {
    fallbackCopiaTexto(texto, feedbackSucesso, feedbackErro);
  }
}

function fallbackCopiaTexto(texto, callbackSucesso, callbackErro) {
  var areaTemp = document.createElement('textarea');
  areaTemp.value = texto;
  areaTemp.setAttribute('readonly', '');
  areaTemp.contentEditable = 'true';
  areaTemp.style.position = 'fixed';
  areaTemp.style.top = '0';
  areaTemp.style.left = '-9999px';
  areaTemp.style.opacity = '0';
  document.body.appendChild(areaTemp);
  areaTemp.focus();
  areaTemp.select();
  areaTemp.setSelectionRange(0, 99999);

  var sucesso = false;
  try {
    sucesso = document.execCommand('copy');
  } catch (e) {
    console.warn('Fallback de cópia falhou:', e);
  }

  document.body.removeChild(areaTemp);

  if (sucesso && typeof callbackSucesso === 'function') {
    callbackSucesso();
  } else if (!sucesso && typeof callbackErro === 'function') {
    callbackErro();
  }
}

function limparErrosCampos() {
  var campos = ['nome-estudante', 'nome-escola', 'cidade-escola', 'contato-retorno'];
  campos.forEach(function (id) {
    var campo = document.getElementById(id);
    if (campo) {
      campo.classList.remove('input-erro');
      campo.removeAttribute('aria-invalid');
    }
  });

  var feedback = document.getElementById('feedback-validacao');
  if (feedback) {
    feedback.classList.add('is-hidden');
    feedback.style.display = 'none';
    feedback.textContent = '';
  }
}

function validarFormulario() {
  var campoNome = document.getElementById('nome-estudante');
  var campoEscola = document.getElementById('nome-escola');
  var campoCidade = document.getElementById('cidade-escola');
  var campoContato = document.getElementById('contato-retorno');
  var feedback = document.getElementById('feedback-validacao');

  limparErrosCampos();

  function marcarErro(campo, mensagem) {
    if (feedback) {
      feedback.textContent = mensagem;
      feedback.classList.remove('is-hidden');
      feedback.style.display = 'block';
    }
    if (campo) {
      campo.classList.add('input-erro');
      campo.setAttribute('aria-invalid', 'true');
      campo.setAttribute('aria-describedby', 'feedback-validacao');
      campo.focus();
    }
  }

  if (!campoNome || !campoNome.value.trim()) {
    marcarErro(campoNome, 'Por favor, informe seu nome completo.');
    return false;
  }

  if (!campoEscola || !campoEscola.value.trim()) {
    marcarErro(campoEscola, 'Por favor, informe o nome da sua escola pública.');
    return false;
  }

  if (!campoCidade || !campoCidade.value) {
    marcarErro(campoCidade, 'Por favor, selecione a cidade da sua escola no Grande ABC.');
    return false;
  }

  if (!campoContato || !campoContato.value.trim()) {
    marcarErro(campoContato, 'Por favor, informe um contato (WhatsApp ou e-mail) para retorno.');
    return false;
  }

  return true;
}

function enviarSolicitacao(evento) {
  if (evento && evento.preventDefault) {
    evento.preventDefault();
  }

  if (!validarFormulario()) {
    return;
  }

  var nome = document.getElementById('nome-estudante').value.trim();
  var escola = document.getElementById('nome-escola').value.trim();
  var cidade = document.getElementById('cidade-escola').value;
  var contato = document.getElementById('contato-retorno').value.trim();
  var dataAtual = new Date().toLocaleDateString('pt-BR');

  // Gerar um protocolo único para esta nova submissão
  var protocolo;
  if (typeof gerarNovoProtocolo === 'function') {
    protocolo = gerarNovoProtocolo();
  } else if (typeof obterProtocolo === 'function') {
    protocolo = obterProtocolo();
  } else {
    protocolo = 'OBI-UFABC-' + Math.floor(1000 + Math.random() * 9000);
    try {
      localStorage.setItem('obi_protocolo_atual', protocolo);
    } catch (e) {}
  }

  if (typeof salvarResposta === 'function') {
    salvarResposta('solicitacao_estudante', nome);
    salvarResposta('solicitacao_escola', escola);
    salvarResposta('solicitacao_cidade', cidade);
    salvarResposta('solicitacao_contato', contato);
    salvarResposta('solicitacao_data', dataAtual);
    salvarResposta('solicitacao_protocolo', protocolo);
  }

  window.location.href = '../tela-11-confirmacao-polo/index.html';
}

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('form-apoio');
  if (form) {
    form.addEventListener('submit', enviarSolicitacao);
  }

  var btnCopiar = document.getElementById('btn-copiar-msg');
  if (btnCopiar) {
    btnCopiar.addEventListener('click', copiarMensagemProfessor);
  }

  // Limpeza dinâmica de erro ao digitar (Heurística 9 de Nielsen)
  var campos = ['nome-estudante', 'nome-escola', 'cidade-escola', 'contato-retorno'];
  campos.forEach(function (id) {
    var campo = document.getElementById(id);
    if (campo) {
      campo.addEventListener('input', function () {
        if (campo.classList.contains('input-erro')) {
          campo.classList.remove('input-erro');
          campo.removeAttribute('aria-invalid');
          var feedback = document.getElementById('feedback-validacao');
          if (feedback) {
            feedback.classList.add('is-hidden');
            feedback.style.display = 'none';
          }
        }
      });
      campo.addEventListener('change', function () {
        if (campo.classList.contains('input-erro')) {
          campo.classList.remove('input-erro');
          campo.removeAttribute('aria-invalid');
        }
      });
    }
  });
});

if (typeof window !== 'undefined') {
  window.copiarMensagemProfessor = copiarMensagemProfessor;
  window.enviarSolicitacao = enviarSolicitacao;
  window.validarFormulario = validarFormulario;
}
