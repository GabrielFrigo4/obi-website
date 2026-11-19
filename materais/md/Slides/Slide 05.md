# Slide 05

> **Documento Original:** `Slides/Slide 05.pdf`  
> **Categoria:** Slides  
> **Tipo de Mídia:** Apresentação de Slides  
> **Total de Slides:** 36  
> **Compilado em:** `2026-11-04 03:18:20 UTC`  
> **Hash SHA-256:** `fac2654f52d6cc9b362cf687afa587c54f57e7f12e6f7c985e1f2329f177f428`  

---

## Sumário de Slides

- [Slide 1: AULA 1 DE 2: Acessibilidade e Desenho Universal no Desenvolvimento de Sistemas Computacionais](#slide-1)
- [Slide 2: Tecnologia Assistiva e Acessibilidade](#slide-2)
- [Slide 3: 1.1 · Visão Social da Deficiência](#slide-3)
- [Slide 4: 1.2 · TECNOLOGIA ASSISTIVA (TA)](#slide-4)
- [Slide 5: Exemplo de Tecnologia Assistiva: Leitor de Tela (NVDA / TalkBack / Orca)](#slide-5)
- [Slide 6: Exemplo de Tecnologia Assistiva: Tradutor VLibras para Textos em Libras](#slide-6)
- [Slide 7: Exemplo de Tecnologia Assistiva: Acessibilidade em Aplicativos Móveis (Smartphone)](#slide-7)
- [Slide 8: Exemplo: botoeira de travessia acessível](#slide-8)
- [Slide 9: O LIMITE DA TA ISOLADA: Sozinha, a TA não deve ser reativa e segregada.](#slide-9)
- [Slide 10: 1.3 · ACESSIBILIDADE: Qualquer pessoa usa, com autonomia e segurança](#slide-10)
- [Slide 11: POR QUE IMPORTA: Pessoas, negócios e sociedade](#slide-11)
- [Slide 12: 1.3 · Acessibilidade: Barreiras que Afetam o Acesso](#slide-12)
- [Slide 13: FATORES ENVOLVIDOS · 7 COMPONENTES](#slide-13)
- [Slide 14: Os Sete Componentes da Web Acessível · 1 a 3: O Conteúdo e Como Ele É Acessado](#slide-14)
- [Slide 15: Os Sete Componentes da Web Acessível · 4 a 7: As Pessoas e as Ferramentas](#slide-15)
- [Slide 16: Como Fazer: Como a Web se Torna Acessível](#slide-16)
- [Slide 17: Exemplo 1: Texto Alternativo em Imagens](#slide-17)
- [Slide 18: Exemplo 2: Tudo Deve Funcionar pelo Teclado](#slide-18)
- [Slide 19: Exemplo 3: Alternativas para Áudio e Vídeo](#slide-19)
- [Slide 20: Avaliar: Como Saber se Está Acessível](#slide-20)
- [Slide 21: ATIVIDADE · 4 MINUTOS, EM DUPLAS](#slide-21)
- [Slide 22: PARA CONTINUAR: Recursos do W3C WAI](#slide-22)
- [Slide 23: 1.4 · Desenho Universal (DU): Projetar para o Maior Número de Pessoas, Desde o Início](#slide-23)
- [Slide 24: Da Desigualdade ao Desenho Universal](#slide-24)
- [Slide 25: Desenho Universal](#slide-25)
- [Slide 26: 1.4 · DESENHO UNIVERSAL: Definição](#slide-26)
- [Slide 27: Utopia?: A Utopia Está lá no Horizonte (Eduardo Galeano)](#slide-27)
- [Slide 28: 1.4 · Desenho Universal: Os 7 Princípios Fundamentais](#slide-28)
- [Slide 29: Estudo de Caso: Jogo Breu — Ataque das Sombras (Desenho Universal em Games)](#slide-29)
- [Slide 30: DEBO · 1. Entendendo o Jogo: O Breu Tem o Design Universal?](#slide-30)
- [Slide 31: DEBO · 3. CRITÉRIOS DE ACESSIBILIDADE](#slide-31)
- [Slide 32: 1.4 · Desenho Universal: Aplicação Prática dos 7 Princípios](#slide-32)
- [Slide 33: 1.4 · ACESSÍVEL × UNIVERSAL: Acessível para alguns × universal para todos](#slide-33)
- [Slide 34: Dúvidas e Discussão: Aprofundamento em Acessibilidade e Desenho Universal](#slide-34)
- [Slide 35: Síntese do Módulo 1: Como os Quatro Conceitos se Encadeiam](#slide-35)
- [Slide 36: Referencial Teórico: Referência Bibliográfica](#slide-36)

---

<a id="slide-1"></a>

## Slide 1: AULA 1 DE 2: Acessibilidade e Desenho Universal no Desenvolvimento de Sistemas Computacionais

INTERAÇÃO HUMANO-COMPUTADOR · AULA 1 DE 2


Acessibilidade e Desenho Universal no
Desenvolvimentode Sistemas
Computacionais
Parte 1: Fundamentos, Diretrizes e Estudos de Caso
Profa. Juliana Braga


Graduação em Ciência da Computação · UFABC


---

<a id="slide-2"></a>

## Slide 2: Tecnologia Assistiva e Acessibilidade

Tecnologia Assistiva e Acessibilidade


---

<a id="slide-3"></a>

## Slide 3: 1.1 · Visão Social da Deficiência

1 . 1 · V I S Ã O SOCIAL D A D E F I C I Ê N C I A


A deficiência nasce da interação com as barreiras


                                                          NA ENGENHARIA DE SOFTWARE
A deficiência não é uma limitação biológica intrínseca
do indivíduo. É o resultado da interação entre o corpo    O sistema não falha porque o usuário tem uma
da pessoa e as barreiras do ambiente físico ou digital.   limitação. Falha porque foi projetado com
                                                          barreiras de código e de interface.
No Brasil, essa visão é amparada pela Lei Brasileira de
Inclusão (LBI).
                                                          A responsabilidade passa do usuário para quem projeta.


---

<a id="slide-4"></a>

## Slide 4: 1.2 · TECNOLOGIA ASSISTIVA (TA)

1.2 · TECNOLOGIA ASSISTIVA (TA)


Recurso s que am p liam , co m p ensam o u neutralizam
lim itaçõ es
Categoria                             Exemplos de hardware e software
Leitores e ampliadores de tela        NVDA, JAWS, TalkBack, VoiceOver, ZoomText, linha
(deficiência visual)                  Braille
Dispositivos de entrada               Mouse ocular, mouse por sopro, acionador de botão
adaptados (deficiência motora)        único, teclado virtual com varredura
Tradução e comunicação                Livox, ARAWORD, avatares de Libras (Hand Talk,
alternativa (deficiência auditiva e   VLibras), sintetizadores de voz
cognitiva)


---

<a id="slide-5"></a>

## Slide 5: Exemplo de Tecnologia Assistiva: Leitor de Tela (NVDA / TalkBack / Orca)

**Tecnologia Assistiva: Leitores de Tela e Voz Sintética**

- Demonstração do funcionamento de leitores de tela em sistemas operacionais e navegadores (NVDA, JAWS, Orca no Linux e TalkBack no Android).
- Elementos-chave para navegabilidade:
  - Estrutura hierárquica semântica (`<h1>` a `<h6>`).
  - Textos alternativos (`alt="..."`) em imagens informativas e `aria-hidden="true"` em ícones decorativos.
  - Regiões semânticas (`<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`).
  - Anúncios dinâmicos de mudanças de estado com `aria-live="polite"`.

> 💡 **Diretriz de IHC:** Projetar para leitor de tela não é adicionar recursos especiais, mas escrever HTML5 semântico nativo e acessível.


---

<a id="slide-6"></a>

## Slide 6: Exemplo de Tecnologia Assistiva: Tradutor VLibras para Textos em Libras

**Tecnologia Assistiva: Tradução Automática e Vídeos em Libras (VLibras)**

- Tutorial e caso prático de uso do VLibras (avatar virtual 3D para tradução de conteúdos web para a Língua Brasileira de Sinais).
- Compromisso social de inclusão de pessoas surdas em espaços educacionais e culturais.
- Importância de compatibilidade do código web com plugins de acessibilidade digital.

> 💡 **Diretriz de IHC:** Pessoas surdas frequentemente têm a Língua de Sinais como primeira língua (L1) e o português escrito como segunda língua (L2). Textos concisos, diretos e suporte a Libras ampliam a comunicabilidade.


---

<a id="slide-7"></a>

## Slide 7: Exemplo de Tecnologia Assistiva: Acessibilidade em Aplicativos Móveis (Smartphone)

**Tecnologia Assistiva em Dispositivos Móveis (Smartphone)**

- Ecossistema de acessibilidade em smartphones: navegação por toque assistido, zoom na tela, inversão de cores e controle por voz.
- Telas de aplicativos cotidianos (INSS, WhatsApp, Uber, Apps Educacionais):
  - Alvos de toque ergonômicos mínimos de 48px x 48px.
  - Espaçamento confortável entre cards clicáveis.
  - Alto contraste de cor entre texto e plano de fundo.

> 💡 **Diretriz de IHC:** No ambiente mobile, o design universal beneficia tanto pessoas com deficiências permanentes quanto usuários em contextos de mobilidade (ex.: luz solar forte, uso com apenas uma mão no transporte público).


---

<a id="slide-8"></a>

## Slide 8: Exemplo: botoeira de travessia acessível

Exemplo: botoeira de travessia acessível

                                 Texto claro, placa, luzes e contador numérico indicam a ação e o tempo
                  Visual         de travessia.


                                 Sinais sonoros intermitentes mudam de ritmo conforme o tempo
                  Auditivo       restante.


                                 Seta e botão em relevo indicam a direção e onde interagir; a seta vibra
                  Tátil          quando a travessia é liberada.


                  A mesma mensagem essencial, “é seguro atravessar”, chega a pessoas com
                  diferentes perfis sensoriais (princípio 4: informação perceptível).


---

<a id="slide-9"></a>

## Slide 9: O LIMITE DA TA ISOLADA: Sozinha, a TA não deve ser reativa e segregada.

O LIMITE DA TA ISOLADA


Sozinha, a TA não deve ser reativa e segregada.

  Reativa                                            Segregada
  O que significa: não deve ser usada para agir      O que significa: não deve ser usada tratar a
  apenas depois que o problema ou a barreira já      pessoa com deficiência de forma isolada ou
  existe.                                            diferenciada do restante do grupo.
  Na prática: em vez de planejar um produto, aula,   Na prática: em vez de todos usarem a mesma
  sistema ou ambiente acessível desde o início,      plataforma ou material, a pessoa com deficiência
  constrói-se algo inacessível e só se busca uma     recebe um material diferente ou precisa ir para um
  “solução” de emergência quando uma pessoa com      espaço separado para usar sua ferramenta
  deficiência encontra dificuldades.                 assistiva.


---

<a id="slide-10"></a>

## Slide 10: 1.3 · ACESSIBILIDADE: Qualquer pessoa usa, com autonomia e segurança

1.3 · ACESSIBILIDADE


Qualquer pessoa usa, com autonomia e segurança
Acessibilidade é a qualidade de um software ou interface que permite a qualquer pessoa:


  Perceber                     Compreender                  Navegar                       Interagir


       Em IHC, é um requisito não funcional de qualidade indispensável. Mas como transformar isso em funcionalidade?


---

<a id="slide-11"></a>

## Slide 11: POR QUE IMPORTA: Pessoas, negócios e sociedade

POR QUE IMPORTA


Pessoas, negócios e sociedade
A web é essencial para educação, trabalho, governo, comércio, saúde e lazer.


   Direitos humano                             Negócio                                    Lei
   A Convenção da ONU sobre os Direitos das   Melhora a experiência de uso, impulsiona   Exigida por lei em muitos países. No Brasil,
   Direitos das Pessoas com Deficiência       impulsiona a inovação e amplia o alcance   a Lei Brasileira de Inclusão (Lei
   reconhece o acesso às tecnologias de       alcance de mercado.                        13.146/2015, art. 63) obriga sites de
   de informação, incluindo a web, como                                                  empresas e do governo a serem acessíveis.
   como direito humano básico.


Introdução à Acessibilidade Web · 07


---

<a id="slide-12"></a>

## Slide 12: 1.3 · Acessibilidade: Barreiras que Afetam o Acesso

1.3 · ACESSIBILIDADE


Barreiras que afetam o acesso
   Barreiras Auditivas                  Alta Carga Cognitiva                         Neurológicas
   Surdez ou baixa audição: áudio sem   Memória, atenção, leitura: textos confusos   Ex.: epilepsia fotossensível: conteúdo
   legenda ou transcrição (LIBRAS)      e fluxos longos excluem                      piscando pode causar crises


   Barreiras Físicas                    De Comunicação                               Barreiras Visuais
   Mobilidade nas mãos: quem não usa    Serviços que só aceitam comando de voz       Cegueira, baixa visão, daltonismo: imagens
   mouse depende do teclado ou da voz   deixam pessoas de fora                       sem texto e baixo contraste excluem
   voz


Introdução à Acessibilidade Web · 05


---

<a id="slide-13"></a>

## Slide 13: FATORES ENVOLVIDOS · 7 COMPONENTES

FATORES ENVOLVIDOS · 7 COMPONENTES

A multiplicidade e a diversidade de fatores
Para que a acessibilidade na web seja alcançada, é necessário que vários componentes estejam trabalhando adequadamente em conjunto. A W3C-WAI
[9] identifica sete componentes:


QUEM CRIA · produz e verifica                                                                          QUEM USA · acessa o conteúdo

        Desenvolvedores                                            1      Conteúdo                              Navegadores
   5                                                                                                       2
        Designers, codificadores e autores, inclusive PcD                                                       Tocadores de conteúdo multimídia e outros agentes
                                                               A informação contida numa página ou
        PcD que desenvolvem e usuários que contribuem                                                           do usuário.
                                                               aplicação web, incluindo:
        contribuem com conteúdo.


        Ferramentas de autoria                                                                                  Tecnologia assistiva
   6                                                                                                       3
        Softwares usados para criar sítios web (authoring          Informação natural                           Para pessoas com deficiência e mobilidade
        (authoring tools).                                                                                      reduzida: leitores e ampliadores de tela, teclados
                                                                   texto, imagem e áudio
                                                                                                                alternativos.


        Ferramentas de avaliação                                                                                Conhecimento do usuário
   7                                                               Código ou marcação                      4
        Avaliadores de acessibilidade e validadores de                                                          Experiência e, em alguns casos, estratégias
                                                                   define a estrutura, a forma de
        HTML e CSS, entre outros.                                                                               adaptativas para usar a web.
                                                                   apresentação etc.


Fonte: W3C-WAI [9], Componentes Essenciais da Acessibilidade Web                                                                                                     08


---

<a id="slide-14"></a>

## Slide 14: Os Sete Componentes da Web Acessível · 1 a 3: O Conteúdo e Como Ele É Acessado

OS SETE COMPONENTES · 1 A 3


O conteúdo e como ele é acessado
   1                                                     2                                         3
   Conteúdo                                              Navegadores                               Tecnologia assistiva
   A informação contida numa página ou                   Navegadores, tocadores de conteúdo        Usada por pessoas com deficiência e
   ou aplicação web, incluindo:                          multimídia e outros agentes do usuário.   mobilidade reduzida: leitores de tela,
    • a informação natural, como texto,                                                            ampliadores de tela, teclados alternativos,
      imagem e áudio;                                                                              entre outros.
    • o código ou marcação, que define a
      estrutura, a apresentação etc.


Fonte: W3C-WAI, Componentes Essenciais da Acessibilidade Web · 09


---

<a id="slide-15"></a>

## Slide 15: Os Sete Componentes da Web Acessível · 4 a 7: As Pessoas e as Ferramentas

OS SETE COMPONENTES · 4 A 7


As pessoas e as ferramentas
   4 Conhecimento do usuário                                             5 Desenvolvedores
   O conhecimento, a experiência e, em alguns casos, as estratégias      Designers, codificadores, autores, entre outros, incluindo
   adaptativas de cada pessoa para usar a web.                           desenvolvedores com deficiência e usuários que contribuem com
                                                                         conteúdo.


   6 Ferramentas de autoria                                              7 Ferramentas de avaliação
   Softwares usados para criar sítios web (authoring tools): editores,   Avaliadores de acessibilidade web, validadores de HTML e de CSS,
   CMS, plataformas.                                                     de CSS, entre outras.


Fonte: W3C-WAI, Componentes Essenciais da Acessibilidade Web · 10


---

<a id="slide-16"></a>

## Slide 16: Como Fazer: Como a Web se Torna Acessível

COMO FAZER


Como a web se torna acessível
Peças que precisam funcionar juntas
                                                                    Padrões do W3C WAI
  1 Tecnologias web (HTML, CSS, ARIA)
                                                                    WCAG · conteúdo web. Versão atual: 2.2. A 2.0 também é a norma
                                                                    ISO/IEC 40500
  2 Navegadores e tecnologias assistivas
                                                                    ATAG · ferramentas de autoria

                                                                    UAAG · navegadores e agentes de usuário
  3 Ferramentas de autoria (CMS, editores)
                                                                    WAI-ARIA · aplicações web ricas

  4 Sites e conteúdos que nós criamos


    Pense em acessibilidade desde o início do projeto: é mais fácil do que corrigir depois.


Introdução à Acessibilidade Web · 11


---

<a id="slide-17"></a>

## Slide 17: Exemplo 1: Texto Alternativo em Imagens

EXEMPLO 1


Texto alternativo em imagens
Toda imagem que informa precisa de um texto alternativo
equivalente no código.                                    <!-- Ruim: sem alternativa -->
                                                          <img src="grafico.png">
Quem se beneficia
                                                          <!-- Bom: equivalente em texto -->
 • Pessoas cegas, com leitores de tela
                                                          <img src="grafico.png"
 • Quem desativa imagens para economizar dados             alt="Matrículas por ano,
 • Mecanismos de busca                                     maior valor em 2024"
                                                          >


                                                          <!-- Decorativa: alt vazio -->
                                                          <img src="enfeite.svg" alt="">


Introdução à Acessibilidade Web · 12


---

<a id="slide-18"></a>

## Slide 18: Exemplo 2: Tudo Deve Funcionar pelo Teclado

EXEMPLO 2


Tudo deve funcionar pelo teclado
   Tab                                    Shift+Tab           Enter                              Setas

Próximo elemento                       Elemento anterior   Ativar links e botões              Mover em menus e listas


   Ruim                                                       Bom
   <div onclick="enviar()">                                   <button type="submit">
    Enviar                                                     Enviar
   </div>                                                     </button>

   Não recebe foco e não responde ao teclado                  Focável, acionável pelo teclado e anunciado como botão


Introdução à Acessibilidade Web · 13


---

<a id="slide-19"></a>

## Slide 19: Exemplo 3: Alternativas para Áudio e Vídeo

EXEMPLO 3


Alternativas para áudio e vídeo
Assim como imagens, o áudio precisa de um equivalente em texto. Transcrições alcançam pessoas surdas ou com baixa
audição, e também os mecanismos de busca.


   Transcrição                                 Legendas                                 Audiodescrição
   Texto completo de podcasts, entrevistas e   Falas e sons importantes sincronizados   Narra o que só aparece na imagem, para
   entrevistas e aulas gravadas, Libras        com o vídeo                              quem não enxerga


Introdução à Acessibilidade Web · 14


---

<a id="slide-20"></a>

## Slide 20: Avaliar: Como Saber se Está Acessível

AVALIAR


Como saber se está acessível
    1 Avalie cedo e sempre
         Desde o início do projeto e durante todo o desenvolvimento, não só no fim


    2 Faça verificações rápidas
          Algumas checagens simples dá para fazer no próprio navegador: teclado, zoom, textos alternativos


    3     Ferramentas ajudam, não decidem
          Nenhuma ferramenta automática, sozinha, diz se um site é acessível: é preciso avaliação humana especializada


Introdução à Acessibilidade Web · 15


---

<a id="slide-21"></a>

## Slide 21: ATIVIDADE · 4 MINUTOS, EM DUPLAS

ATIVIDADE · 4 MINUTOS, EM DUPLAS


O teste d o teclad o
Escolham um site que vocês usam (ex.: [site da universidade]). Tirem a mão do mouse.


    Tentem                                                        Observem
    1. Chegar ao conteúdo principal                                • Vocês sempre veem onde está o foco?
    2. Abrir o menu e escolher um item                             • Algo ficou impossível de alcançar?
    3. Fazer uma busca ou enviar um formulário                     • A ordem de navegação faz sentido?


Introdução à Acessibilidade Web · 16


---

<a id="slide-22"></a>

## Slide 22: PARA CONTINUAR: Recursos do W3C WAI

PARA CONTINUAR


Recursos do W3C WAI
  Recurso                                                  Endereço

  Intro d ução à A cessibilid ad e Web                     w3.o rg /WA I/fund am entals/accessibility- intro /p t- BR

  C om o pessoas co m d eficiência usam a web              w3.o rg /WA I/p eop le- use- web

  Verificaçõ es fáceis                                     w3.o rg /WA I/test- evaluate/p relim inary

  C om o atend er às W C A G (referência ráp id a)         w3.o rg /WA I/W C A G 22/q uickref

  C urso g ratuito: Fund am entos d e A cessib ilid ad e   w3.o rg /WA I/co urses/fo und atio ns- course
  D ig ital


    Para a próxima aula: escolha um projeto seu e faça as verificações fáceis.


Introdução à Acessibilidade Web · 17


---

<a id="slide-23"></a>

## Slide 23: 1.4 · Desenho Universal (DU): Projetar para o Maior Número de Pessoas, Desde o Início

1.4 · DESENHO UNIVERSAL (DU)


Projetar para o maior número de pessoas, desde o início


                                                                     TECNOLOGIA ASSISTIVA
O Desenho Universal propõe conceber produtos e softwares             Reativa · individual
utilizáveis pelo maior número possível de pessoas, sem necessidade
de adaptações posteriores.
                                                                     DESENHO UNIVERSAL
Também chamado de Design for All ou Universal Access.
                                                                     Proativo · abrangente


---

<a id="slide-24"></a>

## Slide 24: Da Desigualdade ao Desenho Universal

Da Desigualdade ao Desenho Universal
 1.4 · DESENHO UNIVERSAL


                                                                  Cada pessoa está em condições diferentes, sem nenhum
                               Desigualdade                       apoio.


                                                                  Todos recebem o mesmo recurso, sem considerar as
                               Igualdade                          diferenças.


                               Equidade                           Cada pessoa recebe o apoio de que precisa.


                                                                  O ambiente já nasce acessível: a cerca transparente dispensa
                               Desenho Universal                  adaptações.


                           Imagem: publicação de @profrodrigogondim (Instagram).


---

<a id="slide-25"></a>

## Slide 25: Desenho Universal

Desenho Universal


---

<a id="slide-26"></a>

## Slide 26: 1.4 · DESENHO UNIVERSAL: Definição

1.4 · DESENHO UNIVERSAL


Definição

        É a concepção de produtos, ambientes,
    programas e serviços para que possam ser
        usados por todas as pessoas, na maior
        medida possível, sem a necessidade de
                adaptação ou projeto específico


---

<a id="slide-27"></a>

## Slide 27: Utopia?: A Utopia Está lá no Horizonte (Eduardo Galeano)

Utopia?

"A utopia está lá no horizonte. Me aproximo dois passos,
ela se afasta dois passos. Caminho dez passos e o
horizonte corre dez passos. Por mais que eu caminhe,
jamais alcançarei. Para que serve a utopia? Serve para
isso: para que eu não deixe de caminhar.“ Eduardo
Galeano.


---

<a id="slide-28"></a>

## Slide 28: 1.4 · Desenho Universal: Os 7 Princípios Fundamentais

1.4 · DESENHO UNIVERSAL


Os 7 princípios

 1                          2                              3                                4
 Uso equitativo             Flexibilidade no uso           Uso simples e intuitivo          Informação
 O mesmo meio de uso para   Várias formas de realizar a                                     perceptível
 todas as pessoas           mesma tarefa                   Fácil de entender, sem           Comunica por mais de um
                                                           depender de experiência prévia   sentido


 5                          6                              7
 Tolerância ao erro         Baixo esforço físico           Tamanho e espaço
 Minimiza riscos e          Uso eficiente, confortável e   Alcance e manipulação
 consequências de ações     com pouca fadiga               adequados para qualquer corpo
 acidentais


---

<a id="slide-29"></a>

## Slide 29: Estudo de Caso: Jogo Breu — Ataque das Sombras (Desenho Universal em Games)

**Estudo de Caso: Jogo Breu — Ataque das Sombras**

- Demonstração de jogo digital projetado sob a ótica do Desenho Universal.
- Integração de estímulos sonoros tridimensionais, contraste visual reforçado e controles simplificados.
- Permite que jogadores videntes, com baixa visão e cegos disputem em igualdade de condições.

> 💡 **Diretriz de IHC:** O Desenho Universal não segrega: cria uma única experiência flexível e compartilhada por todos.


---

<a id="slide-30"></a>

## Slide 30: DEBO · 1. Entendendo o Jogo: O Breu Tem o Design Universal?

DEBO · 1. ENTENDENDO O JOGO: O Breu tem o Design Universal?


A ideia central

Em um RPG narrativo, boa parte                                O que isso pode facilitar
da experiência acontece por meio
                                                              Menor dependência de cenas visuais
de textos, escolhas e histórias, e                            complexas, de reflexos rápidos e de
não de gráficos elaborados.                                   computadores com alto desempenho.
                                                              E para quem enxerga?
                                                              E para quem não escuta?
   Importante: “não ter gráficos” não                         E para quem não tem habilidade com
   significa automaticamente “ser                             teclado?
   acessível”.
   O Breu é acessível, segundo relatos


---

<a id="slide-31"></a>

## Slide 31: DEBO · 3. CRITÉRIOS DE ACESSIBILIDADE

DEBO · 3. CRITÉRIOS DE ACESSIBILIDADE


Quatro perguntas para avaliar o jogo

   1. Perceptível                       O conteúdo pode ser percebido por diferentes sentidos e tecnologias assistivas?


   2. Operável                          É possível navegar e jogar sem depender exclusivamente do mouse?


   3. Compreensível                     As regras, as mensagens e as escolhas são claras e previsíveis?


   4. Robusto                           O jogo funciona com leitores de tela, teclado e outras tecnologias assistivas?


---

<a id="slide-32"></a>

## Slide 32: 1.4 · Desenho Universal: Aplicação Prática dos 7 Princípios

1.4 · DESENHO UNIVERSAL


Os 7 princípios

 1                          2                              3                                4
 Uso equitativo             Flexibilidade no uso           Uso simples e intuitivo          Informação
 O mesmo meio de uso para   Várias formas de realizar a                                     perceptível
 todas as pessoas           mesma tarefa                   Fácil de entender, sem           Comunica por mais de um
                                                           depender de experiência prévia   sentido


 5                          6                              7
 Tolerância ao erro         Baixo esforço físico           Tamanho e espaço
 Minimiza riscos e          Uso eficiente, confortável e   Alcance e manipulação
 consequências de ações     com pouca fadiga               adequados para qualquer corpo
 acidentais


---

<a id="slide-33"></a>

## Slide 33: 1.4 · ACESSÍVEL × UNIVERSAL: Acessível para alguns × universal para todos

1.4 · ACESSÍVEL × UNIVERSAL


Acessível para alguns × universal para todos


   Devil’s Bob (DEBO) · 2017                                    Expedição Antártica · 2021
   MMORPG gratuito, baseado em texto e inspirado em Dungeons    Projetado para que pessoas com e sem deficiência joguem o
   & Dragons: troca os gráficos por narrativa, como um RPG de   mesmo jogo: Design Universal.
   mesa, jogado sozinho ou em grupo.


---

<a id="slide-34"></a>

## Slide 34: Dúvidas e Discussão: Aprofundamento em Acessibilidade e Desenho Universal

**Discussão Acadêmica: Transcrição e Resolução de Problemas**

- Discussão sobre representação de problemas, abstração em grafos e acessibilidade cognitiva.
- Síntese pedagógica de como a modelagem teórica se traduz em requisitos claros de interface.

> 💡 **Diretriz de IHC:** Abstrações devem reduzir a carga de trabalho do usuário (*Bastien & Scapin*), simplificando fluxos complexos em passos intuitivos.


---

<a id="slide-35"></a>

## Slide 35: Síntese do Módulo 1: Como os Quatro Conceitos se Encadeiam

SÍNTESE DO MÓDULO 1


Como os quatro conceitos se encadeiam


  Visão social               Acessibilidade           Tecnologia
                                                                           Desenho Universal
  Conscientiza: a barreira   Estabelece o objetivo:
                                                      assistiva
                                                                           Entrega a arquitetura
  é um defeito do            o meta-requisito a       Provê autonomia no
                                                                           inclusiva como padrão
  software                   atingir                  nível individual


---

<a id="slide-36"></a>

## Slide 36: Referencial Teórico: Referência Bibliográfica

REFERENCIAL TEÓRICO


Referência Bibliográfica

ABNT – Associação Brasileira de Normas Técnicas (2022). ABNT NBR 17060: Acessibilidade em aplicativos de dispositivos móveis —
Requisitos. Rio de Janeiro: ABNT.
ABNT – Associação Brasileira de Normas Técnicas (2025). ABNT NBR 17225: Acessibilidade em conteúdo e aplicações web — Requisitos.
Rio de Janeiro: ABNT.
Beda, J. S. L. (2021). Contribuições do Desenho Universal para a Acessibilidade no Ensino Superior. Dissertação de Mestrado, Universidade
Estadual de Campinas (UNICAMP).
Brasil. Ministério do Planejamento, Orçamento e Gestão (2014). eMAG – Modelo de Acessibilidade em Governo Eletrônico, versão 3.1.
Brasília: MP/SLTI.
Cunha, F. F. da (2022). Diretrizes de Desenho Universal aplicadas ao desenvolvimento de jogos RPG educacionais. Dissertação de
Mestrado em Informática, Universidade Federal do ABC (UFABC).
ETSI (2021). EN 301 549 V3.2.1: Accessibility requirements for ICT products and services. European Telecommunications Standards
Institute.
Menezes, K. M. L. (2021). MeTA: Método para Avaliação de Tecnologias Educacionais Acessíveis baseadas no Desenho Universal.
Dissertação de Mestrado em Educação, Universidade Federal do Paraná (UFPR).
Nery, F. da C. (2021). Módulo Configurador de Acessibilidade em Dispositivos Móveis Android. Dissertação de Mestrado, Universidade
Federal do ABC (UFABC).
Oliveira, A. M. de (2021). Acessibilidade e Desenho Universal no Ensino de Ciências. Dissertação de Mestrado, Universidade Federal do
ABC (UFABC).
Pimenta, J. R. O. G. (2023). Acesso Equitativo em Ambientes Computacionais Ubíquos: Instrumento UbiAccess. Dissertação de Mestrado
em Ciência da Computação, Universidade Estadual de Campinas (UNICAMP).
W3C – World Wide Web Consortium (2023). Web Content Accessibility Guidelines (WCAG) 2.2. W3C Recommendation.


---

## 💡 Síntese de Diretrizes Práticas de IHC para o Projeto (Padrão Ouro & AGENTS.md)

1. **Visão Social da Deficiência:** O sistema computacional falha quando impõe barreiras. A responsabilidade de garantir acessibilidade recai integralmente sobre quem projeta e desenvolve.
2. **Os 7 Princípios do Desenho Universal no Protótipo:**
   - *Uso Equitativo:* Mesma interface funciona com teclado, mouse, leitor de tela e toque móvel.
   - *Flexibilidade no Uso:* Alternância dinâmica de tema com botão `[ ◐ Contraste ]` e controle proporcional de zoom de fonte `[ A- | A+ ]`.
   - *Uso Simples e Intuitivo:* Questionário de diagnóstico com 1 pergunta por tela e linguagem acolhedora.
   - *Informação Perceptível:* Razão de contraste mínima de 4.5:1 (e superior a 7:1 em alto contraste) com foco visível `:focus-visible` em anel proeminente.
   - *Tolerância ao Erro:* Validação não-punitiva e persistência segura em `localStorage`.
   - *Baixo Esforço Físico:* Alvos de toque $\ge 48\text{px}$ com área clicável expandida para todo o cartão.
   - *Tamanho e Espaço para Acesso:* Layout responsivo mobile-first otimizado para navegação ergonômica com uma mão (390px a 420px).

