function adicionarEventoAgenda(titulo, dataInicio, dataFim, descricao) {
      const formatarData = function(str) {
        return str.replace(/-/g, '') + 'T120000Z';
      };
      
      const conteudoIcs = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Central OBI UFABC//Calendario Acessivel//PT',
        'BEGIN:VEVENT',
        'SUMMARY:' + titulo,
        'DESCRIPTION:' + descricao,
        'DTSTART:' + formatarData(dataInicio),
        'DTEND:' + formatarData(dataFim),
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([conteudoIcs], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', titulo.toLowerCase().replace(/[^a-z0-9]/g, '_') + '.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    function alternarModalidade(modalidade) {
      const tabIni = document.getElementById('tab-iniciacao');
      const tabProg = document.getElementById('tab-programacao');
      const dataFase1Texto = document.getElementById('data-fase1-texto');

      if (modalidade === 'iniciacao') {
        tabIni.classList.add('active');
        tabIni.setAttribute('aria-selected', 'true');
        tabProg.classList.remove('active');
        tabProg.setAttribute('aria-selected', 'false');
        if (dataFase1Texto) {
          dataFase1Texto.innerHTML = '<span aria-hidden="true">📅</span> 15 de novembro de 2026 (Iniciação Júnior, 1 e 2 - No Papel)';
        }
      } else {
        tabProg.classList.add('active');
        tabProg.setAttribute('aria-selected', 'true');
        tabIni.classList.remove('active');
        tabIni.setAttribute('aria-selected', 'false');
        if (dataFase1Texto) {
          dataFase1Texto.innerHTML = '<span aria-hidden="true">📅</span> 15 de novembro de 2026 (Programação Júnior, 1, 2 e Sênior - No Computador)';
        }
      }

      if (typeof salvarResposta === 'function') {
        salvarResposta('calendario_modalidade_visualizada', modalidade);
      }
    }

    function salvarAvisoLembrete(ativo) {
      localStorage.setItem('obi_lembrete_48h', ativo ? 'true' : 'false');
    }

    function salvarAlertaGeral(ativo) {
      localStorage.setItem('obi_lembrete_todas_fases', ativo ? 'true' : 'false');
    }

    document.addEventListener('DOMContentLoaded', function() {

      const avisoSalvo = localStorage.getItem('obi_lembrete_48h') === 'true';
      const geralSalvo = localStorage.getItem('obi_lembrete_todas_fases') === 'true';
      const switchAviso = document.getElementById('switch-aviso-48h');
      const chkGeral = document.getElementById('chk-alertas-todos');

      if (switchAviso) switchAviso.checked = avisoSalvo;
      if (chkGeral) chkGeral.checked = geralSalvo;

      const respostas = typeof obterRespostas === 'function' ? obterRespostas() : {};
      if (respostas.preferencia === 'logica' || respostas.ano_escolar === 'fundamental_1') {
        alternarModalidade('iniciacao');
      }
    });
