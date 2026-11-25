'use strict';
var versaoAviso = 0;
var LINKS_DE_TREINO = [{nome:'Exercícios oficiais por modalidade e nível',url:'https://olimpiada.ic.unicamp.br/pratique/'}];
function formatarDataDoAviso(valor) {
  if (!window.OBICalendario.dataValida(valor)) return '';
  const dia = new Intl.DateTimeFormat('pt-BR',{weekday:'long',timeZone:'UTC'}).format(new Date(valor+'T12:00:00Z'));
  return window.OBICalendario.formatar(valor)+' ('+dia+')';
}
function selecaoDoAviso() {
  return {modalidade:document.getElementById('campo-modalidade').value,etapa:document.getElementById('campo-etapa').value,data:document.getElementById('campo-data-aviso').value};
}
function montarMensagemAviso() {
  const c = window.OBICalendario, selecao = selecaoDoAviso();
  const validacao = c.validarAviso(selecao.modalidade,selecao.etapa,selecao.data);
  if (!validacao.valido) return '';
  const e = validacao.evento;
  const prazo = ['prazo','inscricao'].includes(e.tipo);
  const linhas = ['OBI '+c.edicao+' — '+c.modalidades[selecao.modalidade].nome, e.titulo];
  linhas.push(e.tipo === 'evento' ? 'Período oficial: '+c.periodo(e)+'.' : (prazo ? 'Prazo final: ' : 'Data: ')+formatarDataDoAviso(selecao.data)+(e.horaLimite ? ', às '+e.horaLimite+' (Brasília)' : '')+'.');
  if (c.estado(e) === 'Encerrado' || selecao.data < c.hoje()) linhas.push('Esta data já passou. Aviso para consulta do calendário de 2026.');
  linhas.push(e.descricao,'Calendário oficial: '+c.fontes[e.fonte]);
  return linhas.join('\n');
}
function limparEstadoAviso() {
  versaoAviso++;
  const campo = document.getElementById('campo-data-aviso'); campo.removeAttribute('aria-invalid'); campo.setCustomValidity('');
  mostrarStatus('aviso','',false);
  restaurarBotao(document.querySelector('[data-copiar="aviso"]'));
  const manual = document.getElementById('manual-aviso'); manual.hidden = true; manual.value = '';
}
function atualizarPreviaAviso() {
  const mensagem = montarMensagemAviso();
  exibirMensagem('mensagem-aviso',mensagem || 'Selecione uma data dentro do período oficial para gerar o aviso.');
}
function atualizarEtapa() {
  limparEstadoAviso();
  const c = window.OBICalendario, escolha = selecaoDoAviso(), e = c.obter(escolha.modalidade,escolha.etapa);
  const campo = document.getElementById('campo-data-aviso');
  campo.value = ''; campo.readOnly = false;
  if (!e) { campo.disabled = true; atualizarPreviaAviso(); return; }
  campo.disabled = false;
  const limites = c.limitesAviso(e); campo.min = limites.min; campo.max = limites.max;
  if (limites.min === limites.max) { campo.value = limites.min; campo.readOnly = true; }
  document.getElementById('periodo-oficial').textContent = 'Período oficial: '+c.periodo(e)+(e.horaLimite ? ' · prazo final às '+e.horaLimite+' (Brasília)' : '')+'.';
  document.getElementById('estado-etapa').textContent = c.estado(e) === 'Encerrado' ? 'Evento encerrado. O aviso indicará que a data já passou.' : c.estado(e)+'.';
  document.getElementById('fonte-etapa').href = c.fontes[e.fonte];
  atualizarPreviaAviso();
}
function atualizarOpcoesEtapas() {
  const c = window.OBICalendario, modalidade = document.getElementById('campo-modalidade').value;
  const etapas = document.getElementById('campo-etapa'); etapas.replaceChildren();
  const lista = c.listar(modalidade).filter(e=>e.grupo !== 'internacional');
  lista.forEach(function criarOpcao(e) { const opt = document.createElement('option'); opt.value=e.id; opt.textContent=e.titulo+' · '+c.periodo(e); etapas.appendChild(opt); });
  const proxima = lista.find(e=>c.estado(e) !== 'Encerrado') || lista[0];
  if (proxima) etapas.value=proxima.id;
  atualizarEtapa();
}
    function montarMensagemTreino() {
      var linhas = ['Pessoal, aqui estão os exercícios de lógica e programação da OBI:'];
      LINKS_DE_TREINO.forEach(function (item) {
        linhas.push('• ' + item.nome + ': ' + item.url);
      });
      linhas.push('Não deixem de treinar um pouquinho toda semana!');
      return linhas.join('\n');
    }

    function obterUrlDoGuia() {

      return document.getElementById('link-guia').href;
    }

    function montarMensagemGuia() {
      return 'Está em dúvida se sua categoria é Iniciação ou Programação?\n' +
             'Faça o diagnóstico rápido da Central OBI UFABC:\n' +
             obterUrlDoGuia();
    }

    var MENSAGENS = {
      aviso: montarMensagemAviso,
      treino: montarMensagemTreino,
      guia: montarMensagemGuia
    };

    function exibirMensagem(idElemento, texto) {
      var elemento = document.getElementById(idElemento);
      if (!elemento) return;
      elemento.textContent = '';
      texto.split(/(https?:\/\/[^\s]+)/g).forEach(function (parte) {
        if (/^https?:\/\//.test(parte)) {
          var link = document.createElement('a');
          link.href = parte;
          link.textContent = parte;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          elemento.appendChild(link);
        } else {
          elemento.appendChild(document.createTextNode(parte));
        }
      });
    }

    function atualizarMensagens() {
      atualizarPreviaAviso();
      exibirMensagem('mensagem-treino', montarMensagemTreino());
      exibirMensagem('mensagem-guia', montarMensagemGuia());
    }

    function copiarTexto(texto) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(texto).then(
          function () { return true; },
          function () { return copiarComFallback(texto); }
        );
      }
      return Promise.resolve(copiarComFallback(texto));
    }

    function copiarComFallback(texto) {
      var areaTemporaria = document.createElement('textarea');
      areaTemporaria.value = texto;
      areaTemporaria.setAttribute('readonly', '');
      areaTemporaria.style.position = 'fixed';
      areaTemporaria.style.left = '-9999px';
      document.body.appendChild(areaTemporaria);
      areaTemporaria.select();
      var copiou = false;
      try {
        copiou = document.execCommand('copy');
      } catch (erro) {
        copiou = false;
      }
      document.body.removeChild(areaTemporaria);
      return copiou;
    }


    function mostrarStatus(chave, mensagem, ehErro) {
      var status = document.getElementById('status-' + chave);
      if (!status) return;
      status.textContent = mensagem;
      status.classList.toggle('erro', !!ehErro);

    }

    function restaurarBotao(botao) {
      var rotulo = botao.querySelector('.btn-copiar-texto');
      if (botao.dataset.rotuloOriginal) rotulo.textContent = botao.dataset.rotuloOriginal;
      botao.classList.remove('copiado');
    }

    function aoCopiarComSucesso(botao, chave) {
      var rotulo = botao.querySelector('.btn-copiar-texto');
      if (!botao.dataset.rotuloOriginal) botao.dataset.rotuloOriginal = rotulo.textContent;
      botao.classList.add('copiado');
      rotulo.textContent = 'Copiado!';
      mostrarStatus(chave, 'Texto copiado! Agora é só colar no grupo.', false);
    }

    function oferecerCopiaManual(chave, texto) {
      var area = document.getElementById('manual-' + chave);
      area.value = texto;
      area.hidden = false;
      area.focus();
      area.select();
      mostrarStatus(chave, 'Não foi possível copiar automaticamente. O texto está selecionado: use Ctrl+C (ou "Copiar" no menu do celular).', true);
    }

    function aoClicarEmCopiar(botao) {
      var chave = botao.getAttribute('data-copiar');
      restaurarBotao(botao);

      if (chave === 'aviso') {
        const escolha = selecaoDoAviso();
        const validacao = window.OBICalendario.validarAviso(escolha.modalidade,escolha.etapa,escolha.data);
        const campo = document.getElementById('campo-data-aviso');
        if (!validacao.valido) {
          campo.setAttribute('aria-invalid','true'); campo.setCustomValidity(validacao.erro);
          document.getElementById('manual-aviso').hidden = true;
          document.getElementById('manual-aviso').value = '';
          mostrarStatus('aviso',validacao.erro,true); campo.focus(); return;
        }
        campo.removeAttribute('aria-invalid'); campo.setCustomValidity('');
      }

      var texto = MENSAGENS[chave]();
      mostrarStatus(chave, 'Copiando…', false);
      const versaoAoCopiar = versaoAviso;
      copiarTexto(texto).then(function (copiou) {
        if (chave === 'aviso' && versaoAoCopiar !== versaoAviso) return;
        if (copiou) {
          document.getElementById('manual-' + chave).hidden = true;
          aoCopiarComSucesso(botao, chave);
        } else {
          restaurarBotao(botao);
          oferecerCopiaManual(chave, texto);
        }
      });
    }

    document.addEventListener('DOMContentLoaded', function iniciarAreaProfessor() {
      const c = window.OBICalendario;
      document.getElementById('kit-fonte-data').textContent = 'OBI '+c.edicao+' · Datas conferidas em '+c.formatar(c.conferidoEm)+'. Mesma fonte usada na página Calendário.';
      atualizarOpcoesEtapas(); atualizarMensagens();
      document.getElementById('campo-modalidade').addEventListener('change',atualizarOpcoesEtapas);
      document.getElementById('campo-etapa').addEventListener('change',atualizarEtapa);
      document.getElementById('campo-data-aviso').addEventListener('input',function atualizarData() { limparEstadoAviso(); atualizarPreviaAviso(); });
      document.querySelectorAll('[data-copiar]').forEach(function (botao) {
        botao.addEventListener('click',function () { aoClicarEmCopiar(botao); });
      });
    });

    if (typeof window !== 'undefined') {
      window.montarMensagemAviso = montarMensagemAviso;
      window.montarMensagemTreino = montarMensagemTreino;
      window.montarMensagemGuia = montarMensagemGuia;
      window.aoClicarEmCopiar = aoClicarEmCopiar;
      window.exibirMensagem = exibirMensagem;
      window.atualizarMensagens = atualizarMensagens;
    }
