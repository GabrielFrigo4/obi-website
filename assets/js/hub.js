/**
 * Central OBI UFABC · Lógica Comportamental da Home do Aplicativo (index.html)
 * Reatividade pura com localStorage, acessibilidade e integridade da jornada.
 */

'use strict';

const DATA_PROVA_FASE_1 = null;

function converterTextoEmData(textoData) {
  const partes = textoData.split('-');
  return new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
}

function calcularDiasRestantes(dataProva) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const milissegundosPorDia = 24 * 60 * 60 * 1000;
  return Math.round((dataProva - hoje) / milissegundosPorDia);
}

function atualizarCartaoAgora() {
  const elData = document.getElementById('agora-data');
  const elDias = document.getElementById('agora-dias');
  const elDiasItem = document.getElementById('agora-dias-item');
  const elSituacao = document.getElementById('agora-situacao');

  if (!elData || !elSituacao) return;

  if (!DATA_PROVA_FASE_1) {
    elData.textContent = 'datas oficiais em breve';
    elSituacao.textContent = 'a Fase 1 de 2026 já aconteceu';
    return;
  }

  const dataProva = converterTextoEmData(DATA_PROVA_FASE_1);
  const diasRestantes = calcularDiasRestantes(dataProva);

  elData.textContent = dataProva.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  if (diasRestantes > 0) {
    const textoDias = diasRestantes === 1 ? 'Falta 1 dia' : 'Faltam ' + diasRestantes + ' dias';
    if (elDias) elDias.textContent = textoDias + ' para a prova';
    if (elDiasItem) elDiasItem.hidden = false;
    elSituacao.textContent = 'prepare-se com calma e confirme sua participação na escola';
  } else if (diasRestantes === 0) {
    elSituacao.textContent = 'a prova é hoje';
  } else {
    elSituacao.textContent = 'esta prova já aconteceu';
  }
}

function sincronizarEstadoDoUsuario() {
  const respostas = (typeof window.obterRespostas === 'function') ? window.obterRespostas() : {};
  const quizCompleto = Boolean(
    respostas.ano_escolar &&
    (respostas.preferencia || respostas.preferencia_estudo) &&
    respostas.escola_apoio
  );

  if (quizCompleto) {
    const elBadge = document.getElementById('badge-nivel-status');
    const elTitulo = document.getElementById('titulo-banner-nivel');
    const elDesc = document.getElementById('desc-banner-nivel');
    const elBtn = document.getElementById('btn-cta-nivel');

    const resultado = (typeof window.calcularModalidadeOBI === 'function') ? window.calcularModalidadeOBI() : null;

    if (elBadge) {
      elBadge.textContent = 'Diagnóstico Concluído';
      elBadge.className = 'badge badge-success';
    }
    if (elTitulo && resultado) {
      elTitulo.textContent = resultado.titulo;
    }
    if (elDesc && resultado) {
      elDesc.textContent = resultado.resumo;
    }
    if (elBtn) {
      elBtn.href = 'telas/tela-09-resultado-nivel/index.html';
      elBtn.textContent = 'Ver Meu Nível Recomendado';
    }
  }

  const elSubChecklist = document.getElementById('subtexto-progresso-checklist');
  if (elSubChecklist) {
    try {
      const categorias = ['iniciacao', 'prog_jr', 'nivel_1', 'nivel_2', 'senior'];
      let totalMarcados = 0;
      categorias.forEach(function (cat) {
        const obj = JSON.parse(localStorage.getItem('obi_checklist_' + cat) || '{}');
        if (obj && typeof obj === 'object') {
          totalMarcados += Object.keys(obj).filter(function (k) { return Boolean(obj[k]); }).length;
        }
      });

      if (totalMarcados > 0) {
        elSubChecklist.textContent = totalMarcados + ' tópico(s) concluído(s) na sua trilha';
      }
    } catch (e) {}
  }

  const elSubPolo = document.getElementById('subtexto-polo-home');
  const elLinkEscola = document.getElementById('link-escola-home');
  try {
    const protocolo = localStorage.getItem('obi_protocolo_atual');
    const solicitacao = localStorage.getItem('obi_quiz_respostas');
    if (protocolo && solicitacao && solicitacao.includes('solicitacao_escola')) {
      if (elSubPolo) {
        elSubPolo.textContent = 'Protocolo ativo: ' + protocolo + ' (Ver Comprovante)';
      }
      if (elLinkEscola) {
        elLinkEscola.href = 'telas/tela-11-confirmacao-polo/index.html';
      }
    }
  } catch (e) {}
}

document.addEventListener('DOMContentLoaded', function () {
  atualizarCartaoAgora();
  sincronizarEstadoDoUsuario();

  // Acessibilidade semântica nos links de navegação da gaveta de telas
  const cards = document.querySelectorAll('a.screen-link-card');
  cards.forEach(function (card) {
    card.setAttribute('role', 'link');
  });
});
