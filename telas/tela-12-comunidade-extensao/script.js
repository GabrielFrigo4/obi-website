/**
 * Tela 12: Hub Comunitário & Extensão Universitária UFABC
 * Conformidade com Padrão Ouro, WCAG 2.1 AA e Design Ético
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // Inicialização e suporte à acessibilidade aprimorada do FAQ
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var summary = item.querySelector('.faq-question');
    if (summary) {
      summary.setAttribute('aria-expanded', item.open ? 'true' : 'false');
    }
    item.addEventListener('toggle', function () {
      if (summary) {
        summary.setAttribute('aria-expanded', item.open ? 'true' : 'false');
      }
    });
  });
});
