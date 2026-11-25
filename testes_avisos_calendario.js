const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
class El {
 constructor(){this.value='';this.children=[];this.attrs={};this.dataset={};this.style={};this.classList={toggle(){},add(){},remove(){}};this.rotulo={textContent:'Copiar aviso para WhatsApp'};}
 appendChild(e){this.children.push(e)} append(...els){this.children.push(...els)} replaceChildren(){this.children=[]} setAttribute(k,v){this.attrs[k]=v} removeAttribute(k){delete this.attrs[k]} setCustomValidity(v){this.validacao=v} focus(){} select(){} querySelector(){return this.rotulo} getAttribute(k){return k==='data-copiar'?'aviso':this.attrs[k]}
}
const nodes={};for(const id of ['campo-modalidade','campo-etapa','campo-data-aviso','status-aviso','manual-aviso','mensagem-aviso','periodo-oficial','estado-etapa','fonte-etapa'])nodes[id]=new El();
const botao=new El();const c={window:{},document:{addEventListener(){},getElementById:id=>nodes[id]||null,querySelector:()=>botao,createElement:()=>new El(),createTextNode:t=>({textContent:t})},Intl,Date,Promise,navigator:{}};
vm.createContext(c);for(const p of ['assets/js/calendar-data.js','telas/tela-05-kit-monitor/script.js'])vm.runInContext(fs.readFileSync(p,'utf8'),c);
const cal=c.window.OBICalendario;
const ids=new Set(cal.eventos.map(e=>e.id));assert.equal(ids.size,40);
for(const e of cal.eventos){assert.ok(cal.dataValida(e.inicio));assert.ok(cal.dataValida(e.fim));assert.ok(e.inicio<=e.fim);assert.ok(cal.fontes[e.fonte]);}
for(const [id,inicio,fim] of [['i-escolas','2026-03-06','2026-05-25'],['i-alunos','2026-03-06','2026-05-26'],['p-escolas','2026-03-06','2026-06-06'],['p-alunos','2026-03-06','2026-06-08'],['p-fase1b','2026-06-18','2026-06-19'],['i-folhas2','2026-08-18','2026-08-18'],['resultado-final','2026-10-22','2026-10-22'],['semana-olimpica','2026-12-06','2026-12-12']]){
 const e=cal.eventos.find(e=>e.id===id);assert.equal(e.inicio,inicio);assert.equal(e.fim,fim);
}
assert.equal(cal.estado(cal.obter('iniciacao','i-alunos'),new Date('2026-05-26T20:59:59Z')),'Inscrições abertas');
assert.equal(cal.estado(cal.obter('iniciacao','i-alunos'),new Date('2026-05-26T21:00:00Z')),'Encerrado');
assert.equal(cal.hoje(new Date('2026-05-27T01:00:00Z')),'2026-05-26');
assert.equal(cal.estado(cal.obter('programacao','semana-olimpica'),new Date('2026-11-25T12:00:00Z')),'Em breve');
assert.equal(cal.validarAviso('iniciacao','p-fase1','2026-06-10').valido,false);
assert.equal(cal.validarAviso('programacao','p-fase1','2026-06-13').valido,false);
assert.equal(cal.validarAviso('programacao','p-fase1','2026-06-09').valido,false);
assert.equal(cal.validarAviso('programacao','p-fase1','2026-06-12').valido,true);
assert.equal(cal.validarAviso('programacao','p-fase1b','2026-06-18').valido,true);
assert.equal(cal.validarAviso('programacao','p-fase1','2027-06-10').valido,false);
for(const valor of ['', '2026-02-30','2026-13-01','texto'])assert.equal(cal.validarAviso('iniciacao','i-fase1',valor).valido,false);
assert.equal(cal.dataValida('2028-02-29'),true);assert.equal(cal.dataValida('2026-02-29'),false);
let copies=0;c.copiarTexto=()=>{copies++;return Promise.resolve(true)};
nodes['campo-modalidade'].value='programacao';nodes['campo-etapa'].value='p-fase1';nodes['campo-data-aviso'].value='2026-06-13';
c.aoClicarEmCopiar(botao);assert.equal(copies,0);assert.equal(nodes['campo-data-aviso'].attrs['aria-invalid'],'true');assert.equal(c.montarMensagemAviso(),'');
nodes['campo-data-aviso'].value='2026-06-11';c.aoClicarEmCopiar(botao);assert.equal(copies,1);assert.match(c.montarMensagemAviso(),/11\/06\/2026/);assert.ok(!c.montarMensagemAviso().includes('está chegando'));
nodes['campo-etapa'].value='p-fase3';c.atualizarEtapa();assert.equal(nodes['campo-data-aviso'].min,'2026-10-03');assert.equal(nodes['campo-data-aviso'].max,'2026-10-03');assert.equal(nodes['campo-data-aviso'].readOnly,true);
nodes['campo-etapa'].value='p-fase2';c.atualizarEtapa();assert.equal(nodes['campo-data-aviso'].value,'');assert.equal(nodes['campo-data-aviso'].min,'2026-08-20');assert.equal(nodes['campo-data-aviso'].max,'2026-08-21');assert.equal(nodes['manual-aviso'].hidden,true);
for(const mod of Object.keys(cal.modalidades)){
 nodes['campo-modalidade'].value=mod;c.atualizarOpcoesEtapas();
 for(const opt of nodes['campo-etapa'].children)assert.ok(cal.obter(mod,opt.value));
}
console.log('PASS: fonte única, prazos distintos, datas corrigidas, Brasília, limite das 18h, datas inválidas bloqueadas antes da cópia e mudança de etapa.');
for(const id of ['timeline-container','timeline-complementar','timeline-internacional','calendario-fonte-data'])nodes[id]=new El();
c.document.querySelectorAll=()=>[];
vm.runInContext(fs.readFileSync('telas/tela-02-calendario/script.js','utf8'),c);
for(const mod of Object.keys(cal.modalidades)){
 c.alternarModalidade(mod);
 const cards=['timeline-container','timeline-complementar','timeline-internacional'].flatMap(id=>nodes[id].children);
 assert.equal(cards.length,cal.listar(mod).length);
 for(const card of cards){const e=cal.obter(mod,card.dataset.evento),botao=card.children[3];assert.equal(botao.dataset.agendaInicio,e.inicio);assert.equal(botao.dataset.agendaFim,e.fim);assert.ok(card.children[1].textContent.startsWith(cal.periodo(e)));}
}
console.log('PASS: cartões de três modalidades e eventos da agenda usam exatamente as datas da validação do professor.');
