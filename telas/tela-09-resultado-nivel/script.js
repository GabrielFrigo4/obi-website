/**
 * Tela 09: Resultado do Nível e Categorias Recomendadas
 * Conformidade com Padrão Ouro, WCAG 2.1 AA e Design Ético
 */

'use strict';

function inicializarResultadoNivel() {
  var respostas = typeof obterRespostas === 'function' ? obterRespostas() : {};
  var temRespostasSalvas = Boolean(
    respostas && (respostas.ano_escolar || respostas.preferencia || respostas.escola_apoio)
  );

  var resultado;
  if (typeof calcularModalidadeOBI === 'function') {
    resultado = calcularModalidadeOBI();
  } else {
    var pref = respostas.preferencia || respostas.preferencia_estudo;
    if (pref === 'iniciacao' || pref === 'logica') {
      resultado = {
        titulo: 'Modalidade Iniciação — Nível 2',
        resumo: 'Indicada para estudantes que preferem resolver problemas lógicos no papel, sem uso de código.',
        precisaApoio: respostas.escola_apoio === 'escola_sem_cadastro',
        topicosEstudo: [
          'Raciocínio combinatório e restrições lógicas',
          'Problemas de caminho, grafos visuais e tabela verdade',
          'Resolução de cadernos anteriores da Modalidade Iniciação'
        ]
      };
    } else {
      resultado = {
        titulo: 'Modalidade Programação — Nível Júnior',
        resumo: 'Ideal para começar a resolver desafios com código no seu ritmo, sem pressão.',
        precisaApoio: respostas.escola_apoio === 'escola_sem_cadastro',
        topicosEstudo: [
          'Entrada, saída e estruturas condicionais (if/else)',
          'Laços de repetição (for/while) e vetores simples',
          'Simulação passo a passo em Python ou C++'
        ]
      };
    }
  }

  // 1. Tratar acesso direto vs diagnóstico personalizado
  var elAvisoPadrao = document.getElementById('aviso-diagnostico-padrao');
  var btnRefazer = document.getElementById('btn-refazer-diagnostico');
  if (!temRespostasSalvas) {
    if (elAvisoPadrao) {
      elAvisoPadrao.classList.remove('is-hidden');
      elAvisoPadrao.classList.add('is-visible');
    }
    if (btnRefazer) {
      btnRefazer.textContent = 'Fazer Diagnóstico Personalizado (3 passos)';
    }
  } else {
    if (elAvisoPadrao) {
      elAvisoPadrao.classList.add('is-hidden');
      elAvisoPadrao.classList.remove('is-visible');
    }
    if (btnRefazer) {
      btnRefazer.textContent = 'Refazer Diagnóstico (Pergunta 1)';
    }
  }

  // 2. Preencher Categoria e Resumo
  var elNome = document.getElementById('nome-categoria');
  var elDesc = document.getElementById('descricao-categoria');

  if (elNome && resultado && resultado.titulo) {
    elNome.textContent = resultado.titulo;
  }
  if (elDesc && resultado && resultado.resumo) {
    elDesc.textContent = resultado.resumo;
  }

  // 3. Preencher Tópicos de Estudo
  var elListaTopicos = document.getElementById('lista-topicos-estudo');
  if (elListaTopicos && resultado && Array.isArray(resultado.topicosEstudo)) {
    elListaTopicos.innerHTML = '';
    resultado.topicosEstudo.forEach(function (topico) {
      var li = document.createElement('li');
      li.textContent = topico;
      elListaTopicos.appendChild(li);
    });
  }

  // 4. Adaptar Seção de Apoio e Botão de Ação ao Estado Real do Estudante
  var elApoioTitulo = document.getElementById('titulo-apoio');
  var elApoioTexto = document.getElementById('texto-apoio');
  var btnApoio = document.getElementById('btn-solicitar-apoio');

  if (resultado && resultado.precisaApoio === false) {
    // Escola já participa: direcionar para comunidade e treinos
    if (elApoioTitulo) {
      elApoioTitulo.textContent = 'Sua escola já participa da OBI!';
    }
    if (elApoioTexto) {
      elApoioTexto.textContent = 'Excelente! Você já pode focar nos estudos e participar das oficinas e treinos gratuitos aos sábados com os monitores da UFABC.';
    }
    if (btnApoio) {
      btnApoio.textContent = 'Acessar Comunidade e Treinos Gratuitos →';
      btnApoio.setAttribute('href', '../tela-12-comunidade-extensao/index.html');
      btnApoio.setAttribute('aria-label', 'Acessar a comunidade de extensão e materiais de treino da UFABC');
    }
  } else {
    // Escola precisa de apoio para participar
    if (elApoioTitulo) {
      elApoioTitulo.textContent = 'Sua escola ainda não participa?';
    }
    if (elApoioTexto) {
      elApoioTexto.textContent = 'A equipe de extensão da UFABC cadastra sua escola pública ou garante sua participação direto pelo Polo Universitário.';
    }
    if (btnApoio) {
      btnApoio.textContent = 'Minha escola não participa? Solicite Apoio da UFABC';
      btnApoio.setAttribute('href', '../tela-10-solicitacao-escola/index.html');
      btnApoio.setAttribute('aria-label', 'Solicitar apoio da UFABC para cadastrar sua escola ou garantir polo');
    }
  }

  // 5. Anúncio acessível para tecnologias assistivas (leitores de tela)
  var elAnuncio = document.getElementById('status-anuncio-categoria');
  if (elAnuncio && resultado) {
    setTimeout(function () {
      elAnuncio.textContent = 'Diagnóstico concluído. Sua categoria recomendada é: ' +
        resultado.titulo + '. ' + resultado.resumo;
    }, 200);
  }
}

document.addEventListener('DOMContentLoaded', inicializarResultadoNivel);

if (typeof window !== 'undefined') {
  window.inicializarResultadoNivel = inicializarResultadoNivel;
}
