/* Executado no head, antes dos estilos, para evitar mudança visível de fonte. */
(function aplicarFonteAntesDaRenderizacao() {
  'use strict';
  try {
    const salva = Number.parseFloat(localStorage.getItem('obi_escala_fonte'));
    const escala = Number.isFinite(salva) ? Math.min(1.3, Math.max(.85, salva)) : 1;
    document.documentElement.style.fontSize = (16 * escala) + 'px';
  } catch (erro) {
    // O tamanho padrão permanece disponível quando o armazenamento é bloqueado.
  }
})();
