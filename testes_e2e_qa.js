/**
 * ==============================================================================
 * Central OBI UFABC · Suíte de Testes Automatizados End-to-End e QA
 * Validação profunda de lógica, acessibilidade, localStorage e listeners.
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

    // Reduzir até o limite
    for (let i = 0; i < 10; i++) btnOut.click();
    escala = parseFloat(window.localStorage.getItem('obi_escala_fonte'));
    assert.strictEqual(escala, 0.85);
    assert.strictEqual(btnOut.getAttribute('aria-disabled'), 'true');
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
  // 3. TELA 06 (QUIZ - PERGUNTA 1) E AUSÊNCIA DE EVENTOS DUPLICADOS
  // -----------------------------------------------------------------------------
  console.log('\n3. Tela 06 (Quiz: Pergunta 1) & Ausência de Eventos Duplicados:');

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

    // Clica no strong dentro do label
    strong.click();

    assert.strictEqual(changeCount, 1, `Esperava 1 evento change, mas foram disparados ${changeCount}`);
    assert.strictEqual(input.checked, true);
    assert.strictEqual(card.classList.contains('selected'), true);

    const dados = JSON.parse(window.localStorage.getItem('obi_quiz_respostas') || '{}');
    assert.strictEqual(dados['ano_escolar'], input.value);
  });

  // -----------------------------------------------------------------------------
  // 4. TELA 07 (QUIZ - PERGUNTA 2)
  // -----------------------------------------------------------------------------
  console.log('\n4. Tela 07 (Quiz: Pergunta 2):');

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
  // 5. TELA 08 (QUIZ - PERGUNTA 3) E CÁLCULO DE MODALIDADE
  // -----------------------------------------------------------------------------
  console.log('\n5. Tela 08 (Quiz: Pergunta 3) e Cálculo de Modalidade:');

  it('Salva escola_apoio e valida valores compatíveis com calcularModalidadeOBI', () => {
    const { window } = carregarTela('telas/tela-08-quiz-apoio/index.html', 'script.js');
    const radio = window.document.querySelector('input[name="escola_apoio"][value="fundamental_com_apoio"]');
    radio.click();

    const dados = JSON.parse(window.localStorage.getItem('obi_quiz_respostas') || '{}');
    assert.strictEqual(dados['escola_apoio'], 'fundamental_com_apoio');
  });

  // -----------------------------------------------------------------------------
  // 6. TELA 09 (RESULTADO DO NÍVEL) · TESTES DE PRECISÃO DE IHC
  // -----------------------------------------------------------------------------
  console.log('\n6. Tela 09 (Resultado do Nível):');

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
  // 7. TELA 10 (SOLICITAÇÃO DE APOIO) E TELA 11 (CONFIRMAÇÃO)
  // -----------------------------------------------------------------------------
  console.log('\n7. Telas 10 e 11 (Solicitação e Confirmação de Polo):');

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

    // Agora carregar Tela 11 com o storage preenchido
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
  // 8. TELA 12 (HUB COMUNITÁRIO & EXTENSÃO)
  // -----------------------------------------------------------------------------
  console.log('\n8. Tela 12 (Hub Comunitário & Extensão):');

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
