const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const memory={};
function context(){const c={window:{},localStorage:{getItem:k=>memory[k]||null,setItem:(k,v)=>memory[k]=v,removeItem:k=>delete memory[k]},document:{addEventListener(){},querySelectorAll:()=>[],querySelector:()=>null,getElementById:()=>null},setTimeout(){}};vm.createContext(c);vm.runInContext(fs.readFileSync('assets/js/study-data.js','utf8'),c);return c;}
const ctx=context(),dados=ctx.window.OBIEstudos;
assert.equal(Object.keys(dados.categorias).length,8);
for(const [cat,d] of Object.entries(dados.categorias)){
 assert.ok(d.topicos.length>=5);assert.equal(new Set(d.topicos.map(t=>t.id)).size,d.topicos.length);
 assert.ok(d.topicos.every(t=>t.titulo&&t.explicacao));assert.ok(d.pratica.startsWith('https://olimpiada.ic.unicamp.br/'));
 memory[dados.chave(cat)]='{invalid';assert.equal(dados.concluidos(cat),0);
 memory[dados.chave(cat)]=JSON.stringify({[d.topicos[0].id]:true,ghost:true});assert.equal(dados.concluidos(cat),1);
}
assert.equal(new Set(Object.keys(dados.categorias).map(dados.chave)).size,8);
for(const [small,large] of [['prog_mirim','prog_jr'],['prog_jr','nivel_1'],['nivel_1','nivel_2'],['nivel_2','senior']])for(const t of dados.categorias[small].topicos)assert.ok(dados.categorias[large].topicos.some(v=>v.id===t.id));
for(const [code,cat] of Object.entries(dados.categoriaDoNivel)){
 const link={},c=context();c.document.getElementById=id=>id==='link-trilha-resultado'?link:null;
 c.obterRespostas=()=>({ano_escolar:'ef_8'});c.calcularModalidadeOBI=()=>({nivelCodigo:code});
 vm.runInContext(fs.readFileSync('telas/tela-09-resultado-nivel/script.js','utf8'),c);c.inicializarResultadoNivel();
 assert.equal(link.href,'../tela-03-checklist/index.html?cat='+cat);
}
const links={};for(const id of ['link-pratica-oficial','link-ementa','recursos-programacao','cat-descricao-texto','nota-trilha'])links[id]={setAttribute(){}};
ctx.document.getElementById=id=>links[id]||null;
vm.runInContext(fs.readFileSync('telas/tela-03-checklist/script.js','utf8'),ctx);
for(const [cat,d] of Object.entries(dados.categorias)){ctx.selecionarCategoria(cat);assert.equal(links['link-pratica-oficial'].href,d.pratica);assert.equal(links['link-ementa'].href,d.ementa);assert.equal(links['recursos-programacao'].hidden,d.iniciacao||cat==='prog_mirim');}
ctx.selecionarCategoria('iniciacao');assert.ok(links['cat-descricao-texto'].textContent.startsWith('Iniciação Nível 1'));
console.log('PASS: oito níveis, ementa cumulativa, progresso isolado, dados inválidos, links e oito resultados do quiz.');
