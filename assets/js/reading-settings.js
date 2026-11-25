/* Comportamento compartilhado do painel de preferências. */
'use strict';
document.addEventListener('DOMContentLoaded', function inicializarAjustesLeitura() {
  const abrir = document.getElementById('btn-reading-settings');
  const dialogo = document.getElementById('ajustes-leitura');
  const preferencias = window.OBILeitura;
  if (!abrir || !dialogo || !preferencias) return;
  abrir.setAttribute('aria-expanded', 'false');
  const campos = dialogo.querySelectorAll('[data-reading]');
  const status = document.getElementById('ajustes-status');
  function sincronizarCampos() {
    const atuais = preferencias.obter();
    campos.forEach(function preencherCampo(campo) { campo.value = atuais[campo.dataset.reading]; });
  }
  function informarSalvamento(salvou) {
    status.textContent = salvou ? 'Ajustes salvos neste navegador.' : 'Ajustes aplicados nesta página. O navegador não permitiu salvá-los.';
  }
  abrir.addEventListener('click', function abrirAjustes() {
    sincronizarCampos();
    status.textContent = '';
    dialogo.showModal();
    abrir.setAttribute('aria-expanded', 'true');
    const conteudo = dialogo.querySelector('.reading-body');
    if (conteudo) conteudo.scrollTop = 0;
    document.getElementById('fechar-ajustes').focus({ preventScroll: true });
  });
  document.getElementById('fechar-ajustes').addEventListener('click', function fecharAjustes() { dialogo.close(); });
  dialogo.addEventListener('close', function restaurarFoco() {
    abrir.setAttribute('aria-expanded', 'false');
    abrir.focus({ preventScroll: true });
  });
  dialogo.addEventListener('click', function fecharFora(evento) {
    if (evento.target !== dialogo) return;
    const limites = dialogo.getBoundingClientRect();
    if (evento.clientX < limites.left || evento.clientX > limites.right || evento.clientY < limites.top || evento.clientY > limites.bottom) dialogo.close();
  });
  campos.forEach(function observarCampo(campo) {
    campo.addEventListener('change', function salvarAjuste() {
      const dados = preferencias.obter();
      dados[campo.dataset.reading] = campo.value;
      informarSalvamento(preferencias.salvar(dados));
    });
  });
  document.getElementById('restaurar-leitura').addEventListener('click', function restaurarLeitura() {
    let salvou = preferencias.restaurar();
    document.documentElement.style.fontSize = '16px';
    document.body.classList.remove('high-contrast');
    atualizarBotoesZoom(1);
    atualizarEstadoAcessibilidadeContraste(false);
    try {
      localStorage.setItem('obi_escala_fonte', '1.00');
      localStorage.setItem('obi_alto_contraste', 'false');
    } catch (erro) { salvou = false; }
    sincronizarCampos();
    informarSalvamento(salvou);
  });
  sincronizarCampos();
});
