/**
 * Tela 11: Confirmação de Solicitação & Polo UFABC
 * Conformidade com Padrão Ouro, WCAG 2.1 AA e Design Ético
 */

'use strict';

function inicializarProtocoloEResumo() {
  var respostas = (typeof obterRespostas === 'function') ? obterRespostas() : {};
  var display = document.getElementById('protocolo-display');
  
  var protocolo = respostas['solicitacao_protocolo'] ||
                  (typeof obterProtocolo === 'function' ? obterProtocolo() : null);
  
  if (!protocolo) {
    try {
      protocolo = localStorage.getItem('obi_protocolo_atual');
    } catch (e) {}
  }
  
  if (!protocolo) {
    protocolo = typeof gerarNovoProtocolo === 'function' ? gerarNovoProtocolo() : 'OBI-UFABC-' + Math.floor(1000 + Math.random() * 9000);
  }

  if (display) {
    display.textContent = protocolo;
  }

  var elEstudante = document.getElementById('resumo-estudante');
  var elEscola = document.getElementById('resumo-escola');
  var elCidade = document.getElementById('resumo-cidade');
  var elData = document.getElementById('resumo-data');

  if (elEstudante) {
    elEstudante.textContent = respostas['solicitacao_estudante'] || 'Estudante Convidado';
  }
  if (elEscola) {
    elEscola.textContent = respostas['solicitacao_escola'] || 'Polo Regional Grande ABC';
  }
  if (elCidade) {
    var cidade = respostas['solicitacao_cidade'] || 'Grande ABC';
    elCidade.textContent = cidade + ' — Polo UFABC';
  }
  if (elData) {
    var dataSalva = respostas['solicitacao_data'];
    if (!dataSalva) {
      dataSalva = new Date().toLocaleDateString('pt-BR');
      if (typeof salvarResposta === 'function') {
        salvarResposta('solicitacao_data', dataSalva);
      }
    }
    elData.textContent = dataSalva;
  }
}

function copiarProtocolo() {
  var display = document.getElementById('protocolo-display');
  var btn = document.getElementById('btn-copiar');
  var btnTexto = document.getElementById('btn-copiar-texto');
  var feedback = document.getElementById('status-copia');

  if (!display) return;
  var texto = display.textContent.trim();

  function aposCopiar() {
    if (btn) btn.classList.add('copied');
    if (btnTexto) btnTexto.textContent = 'Copiado!';
    if (feedback) feedback.textContent = 'Protocolo ' + texto + ' copiado para a área de transferência com sucesso.';

    setTimeout(function () {
      if (btn) btn.classList.remove('copied');
      if (btnTexto) btnTexto.textContent = 'Copiar';
      if (feedback) feedback.textContent = '';
    }, 2500);
  }

  function falhaCopia() {
    if (feedback) feedback.textContent = 'Não foi possível copiar automaticamente. Selecione e copie o protocolo: ' + texto;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(texto).then(aposCopiar).catch(function () {
      fallbackCopia(texto, aposCopiar, falhaCopia);
    });
  } else {
    fallbackCopia(texto, aposCopiar, falhaCopia);
  }
}

function fallbackCopia(texto, callbackSucesso, callbackErro) {
  var inputTemp = document.createElement('textarea');
  inputTemp.value = texto;
  inputTemp.setAttribute('readonly', '');
  inputTemp.contentEditable = 'true';
  inputTemp.style.position = 'fixed';
  inputTemp.style.top = '0';
  inputTemp.style.left = '-9999px';
  inputTemp.style.opacity = '0';
  document.body.appendChild(inputTemp);
  inputTemp.focus();
  inputTemp.select();
  inputTemp.setSelectionRange(0, 99999);

  var sucesso = false;
  try {
    sucesso = document.execCommand('copy');
  } catch (e) {
    console.warn('Fallback de cópia de protocolo falhou:', e);
  }

  document.body.removeChild(inputTemp);

  if (sucesso && typeof callbackSucesso === 'function') {
    callbackSucesso();
  } else if (!sucesso && typeof callbackErro === 'function') {
    callbackErro();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  inicializarProtocoloEResumo();

  var btnCopiar = document.getElementById('btn-copiar');
  if (btnCopiar) {
    btnCopiar.addEventListener('click', copiarProtocolo);
  }

  var btnPrint = document.getElementById('btn-print-action');
  if (btnPrint) {
    btnPrint.addEventListener('click', function () {
      window.print();
    });
  }
});

if (typeof window !== 'undefined') {
  window.inicializarProtocoloEResumo = inicializarProtocoloEResumo;
  window.copiarProtocolo = copiarProtocolo;
}
