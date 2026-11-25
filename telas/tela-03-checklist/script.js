'use strict';
let categoriaAtual = 'prog_jr';
const estudos = window.OBIEstudos;
function texto(id, valor) { const el = document.getElementById(id); if (el) el.textContent = valor; }
function selecionarCategoria(cat) {
  // Links antigos para a trilha genérica continuam funcionando.
  if (cat === 'iniciacao') cat = 'iniciacao_1';
  const dados = estudos.categorias[cat];
  if (!dados) return;
  categoriaAtual = cat;
  document.querySelectorAll('.cat-tab').forEach(function atualizarAba(btn) {
    const ativa = btn.dataset.categoria === cat;
    btn.classList.toggle('active', ativa); btn.setAttribute('aria-selected', String(ativa)); btn.tabIndex = ativa ? 0 : -1;
  });
  const aba = document.getElementById('cat-' + cat);
  if (typeof sincronizarAbasAcessiveis === 'function') sincronizarAbasAcessiveis(document.querySelector('.cat-tabs'), aba);
  texto('cat-descricao-texto', dados.titulo + ' — ' + dados.escolaridade);
  texto('nota-trilha', dados.nota);
  texto('titulo-pratica', dados.iniciacao ? 'Praticar lógica e raciocínio' : 'Praticar programação');
  texto('orientacao-pratica', dados.iniciacao ? 'Escolha uma tarefa do seu nível, resolva no papel e confira sua resposta. Você não precisa programar.' : cat === 'prog_mirim' ? 'Comece pelos cursos do Saci. O acervo de prática consultado ainda não separa o novo Nível Mirim.' : 'Resolva problemas do seu nível no ambiente oficial. Use os cursos e as resoluções como apoio quando encontrar dificuldades.');
  const recursos = document.getElementById('recursos-programacao');
  if (recursos) recursos.hidden = dados.iniciacao || cat === 'prog_mirim';
  const pratica = document.getElementById('link-pratica-oficial');
  if (pratica) { pratica.href = dados.pratica; pratica.textContent = dados.rotuloPratica; pratica.setAttribute('aria-label', dados.rotuloPratica + ' (nova aba)'); }
  const ementa = document.getElementById('link-ementa');
  if (ementa) { ementa.href = dados.ementa; ementa.textContent = dados.iniciacao ? 'Orientações oficiais de Iniciação' : 'Consultar ementa oficial de Programação'; ementa.setAttribute('aria-label', ementa.textContent + ' (abre em nova aba)'); }
  texto('orientacao-acervo', cat === 'prog_mirim' ? 'O Nível Mirim começou em 2026, portanto não tem cadernos de anos anteriores com esse nome. Consulte a organização sobre os materiais de 2026; o acervo abaixo reúne as edições anteriores.' : 'No acervo oficial, selecione o ano e ' + dados.titulo + '. Em Iniciação, procure os cadernos e gabaritos; em Programação, as tarefas e soluções disponíveis.');
  renderizarChecklist();
}
function renderizarChecklist() {
  const lista = document.getElementById('lista-conteudos');
  if (!lista) return;
  lista.replaceChildren();
  const marcados = estudos.progresso(categoriaAtual);
  const nomes = { PM:'Base • desde Mirim', PJ:'Complemento • desde Júnior', P1:'Complemento • desde Nível 1', P2:'Complemento • Nível 2 e Sênior' };
  const secoes = new Map();
  estudos.categorias[categoriaAtual].topicos.forEach(function criarTopico(topico, index) {
    const nomeSecao = topico.secao || 'Prática sugerida';
    if (!secoes.has(nomeSecao)) {
      const detalhes = document.createElement('details'), resumo = document.createElement('summary'), tituloSecao = document.createElement('span'), contador = document.createElement('span'), itens = document.createElement('ul');
      detalhes.className = 'checklist-section'; detalhes.open = secoes.size === 0;
      tituloSecao.textContent = nomeSecao; contador.className = 'checklist-section-count';
      itens.className = 'checklist-items'; itens.setAttribute('aria-label', nomeSecao);
      resumo.append(tituloSecao, contador); detalhes.append(resumo, itens); lista.append(detalhes);
      secoes.set(nomeSecao, { itens, contador, ids: [] });
    }
    const secao = secoes.get(nomeSecao); secao.ids.push(topico.id);
    const li = document.createElement('li'), label = document.createElement('label'), input = document.createElement('input');
    label.className = 'checklist-label'; label.classList.toggle('checked', marcados[topico.id] === true);
    input.type = 'checkbox'; input.className = 'checklist-input'; input.checked = marcados[topico.id] === true;
    input.addEventListener('change', function marcar() {
      const valores = estudos.progresso(categoriaAtual);
      if (input.checked) valores[topico.id] = true; else delete valores[topico.id];
      try { localStorage.setItem(estudos.chave(categoriaAtual), JSON.stringify(valores)); }
      catch (erro) { input.checked = !input.checked; texto('stat-texto', 'Não foi possível salvar. Libere o armazenamento do navegador para marcar seu progresso.'); return; }
      label.classList.toggle('checked', input.checked); atualizarContadores(); atualizarBarraProgresso();
    });
    const bloco = document.createElement('span'), titulo = document.createElement('strong'), descricao = document.createElement('small');
    bloco.className = 'checklist-topic'; titulo.textContent = (index + 1) + '. ' + topico.titulo; descricao.textContent = topico.explicacao;
    bloco.append(titulo, descricao);
    if (nomes[topico.grupo]) { const origem = document.createElement('small'); origem.className = 'checklist-group-label'; origem.textContent = nomes[topico.grupo]; bloco.append(origem); }
    label.append(input, bloco); li.append(label); secao.itens.append(li);
  });
  function atualizarContadores() {
    const valores = estudos.progresso(categoriaAtual);
    secoes.forEach(function contar(secao) { secao.contador.textContent = secao.ids.filter(id => valores[id] === true).length + ' de ' + secao.ids.length; });
  }
  atualizarContadores();
  atualizarBarraProgresso();
}
function atualizarBarraProgresso() {
  const total = estudos.categorias[categoriaAtual].topicos.length, concluidos = estudos.concluidos(categoriaAtual);
  const porcentagem = total ? Math.round(concluidos / total * 100) : 0;
  texto('stat-texto', concluidos + ' de ' + total + ' tópicos concluídos (' + porcentagem + '%)');
  const fill = document.getElementById('progress-fill-el'), bar = document.getElementById('progress-bar-el');
  if (fill) fill.style.width = porcentagem + '%';
  if (bar) bar.setAttribute('aria-valuenow', porcentagem);
}
function limparProgressoAtual() {
  if (!confirm('Limpar as marcações de ' + estudos.categorias[categoriaAtual].titulo + '?')) return;
  try { localStorage.removeItem(estudos.chave(categoriaAtual)); renderizarChecklist(); }
  catch (erro) { texto('stat-texto', 'Não foi possível limpar as marcações neste navegador.'); }
}
document.addEventListener('DOMContentLoaded', function iniciarTrilhas() {
  document.querySelectorAll('.cat-tab[data-categoria]').forEach(function observar(btn) { btn.addEventListener('click', function abrirTrilha() { selecionarCategoria(btn.dataset.categoria); }); });
  document.getElementById('btn-limpar-progresso').addEventListener('click', limparProgressoAtual);
  const cat = new URLSearchParams(window.location.search).get('cat');
  if (cat === 'iniciacao' || estudos.categorias[cat]) { selecionarCategoria(cat); return; }
  const resultado = typeof calcularModalidadeOBI === 'function' ? calcularModalidadeOBI() : null;
  selecionarCategoria(resultado && estudos.categoriaDoNivel[resultado.nivelCodigo] || 'prog_jr');
});
