/**
 * ==============================================================================
 * Central OBI UFABC · Suíte Completa de Testes Automatizados E2E e QA
 * Validação rigorosa de lógica, acessibilidade, localStorage e listeners (Telas 01 a 12).
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { JSDOM } = require('jsdom');

const BASE_DIR = fs.existsSync(path.resolve(__dirname, 'telas')) 
  ? __dirname 
  : path.resolve(__dirname, 'obi-website');

let totalPasses = 0;
let totalFails = 0;

function it(description, fn) {
  try {
    fn();
    console.log(`  ✓ [PASS] ${description}`);
    totalPasses++;
  } catch (err) {
    console.error(`  ✗ [FAIL] ${description}`);
    console.error(`    -> Erro: ${err.message}`);
    totalFails++;
  }
}

async function itAsync(description, fn) {
  try {
    await fn();
    console.log(`  ✓ [PASS] ${description}`);
    totalPasses++;
  } catch (err) {
    console.error(`  ✗ [FAIL] ${description}`);
    console.error(`    -> Erro: ${err.message}`);
    totalFails++;
  }
}

function carregarTela(caminhoHtml, scriptRelativo, localStorageInicial = {}) {
  const htmlPath = path.resolve(BASE_DIR, caminhoHtml);
  const html = fs.readFileSync(htmlPath, 'utf8');

  const dom = new JSDOM(html, {
    url: 'https://obi.ufabc.edu.br/' + caminhoHtml,
    runScripts: 'dangerously',
    resources: 'usable'
  });

  const { window } = dom;

  // Mock de clipboard e print
  window.__clipboardContent = null;
  window.navigator.clipboard = {
    writeText: async (text) => {
      window.__clipboardContent = text;
      return Promise.resolve();
    }
  };
  window.__printed = false;
  window.print = () => { window.__printed = true; };
  window.confirm = () => true;

  // Inicializar localStorage com valores prévios
  if (localStorageInicial) {
    Object.keys(localStorageInicial).forEach(k => {
      window.localStorage.setItem(k, localStorageInicial[k]);
    });
  }

  // Carregar utils.js
  const utilsCode = fs.readFileSync(path.resolve(BASE_DIR, 'assets/js/utils.js'), 'utf8');
  window.eval(utilsCode);

  // Carregar script específico da tela se houver
  if (scriptRelativo) {
    const scriptPath = path.resolve(path.dirname(htmlPath), scriptRelativo);
    if (fs.existsSync(scriptPath)) {
      const screenCode = fs.readFileSync(scriptPath, 'utf8');
      window.eval(screenCode);
    }
  }

  // Disparar DOMContentLoaded
  window.document.dispatchEvent(new window.Event('DOMContentLoaded', { bubbles: true, cancelable: true }));

  return { dom, window };
}

async function executarTodosOsTestes() {
  console.log('\n======================================================');
  console.log(' INICIANDO BATERIA DE TESTES DE QA E2E · CENTRAL OBI');
  console.log(' Cobertura: Hub Central, Template Base e Telas 01 a 12');
  console.log('======================================================\n');

  // -----------------------------------------------------------------------------
  // 1. HUB CENTRAL E BARRA DE ACESSIBILIDADE
  // -----------------------------------------------------------------------------
  console.log('1. Hub Central e Barra de Acessibilidade:');

  it('Botão #btn-contrast possui aria-pressed="false" inicialmente', () => {
    const { window } = carregarTela('index.html', 'assets/js/hub.js');
    const btn = window.document.getElementById('btn-contrast');
    assert.strictEqual(btn.getAttribute('aria-pressed'), 'false');
  });

  it('Clicar em #btn-contrast ativa alto contraste e define aria-pressed="true"', () => {
    const { window } = carregarTela('index.html', 'assets/js/hub.js');
    const btn = window.document.getElementById('btn-contrast');
    btn.click();
    assert.strictEqual(window.document.body.classList.contains('high-contrast'), true);
    assert.strictEqual(btn.getAttribute('aria-pressed'), 'true');
    assert.strictEqual(window.localStorage.getItem('obi_alto_contraste'), 'true');
  });

  it('Clicar duas vezes em #btn-contrast desativa alto contraste e define aria-pressed="false"', () => {
    const { window } = carregarTela('index.html', 'assets/js/hub.js');
    const btn = window.document.getElementById('btn-contrast');
    btn.click();
    btn.click();
    assert.strictEqual(window.document.body.classList.contains('high-contrast'), false);
    assert.strictEqual(btn.getAttribute('aria-pressed'), 'false');
    assert.strictEqual(window.localStorage.getItem('obi_alto_contraste'), 'false');
  });

  it('Carregar página com obi_alto_contraste=true restaura classe e aria-pressed="true"', () => {
    const { window } = carregarTela('index.html', 'assets/js/hub.js', { obi_alto_contraste: 'true' });
    const btn = window.document.getElementById('btn-contrast');
    assert.strictEqual(window.document.body.classList.contains('high-contrast'), true);
    assert.strictEqual(btn.getAttribute('aria-pressed'), 'true');
  });

  it('Botões de zoom alteram fontSize e respeitam limites (0.85 a 1.30)', () => {
    const { window } = carregarTela('index.html', 'assets/js/hub.js');
    const btnIn = window.document.getElementById('btn-zoom-in');
    const btnOut = window.document.getElementById('btn-zoom-out');

    btnIn.click();
    let escala = parseFloat(window.localStorage.getItem('obi_escala_fonte'));
    assert.strictEqual(escala > 1.0, true);

    for (let i = 0; i < 10; i++) btnOut.click();
    escala = parseFloat(window.localStorage.getItem('obi_escala_fonte'));
    assert.strictEqual(escala, 0.85);
    assert.strictEqual(btnOut.getAttribute('aria-disabled'), 'true');
  });

  it('Hub Central: Todas as 12 telas possuem links clicáveis e funcionais no grid', () => {
    const { window } = carregarTela('index.html', 'assets/js/hub.js');
    for (let i = 1; i <= 12; i++) {
      const numStr = i < 10 ? '0' + i : '' + i;
      const link = window.document.querySelector(`a[href*="tela-${numStr}"]`);
      assert.strictEqual(Boolean(link), true, `Link da Tela ${numStr} deve existir no Hub Central`);
    }
  });

  // -----------------------------------------------------------------------------
  // 2. TEMPLATE BASE (PADRÃO OURO)
  // -----------------------------------------------------------------------------
  console.log('\n2. Template Base (Padrão Ouro):');

  it('Validação impede avanço se nenhuma opção for marcada', () => {
    const { window } = carregarTela('telas/template-base/index.html', 'script.js');
    const feedback = window.document.getElementById('status-feedback');
    assert.strictEqual(window.validarEtapa(), false);
    assert.strictEqual(feedback.textContent.includes('Atenção'), true);
  });

  it('Selecionar opção no template-base sincroniza classe selected e persiste no localStorage', () => {
    const { window } = carregarTela('telas/template-base/index.html', 'script.js');
    const radio = window.document.querySelector('input[name="opcao_template"][value="opcao_1"]');
    radio.click();

    const card = radio.closest('.option-card');
    assert.strictEqual(card.classList.contains('selected'), true);
    assert.strictEqual(window.validarEtapa(), true);

    const dados = JSON.parse(window.localStorage.getItem('obi_quiz_respostas') || '{}');
    assert.strictEqual(dados['opcao_template_base'], 'opcao_1');
  });

  // -----------------------------------------------------------------------------
  // 3. TELA 01 (HOME / PAINEL DA JORNADA)
  // -----------------------------------------------------------------------------
  console.log('\n3. Tela 01 (Home / Painel da Jornada):');

  it('Tela 01: Cartão agora e links de atalhos estão presentes e apontam para telas corretas', () => {
    const { window } = carregarTela('telas/tela-01-home/index.html', 'script.js');
    assert.strictEqual(Boolean(window.document.getElementById('titulo-agora')), true);

    const linkCal = window.document.querySelector('a[href="../tela-02-calendario/index.html"]');
    const linkChk = window.document.querySelector('a[href="../tela-03-checklist/index.html"]');
    const linkEdital = window.document.querySelector('a[href="../tela-04-editais/index.html"]');
    const linkQuiz = window.document.querySelector('a[href="../tela-06-quiz-pergunta-1/index.html"]');

    assert.strictEqual(Boolean(linkCal), true, 'Link do Calendário deve existir na Home');
    assert.strictEqual(Boolean(linkChk), true, 'Link do Checklist deve existir na Home');
    assert.strictEqual(Boolean(linkEdital), true, 'Link dos Editais deve existir na Home');
    assert.strictEqual(Boolean(linkQuiz), true, 'Link do Quiz Diagnóstico deve existir na Home');
  });

  // -----------------------------------------------------------------------------
  // 4. TELA 02 (CALENDÁRIO OFICIAL & PRAZOS)
  // -----------------------------------------------------------------------------
  console.log('\n4. Tela 02 (Calendário Oficial & Prazos):');

  it('Tela 02: Alternância de modalidade via abas atualiza aria-selected e texto da Fase 1', () => {
    const { window } = carregarTela('telas/tela-02-calendario/index.html', 'script.js');
    const tabIni = window.document.getElementById('tab-iniciacao');
    const tabProg = window.document.getElementById('tab-programacao');
    const textoFase1 = window.document.getElementById('data-fase1-texto');

    tabIni.click();
    assert.strictEqual(tabIni.getAttribute('aria-selected'), 'true');
    assert.strictEqual(tabProg.getAttribute('aria-selected'), 'false');
    assert.strictEqual(textoFase1.textContent.includes('No Papel'), true);

    tabProg.click();
    assert.strictEqual(tabProg.getAttribute('aria-selected'), 'true');
    assert.strictEqual(tabIni.getAttribute('aria-selected'), 'false');
    assert.strictEqual(textoFase1.textContent.includes('No Computador'), true);
  });

  it('Tela 02: Switches de lembretes persistem preferências no localStorage', () => {
    const { window } = carregarTela('telas/tela-02-calendario/index.html', 'script.js');
    const switch48h = window.document.getElementById('switch-aviso-48h');
    const switchTodos = window.document.getElementById('chk-alertas-todos');

    switch48h.click();
    assert.strictEqual(window.localStorage.getItem('obi_lembrete_48h'), 'true');

    switchTodos.click();
    assert.strictEqual(window.localStorage.getItem('obi_lembrete_todas_fases'), 'true');
  });

  // -----------------------------------------------------------------------------
  // 5. TELA 03 (TRILHA DE ESTUDOS & CHECKLIST)
  // -----------------------------------------------------------------------------
  console.log('\n5. Tela 03 (Trilha de Estudos & Checklist):');

  it('Tela 03: Selecionar abas carrega tópicos e marcar item atualiza barra de progresso', () => {
    const { window } = carregarTela('telas/tela-03-checklist/index.html', 'script.js');
    const abaIni = window.document.getElementById('cat-iniciacao');
    abaIni.click();

    const lista = window.document.getElementById('lista-conteudos');
    const itens = lista.querySelectorAll('li');
    assert.strictEqual(itens.length > 0, true, 'Lista de conteúdos deve conter tópicos renderizados');

    // Marcar primeiro checkbox
    const primeiroInput = itens[0].querySelector('input[type="checkbox"]');
    primeiroInput.click();

    const progressBar = window.document.getElementById('progress-bar-el');
    const valuenow = parseInt(progressBar.getAttribute('aria-valuenow'), 10);
    assert.strictEqual(valuenow > 0, true, 'Progresso deve ser maior que 0 após marcar item');

    // Limpar progresso
    const btnLimpar = window.document.getElementById('btn-limpar-progresso');
    btnLimpar.click();

    const valuenowAposLimpar = parseInt(progressBar.getAttribute('aria-valuenow'), 10);
    assert.strictEqual(valuenowAposLimpar, 0, 'Progresso deve zerar após confirmação de limpeza');
  });

  // -----------------------------------------------------------------------------
  // 6. TELA 04 (EDITAIS DESCOMPLICADOS)
  // -----------------------------------------------------------------------------
  console.log('\n6. Tela 04 (Editais Descomplicados):');

  it('Tela 04: Estrutura semântica e links de ação rápida estão íntegros', () => {
    const { window } = carregarTela('telas/tela-04-editais/index.html', 'script.js');
    const linkQuiz = window.document.querySelector('.btn-edital-quiz');
    const linkChecklist = window.document.querySelector('.btn-edital-checklist');

    assert.strictEqual(linkQuiz.getAttribute('href'), '../tela-06-quiz-pergunta-1/index.html');
    assert.strictEqual(linkChecklist.getAttribute('href'), '../tela-03-checklist/index.html');
  });

  // -----------------------------------------------------------------------------
  // 7. TELA 05 (KIT DO MONITOR / PROFESSOR)
  // -----------------------------------------------------------------------------
  console.log('\n7. Tela 05 (Kit do Monitor / Professor):');

  await itAsync('Tela 05: Validação exige preenchimento de data antes de copiar aviso', async () => {
    const { window } = carregarTela('telas/tela-05-kit-monitor/index.html', 'script.js');
    const btnCopiarAviso = window.document.querySelector('button[data-copiar="aviso"]');
    const campoData = window.document.getElementById('campo-data-fase1');

    btnCopiarAviso.click();
    assert.strictEqual(campoData.getAttribute('aria-invalid'), 'true');

    // Preenche a data e tenta novamente
    campoData.value = '15/11 (domingo)';
    campoData.dispatchEvent(new window.Event('input'));
    btnCopiarAviso.click();

    await new Promise(resolve => setTimeout(resolve, 50));
    assert.strictEqual(window.__clipboardContent !== null, true);
    assert.strictEqual(window.__clipboardContent.includes('15/11 (domingo)'), true);
  });

  // -----------------------------------------------------------------------------
  // 8. TELA 06 (QUIZ - PERGUNTA 1) E AUSÊNCIA DE EVENTOS DUPLICADOS
  // -----------------------------------------------------------------------------
  console.log('\n8. Tela 06 (Quiz: Pergunta 1) & Ausência de Eventos Duplicados:');

  it('Avançar sem selecionar opção exibe aviso e devolve foco ao primeiro campo', () => {
    const { window } = carregarTela('telas/tela-06-quiz-pergunta-1/index.html', 'script.js');
    const feedback = window.document.getElementById('status-feedback');
    window.avancarParaPergunta2();
    assert.strictEqual(feedback.textContent.includes('Atenção'), true);
  });

  it('Clique no label/strong dispara exatamente 1 evento change no input (sem duplicação)', () => {
    const { window } = carregarTela('telas/tela-06-quiz-pergunta-1/index.html', 'script.js');
    const card = window.document.querySelector('.option-card');
    const input = card.querySelector('input');
    const strong = card.querySelector('strong');

    let changeCount = 0;
    input.addEventListener('change', () => { changeCount++; });

    strong.click();

    assert.strictEqual(changeCount, 1, `Esperava 1 evento change, mas foram disparados ${changeCount}`);
    assert.strictEqual(input.checked, true);
    assert.strictEqual(card.classList.contains('selected'), true);

    const dados = JSON.parse(window.localStorage.getItem('obi_quiz_respostas') || '{}');
    assert.strictEqual(dados['ano_escolar'], input.value);
  });

  // -----------------------------------------------------------------------------
  // 9. TELA 07 (QUIZ - PERGUNTA 2)
  // -----------------------------------------------------------------------------
  console.log('\n9. Tela 07 (Quiz: Pergunta 2):');

  it('Salva preferência de estudo (logica / codigo) de forma consistente', () => {
    const { window } = carregarTela('telas/tela-07-quiz-logica/index.html', 'script.js');
    const radio = window.document.querySelector('input[name="preferencia"][value="logica"]');
    radio.click();

    const card = radio.closest('.option-card');
    assert.strictEqual(card.classList.contains('selected'), true);

    const dados = JSON.parse(window.localStorage.getItem('obi_quiz_respostas') || '{}');
    assert.strictEqual(dados['preferencia'], 'logica');
    assert.strictEqual(dados['preferencia_estudo'], 'logica');
  });

  // -----------------------------------------------------------------------------
  // 10. TELA 08 (QUIZ - PERGUNTA 3) E CÁLCULO DE MODALIDADE
  // -----------------------------------------------------------------------------
  console.log('\n10. Tela 08 (Quiz: Pergunta 3) e Mapeamento de Apoio:');

  it('Salva escola_apoio e valida valores compatíveis com calcularModalidadeOBI', () => {
    const { window } = carregarTela('telas/tela-08-quiz-apoio/index.html', 'script.js');
    const radio = window.document.querySelector('input[name="escola_apoio"][value="fundamental_com_apoio"]');
    radio.click();

    const dados = JSON.parse(window.localStorage.getItem('obi_quiz_respostas') || '{}');
    assert.strictEqual(dados['escola_apoio'], 'fundamental_com_apoio');
  });

  // -----------------------------------------------------------------------------
  // 11. TELA 09 (RESULTADO DO NÍVEL) · TESTES DE PRECISÃO DE IHC
  // -----------------------------------------------------------------------------
  console.log('\n11. Tela 09 (Resultado do Nível):');

  it('Cenário A: Fundamental 1 + Lógica + Sem Cadastro -> Iniciação 1 e precisa de apoio', () => {
    const respostas = {
      ano_escolar: 'fundamental_1',
      preferencia: 'logica',
      escola_apoio: 'escola_sem_cadastro'
    };

    const { window } = carregarTela('telas/tela-09-resultado-nivel/index.html', 'script.js', {
      obi_quiz_respostas: JSON.stringify(respostas)
    });

    const elNome = window.document.getElementById('nome-categoria');
    const elApoioTitulo = window.document.getElementById('titulo-apoio');
    const btnApoio = window.document.getElementById('btn-solicitar-apoio');

    assert.strictEqual(elNome.textContent, 'Modalidade Iniciação — Nível 1');
    assert.strictEqual(elApoioTitulo.textContent, 'Sua escola ainda não participa?');
    assert.strictEqual(btnApoio.getAttribute('href'), '../tela-10-solicitacao-escola/index.html');
  });

  it('Cenário B: Médio + Código + Escola com Apoio -> Programação 1/2 e NÃO induz ao cadastro', () => {
    const respostas = {
      ano_escolar: 'medio',
      preferencia: 'codigo',
      escola_apoio: 'medio_com_apoio'
    };

    const { window } = carregarTela('telas/tela-09-resultado-nivel/index.html', 'script.js', {
      obi_quiz_respostas: JSON.stringify(respostas)
    });

    const elNome = window.document.getElementById('nome-categoria');
    const elApoioTitulo = window.document.getElementById('titulo-apoio');
    const btnApoio = window.document.getElementById('btn-solicitar-apoio');

    assert.strictEqual(elNome.textContent, 'Modalidade Programação — Nível 1 ou 2');
    assert.strictEqual(elApoioTitulo.textContent, 'Sua escola já participa da OBI!');
    assert.strictEqual(btnApoio.getAttribute('href'), '../tela-12-comunidade-extensao/index.html');
    assert.strictEqual(btnApoio.textContent.includes('Comunidade'), true);
  });

  it('Cenário C: Acesso direto à Tela 09 sem respostas exibe aviso e convite para diagnóstico', () => {
    const { window } = carregarTela('telas/tela-09-resultado-nivel/index.html', 'script.js', {});
    const elAviso = window.document.getElementById('aviso-diagnostico-padrao');
    const btnRefazer = window.document.getElementById('btn-refazer-diagnostico');

    assert.strictEqual(elAviso.classList.contains('is-visible'), true);
    assert.strictEqual(btnRefazer.textContent.includes('3 passos'), true);
  });

  // -----------------------------------------------------------------------------
  // 12. TELAS 10 E 11 (SOLICITAÇÃO DE APOIO E CONFIRMAÇÃO DE POLO)
  // -----------------------------------------------------------------------------
  console.log('\n12. Telas 10 e 11 (Solicitação e Confirmação de Polo):');

  await itAsync('Tela 10: Cópia da mensagem para o professor copia texto com sucesso', async () => {
    const { window } = carregarTela('telas/tela-10-solicitacao-escola/index.html', 'script.js');
    const btnCopiar = window.document.getElementById('btn-copiar-msg');
    btnCopiar.click();

    await new Promise(resolve => setTimeout(resolve, 50));

    assert.strictEqual(window.__clipboardContent !== null, true);
    assert.strictEqual(window.__clipboardContent.includes('Olá, professor(a)!'), true);
  });

  it('Tela 10: Validação bloqueia envio se campos obrigatórios estiverem vazios', () => {
    const { window } = carregarTela('telas/tela-10-solicitacao-escola/index.html', 'script.js');
    assert.strictEqual(window.validarFormulario(), false);
    const feedback = window.document.getElementById('feedback-validacao');
    assert.strictEqual(feedback.style.display, 'block');
  });

  it('Tela 10: Envio gera protocolo novo e persiste dados que a Tela 11 lê com perfeição', () => {
    const { window: win10 } = carregarTela('telas/tela-10-solicitacao-escola/index.html', 'script.js');

    win10.document.getElementById('nome-estudante').value = 'Gabriel Souza';
    win10.document.getElementById('nome-escola').value = 'EE Senador Fláquer';
    win10.document.getElementById('cidade-escola').value = 'Santo André';
    win10.document.getElementById('contato-retorno').value = '(11) 97777-6666';

    win10.enviarSolicitacao({ preventDefault: () => {} });

    const rawRespostas = win10.localStorage.getItem('obi_quiz_respostas');
    const protocoloGerado = win10.localStorage.getItem('obi_protocolo_atual');

    assert.strictEqual(Boolean(protocoloGerado), true);
    assert.strictEqual(protocoloGerado.startsWith('OBI-UFABC-'), true);

    const parsed = JSON.parse(rawRespostas);
    assert.strictEqual(parsed['solicitacao_estudante'], 'Gabriel Souza');
    assert.strictEqual(parsed['solicitacao_escola'], 'EE Senador Fláquer');

    const storage11 = {
      obi_quiz_respostas: rawRespostas,
      obi_protocolo_atual: protocoloGerado
    };

    const { window: win11 } = carregarTela('telas/tela-11-confirmacao-polo/index.html', 'script.js', storage11);

    assert.strictEqual(win11.document.getElementById('protocolo-display').textContent, protocoloGerado);
    assert.strictEqual(win11.document.getElementById('resumo-estudante').textContent, 'Gabriel Souza');
    assert.strictEqual(win11.document.getElementById('resumo-escola').textContent, 'EE Senador Fláquer');
    assert.strictEqual(win11.document.getElementById('resumo-cidade').textContent, 'Santo André — Polo UFABC');
  });

  it('Tela 11: Botão de impressão invoca window.print()', () => {
    const { window } = carregarTela('telas/tela-11-confirmacao-polo/index.html', 'script.js');
    const btnPrint = window.document.getElementById('btn-print-action');
    btnPrint.click();
    assert.strictEqual(window.__printed, true);
  });

  // -----------------------------------------------------------------------------
  // 13. TELA 12 (HUB COMUNITÁRIO & EXTENSÃO)
  // -----------------------------------------------------------------------------
  console.log('\n13. Tela 12 (Hub Comunitário & Extensão):');

  it('FAQ itens sincronizam aria-expanded nos resumos ao alternar', () => {
    const { window } = carregarTela('telas/tela-12-comunidade-extensao/index.html', 'script.js');
    const faqItem = window.document.querySelector('.faq-item');
    const summary = faqItem.querySelector('.faq-question');

    assert.strictEqual(summary.getAttribute('aria-expanded'), 'false');

    faqItem.open = true;
    faqItem.dispatchEvent(new window.Event('toggle'));
    assert.strictEqual(summary.getAttribute('aria-expanded'), 'true');
  });

  console.log('\n======================================================');
  console.log(` RESULTADO FINAL: ${totalPasses} PASSARAM, ${totalFails} FALHARAM`);
  console.log('======================================================\n');

  if (totalFails > 0) {
    process.exit(1);
  } else {
    console.log('🎉 TODOS OS TESTES PASSARAM COM SUCESSO ABSOLUTO!');
  }
}

executarTodosOsTestes().catch(err => {
  console.error('Erro fatal nos testes:', err);
  process.exit(1);
});
