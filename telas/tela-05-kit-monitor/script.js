var URL_CALENDARIO_OBI = 'https://olimpiada.ic.unicamp.br/calendario/datas_importantes';

    var LINKS_DE_TREINO = [
      { nome: 'Provas anteriores da OBI, com correção automática', url: 'https://olimpiada.ic.unicamp.br/pratique/' }
    ];

    function montarMensagemAviso() {
      var campo = document.getElementById('campo-data-fase1');
      var data = campo ? campo.value.trim() : '';
      var textoData = data || '[preencha a data]';
      return 'Atenção, turma! A Fase 1 da OBI está chegando.\n' +
             'A prova será em ' + textoData + '.\n' +
             'Confirmem a inscrição com a sua escola.\n' +
             'Calendário oficial: ' + URL_CALENDARIO_OBI;
    }

    function montarMensagemTreino() {
      var linhas = ['Pessoal, aqui estão os links para praticar algoritmos:'];
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
      exibirMensagem('mensagem-aviso', montarMensagemAviso());
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

    var temporizadores = {};

    function mostrarStatus(chave, mensagem, ehErro) {
      var status = document.getElementById('status-' + chave);
      if (!status) return;
      status.textContent = mensagem;
      status.classList.toggle('erro', !!ehErro);
      clearTimeout(temporizadores[chave]);
      if (!ehErro) {
        temporizadores[chave] = setTimeout(function () { status.textContent = ''; }, 3000);
      }
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
      clearTimeout(botao.temporizadorRotulo);
      botao.temporizadorRotulo = setTimeout(function () { restaurarBotao(botao); }, 2500);
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

      if (chave === 'aviso') {
        var campo = document.getElementById('campo-data-fase1');
        if (!campo.value.trim()) {
          campo.setAttribute('aria-invalid', 'true');
          mostrarStatus('aviso', 'Preencha a data da Fase 1 antes de copiar o aviso.', true);
          campo.focus();
          return;
        }
        campo.removeAttribute('aria-invalid');
      }

      var texto = MENSAGENS[chave]();
      copiarTexto(texto).then(function (copiou) {
        if (copiou) {
          document.getElementById('manual-' + chave).hidden = true;
          aoCopiarComSucesso(botao, chave);
        } else {
          clearTimeout(botao.temporizadorRotulo);
          restaurarBotao(botao);
          oferecerCopiaManual(chave, texto);
        }
      });
    }

    document.addEventListener('DOMContentLoaded', function () {
      atualizarMensagens();

      document.getElementById('campo-data-fase1').addEventListener('input', function (evento) {
        evento.target.removeAttribute('aria-invalid');
        document.getElementById('status-aviso').textContent = '';
        exibirMensagem('mensagem-aviso', montarMensagemAviso());
      });

      document.querySelectorAll('[data-copiar]').forEach(function (botao) {
        botao.addEventListener('click', function () { aoClicarEmCopiar(botao); });
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
