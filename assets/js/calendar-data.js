/* OBI 2026. Fontes oficiais conferidas em 25/11/2026.
 * Intervalos inclusivos. Dados compartilhados pelo calendário, agenda e avisos.
 * Os dados são uma cópia conferida; não há atualização automática pela internet.
 */
'use strict';
(function disponibilizarCalendario() {
 const fontes = { importantes: 'https://olimpiada.ic.unicamp.br/calendario/datas_importantes', completo: 'https://olimpiada.ic.unicamp.br/calendario/' };
 const modalidades = { iniciacao: {nome:'Iniciação'}, programacao: {nome:'Programação'}, cf: {nome:'Competição Feminina (CF-OBI)'} };
 const eventos = [
  {
    "id": "i-escolas",
    "titulo": "Cadastro de escolas",
    "inicio": "2026-03-06",
    "fim": "2026-05-25",
    "modalidades": [
      "iniciacao"
    ],
    "tipo": "inscricao",
    "grupo": "principal",
    "descricao": "Cadastro da escola para participação em Iniciação.",
    "horaLimite": null,
    "fonte": "importantes"
  },
  {
    "id": "i-alunos",
    "titulo": "Inscrição de competidores",
    "inicio": "2026-03-06",
    "fim": "2026-05-26",
    "modalidades": [
      "iniciacao"
    ],
    "tipo": "inscricao",
    "grupo": "principal",
    "descricao": "A inscrição do estudante é realizada pela escola. Prazo final às 18h, em Brasília.",
    "horaLimite": "18:00",
    "fonte": "importantes"
  },
  {
    "id": "p-escolas",
    "titulo": "Cadastro de escolas",
    "inicio": "2026-03-06",
    "fim": "2026-06-06",
    "modalidades": [
      "programacao"
    ],
    "tipo": "inscricao",
    "grupo": "principal",
    "descricao": "Cadastro da escola para participação em Programação.",
    "horaLimite": null,
    "fonte": "importantes"
  },
  {
    "id": "p-alunos",
    "titulo": "Inscrição de competidores",
    "inicio": "2026-03-06",
    "fim": "2026-06-08",
    "modalidades": [
      "programacao"
    ],
    "tipo": "inscricao",
    "grupo": "principal",
    "descricao": "A inscrição do estudante é realizada pela escola. Prazo final às 18h, em Brasília.",
    "horaLimite": "18:00",
    "fonte": "importantes"
  },
  {
    "id": "i-fase1",
    "titulo": "Fase 1 — Local",
    "inicio": "2026-05-27",
    "fim": "2026-05-29",
    "modalidades": [
      "iniciacao"
    ],
    "tipo": "prova",
    "grupo": "principal",
    "descricao": "Uma prova no dia e horário definidos pela escola, com duração de uma hora.",
    "horaLimite": null,
    "fonte": "importantes"
  },
  {
    "id": "p-fase1",
    "titulo": "Fase 1 — Local",
    "inicio": "2026-06-10",
    "fim": "2026-06-12",
    "modalidades": [
      "programacao"
    ],
    "tipo": "prova",
    "grupo": "principal",
    "descricao": "Uma prova de duas horas, no dia e horário definidos pela escola. Ambiente das 8h às 21h; início até 19h (Brasília).",
    "horaLimite": null,
    "fonte": "importantes"
  },
  {
    "id": "p-fase1b",
    "titulo": "Fase 1 — Turno B",
    "inicio": "2026-06-18",
    "fim": "2026-06-19",
    "modalidades": [
      "programacao"
    ],
    "tipo": "prova",
    "grupo": "principal",
    "descricao": "Período do Turno B publicado no calendário completo. Prova de duas horas; ambiente das 8h às 21h e início até 19h (Brasília). Confirme sua participação com a escola.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "i-fase2",
    "titulo": "Fase 2 — Estadual",
    "inicio": "2026-08-06",
    "fim": "2026-08-07",
    "modalidades": [
      "iniciacao"
    ],
    "tipo": "prova",
    "grupo": "principal",
    "descricao": "Uma prova no dia e horário definidos pela escola, com duração de uma hora.",
    "horaLimite": null,
    "fonte": "importantes"
  },
  {
    "id": "p-fase2",
    "titulo": "Fase 2 — Estadual",
    "inicio": "2026-08-20",
    "fim": "2026-08-21",
    "modalidades": [
      "programacao"
    ],
    "tipo": "prova",
    "grupo": "principal",
    "descricao": "Dia e horário definidos pela escola. Mirim e Júnior: duas horas; níveis 1, 2 e Sênior: três horas. Consulte a escola sobre o horário de início do seu nível.",
    "horaLimite": null,
    "fonte": "importantes"
  },
  {
    "id": "i-fase3",
    "titulo": "Fase 3 — Nacional",
    "inicio": "2026-09-26",
    "fim": "2026-09-26",
    "modalidades": [
      "iniciacao"
    ],
    "tipo": "prova",
    "grupo": "principal",
    "descricao": "Iniciação Júnior, 1 e 2: das 10h às 12h (Brasília), em sede designada.",
    "horaLimite": null,
    "fonte": "importantes"
  },
  {
    "id": "p-fase3",
    "titulo": "Fase 3 — Nacional",
    "inicio": "2026-10-03",
    "fim": "2026-10-03",
    "modalidades": [
      "programacao"
    ],
    "tipo": "prova",
    "grupo": "principal",
    "descricao": "Mirim, Júnior e Nível 1: das 8h às 12h. Nível 2 e Sênior: das 13h às 18h. Horário de Brasília; prova em sede designada.",
    "horaLimite": null,
    "fonte": "importantes"
  },
  {
    "id": "cf-escolas",
    "titulo": "Prazo de cadastro de escolas — CF-OBI",
    "inicio": "2026-09-08",
    "fim": "2026-09-08",
    "modalidades": [
      "cf"
    ],
    "tipo": "prazo",
    "grupo": "principal",
    "descricao": "Último dia para cadastrar escolas participantes da Competição Feminina.",
    "horaLimite": null,
    "fonte": "importantes"
  },
  {
    "id": "cf-alunas",
    "titulo": "Prazo de inscrição de competidoras — CF-OBI",
    "inicio": "2026-09-09",
    "fim": "2026-09-09",
    "modalidades": [
      "cf"
    ],
    "tipo": "prazo",
    "grupo": "principal",
    "descricao": "Último dia para a escola inscrever as competidoras na CF-OBI.",
    "horaLimite": null,
    "fonte": "importantes"
  },
  {
    "id": "cf-prova",
    "titulo": "Prova da CF-OBI",
    "inicio": "2026-09-11",
    "fim": "2026-09-11",
    "modalidades": [
      "cf"
    ],
    "tipo": "prova",
    "grupo": "principal",
    "descricao": "Mirim, Júnior, Nível 1 e Nível 2. Prova de três horas, em horário definido pela escola. Consulte o horário no calendário oficial.",
    "horaLimite": null,
    "fonte": "importantes"
  },
  {
    "id": "resultado-final",
    "titulo": "Resultado final e quadro de medalhas",
    "inicio": "2026-10-22",
    "fim": "2026-10-22",
    "modalidades": [
      "iniciacao",
      "programacao"
    ],
    "tipo": "resultado",
    "grupo": "principal",
    "descricao": "Data de publicação do resultado final da OBI 2026 e do quadro de medalhas; não é uma data de cerimônia de premiação.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "semana-olimpica",
    "titulo": "Semana Olímpica",
    "inicio": "2026-12-06",
    "fim": "2026-12-12",
    "modalidades": [
      "iniciacao",
      "programacao"
    ],
    "tipo": "evento",
    "grupo": "principal",
    "descricao": "Na Unicamp, em Campinas, para convidados de Iniciação 1 e 2 e Programação Mirim, Júnior, 1 e 2. Período atualizado após adiamento; substitui 30/11 a 05/12.",
    "horaLimite": null,
    "fonte": "importantes"
  },
  {
    "id": "i-caderno1",
    "titulo": "Cadernos da Fase 1 para coordenadores",
    "inicio": "2026-05-26",
    "fim": "2026-05-26",
    "modalidades": [
      "iniciacao"
    ],
    "tipo": "material",
    "grupo": "complementar",
    "descricao": "Disponibilização para impressão pela coordenação local.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "i-gabarito1",
    "titulo": "Cadernos e gabaritos da Fase 1",
    "inicio": "2026-06-15",
    "fim": "2026-06-15",
    "modalidades": [
      "iniciacao"
    ],
    "tipo": "material",
    "grupo": "complementar",
    "descricao": "Publicação no site da OBI.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "p-tarefas1",
    "titulo": "Tarefas e materiais da Fase 1",
    "inicio": "2026-06-17",
    "fim": "2026-06-17",
    "modalidades": [
      "programacao"
    ],
    "tipo": "material",
    "grupo": "complementar",
    "descricao": "Publicação no site da OBI.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "i-pontuacoes1",
    "titulo": "Prazo de envio de pontuações da Fase 1",
    "inicio": "2026-06-19",
    "fim": "2026-06-19",
    "modalidades": [
      "iniciacao"
    ],
    "tipo": "prazo",
    "grupo": "complementar",
    "descricao": "Envio de pontuações ou folhas de respostas pela coordenação.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "resultado1-pre",
    "titulo": "Resultado preliminar da Fase 1",
    "inicio": "2026-06-22",
    "fim": "2026-06-22",
    "modalidades": [
      "iniciacao",
      "programacao"
    ],
    "tipo": "resultado",
    "grupo": "complementar",
    "descricao": "Consulte os resultados oficiais antes de divulgar classificações.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "recorrecao1",
    "titulo": "Prazo de recorreção da Fase 1",
    "inicio": "2026-06-24",
    "fim": "2026-06-24",
    "modalidades": [
      "iniciacao",
      "programacao"
    ],
    "tipo": "prazo",
    "grupo": "complementar",
    "descricao": "Solicitações conforme o procedimento da OBI.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "resultado1-final",
    "titulo": "Resultado final da Fase 1",
    "inicio": "2026-06-26",
    "fim": "2026-06-26",
    "modalidades": [
      "iniciacao",
      "programacao"
    ],
    "tipo": "resultado",
    "grupo": "complementar",
    "descricao": "Publicação do resultado final da etapa.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "i-caderno2",
    "titulo": "Cadernos da Fase 2 para coordenadores",
    "inicio": "2026-08-05",
    "fim": "2026-08-05",
    "modalidades": [
      "iniciacao"
    ],
    "tipo": "material",
    "grupo": "complementar",
    "descricao": "Disponibilização para impressão pela coordenação.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "i-folhas2",
    "titulo": "Prazo de envio das respostas da Fase 2",
    "inicio": "2026-08-18",
    "fim": "2026-08-18",
    "modalidades": [
      "iniciacao"
    ],
    "tipo": "prazo",
    "grupo": "complementar",
    "descricao": "Prazo prorrogado; substitui o prazo inicial de 13/08.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "i-gabarito2",
    "titulo": "Cadernos e gabaritos da Fase 2",
    "inicio": "2026-08-19",
    "fim": "2026-08-19",
    "modalidades": [
      "iniciacao"
    ],
    "tipo": "material",
    "grupo": "complementar",
    "descricao": "Publicação no site da OBI.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "p-tarefas2",
    "titulo": "Tarefas e materiais da Fase 2",
    "inicio": "2026-08-25",
    "fim": "2026-08-25",
    "modalidades": [
      "programacao"
    ],
    "tipo": "material",
    "grupo": "complementar",
    "descricao": "Publicação no site da OBI.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "resultado2-pre",
    "titulo": "Resultado preliminar da Fase 2",
    "inicio": "2026-08-31",
    "fim": "2026-08-31",
    "modalidades": [
      "iniciacao",
      "programacao"
    ],
    "tipo": "resultado",
    "grupo": "complementar",
    "descricao": "Consulte o resultado oficial da etapa.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "recorrecao2",
    "titulo": "Prazo de recorreção da Fase 2",
    "inicio": "2026-09-02",
    "fim": "2026-09-02",
    "modalidades": [
      "iniciacao",
      "programacao"
    ],
    "tipo": "prazo",
    "grupo": "complementar",
    "descricao": "Solicitações conforme o procedimento da OBI.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "resultado2-final",
    "titulo": "Resultado final da Fase 2",
    "inicio": "2026-09-04",
    "fim": "2026-09-04",
    "modalidades": [
      "iniciacao",
      "programacao"
    ],
    "tipo": "resultado",
    "grupo": "complementar",
    "descricao": "Publicação do resultado final da etapa.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "cf-resultado",
    "titulo": "Resultado preliminar da CF-OBI",
    "inicio": "2026-09-15",
    "fim": "2026-09-15",
    "modalidades": [
      "cf"
    ],
    "tipo": "resultado",
    "grupo": "complementar",
    "descricao": "Publicação do resultado preliminar da Competição Feminina.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "cf-recorrecao",
    "titulo": "Prazo de recorreção da CF-OBI",
    "inicio": "2026-09-17",
    "fim": "2026-09-17",
    "modalidades": [
      "cf"
    ],
    "tipo": "prazo",
    "grupo": "complementar",
    "descricao": "Solicitações de recorreção da Competição Feminina.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "i-caderno3",
    "titulo": "Cadernos da Fase 3 para coordenadores",
    "inicio": "2026-09-24",
    "fim": "2026-09-24",
    "modalidades": [
      "iniciacao"
    ],
    "tipo": "material",
    "grupo": "complementar",
    "descricao": "Disponibilização para impressão nas sedes nacionais.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "i-folhas3",
    "titulo": "Prazo de envio das respostas da Fase 3",
    "inicio": "2026-10-06",
    "fim": "2026-10-06",
    "modalidades": [
      "iniciacao"
    ],
    "tipo": "prazo",
    "grupo": "complementar",
    "descricao": "Envio pela coordenação da sede.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "materiais3",
    "titulo": "Cadernos, tarefas e gabaritos da Fase 3",
    "inicio": "2026-10-07",
    "fim": "2026-10-07",
    "modalidades": [
      "iniciacao",
      "programacao"
    ],
    "tipo": "material",
    "grupo": "complementar",
    "descricao": "Materiais das duas modalidades disponíveis no site.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "resultado3-pre",
    "titulo": "Resultado preliminar da Fase 3",
    "inicio": "2026-10-13",
    "fim": "2026-10-13",
    "modalidades": [
      "iniciacao",
      "programacao"
    ],
    "tipo": "resultado",
    "grupo": "complementar",
    "descricao": "Consulte o resultado oficial da etapa.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "recorrecao3",
    "titulo": "Prazo de recorreção da Fase 3",
    "inicio": "2026-10-16",
    "fim": "2026-10-16",
    "modalidades": [
      "iniciacao",
      "programacao"
    ],
    "tipo": "prazo",
    "grupo": "complementar",
    "descricao": "Solicitações conforme o procedimento da OBI.",
    "horaLimite": null,
    "fonte": "completo"
  },
  {
    "id": "egoi",
    "titulo": "EGOI 2026",
    "inicio": "2026-05-12",
    "fim": "2026-05-18",
    "modalidades": [
      "iniciacao",
      "programacao",
      "cf"
    ],
    "tipo": "internacional",
    "grupo": "internacional",
    "descricao": "Competição internacional em Cesenatico, Itália; participação por seleção.",
    "horaLimite": null,
    "fonte": "importantes"
  },
  {
    "id": "oii",
    "titulo": "OII 2026",
    "inicio": "2026-06-20",
    "fim": "2026-06-20",
    "modalidades": [
      "iniciacao",
      "programacao",
      "cf"
    ],
    "tipo": "internacional",
    "grupo": "internacional",
    "descricao": "Prova presencial no Instituto de Computação da Unicamp, para a equipe selecionada.",
    "horaLimite": null,
    "fonte": "importantes"
  },
  {
    "id": "ioi",
    "titulo": "IOI 2026",
    "inicio": "2026-08-09",
    "fim": "2026-08-16",
    "modalidades": [
      "iniciacao",
      "programacao",
      "cf"
    ],
    "tipo": "internacional",
    "grupo": "internacional",
    "descricao": "Competição internacional em Tashkent, Uzbequistão; participação por seleção.",
    "horaLimite": null,
    "fonte": "importantes"
  }
];
 function dataValida(valor) {
   if (!/^\d{4}-\d{2}-\d{2}$/.test(valor || '')) return false;
   const data = new Date(valor + 'T12:00:00Z');
   return Number.isFinite(data.getTime()) && data.toISOString().slice(0,10) === valor;
 }
 function formatar(valor) { return dataValida(valor) ? valor.slice(8,10)+'/'+valor.slice(5,7)+'/'+valor.slice(0,4) : ''; }
 function periodo(evento) { return formatar(evento.inicio) + (evento.inicio === evento.fim ? '' : ' a ' + formatar(evento.fim)); }
 function hoje(agora = new Date()) {
   const partes = new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(agora);
   const valor = tipo => partes.find(p=>p.type===tipo).value;
   return valor('year')+'-'+valor('month')+'-'+valor('day');
 }
 function listar(modalidade) { return eventos.filter(e=>e.modalidades.includes(modalidade)).sort((a,b)=>a.inicio.localeCompare(b.inicio)||a.id.localeCompare(b.id)); }
 function obter(modalidade,id) { return eventos.find(e=>e.id===id && e.modalidades.includes(modalidade)); }
 function estado(evento,agora = new Date()) {
   const dia = hoje(agora);
   if (dia > evento.fim || (dia === evento.fim && evento.horaLimite && agora.getTime() >= new Date(evento.fim+'T'+evento.horaLimite+':00-03:00').getTime())) return 'Encerrado';
   if (dia < evento.inicio) return 'Em breve';
   return evento.tipo === 'inscricao' ? 'Inscrições abertas' : evento.tipo === 'prazo' ? 'Último dia' : 'Em andamento';
 }
 function limitesAviso(evento) { return ['prazo','inscricao'].includes(evento.tipo) ? {min:evento.fim,max:evento.fim} : evento.tipo === 'prova' ? {min:evento.inicio,max:evento.fim} : {min:evento.inicio,max:evento.inicio}; }
 function validarAviso(modalidade,id,data) {
   const evento = obter(modalidade,id);
   if (!evento || evento.grupo === 'internacional') return {valido:false,erro:'Selecione uma modalidade e uma etapa válidas.'};
   if (!dataValida(data)) return {valido:false,erro:'Escolha uma data válida para o aviso.'};
   const limites = limitesAviso(evento);
   if (data < limites.min || data > limites.max) return {valido:false,erro:'A data deve estar entre '+formatar(limites.min)+' e '+formatar(limites.max)+', conforme a etapa escolhida.'};
   return {valido:true,evento};
 }
 window.OBICalendario = {edicao:2026,conferidoEm:'2026-11-25',fonte:fontes.completo,fontes,modalidades,eventos,dataValida,formatar,periodo,hoje,listar,obter,estado,limitesAviso,validarAviso};
})();
