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
      if (!DATA_PROVA_FASE_1) {
        return;
      }

      const dataProva = converterTextoEmData(DATA_PROVA_FASE_1);
      const diasRestantes = calcularDiasRestantes(dataProva);

      document.getElementById('agora-data').textContent = dataProva.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      if (diasRestantes > 0) {
        const textoDias = diasRestantes === 1 ? 'Falta 1 dia' : 'Faltam ' + diasRestantes + ' dias';
        document.getElementById('agora-dias').textContent = textoDias + ' para a prova';
        document.getElementById('agora-dias-item').hidden = false;
        document.getElementById('agora-situacao').textContent = 'prepare-se com calma e confirme a inscrição com sua escola';
      } else if (diasRestantes === 0) {
        document.getElementById('agora-situacao').textContent = 'a prova é hoje';
      } else {
        document.getElementById('agora-situacao').textContent = 'esta prova já aconteceu';
      }
    }

    document.addEventListener('DOMContentLoaded', atualizarCartaoAgora);
