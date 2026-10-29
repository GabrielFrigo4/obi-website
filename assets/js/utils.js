function alterarTamanhoFonte(variacao) {
  const chave = 'obi_escala_fonte';
  let escalaAtual = parseFloat(localStorage.getItem(chave)) || 1.0;
  escalaAtual = Math.min(Math.max(escalaAtual + variacao, 0.85), 1.30);
  document.documentElement.style.fontSize = (16 * escalaAtual) + 'px';
  localStorage.setItem(chave, escalaAtual.toFixed(2));
}

function alternarAltoContraste() {
  const estaAtivo = document.body.classList.toggle('high-contrast');
  localStorage.setItem('obi_alto_contraste', estaAtivo ? 'true' : 'false');
}

function salvarResposta(pergunta, valor) {
  const dados = JSON.parse(localStorage.getItem('obi_quiz_respostas') || '{}');
  dados[pergunta] = valor;
  localStorage.setItem('obi_quiz_respostas', JSON.stringify(dados));
}

function obterRespostas() {
  return JSON.parse(localStorage.getItem('obi_quiz_respostas') || '{}');
}

function obterProtocolo() {
  const chave = 'obi_protocolo_atual';
  let protocolo = localStorage.getItem(chave);
  if (!protocolo) {
    const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);
    protocolo = 'OBI-UFABC-' + numeroAleatorio;
    localStorage.setItem(chave, protocolo);
  }
  return protocolo;
}

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

document.addEventListener('DOMContentLoaded', function () {
  const escalaSalva = parseFloat(localStorage.getItem('obi_escala_fonte'));
  if (escalaSalva) {
    document.documentElement.style.fontSize = (16 * escalaSalva) + 'px';
  }

  if (localStorage.getItem('obi_alto_contraste') === 'true') {
    document.body.classList.add('high-contrast');
  }

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

  const cartoes = document.querySelectorAll('.option-card');
  cartoes.forEach(function (cartao) {
    const input = cartao.querySelector('input[type="radio"], input[type="checkbox"]');
    if (input) {
      cartao.addEventListener('click', function (evento) {
        if (evento.target !== input) {
          if (input.type === 'radio') {
            input.checked = true;
          } else {
            input.checked = !input.checked;
          }
          input.dispatchEvent(new Event('change'));
        }
      });

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
