'use strict';
function exibirFeedback(texto) {
 const status = document.getElementById('status-feedback');
 status.className = 'feedback-status visible status-aviso'; status.textContent = texto;
}
function restaurarRespostaSalva() {
 const r = obterRespostas();
 document.getElementById('ano-escolar').value = r.ano_escolar || '';
 document.getElementById('faixa-idade').value = r.faixa_idade || '';
 if (r.ano_escolar && !document.getElementById('ano-escolar').value) exibirFeedback('Atualize seu ano escolar e sua faixa de idade para receber um único nível.');
}
function avancarParaPergunta2() {
 const ano = document.getElementById('ano-escolar'), idade = document.getElementById('faixa-idade');
 const ausente = !ano.value ? ano : !idade.value ? idade : null;
 if (ausente) { exibirFeedback('Selecione seu ano escolar e sua faixa de idade antes de continuar.'); ausente.focus(); return; }
 salvarResposta('ano_escolar', ano.value); salvarResposta('faixa_idade', idade.value);
 window.location.href = '../tela-07-quiz-logica/index.html';
}
document.addEventListener('DOMContentLoaded', function iniciarEscolaridade() {
 restaurarRespostaSalva();
 ['ano-escolar', 'faixa-idade'].forEach(function observar(id) {
  const campo = document.getElementById(id);
  campo.addEventListener('change', function salvarCampo() { salvarResposta(campo.name, campo.value); document.getElementById('status-feedback').textContent = ''; });
 });
 document.getElementById('btn-avancar').addEventListener('click', avancarParaPergunta2);
 document.getElementById('form-pergunta-1').addEventListener('submit', function enviar(e) { e.preventDefault(); avancarParaPergunta2(); });
});
