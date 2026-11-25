/* Executado no head, antes dos estilos, para evitar mudança visível de fonte. */
(function aplicarFonteAntesDaRenderizacao() {
  'use strict';
  try {
    const salva = Number.parseFloat(localStorage.getItem('obi_escala_fonte'));
    const escala = Number.isFinite(salva) ? Math.min(2, Math.max(.85, salva)) : 1;
    document.documentElement.style.fontSize = (16 * escala) + 'px';
  } catch (erro) {
    // O tamanho padrão permanece disponível quando o armazenamento é bloqueado.
  }
})();

/* Preferências de leitura aplicadas antes da primeira pintura da página. */
(function inicializarPreferenciasLeitura() {
  'use strict';
  const padrao = { espaco: 'normal', paleta: 'padrao', movimento: 'sistema' };
  const opcoes = {
    espaco: ['normal', 'confortavel', 'amplo'],
    paleta: ['padrao', 'quente', 'fria', 'monocromatica'],
    movimento: ['sistema', 'reduzir']
  };
  let atual = { ...padrao };
  function aplicarPreferencias(dados) {
    Object.keys(padrao).forEach(function aplicarOpcao(chave) {
      atual[chave] = dados && opcoes[chave].includes(dados[chave]) ? dados[chave] : padrao[chave];
      document.documentElement.setAttribute('data-leitura-' + chave, atual[chave]);
    });
  }
  try { aplicarPreferencias(JSON.parse(localStorage.getItem('obi_preferencias_leitura'))); }
  catch (erro) { aplicarPreferencias(padrao); }
  window.OBILeitura = {
    obter: function obterPreferencias() { return { ...atual }; },
    salvar: function salvarPreferencias(dados) {
      aplicarPreferencias(dados);
      try {
        localStorage.setItem('obi_preferencias_leitura', JSON.stringify(atual));
        return true;
      } catch (erro) { return false; }
    },
    restaurar: function restaurarPreferencias() { return this.salvar(padrao); }
  };
})();
