/**
 * Central OBI UFABC · Hub Central de Protótipos
 */

document.addEventListener('DOMContentLoaded', function () {
  // Inicialização de comportamentos específicos do Hub Central
  // Atalhos de teclado ou acessibilidade adicional para a grade de telas
  const cards = document.querySelectorAll('a.screen-link-card');
  cards.forEach(function (card) {
    card.setAttribute('role', 'link');
  });
});
