'use strict';
document.addEventListener('DOMContentLoaded', function exibirNiveisEMateriais() {
 const lista = document.getElementById('lista-niveis-materiais');
 Object.entries(window.OBIEstudos.categorias).forEach(function criarNivel([cat, dados]) {
   const li = document.createElement('li'), titulo = document.createElement('strong'), texto = document.createElement('span'), link = document.createElement('a');
   titulo.textContent = dados.titulo; texto.textContent = dados.escolaridade;
   link.className = 'btn-secondary'; link.href = '../tela-03-checklist/index.html?cat=' + cat; link.textContent = 'Estudar ' + dados.titulo;
   li.append(titulo, texto, link); lista.appendChild(li);
 });
});
