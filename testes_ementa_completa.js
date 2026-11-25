const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const memoria={};const c={window:{},localStorage:{getItem:k=>memoria[k]||null,setItem:(k,v)=>memoria[k]=v}};vm.createContext(c);vm.runInContext(fs.readFileSync('assets/js/study-data.js','utf8'),c);
const e=c.window.OBIEstudos,fonte=JSON.parse(fs.readFileSync('testes/ementa-2026-cobertura.json','utf8'));
assert.equal(fonte.itens.length,134);assert.equal(new Set(fonte.itens.map(t=>t.itemFonte)).size,115);
for(const [cat,permitidos] of Object.entries({prog_mirim:['PM'],prog_jr:['PM','PJ'],nivel_1:['PM','PJ','P1'],nivel_2:['PM','PJ','P1','P2'],senior:['PM','PJ','P1','P2']})){
 const esperados=fonte.itens.filter(t=>permitidos.includes(t.nivelInicial)).map(t=>t.id).sort();
 assert.deepEqual(Array.from(e.categorias[cat].topicos,t=>t.id).sort(),esperados,cat);
 assert.ok(e.categorias[cat].topicos.every(t=>t.explicacao.length>20&&t.secao));
 const key=e.chave(cat);assert.ok(key.includes('_v3_'));
 memoria['obi_checklist_2026_v2_'+cat]=JSON.stringify({PM_1:true});assert.equal(e.concluidos(cat),0);
 memoria[key]=JSON.stringify({[esperados[0]]:true,inexistente:true});assert.equal(e.concluidos(cat),1);
}
assert.ok(e.chave('iniciacao_1').includes('_v2_'));
memoria[e.chave('iniciacao_1')]=JSON.stringify({I1_1:true});assert.equal(e.concluidos('iniciacao_1'),1);
console.log('PASS: todos os 115 itens e 19 subtópicos, nível correto, marcações novas isoladas e progresso de Iniciação preservado.');
// Confere renderização, mudança de nível e marcação sem perder a seção aberta.
class Elemento {
 constructor(tag='div'){this.tag=tag;this.children=[];this.events={};this.attrs={};this.style={};this.classList={toggle(){}};}
 append(...els){this.children.push(...els)} appendChild(el){this.append(el)} replaceChildren(){this.children=[]}
 setAttribute(k,v){this.attrs[k]=v} addEventListener(k,fn){this.events[k]=fn}
}
const nodes={};for(const id of ['lista-conteudos','stat-texto','progress-fill-el','progress-bar-el','cat-descricao-texto','nota-trilha','link-pratica-oficial','link-ementa','recursos-programacao'])nodes[id]=new Elemento();
c.document={addEventListener(){},getElementById:id=>nodes[id]||null,querySelectorAll:()=>[],createElement:tag=>new Elemento(tag)};
vm.runInContext(fs.readFileSync('telas/tela-03-checklist/script.js','utf8'),c);
c.selecionarCategoria('nivel_2');
const secoes=nodes['lista-conteudos'].children;
assert.ok(secoes.length>10);assert.equal(secoes.reduce((n,s)=>n+s.children[1].children.length,0),134);
assert.equal(secoes[0].open,true);
const input=secoes[0].children[1].children[0].children[0].children[0];
input.checked=true;input.events.change();assert.equal(secoes[0].open,true);assert.ok(nodes['stat-texto'].textContent.includes('de 134'));
c.selecionarCategoria('prog_mirim');assert.ok(nodes['stat-texto'].textContent.includes('de 78'));
console.log('PASS: seções expansíveis, 134 controles, marcação e troca de nível.');
