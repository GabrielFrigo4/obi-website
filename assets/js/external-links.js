/* Confirmação acessível e compartilhada para navegação externa. */
'use strict';

function inicializarAvisoLinksExternos() {
  const dialogo = document.createElement('dialog');
  dialogo.className = 'external-dialog';
  dialogo.setAttribute('aria-labelledby', 'external-dialog-title');
  dialogo.setAttribute('aria-describedby', 'external-dialog-description external-dialog-destination');
  dialogo.innerHTML = '<h2 id="external-dialog-title">Abrir site externo?</h2>' +
    '<p id="external-dialog-description">Você será direcionado para este site em uma nova aba.</p>' +
    '<p id="external-dialog-destination" class="external-dialog-destination"></p>' +
    '<div class="external-dialog-actions"><button type="button" class="btn-secondary" autofocus>Cancelar</button>' +
    '<a class="btn-primary" target="_blank" rel="noopener noreferrer" data-external-continue>Abrir site <span aria-hidden="true">↗</span></a></div>';
  document.body.appendChild(dialogo);
  const cancelar = dialogo.querySelector('button');
  const continuar = dialogo.querySelector('a');
  const destino = dialogo.querySelector('.external-dialog-destination');
  let origem;

  cancelar.addEventListener('click', function cancelarSaida() { dialogo.close(); });
  continuar.addEventListener('click', function confirmarSaida() { dialogo.close(); });
  dialogo.addEventListener('close', function restaurarFoco() {
    if (origem && origem.isConnected) origem.focus({ preventScroll: true });
  });
  document.addEventListener('click', function confirmarLinkExterno(evento) {
    if (evento.defaultPrevented || evento.button !== 0) return;
    const link = evento.target.closest('a[href]');
    if (!link || link.hasAttribute('data-external-continue') || link.hasAttribute('download')) return;
    let url;
    try { url = new URL(link.href, document.baseURI); } catch (erro) { return; }
    if (!['http:', 'https:'].includes(url.protocol) || url.origin === window.location.origin) return;
    // Navegação normal permanece disponível em navegadores sem suporte a dialog.
    if (typeof dialogo.showModal !== 'function') return;
    evento.preventDefault();
    origem = link;
    continuar.href = url.href;
    destino.textContent = url.hostname;
    dialogo.showModal();
  });
}

document.addEventListener('DOMContentLoaded', inicializarAvisoLinksExternos);
