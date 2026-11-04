/**
 * Central OBI UFABC - Utilitários Simples e Auditáveis de Acessibilidade
 * Código limpo, sem dependências, fácil de ler e modificar.
 * Conformidade estrita com WCAG 2.1 Nível AA e Diretrizes de IHC.
 */

'use strict';

// 1. Gerenciamento de Tamanho da Fonte (A- / A+)
function atualizarBotoesZoom(escala) {
  const btnIn = document.getElementById('btn-zoom-in');
  const btnOut = document.getElementById('btn-zoom-out');
  if (btnIn) {
    if (escala >= 1.30) {
      btnIn.setAttribute('aria-disabled', 'true');
    } else {
      btnIn.removeAttribute('aria-disabled');
    }
  }
  if (btnOut) {
    if (escala <= 0.85) {
      btnOut.setAttribute('aria-disabled', 'true');
    } else {
      btnOut.removeAttribute('aria-disabled');
    }
  }
}

function alterarTamanhoFonte(variacao) {
  const chave = 'obi_escala_fonte';
  let escalaAtual = 1.0;
  
  try {
    escalaAtual = parseFloat(localStorage.getItem(chave)) || 1.0;
  } catch (e) {}
  
  // Limites simples e seguros: entre 85% e 130%
  escalaAtual = Math.min(Math.max(escalaAtual + variacao, 0.85), 1.30);
  document.documentElement.style.fontSize = (16 * escalaAtual) + 'px';
  
  try {
    localStorage.setItem(chave, escalaAtual.toFixed(2));
  } catch (e) {}
  atualizarBotoesZoom(escalaAtual);
}

// 2. Modo Alto Contraste com Acessibilidade Completa (WCAG 4.1.2)
function atualizarEstadoAcessibilidadeContraste(estaAtivo) {
  const botoes = document.querySelectorAll('#btn-contrast');
  botoes.forEach(function (btn) {
    btn.setAttribute('aria-pressed', estaAtivo ? 'true' : 'false');
  });
}

function alternarAltoContraste() {
  const estaAtivo = document.body.classList.toggle('high-contrast');
  try {
    localStorage.setItem('obi_alto_contraste', estaAtivo ? 'true' : 'false');
  } catch (e) {}
  atualizarEstadoAcessibilidadeContraste(estaAtivo);
  return estaAtivo;
}

// 3. Persistência Ética das Respostas (Simples e Transparente)
function salvarResposta(pergunta, valor) {
  try {
    const dados = JSON.parse(localStorage.getItem('obi_quiz_respostas') || '{}');
    dados[pergunta] = valor;
    localStorage.setItem('obi_quiz_respostas', JSON.stringify(dados));
  } catch (e) {
    console.warn('Erro ao salvar resposta no storage local:', e);
  }
}

function obterRespostas() {
  try {
    return JSON.parse(localStorage.getItem('obi_quiz_respostas') || '{}');
  } catch (e) {
    return {};
  }
}

// 4. Gerador Simples de Protocolo para a Solicitação
function gerarNovoProtocolo() {
  const chave = 'obi_protocolo_atual';
  const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);
  const protocolo = 'OBI-UFABC-' + numeroAleatorio;
  try {
    localStorage.setItem(chave, protocolo);
  } catch (e) {}
  return protocolo;
}

function obterProtocolo() {
  const chave = 'obi_protocolo_atual';
  let protocolo = null;
  try {
    protocolo = localStorage.getItem(chave);
  } catch (e) {}
  if (!protocolo) {
    protocolo = gerarNovoProtocolo();
  }
  return protocolo;
}

// 5. Cálculo Oficial da Modalidade OBI com base nas Respostas
function calcularModalidadeOBI() {
  const respostas = obterRespostas();
  const anoEscolar = respostas.ano_escolar;
  const preferencia = respostas.preferencia || respostas.preferencia_estudo;
  const escolaApoio = respostas.escola_apoio;

  const precisaApoio = escolaApoio !== 'fundamental_com_apoio' &&
                       escolaApoio !== 'medio_com_apoio' &&
                       escolaApoio !== 'escola_participa';

  if (anoEscolar === 'fundamental_1' && preferencia === 'logica') {
    return {
      titulo: 'Modalidade Iniciação — Nível 1',
      resumo: 'Indicada para estudantes do 6º e 7º ano. Prova focada em raciocínio lógico e enigmas no papel, sem precisar programar.',
      nivelCodigo: 'iniciacao_1',
      precisaApoio: precisaApoio,
      topicosEstudo: [
        'Lógica proposicional e dedução simples',
        'Ordenação e agrupamento de elementos',
        'Problemas de caminho e tabela verdade'
      ]
    };
  }

  if (anoEscolar === 'fundamental_2' && preferencia === 'logica') {
    return {
      titulo: 'Modalidade Iniciação — Nível 2',
      resumo: 'Indicada para estudantes do 8º e 9º ano. Desafios analíticos e problemas lógicos no papel, sem uso de código.',
      nivelCodigo: 'iniciacao_2',
      precisaApoio: precisaApoio,
      topicosEstudo: [
        'Raciocínio combinatório e restrições',
        'Grafos visuais e relações de ordem',
        'Resolução de provas anteriores do Nível 2'
      ]
    };
  }

  if ((anoEscolar === 'fundamental_1' || anoEscolar === 'fundamental_2') && preferencia === 'codigo') {
    return {
      titulo: 'Modalidade Programação — Nível Júnior',
      resumo: 'Ideal para estudantes do Ensino Fundamental que querem dar os primeiros passos resolvendo problemas com código no computador.',
      nivelCodigo: 'prog_jr',
      precisaApoio: precisaApoio,
      topicosEstudo: [
        'Entrada, saída e condicionais (if/else)',
        'Laços de repetição (for/while) e vetores simples',
        'Simulação passo a passo em Python ou C++'
      ]
    };
  }

  if (anoEscolar === 'medio' && preferencia === 'logica') {
    return {
      titulo: 'Modalidade Programação — Nível Júnior / Nível 1',
      resumo: 'No Ensino Médio a prova é na modalidade Programação. Com as oficinas da UFABC, você aprende a transformar sua lógica em código do zero!',
      nivelCodigo: 'prog_medio_jr',
      precisaApoio: precisaApoio,
      topicosEstudo: [
        'Lógica de programação básica em Python',
        'Estruturas condicionais e repetição',
        'Resolução guiada no Neps Academy'
      ]
    };
  }

  if (anoEscolar === 'medio' && preferencia === 'codigo') {
    return {
      titulo: 'Modalidade Programação — Nível 1 ou 2',
      resumo: 'Indicada para estudantes do Ensino Médio ou Técnico (Nível 1 até o 2º ano; Nível 2 até o 3º/4º ano) com desafios práticos de algoritmos.',
      nivelCodigo: 'prog_1_2',
      precisaApoio: precisaApoio,
      topicosEstudo: [
        'Vetores, matrizes e ordenação eficiente',
        'Busca binária e algoritmos gulosos',
        'Introdução a grafos e programação dinâmica'
      ]
    };
  }

  if (anoEscolar === 'superior') {
    return {
      titulo: 'Modalidade Programação — Nível Sênior',
      resumo: 'Indicada para estudantes no 1º ano da graduação. Foco em estruturas de dados e algoritmos no computador.',
      nivelCodigo: 'prog_sr',
      precisaApoio: precisaApoio,
      topicosEstudo: [
        'Estruturas de dados e complexidade',
        'Grafos (BFS, DFS, Dijkstra)',
        'Programação dinâmica e teoria dos números'
      ]
    };
  }

  // Caso padrão (se o usuário abrir a Tela 9 direto sem passar pela Tela 6)
  return {
    titulo: 'Modalidade Programação — Nível Júnior',
    resumo: 'Ideal para começar a resolver desafios com código no seu ritmo, com suporte gratuito da UFABC.',
    nivelCodigo: 'prog_jr',
    precisaApoio: precisaApoio,
    topicosEstudo: [
      'Entrada, saída e estruturas condicionais',
      'Laços de repetição e listas básicas',
      'Treino prático nos cadernos oficiais da OBI'
    ]
  };
}

// 6. Inicialização automática ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
  // Restaurar fonte salva
  let escalaSalva = 1.0;
  try {
    escalaSalva = parseFloat(localStorage.getItem('obi_escala_fonte')) || 1.0;
  } catch (e) {}

  if (escalaSalva !== 1.0) {
    document.documentElement.style.fontSize = (16 * escalaSalva) + 'px';
  }
  atualizarBotoesZoom(escalaSalva);

  // Restaurar alto contraste salvo e atualizar acessibilidade (aria-pressed)
  let altoContrasteAtivo = false;
  try {
    altoContrasteAtivo = localStorage.getItem('obi_alto_contraste') === 'true';
  } catch (e) {}

  if (altoContrasteAtivo) {
    document.body.classList.add('high-contrast');
  }
  atualizarEstadoAcessibilidadeContraste(altoContrasteAtivo);

  // Vincular botões da barra de acessibilidade (se existirem na tela)
  const botaoAumentar = document.getElementById('btn-zoom-in');
  const botaoDiminuir = document.getElementById('btn-zoom-out');
  const botaoContraste = document.getElementById('btn-contrast');

  if (botaoAumentar) {
    botaoAumentar.addEventListener('click', function () { alterarTamanhoFonte(0.1); });
  }
  if (botaoDiminuir) {
    botaoDiminuir.addEventListener('click', function () { alterarTamanhoFonte(-0.1); });
  }
  if (botaoContraste) {
    botaoContraste.addEventListener('click', alternarAltoContraste);
  }

  // Comportamento simples e acessível dos cartões de seleção (.option-card)
  // Prevenção rigorosa de conflitos de listeners: se o cartão for uma tag <label>,
  // o clique já ativa o input nativamente pelo navegador.
  const cartoes = document.querySelectorAll('.option-card');
  cartoes.forEach(function (cartao) {
    const input = cartao.querySelector('input[type="radio"], input[type="checkbox"]');
    if (input) {
      if (cartao.tagName !== 'LABEL') {
        cartao.addEventListener('click', function (evento) {
          if (evento.target !== input) {
            if (input.type === 'radio') {
              input.checked = true;
            } else {
              input.checked = !input.checked;
            }
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
      }

      input.addEventListener('change', function () {
        if (input.type === 'radio') {
          document.querySelectorAll('input[name="' + input.name + '"]').forEach(function (radio) {
            const cardPai = radio.closest('.option-card');
            if (cardPai) {
              cardPai.classList.toggle('selected', radio.checked);
            }
          });
        } else {
          cartao.classList.toggle('selected', input.checked);
        }
      });

      if (input.checked) {
        cartao.classList.add('selected');
      }
    }
  });
});

// Exportações globais estritas para navegadores e ambientes modulares
if (typeof window !== 'undefined') {
  window.alterarTamanhoFonte = alterarTamanhoFonte;
  window.atualizarBotoesZoom = atualizarBotoesZoom;
  window.alternarAltoContraste = alternarAltoContraste;
  window.atualizarEstadoAcessibilidadeContraste = atualizarEstadoAcessibilidadeContraste;
  window.salvarResposta = salvarResposta;
  window.obterRespostas = obterRespostas;
  window.gerarNovoProtocolo = gerarNovoProtocolo;
  window.obterProtocolo = obterProtocolo;
  window.calcularModalidadeOBI = calcularModalidadeOBI;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    alterarTamanhoFonte,
    atualizarBotoesZoom,
    alternarAltoContraste,
    atualizarEstadoAcessibilidadeContraste,
    salvarResposta,
    obterRespostas,
    gerarNovoProtocolo,
    obterProtocolo,
    calcularModalidadeOBI
  };
}
