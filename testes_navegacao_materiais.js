/* Testes sem dependências: node testes_navegacao_materiais.js */
const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
function element() {
 const classes=new Set();
 return {dataset:{},attrs:{},children:[],style:{setProperty(){}},classList:{add(x){classes.add(x);},remove(x){classes.delete(x);},toggle(x,on){on?classes.add(x):classes.delete(x);},contains(x){return classes.has(x);}},
 setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];},appendChild(x){this.children.push(x);},getBoundingClientRect(){return {height:72};},querySelectorAll(){return this.children;}};
}
function run(file,ctx){vm.createContext(ctx);vm.runInContext(fs.readFileSync(file,'utf8'),ctx);return ctx;}
for(const [page,id] of [['tela-04-editais','regras'],['tela-05-kit-monitor','professor'],['tela-10-solicitacao-escola','escola'],['tela-11-confirmacao-polo','escola'],['tela-12-comunidade-extensao','apoio'],['tela-09-resultado-nivel','nivel'],['tela-02-calendario','datas'],['tela-03-checklist','estudos']]) {
 let desktop=true,resize;
 const container=element();
 const ctx={window:{location:{pathname:'/telas/'+page+'/index.html'},matchMedia:()=>({matches:desktop,addEventListener(t,fn){resize=fn;}}),addEventListener(){}},document:{addEventListener(){},querySelector(q){return q==='.mobile-viewport'?container:null;},createElement:element},localStorage:{getItem:()=>null}};
 run('assets/js/utils.js',ctx);ctx.injetarBarraNavegacaoInferior();
 const nav=container.children[0];assert.equal(nav.children.length,8);
 const active=nav.children.filter(a=>a.attrs['aria-current']);assert.equal(active.length,1);assert.equal(active[0].dataset.navId,id);
 assert.equal(nav.children.filter(a=>a.className.includes('desktop-nav-only')).length,3);
 desktop=false;resize();
 assert.equal(nav.children.filter(a=>a.attrs['aria-current']).length,1);
 assert.equal(nav.children.find(a=>a.attrs['aria-current']).dataset.navId,({regras:'estudos',professor:'apoio',escola:'apoio'})[id]||id);
}
require('./testes_trilhas_2026.js');
console.log('PASS: navegação desktop/mobile e materiais dos oito níveis.');
