# Atividade 1 Auditoria IHC Grupo

> **Documento Original:** `Atividades/Atividade_1_Auditoria_IHC_Grupo.pdf`  
> **Categoria:** Atividades  
> **Tipo de Mídia:** Documento / Relatório Textual  
> **Total de Páginas:** 9  
> **Compilado em:** `2026-11-04 03:18:20 UTC`  
> **Hash SHA-256:** `562edc73f6b22dbbf79dd80e45393a86fbe8f5daaa9a33e356370ac03493ecbd`  

---

## Sumário de Páginas

- [Página 1: Disciplina: Interação Humano-Computador (IHC A1)](#página-1)
- [Página 2: 2. AUDITORIAS INDIVIDUAIS](#página-2)
- [Página 3: sincronizadas em português nem intérprete de Libras via VLibras ativo em](#página-3)
- [Página 4: cancelamento de pedido possui fluxo labiríntico (Dark Pattern), dificultando a](#página-4)
- [Página 5: 2. AFFORDANCE: - Exemplo clássico abordado na aula: o botão para](#página-5)
- [Página 6: ================================================================================](#página-6)
- [Página 7: silenciosa da sessão: se o aluno passa mais de 20 minutos redigindo um texto](#página-7)
- [Página 8: e a sessão de login expira sem aviso prévio enquanto o aluno digita respostas](#página-8)
- [Página 9: digitados e dificuldade de achar conteúdos recentes. | Autosave local no](#página-9)

---

<a id="página-1"></a>

## Página 1: Disciplina: Interação Humano-Computador (IHC A1)

UFABC - UNIVERSIDADE FEDERAL DO ABC

Disciplina: Interação Humano-Computador (IHC A1)

Docente: Profª / Prof. de IHC Semestre: 2026.3 | Local: Campus Santo André
/ São Bernardo (Sala S-206-0) Atividade: Prática 1 – Auditoria de IHC em
Aplicativos e Compartilhamento de Descobertas Grupo (4 integrantes): 1.
Felipe Junqueira 2. Gabriel 3. Fernanda 4. Lucas Mendes (4º integrante do
grupo)


1. INTRODUÇÃO E OBJETIVO DA PRÁTICA

Nesta primeira atividade prática da disciplina (Unidade 1), nosso grupo aplicou
os conceitos fundamentais de IHC apresentados em aula: - Interface:
Elementos visuais e físicos (cores, tipografia, ícones, layouts) com os quais o
usuário tem contato direto. - Interação: O ciclo contínuo de Ação-Reação entre
o usuário e o sistema (previsibilidade, clareza e agilidade no feedback). -
Affordance: Propriedades visuais do objeto que comunicam imediatamente a
forma de utilização pretendida (ex.: botão que convida ao clique, puxador que
convida ao puxar). - Usabilidade: Eficácia, eficiência e satisfação (rapidez,
navegação intuitiva, tolerância e recuperação de erros). - Acessibilidade e
Desenho Universal: Garantia de acesso pleno e equitativo para pessoas
cegas, surdas, idosas ou com deficiências motoras, apoiado por Tecnologias
Assistivas (TA). - Comunicabilidade: Capacidade da interface de comunicar
de forma transparente o que ela faz, como funciona e como se recuperar de
falhas sem exigir manual.

Para proporcionar uma análise rica e diversificada, cada um dos 4 integrantes
auditou um aplicativo/sistema de relevância cotidiana no Brasil: - Felipe: Portal
Gov.br (Serviços Públicos Digitais) - Gabriel: iFood (Aplicativo de Delivery e E-
commerce) - Fernanda: Itaú (Mobile Banking e Serviços Financeiros) - Lucas:
Moodle UFABC (Ambiente Virtual de Aprendizagem)


---

<a id="página-2"></a>

## Página 2: 2. AUDITORIAS INDIVIDUAIS

2. AUDITORIAS INDIVIDUAIS


 ===================================================================================
 INTEGRANTE 1: FELIPE JUNQUEIRA
 APLICATIVO / SITE ANALISADO: Portal Gov.br (Web / Mobile)
 ===================================================================================


A. Avaliação dos 4 Critérios do Slide 20:

1. INTERFACE: - Cores e Contraste: A paleta oficial segue o padrão azul
escuro (`#0c326f`), amarelo e branco. Embora a identidade seja forte, diversas
áreas de formulários utilizam textos secundários em cinza claro com contraste
inferior a 3:1 em relação ao fundo branco, violando o critério WCAG AA. -
Tipografia e Legibilidade: A fonte padrão (Rawline) é limpa, porém os tamanhos
de fonte em tabelas e submenus diminuem excessivamente em telas menores,
dificultando a leitura sem zoom. - Ícones: Há ícones genéricos (como
engrenagens ou setas duplas) sem rótulos textuais explícitos, gerando
ambiguidade sobre o destino da ação.

2. AFFORDANCE: - Diversos cartões informativos de serviços possuem
bordas arredondadas e sombras sutis que os fazem parecer banners
meramente ilustrativos, mas na verdade são clicáveis. O usuário não sabe se o
elemento é um link ou um aviso estático até passar o cursor ou tocar na tela.

3. USABILIDADE (Regra dos 3 cliques e caminho crítico): - Para emitir uma
certidão negativa ou acessar o histórico de atendimentos, o usuário precisa
passar por: (1) Busca, (2) Lista de resultados dispersos, (3) Página descritiva
do serviço, (4) Redirecionamento para autenticação com biometria facial, (5)
Painel do órgão específico. Excede amplamente a meta de facilidade e gera
sobrecarga cognitiva.

4. ACESSIBILIDADE: - Cego (Leitor de Tela): Em tabelas de serviços e etapas
de formulários, faltam atributos `aria-label` e descrições semânticas. O leitor
anuncia "botão sem rótulo" em ações críticas. - Idoso: Alvos de toque de
paginação são inferiores ao tamanho mínimo recomendado (44x44px). A falta
de um botão nativo de ajuste dinâmico de contraste e tamanho de fonte em
todas as telas prejudica usuários idosos. - Surdo: Vídeos institucionais e
tutoriais inseridos no portal frequentemente não dispõem de legendas


---

<a id="página-3"></a>

## Página 3: sincronizadas em português nem intérprete de Libras via VLibras ativo em

sincronizadas em português nem intérprete de Libras via VLibras ativo em
tempo integral.

B. Principais Problemas de IHC Identificados (Gov.br):

1. Problema 1 (Affordance & Visibilidade): Cartões de serviços com
aparência de banner estático sem indicador visual de clicabilidade (falta de
seta, sublinhado ou elevação interativa). 2. Problema 2 (Comunicabilidade de
Erro): Na falha de validação ou autenticação Gov.br, o sistema exibe
mensagens técnicas enigmáticas (ex.: "Erro de comunicação com o provedor
SAML [código 403]") sem orientar como o cidadão deve proceder para resolver
o impasse. 3. Problema 3 (Acessibilidade Motora e de Visão): Paginação e
campos de seleção em telas de consulta possuem alvos de clique inferiores a
30x30px, violando a diretriz de área mínima de toque de 44x44px (ou
48x48dp).


 ===================================================================================
 INTEGRANTE 2: GABRIEL
 APLICATIVO ANALISADO: iFood (Mobile Android/iOS)
 ===================================================================================


A. Avaliação dos 4 Critérios do Slide 20:

1. INTERFACE: - Cores e Contraste: Predominância do vermelho característico
(`#EA1D2C`) sobre fundo branco, com excelente contraste visual nos botões
principais de ação (CTA). No entanto, o excesso de banners promocionais
piscantes e carrosséis simultâneos causa ruído visual agressivo. - Ícones:
Ícones da barra de navegação inferior (Início, Busca, Pedidos, Perfil) são
universais e bem compreendidos.

2. AFFORDANCE: - Na tela de sacola/carrinho, a opção de adicionar cupons
de desconto aparece como uma linha de texto cinza minúscula ("Ver cupons
disponíveis") que se assemelha a um texto explicativo estático, fazendo com
que muitos usuários não percebam que se trata de um botão clicável.

3. USABILIDADE (Fluxo e rapidez): - O fluxo de busca até a finalização do
pedido é rápido para pedidos recorrentes, mas se torna frustrante quando há
personalização de itens (ex.: escolher ingredientes ou ponto da carne). O


---

<a id="página-4"></a>

## Página 4: cancelamento de pedido possui fluxo labiríntico (Dark Pattern), dificultando a

cancelamento de pedido possui fluxo labiríntico (Dark Pattern), dificultando a
ação do usuário quando comete um erro imediato.

4. ACESSIBILIDADE: - Cego: O leitor de tela (TalkBack) falha ao enunciar a
seleção de complementos obrigatórios versus opcionais, lendo apenas nomes
isolados sem informar se a caixa de seleção foi marcada ou desmarcada. -
Idoso: A rolagem infinita e o surgimento repentino de pop-ups de cupons
interrompem o foco de navegação, gerando desorientação espacial na
interface. - Surdo: O aplicativo é predominantemente visual, mas a
comunicação com o entregador via chamada de voz não possui opção de
forçar somente chat de texto imediato em caso de emergência ou entrega
difícil.

B. Principais Problemas de IHC Identificados (iFood):

1. Problema 1 (Affordance Fraco no Cupom): Link de inclusão de cupom de
desconto com aspecto de texto estático, ocultando o benefício e gerando
insatisfação hedônica/econômica no usuário. 2. Problema 2 (Acessibilidade
para Leitores de Tela): Caixas de seleção de adicionais não anunciam o
estado (marcado/desmarcado) no leitor de tela, impossibilitando a autonomia
de pessoas com deficiência visual. 3. Problema 3 (Dark Pattern de
Cancelamento / Liberdade do Usuário): Falta de um botão claro e imediato
de cancelamento em até 60 segundos após o pedido em caso de endereço ou
item errado (falha na heurística de recuperação de erros).


 ===================================================================================
 INTEGRANTE 3: FERNANDA
 APLICATIVO ANALISADO: Itaú (Mobile Banking)
 ===================================================================================


A. Avaliação dos 4 Critérios do Slide 20:

1. INTERFACE: - Cores e Legibilidade: Uso do laranja vibrante e azul-marinho.
Tipografia limpa, mas em extratos bancários os valores em centavos e
descrições detalhadas de taxas usam fontes condensadas e tonalidades de
cinza que dificultam a leitura sob luz solar direta. - Ícones: Ícone de "Pix"
ganhou destaque central, mas ícones de "Comprovantes" e "Renegociação"
ficam aglomerados dentro de um menu secundário "Serviços" pouco intuitivo.


---

<a id="página-5"></a>

## Página 5: 2. AFFORDANCE: - Exemplo clássico abordado na aula: o botão para

2. AFFORDANCE: - Exemplo clássico abordado na aula: o botão para
parcelamento de faturas ou ajuste de limite anteriormente ficava camuflado
como texto corrido de rodapé. Embora melhorado recentemente, certos botões
de confirmação de segurança usam estilo ghost button (apenas contorno sem
preenchimento), o que transmite a falsa sensação de botão desabilitado
(disabled).

3. USABILIDADE (Caminho de 3 cliques e resiliência): - Tarefas comuns
como "Pix para chave salva" são concluídas em 2 a 3 toques. Porém, a
consulta a comprovantes antigos demanda múltiplos filtros e rolagem em telas
modais que fecham acidentalmente ao menor deslize de dedo, forçando o
recomeço de todo o processo.

4. ACESSIBILIDADE: - Cego (Tecnologia Assistiva): O teclado virtual com
teclas de números embaralhados (medida de segurança bancária anti-fraude)
cria uma enorme barreira para deficientes visuais caso a interface não ofereça
canal de som privativo ou biometria via impressão digital como substituto
obrigatório e plenamente acessível. - Idoso: Telas com limite de tempo de
inatividade curto (sessão expira em 1 a 2 minutos sem aviso prévio sonoro ou
visual de contagem regressiva), expulsando o usuário que precisa de mais
tempo para digitar códigos de barras. - Surdo: Excelente independência visual
em transações, mas o canal de suporte telefônico via SAC é indicado em casos
de contestação de compra, marginalizando clientes surdos que dependem de
chat textual ou videochamada em Libras.

B. Principais Problemas de IHC Identificados (Itaú):

1. Problema 1 (Falso Estado Desabilitado / Affordance): Botões secundários
com contorno fino (ghost buttons) confundem usuários que pensam que o
botão ainda não foi ativado por falta de preenchimento. 2. Problema 2
(Acessibilidade de Segurança): Teclado numérico dinâmico/embaralhado não
possui mapeamento auditivo seguro, excluindo deficientes visuais que não
possuem aparelhos com biometria facial/digital configurada. 3. Problema 3
(Feedback e Tolerância a Erros): Mensagens de transação recusada opacas
e genéricas ("Desculpe, ocorreu uma instabilidade momentânea. Tente mais
tarde"), impedindo o usuário de saber se o motivo real foi falta de saldo, chave
incorreta ou limite noturno.


---

<a id="página-6"></a>

## Página 6: ================================================================================

===================================================================================
 INTEGRANTE 4: LUCAS MENDES
 SISTEMA ANALISADO: Moodle UFABC (Ambiente Virtual de Aprendizagem)
 ===================================================================================


A. Avaliação dos 4 Critérios do Slide 20:

1. INTERFACE: - Cores e Design: Layout clássico baseado em tabelas e
blocos empilhados. Excesso de densidade de informação em uma única página
longa (a chamada "rolagem da morte"), sem colapso automático de semanas
anteriores. - Ícones: Ícones pequenos (16x16px) ao lado de títulos de materiais
que se misturam com links simples de texto.

2. AFFORDANCE: - Links que apenas baixam arquivos diretamente (`.pdf`,
`.docx`, `.zip`) possuem o mesmo estilo visual de links que abrem páginas
internas do curso. O usuário não sabe se o clique causará um download
imediato no dispositivo ou abrirá uma nova aba.

3. USABILIDADE (Regra dos 3 cliques): - Para enviar uma tarefa acadêmica,
o aluno precisa: (1) Clicar na disciplina, (2) Rolar uma extensa página até a
semana correta, (3) Clicar na tarefa, (4) Rolar até o final da página da tarefa,
(5) Clicar em "Adicionar envio", (6) Fazer o upload do arquivo, (7) Confirmar
envio. São de 6 a 7 passos com alta propensão a cliques falsos.

4. ACESSIBILIDADE: - Cego: Imagens postadas por professores e links sem
descrições significativas (ex.: "clique aqui" em vez de "Baixar Plano de Ensino
da Unidade 1") inviabilizam a navegação estruturada via leitor de tela
(NVDA/Orca). - Idoso e Usuário com Baixa Visão: Não há modo escuro nativo
nem atalhos visíveis para redimensionamento de fonte ou pular para o
conteúdo principal (skip link). - Surdo: Materiais em áudio (podcasts
acadêmicos) disponibilizados sem transcrição textual associada.

B. Principais Problemas de IHC Identificados (Moodle UFABC):

1. Problema 1 (Sobrecarga Cognitiva e Densidade da Interface): Ausência
de paginação ou abas colapsáveis nas disciplinas, forçando o estudante a
percorrer dezenas de roladas de tela para achar o conteúdo atual. 2. Problema
2 (Affordance Indistinto de Links vs. Downloads): Falta de distinção visual
entre links de navegação e disparadores de download de arquivos pesados. 3.
Problema 3 (Prevenção e Recuperação de Erros / Timeout): Expiração


---

<a id="página-7"></a>

## Página 7: silenciosa da sessão: se o aluno passa mais de 20 minutos redigindo um texto

silenciosa da sessão: se o aluno passa mais de 20 minutos redigindo um texto
em um fórum ou atividade, ao clicar em "Salvar" a sessão já caiu e todo o texto
digitado é perdido sem possibilidade de recuperação.


3. DINÂMICA EM GRUPO: "COMPARTILHANDO DESCOBERTAS"
(SLIDE 22)

Para a apresentação oral solicitada pelo professor em sala de aula, cada
integrante preparou uma fala objetiva de 30 a 45 segundos, expondo o
problema de maior impacto:

🎤 Falas Individuais para a Roda de Apresentação:
- Felipe Junqueira (Gov.br): > "No portal Gov.br, o problema mais grave que
identifiquei foi o de Comunicabilidade e Acessibilidade em mensagens de
erro. Quando ocorre qualquer instabilidade na autenticação de um serviço
essencial, o sistema joga na tela uma mensagem enigmática com códigos
técnicos como 'Erro 500 no provedor SAML', em vez de explicar em linguagem
humana o que aconteceu e como o cidadão pode resolver. Em um serviço
público universal, interface ruim significa exclusão do cidadão."

- Gabriel (iFood): > "No iFood, o problema mais crítico foi de Affordance e
Acessibilidade no leitor de tela. Ao personalizar um pedido, a lista de
adicionais não anuncia para o cego se a opção é obrigatória ou se o item já foi
selecionado no TalkBack. Além disso, o botão de cupons é camuflado como
texto comum de rodapé para desincentivar o uso, o que é um claro exemplo de
dark pattern que afeta a satisfação do usuário."

- Fernanda (Itaú): > "No aplicativo do Itaú, destaco a questão do Teclado
Numérico Dinâmico e Exclusão. Por razões de segurança, os números da
senha mudam de lugar a cada acesso, mas isso quebra a affordance espacial
e bloqueia pessoas com deficiência visual que usam leitor de tela, a menos que
haja uma biometria cadastrada. Segurança não pode ser inimiga da
acessibilidade."

- Lucas Mendes (Moodle UFABC): > "No Moodle da UFABC, o problema mais
crítico é a Sobrecarga Cognitiva e a Falta de Prevenção de Erros. As
disciplinas têm uma 'rolagem infinita' sem divisão clara por tópicos colapsáveis,


---

<a id="página-8"></a>

## Página 8: e a sessão de login expira sem aviso prévio enquanto o aluno digita respostas

e a sessão de login expira sem aviso prévio enquanto o aluno digita respostas
no fórum, deletando todo o trabalho. Falta feedback claro e suporte à
recuperação de erros."


4. MATRIZ CONSOLIDADA DE PROBLEMAS DE IHC
LEVANTADOS PELO GRUPO

| Integrante | Sistema | Conceito de IHC Afetado | Severidade (Nielsen) |
Impacto no Usuário | Solução Proposta | | :


|:


|:


|:


|:


|:


| | Felipe | Gov.br | Comunicabilidade / Acessibilidade | Grave | Cidadão não
entende o erro nem sabe como emitir documentos. | Mensagens de erro com
orientações passo a passo em linguagem cidadã e botão de suporte direto. | |
Gabriel | iFood | Affordance / Acessibilidade | Moderada | Cegos não
conseguem customizar pratos; usuários perdem cupons. | Atributos ARIA
adequados em seletores e botão de cupom com destaque visual claro. | |
Fernanda | Itaú | Acessibilidade / Segurança | Crítica | Pessoas com
deficiência visual ficam impedidas de acessar a conta. | Alternativa de
autenticação sonora discreta e biometria facilitada sem exclusão. | | Lucas |
Moodle | Usabilidade / Tolerância a Erros | Grave | Perda de trabalhos


---

<a id="página-9"></a>

## Página 9: digitados e dificuldade de achar conteúdos recentes. | Autosave local no

digitados e dificuldade de achar conteúdos recentes. | Autosave local no
navegador (localStorage) e visualização em abas por semana letiva. |


5. ALINHAMENTO DO GRUPO PARA O PROJETO SEMESTRAL
(SLIDES 23 E 24)

Conforme destacado no Roadmap de 13 semanas apresentado na aula
(Unidade 1 à 13), o grupo definiu a sua direção preliminar de pesquisa e
prototipagem:

- Tema de Interesse do Grupo: "Redesenho Centrado no Usuário e Acessível
do Sistema de Submissão e Acompanhamento de Atividades do Moodle
UFABC". - Justificativa: O ambiente é de uso diário por milhares de
estudantes e professores da UFABC, apresentando deficiências claras de
usabilidade, sobrecarga cognitiva em dispositivos móveis e graves barreiras de
acessibilidade para alunos com deficiência visual e motora. O grupo possui
acesso direto a usuários reais para realização de entrevistas na Unidade 4 e
testes de usabilidade na Unidade 12.


---

## 💡 Síntese de Diretrizes Práticas de IHC para o Projeto (Padrão Ouro & AGENTS.md)

1. **Aplicação das 10 Heurísticas de Nielsen:** Evitar nos módulos da Central OBI os erros heurísticos identificados em grandes apps (como excesso de etapas, botões minúsculos, falta de feedback de confirmação e linguagem técnica inacessível).
2. **Consistência Visual e Padrões:** Respeito absoluto aos Design Tokens e estrutura padronizada do `template-base/`.
3. **Comunicação Construtiva:** Todos os rótulos e mensagens de alerta devem manter tom amigável e instrutivo.

