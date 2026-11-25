/* Fontes oficiais consultadas em 25/11/2026. Cobertura detalhada da ementa de Programação; explicações autorais da Central.
 * /info/regulamento/ (seção 5), /prepare/ementas/ementa_ini/,
 * /prepare/ementas/ementa_prog/, /prepare/estude/, /pratique/, /passadas/.
 * PM/PJ/P1/P2 indicam o nível inicial de cobrança; P2 também se aplica ao Sênior.
 */
'use strict';
(function disponibilizarEstudos() {
 const categorias = {
  "iniciacao_jr": {
    "titulo": "Iniciação Júnior",
    "escolaridade": "4º e 5º anos do Ensino Fundamental",
    "iniciacao": true,
    "nota": "Prática sugerida pela Central: Iniciação não exige conhecimentos prévios específicos. Esta lista não é uma ementa obrigatória.",
    "topicos": [
      {
        "id": "IJ_1",
        "titulo": "Ler pistas com atenção",
        "explicacao": "Separe o que o enunciado afirma do que você ainda precisa descobrir.",
        "grupo": "IJ"
      },
      {
        "id": "IJ_2",
        "titulo": "Organizar objetos e sequências",
        "explicacao": "Use desenhos ou pequenas tabelas para acompanhar posições e padrões.",
        "grupo": "IJ"
      },
      {
        "id": "IJ_3",
        "titulo": "Experimentar possibilidades",
        "explicacao": "Teste alternativas e descarte as que desrespeitam uma pista.",
        "grupo": "IJ"
      },
      {
        "id": "IJ_4",
        "titulo": "Resolver tarefas do Júnior",
        "explicacao": "Escolha questões IJ no portal oficial e tente explicar sua resposta.",
        "grupo": "IJ"
      },
      {
        "id": "IJ_5",
        "titulo": "Conferir e tentar novamente",
        "explicacao": "Confira o gabarito de uma prova anterior e refaça as questões que geraram dúvida.",
        "grupo": "IJ"
      }
    ],
    "ementa": "https://olimpiada.ic.unicamp.br/prepare/ementas/ementa_ini/",
    "pratica": "https://olimpiada.ic.unicamp.br/pratique/ij/",
    "rotuloPratica": "Resolver tarefas deste nível"
  },
  "iniciacao_1": {
    "titulo": "Iniciação Nível 1",
    "escolaridade": "6º e 7º anos do Ensino Fundamental",
    "iniciacao": true,
    "nota": "Prática sugerida pela Central: Iniciação não exige conhecimentos prévios específicos. Esta lista não é uma ementa obrigatória.",
    "topicos": [
      {
        "id": "I1_1",
        "titulo": "Relacionar várias pistas",
        "explicacao": "Cruze condições em uma tabela e verifique quais combinações continuam possíveis.",
        "grupo": "I1"
      },
      {
        "id": "I1_2",
        "titulo": "Organizar ordens e grupos",
        "explicacao": "Represente filas, horários ou equipes com anotações simples.",
        "grupo": "I1"
      },
      {
        "id": "I1_3",
        "titulo": "Explorar caminhos e possibilidades",
        "explicacao": "Desenhe trajetos e conte casos com cuidado para não repetir possibilidades.",
        "grupo": "I1"
      },
      {
        "id": "I1_4",
        "titulo": "Resolver tarefas do Nível 1",
        "explicacao": "Treine com questões I1, usando lápis e papel.",
        "grupo": "I1"
      },
      {
        "id": "I1_5",
        "titulo": "Explicar a resposta",
        "explicacao": "Compare sua justificativa com o gabarito e retome as pistas que deixou passar.",
        "grupo": "I1"
      }
    ],
    "ementa": "https://olimpiada.ic.unicamp.br/prepare/ementas/ementa_ini/",
    "pratica": "https://olimpiada.ic.unicamp.br/pratique/i1/",
    "rotuloPratica": "Resolver tarefas deste nível"
  },
  "iniciacao_2": {
    "titulo": "Iniciação Nível 2",
    "escolaridade": "8º e 9º anos do Ensino Fundamental",
    "iniciacao": true,
    "nota": "Prática sugerida pela Central: Iniciação não exige conhecimentos prévios específicos. Esta lista não é uma ementa obrigatória.",
    "topicos": [
      {
        "id": "I2_1",
        "titulo": "Combinar restrições",
        "explicacao": "Organize problemas com várias condições sem perder nenhuma informação.",
        "grupo": "I2"
      },
      {
        "id": "I2_2",
        "titulo": "Escolher uma representação",
        "explicacao": "Experimente tabelas, diagramas ou desenhos de ligações para esclarecer o problema.",
        "grupo": "I2"
      },
      {
        "id": "I2_3",
        "titulo": "Comparar estratégias",
        "explicacao": "Confira uma conclusão por outro caminho e procure casos que a contradigam.",
        "grupo": "I2"
      },
      {
        "id": "I2_4",
        "titulo": "Resolver tarefas do Nível 2",
        "explicacao": "Pratique questões I2 de fases diferentes e registre dúvidas.",
        "grupo": "I2"
      },
      {
        "id": "I2_5",
        "titulo": "Rever a resolução",
        "explicacao": "Confira as respostas e refaça o raciocínio sem depender da alternativa correta.",
        "grupo": "I2"
      }
    ],
    "ementa": "https://olimpiada.ic.unicamp.br/prepare/ementas/ementa_ini/",
    "pratica": "https://olimpiada.ic.unicamp.br/pratique/i2/",
    "rotuloPratica": "Resolver tarefas deste nível"
  },
  "prog_mirim": {
    "titulo": "Programação Mirim",
    "escolaridade": "Até o 7º ano do Ensino Fundamental",
    "iniciacao": false,
    "nota": "Checklist detalhado dos itens e subtópicos da ementa oficial consultada em 25/11/2026, com explicações da Central. Inclui o conteúdo dos níveis anteriores. As técnicas de demonstração ajudam no raciocínio; a prova não pede demonstrações teóricas escritas. O portal Pratique ainda não lista um acervo próprio para Mirim; use o Saci para começar.",
    "topicos": [
      {
        "id": "ementa2026_001",
        "titulo": "Inteiros e cálculos",
        "explicacao": "Calcule com valores positivos e negativos, potências e comparações; confira a ordem das operações.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 1
      },
      {
        "id": "ementa2026_002",
        "titulo": "Sinal, pares e divisores",
        "explicacao": "Reconheça o sinal de um inteiro, sua paridade e quando uma divisão é exata.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 2
      },
      {
        "id": "ementa2026_003",
        "titulo": "Reconhecer primos",
        "explicacao": "Diferencie números primos de compostos pela quantidade de divisores positivos.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 3
      },
      {
        "id": "ementa2026_004",
        "titulo": "Partes e percentuais",
        "explicacao": "Converta frações em porcentagens e resolva cálculos proporcionais.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 4
      },
      {
        "id": "ementa2026_005",
        "titulo": "Figuras e ângulos",
        "explicacao": "Identifique retas, segmentos, ângulos, triângulos, retângulos, quadrados e círculos em problemas.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 5
      },
      {
        "id": "ementa2026_006",
        "titulo": "Localização no plano",
        "explicacao": "Represente um ponto por coordenadas e interprete deslocamentos nos eixos.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 6
      },
      {
        "id": "ementa2026_007",
        "titulo": "Medir distâncias",
        "explicacao": "Calcule a distância em linha reta entre pontos usando suas coordenadas.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 7
      },
      {
        "id": "ementa2026_008",
        "titulo": "Relação de Pitágoras",
        "explicacao": "Relacione catetos e hipotenusa em triângulos retângulos.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 8
      },
      {
        "id": "ementa2026_011",
        "titulo": "Raciocínio formal",
        "explicacao": "Interprete afirmações, conectivos, quantificadores e implicações para justificar conclusões.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11
      },
      {
        "id": "ementa2026_011_1",
        "titulo": "Afirmações verdadeiras ou falsas",
        "explicacao": "Reconheça proposições e determine seu valor lógico a partir das condições dadas.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 1
      },
      {
        "id": "ementa2026_011_2",
        "titulo": "Conectivos de lógica",
        "explicacao": "Combine afirmações usando E, OU e NÃO e compare os resultados.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 2
      },
      {
        "id": "ementa2026_011_3",
        "titulo": "Existe ou vale para todos",
        "explicacao": "Distinga afirmações sobre um elemento daquelas que precisam valer para todos.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 3
      },
      {
        "id": "ementa2026_011_4",
        "titulo": "Se uma condição, então outra",
        "explicacao": "Identifique hipótese e conclusão de uma implicação e quando ela é falsa.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 4
      },
      {
        "id": "ementa2026_011_5",
        "titulo": "Condições equivalentes",
        "explicacao": "Interprete uma equivalência como implicações válidas nos dois sentidos.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 5
      },
      {
        "id": "ementa2026_011_6",
        "titulo": "Enumerar valores de verdade",
        "explicacao": "Monte tabelas-verdade para conferir todas as combinações das proposições.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 6
      },
      {
        "id": "ementa2026_011_7",
        "titulo": "Inferências por implicação",
        "explicacao": "Pratique Modus Ponens e Modus Tollens: concluir a consequência ou negar a hipótese conforme as premissas.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 7
      },
      {
        "id": "ementa2026_014",
        "titulo": "Relacionar entradas e saídas",
        "explicacao": "Reconheça relações entre conjuntos e funções que associam uma saída a cada entrada.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 14
      },
      {
        "id": "ementa2026_015",
        "titulo": "Comparar sequências em ordem",
        "explicacao": "Compare textos ou sequências pela primeira posição diferente, como em um dicionário.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 15
      },
      {
        "id": "ementa2026_016",
        "titulo": "Operações com conjuntos",
        "explicacao": "Determine elementos comuns, reunidos ou ausentes por interseção, união e complemento.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 16
      },
      {
        "id": "ementa2026_017",
        "titulo": "Definições recursivas",
        "explicacao": "Descreva um objeto matemático por versões menores e um caso inicial.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 17
      },
      {
        "id": "ementa2026_018",
        "titulo": "Reordenações e fatorial",
        "explicacao": "Conte ordenações de elementos e calcule produtos sucessivos com a função fatorial.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 18
      },
      {
        "id": "ementa2026_019",
        "titulo": "Sequências de diferença constante",
        "explicacao": "Identifique a razão de uma progressão aritmética e calcule termos e somas.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 19
      },
      {
        "id": "ementa2026_020",
        "titulo": "Distribuir objetos em caixas",
        "explicacao": "Use o princípio da casa dos pombos para provar que alguma repetição é inevitável.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 20
      },
      {
        "id": "ementa2026_021",
        "titulo": "Contagem por soma e produto",
        "explicacao": "Some alternativas exclusivas e multiplique escolhas sucessivas sem contar casos repetidos.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 21
      },
      {
        "id": "ementa2026_027",
        "titulo": "Ligações sem direção",
        "explicacao": "Modele vértices, arestas, vizinhança, grau e pesos em um grafo não direcionado.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 27
      },
      {
        "id": "ementa2026_028",
        "titulo": "Ligações com direção",
        "explicacao": "Modele setas e distinga o número de ligações que entram e saem de cada vértice.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 28
      },
      {
        "id": "ementa2026_029",
        "titulo": "Percursos e retornos",
        "explicacao": "Reconheça caminhos entre vértices e ciclos que retornam ao ponto de partida.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 29
      },
      {
        "id": "ementa2026_030",
        "titulo": "Grupos conectados",
        "explicacao": "Separe um grafo em regiões cujos vértices conseguem alcançar uns aos outros.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 30
      },
      {
        "id": "ementa2026_031",
        "titulo": "Contar graus e arestas",
        "explicacao": "Relacione a soma dos graus ao dobro do número de arestas em grafos não direcionados.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 31
      },
      {
        "id": "ementa2026_034",
        "titulo": "Componentes do computador",
        "explicacao": "Entenda os papéis do processador, da memória e dos demais componentes ao executar programas.",
        "grupo": "PM",
        "secao": "Informática Básica",
        "referencia": 34
      },
      {
        "id": "ementa2026_035",
        "titulo": "Usar o ambiente do computador",
        "explicacao": "Pratique janelas, editor, navegador e aplicativos básicos de Windows ou Linux. As ferramentas permitidas na prova seguem o regulamento.",
        "grupo": "PM",
        "secao": "Informática Básica",
        "referencia": 35
      },
      {
        "id": "ementa2026_036",
        "titulo": "Organizar arquivos",
        "explicacao": "Crie, copie e mova pastas e arquivos para localizar o código e os dados de treino.",
        "grupo": "PM",
        "secao": "Informática Básica",
        "referencia": 36
      },
      {
        "id": "ementa2026_037",
        "titulo": "Executar uma solução",
        "explicacao": "Escreva, compile quando necessário e rode programas por uma IDE ou pelo terminal.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 37
      },
      {
        "id": "ementa2026_038",
        "titulo": "Regras da linguagem",
        "explicacao": "Diferencie a forma válida de escrever instruções do comportamento que elas produzem.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 38
      },
      {
        "id": "ementa2026_039",
        "titulo": "Guardar e atualizar valores",
        "explicacao": "Use variáveis, expressões e atribuições para acompanhar o estado de uma solução.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 39
      },
      {
        "id": "ementa2026_040",
        "titulo": "Escolher tipos de dados",
        "explicacao": "Distinga inteiros, números reais, valores booleanos e caracteres e seus limites.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 40
      },
      {
        "id": "ementa2026_041",
        "titulo": "Operações numéricas no código",
        "explicacao": "Use soma, subtração, produto, divisão inteira ou real e resto conforme o problema.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 41
      },
      {
        "id": "ementa2026_042",
        "titulo": "Ler e imprimir dados",
        "explicacao": "Receba a entrada padrão e escreva a resposta sem mensagens extras, no formato solicitado.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 42
      },
      {
        "id": "ementa2026_043",
        "titulo": "Escolhas condicionais",
        "explicacao": "Use decisões simples, alternativas e condições combinadas para escolher instruções.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 43
      },
      {
        "id": "ementa2026_044",
        "titulo": "Laços simples e aninhados",
        "explicacao": "Repita operações e combine laços, verificando contadores e condições de parada.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 44
      },
      {
        "id": "ementa2026_045",
        "titulo": "Combinar condições",
        "explicacao": "Use E, OU e NÃO para construir testes e entenda a prioridade dos operadores.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 45
      },
      {
        "id": "ementa2026_046",
        "titulo": "Trabalhar com textos",
        "explicacao": "Acesse caracteres, percorra e compare strings, que são sequências de caracteres.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 46
      },
      {
        "id": "ementa2026_047",
        "titulo": "Listas e tabelas indexadas",
        "explicacao": "Use vetores de uma ou várias dimensões e respeite os limites dos índices.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 47
      },
      {
        "id": "ementa2026_048",
        "titulo": "Funções com argumentos",
        "explicacao": "Separe tarefas em funções e passe as informações necessárias por parâmetros.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 48
      },
      {
        "id": "ementa2026_049",
        "titulo": "Chamadas recursivas",
        "explicacao": "Resolva um caso por chamadas menores e defina um caso-base que encerre a execução.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 49
      },
      {
        "id": "ementa2026_050",
        "titulo": "Ocupação de memória",
        "explicacao": "Estime bytes dos tipos, alocação estática e espaço usado pela pilha de chamadas recursivas.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 50
      },
      {
        "id": "ementa2026_051",
        "titulo": "Endereços e referências",
        "explicacao": "Entenda acesso indireto a dados, referências e ponteiros nas linguagens em que se aplicam.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 51
      },
      {
        "id": "ementa2026_053",
        "titulo": "Descrever um algoritmo correto",
        "explicacao": "Defina entradas, saídas e condições antes e depois da execução; use invariantes para justificar a solução.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 53
      },
      {
        "id": "ementa2026_054",
        "titulo": "Estimar o crescimento do custo",
        "explicacao": "Analise informalmente como tempo e memória crescem com o tamanho da entrada.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54
      },
      {
        "id": "ementa2026_054_1",
        "titulo": "Notação de crescimento",
        "explicacao": "Use Big O para expressar um limite de crescimento do custo, ignorando constantes.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 1
      },
      {
        "id": "ementa2026_054_2",
        "titulo": "Comparar classes de custo",
        "explicacao": "Compare custos constantes, logarítmicos, lineares, n log n, quadráticos, cúbicos, exponenciais e fatoriais.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 2
      },
      {
        "id": "ementa2026_054_3",
        "titulo": "Trocar espaço por tempo",
        "explicacao": "Avalie quando guardar resultados usa mais memória, mas reduz o trabalho repetido.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 3
      },
      {
        "id": "ementa2026_054_4",
        "titulo": "Custo ao longo de operações",
        "explicacao": "Na análise amortizada, distribua operações caras por uma sequência de operações baratas.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 4
      },
      {
        "id": "ementa2026_055",
        "titulo": "Medir desempenho",
        "explicacao": "Execute casos de tamanhos diferentes e estime tempo e memória para comparar com os limites.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 55
      },
      {
        "id": "ementa2026_056",
        "titulo": "Percorrer dados",
        "explicacao": "Use iterações para acumular resultados, contar ocorrências ou simular passos.",
        "grupo": "PM",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 56
      },
      {
        "id": "ementa2026_057",
        "titulo": "Enumerar todas as soluções",
        "explicacao": "Teste as possibilidades com força bruta e estime se a quantidade de casos cabe no tempo disponível.",
        "grupo": "PM",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 57
      },
      {
        "id": "ementa2026_058",
        "titulo": "Escolher uma ação local",
        "explicacao": "Use uma estratégia gulosa apenas quando conseguir justificar que as escolhas locais levam à resposta correta.",
        "grupo": "PM",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 58
      },
      {
        "id": "ementa2026_062",
        "titulo": "Contar por valor",
        "explicacao": "Use um vetor de frequências para guardar quantas vezes cada valor aparece.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 62
      },
      {
        "id": "ementa2026_063",
        "titulo": "Acumular prefixos e sufixos",
        "explicacao": "Pré-calcule soma, máximo ou mínimo até cada posição para responder consultas com menos repetição.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 63
      },
      {
        "id": "ementa2026_064",
        "titulo": "Conjuntos da biblioteca",
        "explicacao": "Guarde valores sem duplicatas e consulte existência com a implementação padrão da linguagem.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 64
      },
      {
        "id": "ementa2026_065",
        "titulo": "Mapas da biblioteca",
        "explicacao": "Associe chaves a valores em um dicionário e faça consultas e atualizações.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 65
      },
      {
        "id": "ementa2026_066",
        "titulo": "Prioridades com heap",
        "explicacao": "Use a fila de prioridade da biblioteca para retirar primeiro o elemento de maior ou menor prioridade.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 66
      },
      {
        "id": "ementa2026_067",
        "titulo": "Pilha e fila",
        "explicacao": "Distinga retirar o último elemento inserido de retirar o primeiro, conforme a ordem necessária.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 67
      },
      {
        "id": "ementa2026_068",
        "titulo": "Guardar um grafo",
        "explicacao": "Compare lista de arestas, lista de adjacências e matriz de adjacências pelo uso de memória e consultas.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 68
      },
      {
        "id": "ementa2026_073",
        "titulo": "Ordenar com a biblioteca",
        "explicacao": "Use a ordenação padrão e escreva um comparador consistente; conheça seu custo de tempo.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 73
      },
      {
        "id": "ementa2026_074",
        "titulo": "Ordenar por frequência",
        "explicacao": "Conte valores em um intervalo adequado e reconstrua a sequência em ordem.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 74
      },
      {
        "id": "ementa2026_075",
        "titulo": "Mover dois índices",
        "explicacao": "Avance dois ponteiros em uma sequência para localizar faixas ou pares sem recomeçar a busca.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 75
      },
      {
        "id": "ementa2026_076",
        "titulo": "Busca pela metade",
        "explicacao": "Use busca binária em dados ordenados ou numa resposta com propriedade monotônica.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 76
      },
      {
        "id": "ementa2026_079",
        "titulo": "Converter bases",
        "explicacao": "Transforme números entre bases usando valor posicional, divisões e restos.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 79
      },
      {
        "id": "ementa2026_080",
        "titulo": "MDC por Euclides",
        "explicacao": "Encontre o maior divisor comum repetindo a divisão com resto.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 80
      },
      {
        "id": "ementa2026_081",
        "titulo": "Testar divisores",
        "explicacao": "Procure fatores até a raiz quadrada para testar primalidade e listar divisores sem duplicação.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 81
      },
      {
        "id": "ementa2026_082",
        "titulo": "Marcar primos com crivo",
        "explicacao": "Elimine múltiplos para identificar vários primos até um limite.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 82
      },
      {
        "id": "ementa2026_083",
        "titulo": "Decompor em fatores",
        "explicacao": "Decomponha inteiros por tentativas ou usando informações obtidas por um crivo.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 83
      },
      {
        "id": "ementa2026_093",
        "titulo": "Exploração em profundidade",
        "explicacao": "Use DFS para continuar por um ramo antes de retornar e explorar os outros.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93
      },
      {
        "id": "ementa2026_093_1",
        "titulo": "Componentes por DFS",
        "explicacao": "Inicie uma busca em cada vértice ainda não visitado para identificar regiões conectadas.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93,
        "subitem": 1
      },
      {
        "id": "ementa2026_093_2",
        "titulo": "Verificar bipartição",
        "explicacao": "Tente atribuir dois grupos alternadamente e detecte conflitos entre vizinhos.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93,
        "subitem": 2
      },
      {
        "id": "ementa2026_093_3",
        "titulo": "Preencher regiões",
        "explicacao": "Aplique flood fill para visitar células conectadas de uma grade respeitando as regras de vizinhança.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93,
        "subitem": 3
      },
      {
        "id": "ementa2026_094",
        "titulo": "Exploração por camadas",
        "explicacao": "Use BFS com uma fila para visitar primeiro os vértices mais próximos em número de arestas.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 94
      }
    ],
    "ementa": "https://olimpiada.ic.unicamp.br/prepare/ementas/ementa_prog/",
    "pratica": "https://olimpiada.ic.unicamp.br/saci/",
    "rotuloPratica": "Aprender programação no Saci",
    "versaoProgresso": "v3"
  },
  "prog_jr": {
    "titulo": "Programação Júnior",
    "escolaridade": "8º e 9º anos do Ensino Fundamental",
    "iniciacao": false,
    "nota": "Checklist detalhado dos itens e subtópicos da ementa oficial consultada em 25/11/2026, com explicações da Central. Inclui o conteúdo dos níveis anteriores. As técnicas de demonstração ajudam no raciocínio; a prova não pede demonstrações teóricas escritas.",
    "topicos": [
      {
        "id": "ementa2026_001",
        "titulo": "Inteiros e cálculos",
        "explicacao": "Calcule com valores positivos e negativos, potências e comparações; confira a ordem das operações.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 1
      },
      {
        "id": "ementa2026_002",
        "titulo": "Sinal, pares e divisores",
        "explicacao": "Reconheça o sinal de um inteiro, sua paridade e quando uma divisão é exata.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 2
      },
      {
        "id": "ementa2026_003",
        "titulo": "Reconhecer primos",
        "explicacao": "Diferencie números primos de compostos pela quantidade de divisores positivos.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 3
      },
      {
        "id": "ementa2026_004",
        "titulo": "Partes e percentuais",
        "explicacao": "Converta frações em porcentagens e resolva cálculos proporcionais.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 4
      },
      {
        "id": "ementa2026_005",
        "titulo": "Figuras e ângulos",
        "explicacao": "Identifique retas, segmentos, ângulos, triângulos, retângulos, quadrados e círculos em problemas.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 5
      },
      {
        "id": "ementa2026_006",
        "titulo": "Localização no plano",
        "explicacao": "Represente um ponto por coordenadas e interprete deslocamentos nos eixos.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 6
      },
      {
        "id": "ementa2026_007",
        "titulo": "Medir distâncias",
        "explicacao": "Calcule a distância em linha reta entre pontos usando suas coordenadas.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 7
      },
      {
        "id": "ementa2026_008",
        "titulo": "Relação de Pitágoras",
        "explicacao": "Relacione catetos e hipotenusa em triângulos retângulos.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 8
      },
      {
        "id": "ementa2026_009",
        "titulo": "Contas com restos",
        "explicacao": "Some, subtraia e multiplique valores considerando o resto por um módulo.",
        "grupo": "PJ",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 9
      },
      {
        "id": "ementa2026_010",
        "titulo": "Propriedades de polígonos",
        "explicacao": "Identifique lados, vértices, convexidade, cruzamentos e área de um polígono.",
        "grupo": "PJ",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 10
      },
      {
        "id": "ementa2026_011",
        "titulo": "Raciocínio formal",
        "explicacao": "Interprete afirmações, conectivos, quantificadores e implicações para justificar conclusões.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11
      },
      {
        "id": "ementa2026_011_1",
        "titulo": "Afirmações verdadeiras ou falsas",
        "explicacao": "Reconheça proposições e determine seu valor lógico a partir das condições dadas.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 1
      },
      {
        "id": "ementa2026_011_2",
        "titulo": "Conectivos de lógica",
        "explicacao": "Combine afirmações usando E, OU e NÃO e compare os resultados.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 2
      },
      {
        "id": "ementa2026_011_3",
        "titulo": "Existe ou vale para todos",
        "explicacao": "Distinga afirmações sobre um elemento daquelas que precisam valer para todos.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 3
      },
      {
        "id": "ementa2026_011_4",
        "titulo": "Se uma condição, então outra",
        "explicacao": "Identifique hipótese e conclusão de uma implicação e quando ela é falsa.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 4
      },
      {
        "id": "ementa2026_011_5",
        "titulo": "Condições equivalentes",
        "explicacao": "Interprete uma equivalência como implicações válidas nos dois sentidos.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 5
      },
      {
        "id": "ementa2026_011_6",
        "titulo": "Enumerar valores de verdade",
        "explicacao": "Monte tabelas-verdade para conferir todas as combinações das proposições.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 6
      },
      {
        "id": "ementa2026_011_7",
        "titulo": "Inferências por implicação",
        "explicacao": "Pratique Modus Ponens e Modus Tollens: concluir a consequência ou negar a hipótese conforme as premissas.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 7
      },
      {
        "id": "ementa2026_012",
        "titulo": "Argumentos e contraexemplos",
        "explicacao": "Confira ideias com prova direta, contradição ou contrapositiva; encontre exemplos que derrubem afirmações falsas.",
        "grupo": "PJ",
        "secao": "Fundamentos de Lógica",
        "referencia": 12
      },
      {
        "id": "ementa2026_014",
        "titulo": "Relacionar entradas e saídas",
        "explicacao": "Reconheça relações entre conjuntos e funções que associam uma saída a cada entrada.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 14
      },
      {
        "id": "ementa2026_015",
        "titulo": "Comparar sequências em ordem",
        "explicacao": "Compare textos ou sequências pela primeira posição diferente, como em um dicionário.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 15
      },
      {
        "id": "ementa2026_016",
        "titulo": "Operações com conjuntos",
        "explicacao": "Determine elementos comuns, reunidos ou ausentes por interseção, união e complemento.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 16
      },
      {
        "id": "ementa2026_017",
        "titulo": "Definições recursivas",
        "explicacao": "Descreva um objeto matemático por versões menores e um caso inicial.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 17
      },
      {
        "id": "ementa2026_018",
        "titulo": "Reordenações e fatorial",
        "explicacao": "Conte ordenações de elementos e calcule produtos sucessivos com a função fatorial.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 18
      },
      {
        "id": "ementa2026_019",
        "titulo": "Sequências de diferença constante",
        "explicacao": "Identifique a razão de uma progressão aritmética e calcule termos e somas.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 19
      },
      {
        "id": "ementa2026_020",
        "titulo": "Distribuir objetos em caixas",
        "explicacao": "Use o princípio da casa dos pombos para provar que alguma repetição é inevitável.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 20
      },
      {
        "id": "ementa2026_021",
        "titulo": "Contagem por soma e produto",
        "explicacao": "Some alternativas exclusivas e multiplique escolhas sucessivas sem contar casos repetidos.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 21
      },
      {
        "id": "ementa2026_022",
        "titulo": "Estados de jogos",
        "explicacao": "Classifique posições como vencedoras ou perdedoras a partir das jogadas disponíveis.",
        "grupo": "PJ",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 22
      },
      {
        "id": "ementa2026_027",
        "titulo": "Ligações sem direção",
        "explicacao": "Modele vértices, arestas, vizinhança, grau e pesos em um grafo não direcionado.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 27
      },
      {
        "id": "ementa2026_028",
        "titulo": "Ligações com direção",
        "explicacao": "Modele setas e distinga o número de ligações que entram e saem de cada vértice.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 28
      },
      {
        "id": "ementa2026_029",
        "titulo": "Percursos e retornos",
        "explicacao": "Reconheça caminhos entre vértices e ciclos que retornam ao ponto de partida.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 29
      },
      {
        "id": "ementa2026_030",
        "titulo": "Grupos conectados",
        "explicacao": "Separe um grafo em regiões cujos vértices conseguem alcançar uns aos outros.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 30
      },
      {
        "id": "ementa2026_031",
        "titulo": "Contar graus e arestas",
        "explicacao": "Relacione a soma dos graus ao dobro do número de arestas em grafos não direcionados.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 31
      },
      {
        "id": "ementa2026_032",
        "titulo": "Grafos sem ciclos",
        "explicacao": "Reconheça árvores conectadas e florestas compostas por várias árvores.",
        "grupo": "PJ",
        "secao": "Conceitos de Grafos",
        "referencia": 32
      },
      {
        "id": "ementa2026_034",
        "titulo": "Componentes do computador",
        "explicacao": "Entenda os papéis do processador, da memória e dos demais componentes ao executar programas.",
        "grupo": "PM",
        "secao": "Informática Básica",
        "referencia": 34
      },
      {
        "id": "ementa2026_035",
        "titulo": "Usar o ambiente do computador",
        "explicacao": "Pratique janelas, editor, navegador e aplicativos básicos de Windows ou Linux. As ferramentas permitidas na prova seguem o regulamento.",
        "grupo": "PM",
        "secao": "Informática Básica",
        "referencia": 35
      },
      {
        "id": "ementa2026_036",
        "titulo": "Organizar arquivos",
        "explicacao": "Crie, copie e mova pastas e arquivos para localizar o código e os dados de treino.",
        "grupo": "PM",
        "secao": "Informática Básica",
        "referencia": 36
      },
      {
        "id": "ementa2026_037",
        "titulo": "Executar uma solução",
        "explicacao": "Escreva, compile quando necessário e rode programas por uma IDE ou pelo terminal.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 37
      },
      {
        "id": "ementa2026_038",
        "titulo": "Regras da linguagem",
        "explicacao": "Diferencie a forma válida de escrever instruções do comportamento que elas produzem.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 38
      },
      {
        "id": "ementa2026_039",
        "titulo": "Guardar e atualizar valores",
        "explicacao": "Use variáveis, expressões e atribuições para acompanhar o estado de uma solução.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 39
      },
      {
        "id": "ementa2026_040",
        "titulo": "Escolher tipos de dados",
        "explicacao": "Distinga inteiros, números reais, valores booleanos e caracteres e seus limites.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 40
      },
      {
        "id": "ementa2026_041",
        "titulo": "Operações numéricas no código",
        "explicacao": "Use soma, subtração, produto, divisão inteira ou real e resto conforme o problema.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 41
      },
      {
        "id": "ementa2026_042",
        "titulo": "Ler e imprimir dados",
        "explicacao": "Receba a entrada padrão e escreva a resposta sem mensagens extras, no formato solicitado.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 42
      },
      {
        "id": "ementa2026_043",
        "titulo": "Escolhas condicionais",
        "explicacao": "Use decisões simples, alternativas e condições combinadas para escolher instruções.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 43
      },
      {
        "id": "ementa2026_044",
        "titulo": "Laços simples e aninhados",
        "explicacao": "Repita operações e combine laços, verificando contadores e condições de parada.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 44
      },
      {
        "id": "ementa2026_045",
        "titulo": "Combinar condições",
        "explicacao": "Use E, OU e NÃO para construir testes e entenda a prioridade dos operadores.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 45
      },
      {
        "id": "ementa2026_046",
        "titulo": "Trabalhar com textos",
        "explicacao": "Acesse caracteres, percorra e compare strings, que são sequências de caracteres.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 46
      },
      {
        "id": "ementa2026_047",
        "titulo": "Listas e tabelas indexadas",
        "explicacao": "Use vetores de uma ou várias dimensões e respeite os limites dos índices.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 47
      },
      {
        "id": "ementa2026_048",
        "titulo": "Funções com argumentos",
        "explicacao": "Separe tarefas em funções e passe as informações necessárias por parâmetros.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 48
      },
      {
        "id": "ementa2026_049",
        "titulo": "Chamadas recursivas",
        "explicacao": "Resolva um caso por chamadas menores e defina um caso-base que encerre a execução.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 49
      },
      {
        "id": "ementa2026_050",
        "titulo": "Ocupação de memória",
        "explicacao": "Estime bytes dos tipos, alocação estática e espaço usado pela pilha de chamadas recursivas.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 50
      },
      {
        "id": "ementa2026_051",
        "titulo": "Endereços e referências",
        "explicacao": "Entenda acesso indireto a dados, referências e ponteiros nas linguagens em que se aplicam.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 51
      },
      {
        "id": "ementa2026_053",
        "titulo": "Descrever um algoritmo correto",
        "explicacao": "Defina entradas, saídas e condições antes e depois da execução; use invariantes para justificar a solução.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 53
      },
      {
        "id": "ementa2026_054",
        "titulo": "Estimar o crescimento do custo",
        "explicacao": "Analise informalmente como tempo e memória crescem com o tamanho da entrada.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54
      },
      {
        "id": "ementa2026_054_1",
        "titulo": "Notação de crescimento",
        "explicacao": "Use Big O para expressar um limite de crescimento do custo, ignorando constantes.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 1
      },
      {
        "id": "ementa2026_054_2",
        "titulo": "Comparar classes de custo",
        "explicacao": "Compare custos constantes, logarítmicos, lineares, n log n, quadráticos, cúbicos, exponenciais e fatoriais.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 2
      },
      {
        "id": "ementa2026_054_3",
        "titulo": "Trocar espaço por tempo",
        "explicacao": "Avalie quando guardar resultados usa mais memória, mas reduz o trabalho repetido.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 3
      },
      {
        "id": "ementa2026_054_4",
        "titulo": "Custo ao longo de operações",
        "explicacao": "Na análise amortizada, distribua operações caras por uma sequência de operações baratas.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 4
      },
      {
        "id": "ementa2026_055",
        "titulo": "Medir desempenho",
        "explicacao": "Execute casos de tamanhos diferentes e estime tempo e memória para comparar com os limites.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 55
      },
      {
        "id": "ementa2026_056",
        "titulo": "Percorrer dados",
        "explicacao": "Use iterações para acumular resultados, contar ocorrências ou simular passos.",
        "grupo": "PM",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 56
      },
      {
        "id": "ementa2026_057",
        "titulo": "Enumerar todas as soluções",
        "explicacao": "Teste as possibilidades com força bruta e estime se a quantidade de casos cabe no tempo disponível.",
        "grupo": "PM",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 57
      },
      {
        "id": "ementa2026_058",
        "titulo": "Escolher uma ação local",
        "explicacao": "Use uma estratégia gulosa apenas quando conseguir justificar que as escolhas locais levam à resposta correta.",
        "grupo": "PM",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 58
      },
      {
        "id": "ementa2026_062",
        "titulo": "Contar por valor",
        "explicacao": "Use um vetor de frequências para guardar quantas vezes cada valor aparece.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 62
      },
      {
        "id": "ementa2026_063",
        "titulo": "Acumular prefixos e sufixos",
        "explicacao": "Pré-calcule soma, máximo ou mínimo até cada posição para responder consultas com menos repetição.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 63
      },
      {
        "id": "ementa2026_064",
        "titulo": "Conjuntos da biblioteca",
        "explicacao": "Guarde valores sem duplicatas e consulte existência com a implementação padrão da linguagem.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 64
      },
      {
        "id": "ementa2026_065",
        "titulo": "Mapas da biblioteca",
        "explicacao": "Associe chaves a valores em um dicionário e faça consultas e atualizações.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 65
      },
      {
        "id": "ementa2026_066",
        "titulo": "Prioridades com heap",
        "explicacao": "Use a fila de prioridade da biblioteca para retirar primeiro o elemento de maior ou menor prioridade.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 66
      },
      {
        "id": "ementa2026_067",
        "titulo": "Pilha e fila",
        "explicacao": "Distinga retirar o último elemento inserido de retirar o primeiro, conforme a ordem necessária.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 67
      },
      {
        "id": "ementa2026_068",
        "titulo": "Guardar um grafo",
        "explicacao": "Compare lista de arestas, lista de adjacências e matriz de adjacências pelo uso de memória e consultas.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 68
      },
      {
        "id": "ementa2026_073",
        "titulo": "Ordenar com a biblioteca",
        "explicacao": "Use a ordenação padrão e escreva um comparador consistente; conheça seu custo de tempo.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 73
      },
      {
        "id": "ementa2026_074",
        "titulo": "Ordenar por frequência",
        "explicacao": "Conte valores em um intervalo adequado e reconstrua a sequência em ordem.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 74
      },
      {
        "id": "ementa2026_075",
        "titulo": "Mover dois índices",
        "explicacao": "Avance dois ponteiros em uma sequência para localizar faixas ou pares sem recomeçar a busca.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 75
      },
      {
        "id": "ementa2026_076",
        "titulo": "Busca pela metade",
        "explicacao": "Use busca binária em dados ordenados ou numa resposta com propriedade monotônica.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 76
      },
      {
        "id": "ementa2026_079",
        "titulo": "Converter bases",
        "explicacao": "Transforme números entre bases usando valor posicional, divisões e restos.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 79
      },
      {
        "id": "ementa2026_080",
        "titulo": "MDC por Euclides",
        "explicacao": "Encontre o maior divisor comum repetindo a divisão com resto.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 80
      },
      {
        "id": "ementa2026_081",
        "titulo": "Testar divisores",
        "explicacao": "Procure fatores até a raiz quadrada para testar primalidade e listar divisores sem duplicação.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 81
      },
      {
        "id": "ementa2026_082",
        "titulo": "Marcar primos com crivo",
        "explicacao": "Elimine múltiplos para identificar vários primos até um limite.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 82
      },
      {
        "id": "ementa2026_083",
        "titulo": "Decompor em fatores",
        "explicacao": "Decomponha inteiros por tentativas ou usando informações obtidas por um crivo.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 83
      },
      {
        "id": "ementa2026_093",
        "titulo": "Exploração em profundidade",
        "explicacao": "Use DFS para continuar por um ramo antes de retornar e explorar os outros.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93
      },
      {
        "id": "ementa2026_093_1",
        "titulo": "Componentes por DFS",
        "explicacao": "Inicie uma busca em cada vértice ainda não visitado para identificar regiões conectadas.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93,
        "subitem": 1
      },
      {
        "id": "ementa2026_093_2",
        "titulo": "Verificar bipartição",
        "explicacao": "Tente atribuir dois grupos alternadamente e detecte conflitos entre vizinhos.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93,
        "subitem": 2
      },
      {
        "id": "ementa2026_093_3",
        "titulo": "Preencher regiões",
        "explicacao": "Aplique flood fill para visitar células conectadas de uma grade respeitando as regras de vizinhança.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93,
        "subitem": 3
      },
      {
        "id": "ementa2026_094",
        "titulo": "Exploração por camadas",
        "explicacao": "Use BFS com uma fila para visitar primeiro os vértices mais próximos em número de arestas.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 94
      }
    ],
    "ementa": "https://olimpiada.ic.unicamp.br/prepare/ementas/ementa_prog/",
    "pratica": "https://olimpiada.ic.unicamp.br/pratique/pj/",
    "rotuloPratica": "Resolver tarefas deste nível",
    "versaoProgresso": "v3"
  },
  "nivel_1": {
    "titulo": "Programação Nível 1",
    "escolaridade": "Ensino Fundamental e 1º ano do Ensino Médio",
    "iniciacao": false,
    "nota": "Checklist detalhado dos itens e subtópicos da ementa oficial consultada em 25/11/2026, com explicações da Central. Inclui o conteúdo dos níveis anteriores. As técnicas de demonstração ajudam no raciocínio; a prova não pede demonstrações teóricas escritas.",
    "topicos": [
      {
        "id": "ementa2026_001",
        "titulo": "Inteiros e cálculos",
        "explicacao": "Calcule com valores positivos e negativos, potências e comparações; confira a ordem das operações.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 1
      },
      {
        "id": "ementa2026_002",
        "titulo": "Sinal, pares e divisores",
        "explicacao": "Reconheça o sinal de um inteiro, sua paridade e quando uma divisão é exata.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 2
      },
      {
        "id": "ementa2026_003",
        "titulo": "Reconhecer primos",
        "explicacao": "Diferencie números primos de compostos pela quantidade de divisores positivos.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 3
      },
      {
        "id": "ementa2026_004",
        "titulo": "Partes e percentuais",
        "explicacao": "Converta frações em porcentagens e resolva cálculos proporcionais.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 4
      },
      {
        "id": "ementa2026_005",
        "titulo": "Figuras e ângulos",
        "explicacao": "Identifique retas, segmentos, ângulos, triângulos, retângulos, quadrados e círculos em problemas.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 5
      },
      {
        "id": "ementa2026_006",
        "titulo": "Localização no plano",
        "explicacao": "Represente um ponto por coordenadas e interprete deslocamentos nos eixos.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 6
      },
      {
        "id": "ementa2026_007",
        "titulo": "Medir distâncias",
        "explicacao": "Calcule a distância em linha reta entre pontos usando suas coordenadas.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 7
      },
      {
        "id": "ementa2026_008",
        "titulo": "Relação de Pitágoras",
        "explicacao": "Relacione catetos e hipotenusa em triângulos retângulos.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 8
      },
      {
        "id": "ementa2026_009",
        "titulo": "Contas com restos",
        "explicacao": "Some, subtraia e multiplique valores considerando o resto por um módulo.",
        "grupo": "PJ",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 9
      },
      {
        "id": "ementa2026_010",
        "titulo": "Propriedades de polígonos",
        "explicacao": "Identifique lados, vértices, convexidade, cruzamentos e área de um polígono.",
        "grupo": "PJ",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 10
      },
      {
        "id": "ementa2026_011",
        "titulo": "Raciocínio formal",
        "explicacao": "Interprete afirmações, conectivos, quantificadores e implicações para justificar conclusões.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11
      },
      {
        "id": "ementa2026_011_1",
        "titulo": "Afirmações verdadeiras ou falsas",
        "explicacao": "Reconheça proposições e determine seu valor lógico a partir das condições dadas.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 1
      },
      {
        "id": "ementa2026_011_2",
        "titulo": "Conectivos de lógica",
        "explicacao": "Combine afirmações usando E, OU e NÃO e compare os resultados.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 2
      },
      {
        "id": "ementa2026_011_3",
        "titulo": "Existe ou vale para todos",
        "explicacao": "Distinga afirmações sobre um elemento daquelas que precisam valer para todos.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 3
      },
      {
        "id": "ementa2026_011_4",
        "titulo": "Se uma condição, então outra",
        "explicacao": "Identifique hipótese e conclusão de uma implicação e quando ela é falsa.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 4
      },
      {
        "id": "ementa2026_011_5",
        "titulo": "Condições equivalentes",
        "explicacao": "Interprete uma equivalência como implicações válidas nos dois sentidos.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 5
      },
      {
        "id": "ementa2026_011_6",
        "titulo": "Enumerar valores de verdade",
        "explicacao": "Monte tabelas-verdade para conferir todas as combinações das proposições.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 6
      },
      {
        "id": "ementa2026_011_7",
        "titulo": "Inferências por implicação",
        "explicacao": "Pratique Modus Ponens e Modus Tollens: concluir a consequência ou negar a hipótese conforme as premissas.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 7
      },
      {
        "id": "ementa2026_012",
        "titulo": "Argumentos e contraexemplos",
        "explicacao": "Confira ideias com prova direta, contradição ou contrapositiva; encontre exemplos que derrubem afirmações falsas.",
        "grupo": "PJ",
        "secao": "Fundamentos de Lógica",
        "referencia": 12
      },
      {
        "id": "ementa2026_013",
        "titulo": "Indução simples e forte",
        "explicacao": "Estabeleça um caso inicial e justifique a passagem para os próximos casos, usando um ou vários casos anteriores.",
        "grupo": "P1",
        "secao": "Fundamentos de Lógica",
        "referencia": 13
      },
      {
        "id": "ementa2026_014",
        "titulo": "Relacionar entradas e saídas",
        "explicacao": "Reconheça relações entre conjuntos e funções que associam uma saída a cada entrada.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 14
      },
      {
        "id": "ementa2026_015",
        "titulo": "Comparar sequências em ordem",
        "explicacao": "Compare textos ou sequências pela primeira posição diferente, como em um dicionário.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 15
      },
      {
        "id": "ementa2026_016",
        "titulo": "Operações com conjuntos",
        "explicacao": "Determine elementos comuns, reunidos ou ausentes por interseção, união e complemento.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 16
      },
      {
        "id": "ementa2026_017",
        "titulo": "Definições recursivas",
        "explicacao": "Descreva um objeto matemático por versões menores e um caso inicial.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 17
      },
      {
        "id": "ementa2026_018",
        "titulo": "Reordenações e fatorial",
        "explicacao": "Conte ordenações de elementos e calcule produtos sucessivos com a função fatorial.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 18
      },
      {
        "id": "ementa2026_019",
        "titulo": "Sequências de diferença constante",
        "explicacao": "Identifique a razão de uma progressão aritmética e calcule termos e somas.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 19
      },
      {
        "id": "ementa2026_020",
        "titulo": "Distribuir objetos em caixas",
        "explicacao": "Use o princípio da casa dos pombos para provar que alguma repetição é inevitável.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 20
      },
      {
        "id": "ementa2026_021",
        "titulo": "Contagem por soma e produto",
        "explicacao": "Some alternativas exclusivas e multiplique escolhas sucessivas sem contar casos repetidos.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 21
      },
      {
        "id": "ementa2026_022",
        "titulo": "Estados de jogos",
        "explicacao": "Classifique posições como vencedoras ou perdedoras a partir das jogadas disponíveis.",
        "grupo": "PJ",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 22
      },
      {
        "id": "ementa2026_023",
        "titulo": "Sequências de razão constante",
        "explicacao": "Calcule termos e somas em progressões geométricas.",
        "grupo": "P1",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 23
      },
      {
        "id": "ementa2026_024",
        "titulo": "Escolher sem ordenar",
        "explicacao": "Conte seleções em que a ordem dos elementos não faz diferença.",
        "grupo": "P1",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 24
      },
      {
        "id": "ementa2026_025",
        "titulo": "Coeficientes e Pascal",
        "explicacao": "Construa o triângulo de Pascal e relacione seus valores às escolhas combinatórias.",
        "grupo": "P1",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 25
      },
      {
        "id": "ementa2026_026",
        "titulo": "Corrigir contagens sobrepostas",
        "explicacao": "Some tamanhos de conjuntos e desconte interseções pelo princípio da inclusão-exclusão.",
        "grupo": "P1",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 26
      },
      {
        "id": "ementa2026_027",
        "titulo": "Ligações sem direção",
        "explicacao": "Modele vértices, arestas, vizinhança, grau e pesos em um grafo não direcionado.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 27
      },
      {
        "id": "ementa2026_028",
        "titulo": "Ligações com direção",
        "explicacao": "Modele setas e distinga o número de ligações que entram e saem de cada vértice.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 28
      },
      {
        "id": "ementa2026_029",
        "titulo": "Percursos e retornos",
        "explicacao": "Reconheça caminhos entre vértices e ciclos que retornam ao ponto de partida.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 29
      },
      {
        "id": "ementa2026_030",
        "titulo": "Grupos conectados",
        "explicacao": "Separe um grafo em regiões cujos vértices conseguem alcançar uns aos outros.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 30
      },
      {
        "id": "ementa2026_031",
        "titulo": "Contar graus e arestas",
        "explicacao": "Relacione a soma dos graus ao dobro do número de arestas em grafos não direcionados.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 31
      },
      {
        "id": "ementa2026_032",
        "titulo": "Grafos sem ciclos",
        "explicacao": "Reconheça árvores conectadas e florestas compostas por várias árvores.",
        "grupo": "PJ",
        "secao": "Conceitos de Grafos",
        "referencia": 32
      },
      {
        "id": "ementa2026_033",
        "titulo": "Hierarquia em árvores",
        "explicacao": "Escolha uma raiz e identifique folhas, parentesco, ancestrais, descendentes, subárvores e profundidade.",
        "grupo": "P1",
        "secao": "Conceitos de Grafos",
        "referencia": 33
      },
      {
        "id": "ementa2026_034",
        "titulo": "Componentes do computador",
        "explicacao": "Entenda os papéis do processador, da memória e dos demais componentes ao executar programas.",
        "grupo": "PM",
        "secao": "Informática Básica",
        "referencia": 34
      },
      {
        "id": "ementa2026_035",
        "titulo": "Usar o ambiente do computador",
        "explicacao": "Pratique janelas, editor, navegador e aplicativos básicos de Windows ou Linux. As ferramentas permitidas na prova seguem o regulamento.",
        "grupo": "PM",
        "secao": "Informática Básica",
        "referencia": 35
      },
      {
        "id": "ementa2026_036",
        "titulo": "Organizar arquivos",
        "explicacao": "Crie, copie e mova pastas e arquivos para localizar o código e os dados de treino.",
        "grupo": "PM",
        "secao": "Informática Básica",
        "referencia": 36
      },
      {
        "id": "ementa2026_037",
        "titulo": "Executar uma solução",
        "explicacao": "Escreva, compile quando necessário e rode programas por uma IDE ou pelo terminal.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 37
      },
      {
        "id": "ementa2026_038",
        "titulo": "Regras da linguagem",
        "explicacao": "Diferencie a forma válida de escrever instruções do comportamento que elas produzem.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 38
      },
      {
        "id": "ementa2026_039",
        "titulo": "Guardar e atualizar valores",
        "explicacao": "Use variáveis, expressões e atribuições para acompanhar o estado de uma solução.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 39
      },
      {
        "id": "ementa2026_040",
        "titulo": "Escolher tipos de dados",
        "explicacao": "Distinga inteiros, números reais, valores booleanos e caracteres e seus limites.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 40
      },
      {
        "id": "ementa2026_041",
        "titulo": "Operações numéricas no código",
        "explicacao": "Use soma, subtração, produto, divisão inteira ou real e resto conforme o problema.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 41
      },
      {
        "id": "ementa2026_042",
        "titulo": "Ler e imprimir dados",
        "explicacao": "Receba a entrada padrão e escreva a resposta sem mensagens extras, no formato solicitado.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 42
      },
      {
        "id": "ementa2026_043",
        "titulo": "Escolhas condicionais",
        "explicacao": "Use decisões simples, alternativas e condições combinadas para escolher instruções.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 43
      },
      {
        "id": "ementa2026_044",
        "titulo": "Laços simples e aninhados",
        "explicacao": "Repita operações e combine laços, verificando contadores e condições de parada.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 44
      },
      {
        "id": "ementa2026_045",
        "titulo": "Combinar condições",
        "explicacao": "Use E, OU e NÃO para construir testes e entenda a prioridade dos operadores.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 45
      },
      {
        "id": "ementa2026_046",
        "titulo": "Trabalhar com textos",
        "explicacao": "Acesse caracteres, percorra e compare strings, que são sequências de caracteres.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 46
      },
      {
        "id": "ementa2026_047",
        "titulo": "Listas e tabelas indexadas",
        "explicacao": "Use vetores de uma ou várias dimensões e respeite os limites dos índices.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 47
      },
      {
        "id": "ementa2026_048",
        "titulo": "Funções com argumentos",
        "explicacao": "Separe tarefas em funções e passe as informações necessárias por parâmetros.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 48
      },
      {
        "id": "ementa2026_049",
        "titulo": "Chamadas recursivas",
        "explicacao": "Resolva um caso por chamadas menores e defina um caso-base que encerre a execução.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 49
      },
      {
        "id": "ementa2026_050",
        "titulo": "Ocupação de memória",
        "explicacao": "Estime bytes dos tipos, alocação estática e espaço usado pela pilha de chamadas recursivas.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 50
      },
      {
        "id": "ementa2026_051",
        "titulo": "Endereços e referências",
        "explicacao": "Entenda acesso indireto a dados, referências e ponteiros nas linguagens em que se aplicam.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 51
      },
      {
        "id": "ementa2026_052",
        "titulo": "Manipular bits",
        "explicacao": "Represente inteiros em binário e use E, OU, XOR, negação e deslocamentos de bits.",
        "grupo": "P1",
        "secao": "Programação",
        "referencia": 52
      },
      {
        "id": "ementa2026_053",
        "titulo": "Descrever um algoritmo correto",
        "explicacao": "Defina entradas, saídas e condições antes e depois da execução; use invariantes para justificar a solução.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 53
      },
      {
        "id": "ementa2026_054",
        "titulo": "Estimar o crescimento do custo",
        "explicacao": "Analise informalmente como tempo e memória crescem com o tamanho da entrada.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54
      },
      {
        "id": "ementa2026_054_1",
        "titulo": "Notação de crescimento",
        "explicacao": "Use Big O para expressar um limite de crescimento do custo, ignorando constantes.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 1
      },
      {
        "id": "ementa2026_054_2",
        "titulo": "Comparar classes de custo",
        "explicacao": "Compare custos constantes, logarítmicos, lineares, n log n, quadráticos, cúbicos, exponenciais e fatoriais.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 2
      },
      {
        "id": "ementa2026_054_3",
        "titulo": "Trocar espaço por tempo",
        "explicacao": "Avalie quando guardar resultados usa mais memória, mas reduz o trabalho repetido.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 3
      },
      {
        "id": "ementa2026_054_4",
        "titulo": "Custo ao longo de operações",
        "explicacao": "Na análise amortizada, distribua operações caras por uma sequência de operações baratas.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 4
      },
      {
        "id": "ementa2026_055",
        "titulo": "Medir desempenho",
        "explicacao": "Execute casos de tamanhos diferentes e estime tempo e memória para comparar com os limites.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 55
      },
      {
        "id": "ementa2026_056",
        "titulo": "Percorrer dados",
        "explicacao": "Use iterações para acumular resultados, contar ocorrências ou simular passos.",
        "grupo": "PM",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 56
      },
      {
        "id": "ementa2026_057",
        "titulo": "Enumerar todas as soluções",
        "explicacao": "Teste as possibilidades com força bruta e estime se a quantidade de casos cabe no tempo disponível.",
        "grupo": "PM",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 57
      },
      {
        "id": "ementa2026_058",
        "titulo": "Escolher uma ação local",
        "explicacao": "Use uma estratégia gulosa apenas quando conseguir justificar que as escolhas locais levam à resposta correta.",
        "grupo": "PM",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 58
      },
      {
        "id": "ementa2026_059",
        "titulo": "Explorar e desfazer escolhas",
        "explicacao": "Use backtracking para tentar alternativas; faça podas quando um ramo não pode produzir uma solução.",
        "grupo": "P1",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 59
      },
      {
        "id": "ementa2026_060",
        "titulo": "Dividir e combinar",
        "explicacao": "Separe o problema em partes, resolva cada parte e combine os resultados.",
        "grupo": "P1",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 60
      },
      {
        "id": "ementa2026_061",
        "titulo": "Reutilizar subproblemas",
        "explicacao": "Defina estados, transições e casos-base de programação dinâmica para evitar repetir trabalho.",
        "grupo": "P1",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 61
      },
      {
        "id": "ementa2026_062",
        "titulo": "Contar por valor",
        "explicacao": "Use um vetor de frequências para guardar quantas vezes cada valor aparece.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 62
      },
      {
        "id": "ementa2026_063",
        "titulo": "Acumular prefixos e sufixos",
        "explicacao": "Pré-calcule soma, máximo ou mínimo até cada posição para responder consultas com menos repetição.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 63
      },
      {
        "id": "ementa2026_064",
        "titulo": "Conjuntos da biblioteca",
        "explicacao": "Guarde valores sem duplicatas e consulte existência com a implementação padrão da linguagem.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 64
      },
      {
        "id": "ementa2026_065",
        "titulo": "Mapas da biblioteca",
        "explicacao": "Associe chaves a valores em um dicionário e faça consultas e atualizações.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 65
      },
      {
        "id": "ementa2026_066",
        "titulo": "Prioridades com heap",
        "explicacao": "Use a fila de prioridade da biblioteca para retirar primeiro o elemento de maior ou menor prioridade.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 66
      },
      {
        "id": "ementa2026_067",
        "titulo": "Pilha e fila",
        "explicacao": "Distinga retirar o último elemento inserido de retirar o primeiro, conforme a ordem necessária.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 67
      },
      {
        "id": "ementa2026_068",
        "titulo": "Guardar um grafo",
        "explicacao": "Compare lista de arestas, lista de adjacências e matriz de adjacências pelo uso de memória e consultas.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 68
      },
      {
        "id": "ementa2026_069",
        "titulo": "Unir grupos com Union-Find",
        "explicacao": "Mantenha conjuntos disjuntos e consulte se dois elementos já pertencem ao mesmo grupo.",
        "grupo": "P1",
        "secao": "Estruturas de Dados",
        "referencia": 69
      },
      {
        "id": "ementa2026_070",
        "titulo": "Consultar com Fenwick",
        "explicacao": "Use uma árvore de índices binários em uma dimensão para atualizações e consultas acumuladas.",
        "grupo": "P1",
        "secao": "Estruturas de Dados",
        "referencia": 70
      },
      {
        "id": "ementa2026_073",
        "titulo": "Ordenar com a biblioteca",
        "explicacao": "Use a ordenação padrão e escreva um comparador consistente; conheça seu custo de tempo.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 73
      },
      {
        "id": "ementa2026_074",
        "titulo": "Ordenar por frequência",
        "explicacao": "Conte valores em um intervalo adequado e reconstrua a sequência em ordem.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 74
      },
      {
        "id": "ementa2026_075",
        "titulo": "Mover dois índices",
        "explicacao": "Avance dois ponteiros em uma sequência para localizar faixas ou pares sem recomeçar a busca.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 75
      },
      {
        "id": "ementa2026_076",
        "titulo": "Busca pela metade",
        "explicacao": "Use busca binária em dados ordenados ou numa resposta com propriedade monotônica.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 76
      },
      {
        "id": "ementa2026_079",
        "titulo": "Converter bases",
        "explicacao": "Transforme números entre bases usando valor posicional, divisões e restos.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 79
      },
      {
        "id": "ementa2026_080",
        "titulo": "MDC por Euclides",
        "explicacao": "Encontre o maior divisor comum repetindo a divisão com resto.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 80
      },
      {
        "id": "ementa2026_081",
        "titulo": "Testar divisores",
        "explicacao": "Procure fatores até a raiz quadrada para testar primalidade e listar divisores sem duplicação.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 81
      },
      {
        "id": "ementa2026_082",
        "titulo": "Marcar primos com crivo",
        "explicacao": "Elimine múltiplos para identificar vários primos até um limite.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 82
      },
      {
        "id": "ementa2026_083",
        "titulo": "Decompor em fatores",
        "explicacao": "Decomponha inteiros por tentativas ou usando informações obtidas por um crivo.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 83
      },
      {
        "id": "ementa2026_084",
        "titulo": "Calcular potências rapidamente",
        "explicacao": "Reduza expoentes por quadraturas sucessivas e trate os casos pares e ímpares.",
        "grupo": "P1",
        "secao": "Algoritmos de   Matemática",
        "referencia": 84
      },
      {
        "id": "ementa2026_085",
        "titulo": "Selecionar itens na mochila",
        "explicacao": "Modele limite de capacidade e valor, com ou sem repetição de itens, usando estados adequados.",
        "grupo": "P1",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 85
      },
      {
        "id": "ementa2026_086",
        "titulo": "Contar com estados",
        "explicacao": "Conte formas de construir uma solução usando programação dinâmica e casos-base corretos.",
        "grupo": "P1",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 86
      },
      {
        "id": "ementa2026_087",
        "titulo": "Estados em prefixos",
        "explicacao": "Pratique Kadane, subsequência comum e distância de edição com estados em vetores ou matrizes.",
        "grupo": "P1",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 87
      },
      {
        "id": "ementa2026_088",
        "titulo": "Decidir jogadas com estados",
        "explicacao": "Modele posições vencedoras e perdedoras e decisões adversárias com Minimax.",
        "grupo": "P1",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 88
      },
      {
        "id": "ementa2026_089",
        "titulo": "Subsequência crescente eficiente",
        "explicacao": "Encontre uma maior subsequência crescente sem exigir que seus elementos sejam consecutivos.",
        "grupo": "P1",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 89
      },
      {
        "id": "ementa2026_093",
        "titulo": "Exploração em profundidade",
        "explicacao": "Use DFS para continuar por um ramo antes de retornar e explorar os outros.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93
      },
      {
        "id": "ementa2026_093_1",
        "titulo": "Componentes por DFS",
        "explicacao": "Inicie uma busca em cada vértice ainda não visitado para identificar regiões conectadas.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93,
        "subitem": 1
      },
      {
        "id": "ementa2026_093_2",
        "titulo": "Verificar bipartição",
        "explicacao": "Tente atribuir dois grupos alternadamente e detecte conflitos entre vizinhos.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93,
        "subitem": 2
      },
      {
        "id": "ementa2026_093_3",
        "titulo": "Preencher regiões",
        "explicacao": "Aplique flood fill para visitar células conectadas de uma grade respeitando as regras de vizinhança.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93,
        "subitem": 3
      },
      {
        "id": "ementa2026_094",
        "titulo": "Exploração por camadas",
        "explicacao": "Use BFS com uma fila para visitar primeiro os vértices mais próximos em número de arestas.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 94
      },
      {
        "id": "ementa2026_095",
        "titulo": "Distâncias com Dijkstra",
        "explicacao": "Calcule caminhos mínimos com pesos não negativos e uma estrutura adequada para escolher o próximo vértice.",
        "grupo": "P1",
        "secao": "Algoritmos em Grafos",
        "referencia": 95
      },
      {
        "id": "ementa2026_096",
        "titulo": "Conectar com custo mínimo",
        "explicacao": "Use Prim ou Kruskal para construir uma árvore geradora mínima e reconheça quando o grafo não é conectado.",
        "grupo": "P1",
        "secao": "Algoritmos em Grafos",
        "referencia": 96
      },
      {
        "id": "ementa2026_097",
        "titulo": "Ordenar dependências",
        "explicacao": "Aplique Kahn para obter uma ordem topológica de um grafo direcionado sem ciclos.",
        "grupo": "P1",
        "secao": "Algoritmos em Grafos",
        "referencia": 97
      },
      {
        "id": "ementa2026_101",
        "titulo": "Agregar dados das subárvores",
        "explicacao": "Calcule, por exemplo, tamanho e folha mais distante usando resultados dos filhos.",
        "grupo": "P1",
        "secao": "Algoritmos em Árvores",
        "referencia": 101
      },
      {
        "id": "ementa2026_102",
        "titulo": "Maior distância e centro da árvore",
        "explicacao": "Encontre o diâmetro e os vértices centrais aproveitando a estrutura sem ciclos.",
        "grupo": "P1",
        "secao": "Algoritmos em Árvores",
        "referencia": 102
      }
    ],
    "ementa": "https://olimpiada.ic.unicamp.br/prepare/ementas/ementa_prog/",
    "pratica": "https://olimpiada.ic.unicamp.br/pratique/p1/",
    "rotuloPratica": "Resolver tarefas deste nível",
    "versaoProgresso": "v3"
  },
  "nivel_2": {
    "titulo": "Programação Nível 2",
    "escolaridade": "Ensino Fundamental e até o 3º ano do Ensino Médio",
    "iniciacao": false,
    "nota": "Checklist detalhado dos itens e subtópicos da ementa oficial consultada em 25/11/2026, com explicações da Central. Inclui o conteúdo dos níveis anteriores. As técnicas de demonstração ajudam no raciocínio; a prova não pede demonstrações teóricas escritas.",
    "topicos": [
      {
        "id": "ementa2026_001",
        "titulo": "Inteiros e cálculos",
        "explicacao": "Calcule com valores positivos e negativos, potências e comparações; confira a ordem das operações.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 1
      },
      {
        "id": "ementa2026_002",
        "titulo": "Sinal, pares e divisores",
        "explicacao": "Reconheça o sinal de um inteiro, sua paridade e quando uma divisão é exata.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 2
      },
      {
        "id": "ementa2026_003",
        "titulo": "Reconhecer primos",
        "explicacao": "Diferencie números primos de compostos pela quantidade de divisores positivos.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 3
      },
      {
        "id": "ementa2026_004",
        "titulo": "Partes e percentuais",
        "explicacao": "Converta frações em porcentagens e resolva cálculos proporcionais.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 4
      },
      {
        "id": "ementa2026_005",
        "titulo": "Figuras e ângulos",
        "explicacao": "Identifique retas, segmentos, ângulos, triângulos, retângulos, quadrados e círculos em problemas.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 5
      },
      {
        "id": "ementa2026_006",
        "titulo": "Localização no plano",
        "explicacao": "Represente um ponto por coordenadas e interprete deslocamentos nos eixos.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 6
      },
      {
        "id": "ementa2026_007",
        "titulo": "Medir distâncias",
        "explicacao": "Calcule a distância em linha reta entre pontos usando suas coordenadas.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 7
      },
      {
        "id": "ementa2026_008",
        "titulo": "Relação de Pitágoras",
        "explicacao": "Relacione catetos e hipotenusa em triângulos retângulos.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 8
      },
      {
        "id": "ementa2026_009",
        "titulo": "Contas com restos",
        "explicacao": "Some, subtraia e multiplique valores considerando o resto por um módulo.",
        "grupo": "PJ",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 9
      },
      {
        "id": "ementa2026_010",
        "titulo": "Propriedades de polígonos",
        "explicacao": "Identifique lados, vértices, convexidade, cruzamentos e área de um polígono.",
        "grupo": "PJ",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 10
      },
      {
        "id": "ementa2026_011",
        "titulo": "Raciocínio formal",
        "explicacao": "Interprete afirmações, conectivos, quantificadores e implicações para justificar conclusões.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11
      },
      {
        "id": "ementa2026_011_1",
        "titulo": "Afirmações verdadeiras ou falsas",
        "explicacao": "Reconheça proposições e determine seu valor lógico a partir das condições dadas.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 1
      },
      {
        "id": "ementa2026_011_2",
        "titulo": "Conectivos de lógica",
        "explicacao": "Combine afirmações usando E, OU e NÃO e compare os resultados.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 2
      },
      {
        "id": "ementa2026_011_3",
        "titulo": "Existe ou vale para todos",
        "explicacao": "Distinga afirmações sobre um elemento daquelas que precisam valer para todos.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 3
      },
      {
        "id": "ementa2026_011_4",
        "titulo": "Se uma condição, então outra",
        "explicacao": "Identifique hipótese e conclusão de uma implicação e quando ela é falsa.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 4
      },
      {
        "id": "ementa2026_011_5",
        "titulo": "Condições equivalentes",
        "explicacao": "Interprete uma equivalência como implicações válidas nos dois sentidos.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 5
      },
      {
        "id": "ementa2026_011_6",
        "titulo": "Enumerar valores de verdade",
        "explicacao": "Monte tabelas-verdade para conferir todas as combinações das proposições.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 6
      },
      {
        "id": "ementa2026_011_7",
        "titulo": "Inferências por implicação",
        "explicacao": "Pratique Modus Ponens e Modus Tollens: concluir a consequência ou negar a hipótese conforme as premissas.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 7
      },
      {
        "id": "ementa2026_012",
        "titulo": "Argumentos e contraexemplos",
        "explicacao": "Confira ideias com prova direta, contradição ou contrapositiva; encontre exemplos que derrubem afirmações falsas.",
        "grupo": "PJ",
        "secao": "Fundamentos de Lógica",
        "referencia": 12
      },
      {
        "id": "ementa2026_013",
        "titulo": "Indução simples e forte",
        "explicacao": "Estabeleça um caso inicial e justifique a passagem para os próximos casos, usando um ou vários casos anteriores.",
        "grupo": "P1",
        "secao": "Fundamentos de Lógica",
        "referencia": 13
      },
      {
        "id": "ementa2026_014",
        "titulo": "Relacionar entradas e saídas",
        "explicacao": "Reconheça relações entre conjuntos e funções que associam uma saída a cada entrada.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 14
      },
      {
        "id": "ementa2026_015",
        "titulo": "Comparar sequências em ordem",
        "explicacao": "Compare textos ou sequências pela primeira posição diferente, como em um dicionário.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 15
      },
      {
        "id": "ementa2026_016",
        "titulo": "Operações com conjuntos",
        "explicacao": "Determine elementos comuns, reunidos ou ausentes por interseção, união e complemento.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 16
      },
      {
        "id": "ementa2026_017",
        "titulo": "Definições recursivas",
        "explicacao": "Descreva um objeto matemático por versões menores e um caso inicial.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 17
      },
      {
        "id": "ementa2026_018",
        "titulo": "Reordenações e fatorial",
        "explicacao": "Conte ordenações de elementos e calcule produtos sucessivos com a função fatorial.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 18
      },
      {
        "id": "ementa2026_019",
        "titulo": "Sequências de diferença constante",
        "explicacao": "Identifique a razão de uma progressão aritmética e calcule termos e somas.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 19
      },
      {
        "id": "ementa2026_020",
        "titulo": "Distribuir objetos em caixas",
        "explicacao": "Use o princípio da casa dos pombos para provar que alguma repetição é inevitável.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 20
      },
      {
        "id": "ementa2026_021",
        "titulo": "Contagem por soma e produto",
        "explicacao": "Some alternativas exclusivas e multiplique escolhas sucessivas sem contar casos repetidos.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 21
      },
      {
        "id": "ementa2026_022",
        "titulo": "Estados de jogos",
        "explicacao": "Classifique posições como vencedoras ou perdedoras a partir das jogadas disponíveis.",
        "grupo": "PJ",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 22
      },
      {
        "id": "ementa2026_023",
        "titulo": "Sequências de razão constante",
        "explicacao": "Calcule termos e somas em progressões geométricas.",
        "grupo": "P1",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 23
      },
      {
        "id": "ementa2026_024",
        "titulo": "Escolher sem ordenar",
        "explicacao": "Conte seleções em que a ordem dos elementos não faz diferença.",
        "grupo": "P1",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 24
      },
      {
        "id": "ementa2026_025",
        "titulo": "Coeficientes e Pascal",
        "explicacao": "Construa o triângulo de Pascal e relacione seus valores às escolhas combinatórias.",
        "grupo": "P1",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 25
      },
      {
        "id": "ementa2026_026",
        "titulo": "Corrigir contagens sobrepostas",
        "explicacao": "Some tamanhos de conjuntos e desconte interseções pelo princípio da inclusão-exclusão.",
        "grupo": "P1",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 26
      },
      {
        "id": "ementa2026_027",
        "titulo": "Ligações sem direção",
        "explicacao": "Modele vértices, arestas, vizinhança, grau e pesos em um grafo não direcionado.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 27
      },
      {
        "id": "ementa2026_028",
        "titulo": "Ligações com direção",
        "explicacao": "Modele setas e distinga o número de ligações que entram e saem de cada vértice.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 28
      },
      {
        "id": "ementa2026_029",
        "titulo": "Percursos e retornos",
        "explicacao": "Reconheça caminhos entre vértices e ciclos que retornam ao ponto de partida.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 29
      },
      {
        "id": "ementa2026_030",
        "titulo": "Grupos conectados",
        "explicacao": "Separe um grafo em regiões cujos vértices conseguem alcançar uns aos outros.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 30
      },
      {
        "id": "ementa2026_031",
        "titulo": "Contar graus e arestas",
        "explicacao": "Relacione a soma dos graus ao dobro do número de arestas em grafos não direcionados.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 31
      },
      {
        "id": "ementa2026_032",
        "titulo": "Grafos sem ciclos",
        "explicacao": "Reconheça árvores conectadas e florestas compostas por várias árvores.",
        "grupo": "PJ",
        "secao": "Conceitos de Grafos",
        "referencia": 32
      },
      {
        "id": "ementa2026_033",
        "titulo": "Hierarquia em árvores",
        "explicacao": "Escolha uma raiz e identifique folhas, parentesco, ancestrais, descendentes, subárvores e profundidade.",
        "grupo": "P1",
        "secao": "Conceitos de Grafos",
        "referencia": 33
      },
      {
        "id": "ementa2026_034",
        "titulo": "Componentes do computador",
        "explicacao": "Entenda os papéis do processador, da memória e dos demais componentes ao executar programas.",
        "grupo": "PM",
        "secao": "Informática Básica",
        "referencia": 34
      },
      {
        "id": "ementa2026_035",
        "titulo": "Usar o ambiente do computador",
        "explicacao": "Pratique janelas, editor, navegador e aplicativos básicos de Windows ou Linux. As ferramentas permitidas na prova seguem o regulamento.",
        "grupo": "PM",
        "secao": "Informática Básica",
        "referencia": 35
      },
      {
        "id": "ementa2026_036",
        "titulo": "Organizar arquivos",
        "explicacao": "Crie, copie e mova pastas e arquivos para localizar o código e os dados de treino.",
        "grupo": "PM",
        "secao": "Informática Básica",
        "referencia": 36
      },
      {
        "id": "ementa2026_037",
        "titulo": "Executar uma solução",
        "explicacao": "Escreva, compile quando necessário e rode programas por uma IDE ou pelo terminal.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 37
      },
      {
        "id": "ementa2026_038",
        "titulo": "Regras da linguagem",
        "explicacao": "Diferencie a forma válida de escrever instruções do comportamento que elas produzem.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 38
      },
      {
        "id": "ementa2026_039",
        "titulo": "Guardar e atualizar valores",
        "explicacao": "Use variáveis, expressões e atribuições para acompanhar o estado de uma solução.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 39
      },
      {
        "id": "ementa2026_040",
        "titulo": "Escolher tipos de dados",
        "explicacao": "Distinga inteiros, números reais, valores booleanos e caracteres e seus limites.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 40
      },
      {
        "id": "ementa2026_041",
        "titulo": "Operações numéricas no código",
        "explicacao": "Use soma, subtração, produto, divisão inteira ou real e resto conforme o problema.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 41
      },
      {
        "id": "ementa2026_042",
        "titulo": "Ler e imprimir dados",
        "explicacao": "Receba a entrada padrão e escreva a resposta sem mensagens extras, no formato solicitado.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 42
      },
      {
        "id": "ementa2026_043",
        "titulo": "Escolhas condicionais",
        "explicacao": "Use decisões simples, alternativas e condições combinadas para escolher instruções.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 43
      },
      {
        "id": "ementa2026_044",
        "titulo": "Laços simples e aninhados",
        "explicacao": "Repita operações e combine laços, verificando contadores e condições de parada.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 44
      },
      {
        "id": "ementa2026_045",
        "titulo": "Combinar condições",
        "explicacao": "Use E, OU e NÃO para construir testes e entenda a prioridade dos operadores.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 45
      },
      {
        "id": "ementa2026_046",
        "titulo": "Trabalhar com textos",
        "explicacao": "Acesse caracteres, percorra e compare strings, que são sequências de caracteres.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 46
      },
      {
        "id": "ementa2026_047",
        "titulo": "Listas e tabelas indexadas",
        "explicacao": "Use vetores de uma ou várias dimensões e respeite os limites dos índices.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 47
      },
      {
        "id": "ementa2026_048",
        "titulo": "Funções com argumentos",
        "explicacao": "Separe tarefas em funções e passe as informações necessárias por parâmetros.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 48
      },
      {
        "id": "ementa2026_049",
        "titulo": "Chamadas recursivas",
        "explicacao": "Resolva um caso por chamadas menores e defina um caso-base que encerre a execução.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 49
      },
      {
        "id": "ementa2026_050",
        "titulo": "Ocupação de memória",
        "explicacao": "Estime bytes dos tipos, alocação estática e espaço usado pela pilha de chamadas recursivas.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 50
      },
      {
        "id": "ementa2026_051",
        "titulo": "Endereços e referências",
        "explicacao": "Entenda acesso indireto a dados, referências e ponteiros nas linguagens em que se aplicam.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 51
      },
      {
        "id": "ementa2026_052",
        "titulo": "Manipular bits",
        "explicacao": "Represente inteiros em binário e use E, OU, XOR, negação e deslocamentos de bits.",
        "grupo": "P1",
        "secao": "Programação",
        "referencia": 52
      },
      {
        "id": "ementa2026_053",
        "titulo": "Descrever um algoritmo correto",
        "explicacao": "Defina entradas, saídas e condições antes e depois da execução; use invariantes para justificar a solução.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 53
      },
      {
        "id": "ementa2026_054",
        "titulo": "Estimar o crescimento do custo",
        "explicacao": "Analise informalmente como tempo e memória crescem com o tamanho da entrada.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54
      },
      {
        "id": "ementa2026_054_1",
        "titulo": "Notação de crescimento",
        "explicacao": "Use Big O para expressar um limite de crescimento do custo, ignorando constantes.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 1
      },
      {
        "id": "ementa2026_054_2",
        "titulo": "Comparar classes de custo",
        "explicacao": "Compare custos constantes, logarítmicos, lineares, n log n, quadráticos, cúbicos, exponenciais e fatoriais.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 2
      },
      {
        "id": "ementa2026_054_3",
        "titulo": "Trocar espaço por tempo",
        "explicacao": "Avalie quando guardar resultados usa mais memória, mas reduz o trabalho repetido.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 3
      },
      {
        "id": "ementa2026_054_4",
        "titulo": "Custo ao longo de operações",
        "explicacao": "Na análise amortizada, distribua operações caras por uma sequência de operações baratas.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 4
      },
      {
        "id": "ementa2026_055",
        "titulo": "Medir desempenho",
        "explicacao": "Execute casos de tamanhos diferentes e estime tempo e memória para comparar com os limites.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 55
      },
      {
        "id": "ementa2026_056",
        "titulo": "Percorrer dados",
        "explicacao": "Use iterações para acumular resultados, contar ocorrências ou simular passos.",
        "grupo": "PM",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 56
      },
      {
        "id": "ementa2026_057",
        "titulo": "Enumerar todas as soluções",
        "explicacao": "Teste as possibilidades com força bruta e estime se a quantidade de casos cabe no tempo disponível.",
        "grupo": "PM",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 57
      },
      {
        "id": "ementa2026_058",
        "titulo": "Escolher uma ação local",
        "explicacao": "Use uma estratégia gulosa apenas quando conseguir justificar que as escolhas locais levam à resposta correta.",
        "grupo": "PM",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 58
      },
      {
        "id": "ementa2026_059",
        "titulo": "Explorar e desfazer escolhas",
        "explicacao": "Use backtracking para tentar alternativas; faça podas quando um ramo não pode produzir uma solução.",
        "grupo": "P1",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 59
      },
      {
        "id": "ementa2026_060",
        "titulo": "Dividir e combinar",
        "explicacao": "Separe o problema em partes, resolva cada parte e combine os resultados.",
        "grupo": "P1",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 60
      },
      {
        "id": "ementa2026_061",
        "titulo": "Reutilizar subproblemas",
        "explicacao": "Defina estados, transições e casos-base de programação dinâmica para evitar repetir trabalho.",
        "grupo": "P1",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 61
      },
      {
        "id": "ementa2026_062",
        "titulo": "Contar por valor",
        "explicacao": "Use um vetor de frequências para guardar quantas vezes cada valor aparece.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 62
      },
      {
        "id": "ementa2026_063",
        "titulo": "Acumular prefixos e sufixos",
        "explicacao": "Pré-calcule soma, máximo ou mínimo até cada posição para responder consultas com menos repetição.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 63
      },
      {
        "id": "ementa2026_064",
        "titulo": "Conjuntos da biblioteca",
        "explicacao": "Guarde valores sem duplicatas e consulte existência com a implementação padrão da linguagem.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 64
      },
      {
        "id": "ementa2026_065",
        "titulo": "Mapas da biblioteca",
        "explicacao": "Associe chaves a valores em um dicionário e faça consultas e atualizações.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 65
      },
      {
        "id": "ementa2026_066",
        "titulo": "Prioridades com heap",
        "explicacao": "Use a fila de prioridade da biblioteca para retirar primeiro o elemento de maior ou menor prioridade.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 66
      },
      {
        "id": "ementa2026_067",
        "titulo": "Pilha e fila",
        "explicacao": "Distinga retirar o último elemento inserido de retirar o primeiro, conforme a ordem necessária.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 67
      },
      {
        "id": "ementa2026_068",
        "titulo": "Guardar um grafo",
        "explicacao": "Compare lista de arestas, lista de adjacências e matriz de adjacências pelo uso de memória e consultas.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 68
      },
      {
        "id": "ementa2026_069",
        "titulo": "Unir grupos com Union-Find",
        "explicacao": "Mantenha conjuntos disjuntos e consulte se dois elementos já pertencem ao mesmo grupo.",
        "grupo": "P1",
        "secao": "Estruturas de Dados",
        "referencia": 69
      },
      {
        "id": "ementa2026_070",
        "titulo": "Consultar com Fenwick",
        "explicacao": "Use uma árvore de índices binários em uma dimensão para atualizações e consultas acumuladas.",
        "grupo": "P1",
        "secao": "Estruturas de Dados",
        "referencia": 70
      },
      {
        "id": "ementa2026_071",
        "titulo": "Tabela esparsa",
        "explicacao": "Pré-processe um vetor que não muda para responder consultas de mínimo em intervalos.",
        "grupo": "P2",
        "secao": "Estruturas de Dados",
        "referencia": 71
      },
      {
        "id": "ementa2026_072",
        "titulo": "Árvore de segmentos",
        "explicacao": "Organize intervalos em uma árvore e use lazy propagation para adiar atualizações em blocos.",
        "grupo": "P2",
        "secao": "Estruturas de Dados",
        "referencia": 72
      },
      {
        "id": "ementa2026_073",
        "titulo": "Ordenar com a biblioteca",
        "explicacao": "Use a ordenação padrão e escreva um comparador consistente; conheça seu custo de tempo.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 73
      },
      {
        "id": "ementa2026_074",
        "titulo": "Ordenar por frequência",
        "explicacao": "Conte valores em um intervalo adequado e reconstrua a sequência em ordem.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 74
      },
      {
        "id": "ementa2026_075",
        "titulo": "Mover dois índices",
        "explicacao": "Avance dois ponteiros em uma sequência para localizar faixas ou pares sem recomeçar a busca.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 75
      },
      {
        "id": "ementa2026_076",
        "titulo": "Busca pela metade",
        "explicacao": "Use busca binária em dados ordenados ou numa resposta com propriedade monotônica.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 76
      },
      {
        "id": "ementa2026_077",
        "titulo": "Ordenar por intercalação",
        "explicacao": "Divida a sequência, ordene as metades e intercale-as com merge sort.",
        "grupo": "P2",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 77
      },
      {
        "id": "ementa2026_078",
        "titulo": "Enumerar duas metades",
        "explicacao": "Divida as escolhas em dois grupos e combine resultados com meet-in-the-middle.",
        "grupo": "P2",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 78
      },
      {
        "id": "ementa2026_079",
        "titulo": "Converter bases",
        "explicacao": "Transforme números entre bases usando valor posicional, divisões e restos.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 79
      },
      {
        "id": "ementa2026_080",
        "titulo": "MDC por Euclides",
        "explicacao": "Encontre o maior divisor comum repetindo a divisão com resto.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 80
      },
      {
        "id": "ementa2026_081",
        "titulo": "Testar divisores",
        "explicacao": "Procure fatores até a raiz quadrada para testar primalidade e listar divisores sem duplicação.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 81
      },
      {
        "id": "ementa2026_082",
        "titulo": "Marcar primos com crivo",
        "explicacao": "Elimine múltiplos para identificar vários primos até um limite.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 82
      },
      {
        "id": "ementa2026_083",
        "titulo": "Decompor em fatores",
        "explicacao": "Decomponha inteiros por tentativas ou usando informações obtidas por um crivo.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 83
      },
      {
        "id": "ementa2026_084",
        "titulo": "Calcular potências rapidamente",
        "explicacao": "Reduza expoentes por quadraturas sucessivas e trate os casos pares e ímpares.",
        "grupo": "P1",
        "secao": "Algoritmos de   Matemática",
        "referencia": 84
      },
      {
        "id": "ementa2026_085",
        "titulo": "Selecionar itens na mochila",
        "explicacao": "Modele limite de capacidade e valor, com ou sem repetição de itens, usando estados adequados.",
        "grupo": "P1",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 85
      },
      {
        "id": "ementa2026_086",
        "titulo": "Contar com estados",
        "explicacao": "Conte formas de construir uma solução usando programação dinâmica e casos-base corretos.",
        "grupo": "P1",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 86
      },
      {
        "id": "ementa2026_087",
        "titulo": "Estados em prefixos",
        "explicacao": "Pratique Kadane, subsequência comum e distância de edição com estados em vetores ou matrizes.",
        "grupo": "P1",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 87
      },
      {
        "id": "ementa2026_088",
        "titulo": "Decidir jogadas com estados",
        "explicacao": "Modele posições vencedoras e perdedoras e decisões adversárias com Minimax.",
        "grupo": "P1",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 88
      },
      {
        "id": "ementa2026_089",
        "titulo": "Subsequência crescente eficiente",
        "explicacao": "Encontre uma maior subsequência crescente sem exigir que seus elementos sejam consecutivos.",
        "grupo": "P1",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 89
      },
      {
        "id": "ementa2026_090",
        "titulo": "Estados em grafos acíclicos",
        "explicacao": "Processe um grafo direcionado sem ciclos em ordem adequada, por exemplo para obter o caminho mais longo.",
        "grupo": "P2",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 90
      },
      {
        "id": "ementa2026_091",
        "titulo": "Estados por intervalo",
        "explicacao": "Resolva trechos menores antes dos maiores, como na escolha da ordem de multiplicação de matrizes.",
        "grupo": "P2",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 91
      },
      {
        "id": "ementa2026_092",
        "titulo": "Estados com conjuntos em bits",
        "explicacao": "Represente conjuntos visitados por máscaras de bits, por exemplo em percursos Hamiltonianos.",
        "grupo": "P2",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 92
      },
      {
        "id": "ementa2026_093",
        "titulo": "Exploração em profundidade",
        "explicacao": "Use DFS para continuar por um ramo antes de retornar e explorar os outros.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93
      },
      {
        "id": "ementa2026_093_1",
        "titulo": "Componentes por DFS",
        "explicacao": "Inicie uma busca em cada vértice ainda não visitado para identificar regiões conectadas.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93,
        "subitem": 1
      },
      {
        "id": "ementa2026_093_2",
        "titulo": "Verificar bipartição",
        "explicacao": "Tente atribuir dois grupos alternadamente e detecte conflitos entre vizinhos.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93,
        "subitem": 2
      },
      {
        "id": "ementa2026_093_3",
        "titulo": "Preencher regiões",
        "explicacao": "Aplique flood fill para visitar células conectadas de uma grade respeitando as regras de vizinhança.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93,
        "subitem": 3
      },
      {
        "id": "ementa2026_094",
        "titulo": "Exploração por camadas",
        "explicacao": "Use BFS com uma fila para visitar primeiro os vértices mais próximos em número de arestas.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 94
      },
      {
        "id": "ementa2026_095",
        "titulo": "Distâncias com Dijkstra",
        "explicacao": "Calcule caminhos mínimos com pesos não negativos e uma estrutura adequada para escolher o próximo vértice.",
        "grupo": "P1",
        "secao": "Algoritmos em Grafos",
        "referencia": 95
      },
      {
        "id": "ementa2026_096",
        "titulo": "Conectar com custo mínimo",
        "explicacao": "Use Prim ou Kruskal para construir uma árvore geradora mínima e reconheça quando o grafo não é conectado.",
        "grupo": "P1",
        "secao": "Algoritmos em Grafos",
        "referencia": 96
      },
      {
        "id": "ementa2026_097",
        "titulo": "Ordenar dependências",
        "explicacao": "Aplique Kahn para obter uma ordem topológica de um grafo direcionado sem ciclos.",
        "grupo": "P1",
        "secao": "Algoritmos em Grafos",
        "referencia": 97
      },
      {
        "id": "ementa2026_098",
        "titulo": "Outros caminhos mínimos",
        "explicacao": "Compare Bellman-Ford e Floyd-Warshall, seus custos e o tratamento de pesos negativos e ciclos negativos.",
        "grupo": "P2",
        "secao": "Algoritmos em Grafos",
        "referencia": 98
      },
      {
        "id": "ementa2026_099",
        "titulo": "Informações da árvore de DFS",
        "explicacao": "Use a estrutura formada pela busca para analisar percursos e pontos importantes do grafo.",
        "grupo": "P2",
        "secao": "Algoritmos em Grafos",
        "referencia": 99
      },
      {
        "id": "ementa2026_099_1",
        "titulo": "Percorrer todas as arestas",
        "explicacao": "Estude condições e construção de caminhos ou ciclos de Euler.",
        "grupo": "P2",
        "secao": "Algoritmos em Grafos",
        "referencia": 99,
        "subitem": 1
      },
      {
        "id": "ementa2026_099_2",
        "titulo": "Pontes e articulações",
        "explicacao": "Use as informações de descoberta da DFS nos algoritmos de Tarjan para detectar arestas ou vértices cuja remoção desconecta o grafo.",
        "grupo": "P2",
        "secao": "Algoritmos em Grafos",
        "referencia": 99,
        "subitem": 2
      },
      {
        "id": "ementa2026_100",
        "titulo": "Conexão em ambas as direções",
        "explicacao": "Encontre componentes fortemente conexas com Kosaraju ou Tarjan em grafos direcionados.",
        "grupo": "P2",
        "secao": "Algoritmos em Grafos",
        "referencia": 100
      },
      {
        "id": "ementa2026_101",
        "titulo": "Agregar dados das subárvores",
        "explicacao": "Calcule, por exemplo, tamanho e folha mais distante usando resultados dos filhos.",
        "grupo": "P1",
        "secao": "Algoritmos em Árvores",
        "referencia": 101
      },
      {
        "id": "ementa2026_102",
        "titulo": "Maior distância e centro da árvore",
        "explicacao": "Encontre o diâmetro e os vértices centrais aproveitando a estrutura sem ciclos.",
        "grupo": "P1",
        "secao": "Algoritmos em Árvores",
        "referencia": 102
      },
      {
        "id": "ementa2026_103",
        "titulo": "Grafos de sucessor único",
        "explicacao": "Decomponha grafos funcionais em ciclos e árvores ligadas a esses ciclos.",
        "grupo": "P2",
        "secao": "Algoritmos em Árvores",
        "referencia": 103
      },
      {
        "id": "ementa2026_104",
        "titulo": "Saltos e ancestral comum",
        "explicacao": "Pré-calcule saltos binários e encontre o ancestral comum mais profundo de dois vértices.",
        "grupo": "P2",
        "secao": "Algoritmos em Árvores",
        "referencia": 104
      },
      {
        "id": "ementa2026_105",
        "titulo": "Transformar árvores em sequências",
        "explicacao": "Use pré-ordem, em-ordem, pós-ordem e passeio de Euler para organizar percursos e intervalos de subárvores.",
        "grupo": "P2",
        "secao": "Algoritmos em Árvores",
        "referencia": 105
      },
      {
        "id": "ementa2026_106",
        "titulo": "Trocar a raiz dos estados",
        "explicacao": "Reaproveite resultados ao mudar a raiz com a técnica de rerooting.",
        "grupo": "P2",
        "secao": "Algoritmos em Árvores",
        "referencia": 106
      },
      {
        "id": "ementa2026_107",
        "titulo": "Unir o menor ao maior",
        "explicacao": "Combine informações de subárvores movendo a coleção menor para a maior, com small-to-large.",
        "grupo": "P2",
        "secao": "Algoritmos em Árvores",
        "referencia": 107
      },
      {
        "id": "ementa2026_108",
        "titulo": "Objetos geométricos no código",
        "explicacao": "Represente vetores, retas e segmentos e escolha tipos numéricos apropriados.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 108
      },
      {
        "id": "ementa2026_109",
        "titulo": "Reduzir coordenadas",
        "explicacao": "Substitua coordenadas por posições ordenadas sem perder as relações de ordem.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 109
      },
      {
        "id": "ementa2026_110",
        "titulo": "Produtos entre vetores",
        "explicacao": "Use produto escalar e produto vetorial para obter informações geométricas.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 110
      },
      {
        "id": "ementa2026_110_1",
        "titulo": "Três pontos alinhados",
        "explicacao": "Use o produto vetorial dos deslocamentos para testar colinearidade.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 110,
        "subitem": 1
      },
      {
        "id": "ementa2026_110_2",
        "titulo": "Vetores paralelos ou perpendiculares",
        "explicacao": "Use os produtos vetorial e escalar e trate vetores nulos conforme o problema.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 110,
        "subitem": 2
      },
      {
        "id": "ementa2026_110_3",
        "titulo": "Orientação de um giro",
        "explicacao": "Use o sinal do produto vetorial para distinguir o sentido de rotação entre dois vetores.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 110,
        "subitem": 3
      },
      {
        "id": "ementa2026_111",
        "titulo": "Cruzar retas",
        "explicacao": "Calcule a interseção de duas retas e trate paralelismo e coincidência.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 111
      },
      {
        "id": "ementa2026_112",
        "titulo": "Varreduras geométricas",
        "explicacao": "Ordene eventos por posição ou ângulo em uma varredura linear ou radial.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 112
      },
      {
        "id": "ementa2026_113",
        "titulo": "Contorno convexo",
        "explicacao": "Encontre o fecho convexo, isto é, o menor contorno convexo que envolve os pontos.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 113
      },
      {
        "id": "ementa2026_114",
        "titulo": "Área por vértices",
        "explicacao": "Calcule a área de um polígono pela fórmula do cadarço ou método equivalente.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 114
      },
      {
        "id": "ementa2026_115",
        "titulo": "Ponto dentro do polígono",
        "explicacao": "Use lançamento de raio ou método equivalente e trate pontos sobre a borda.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 115
      }
    ],
    "ementa": "https://olimpiada.ic.unicamp.br/prepare/ementas/ementa_prog/",
    "pratica": "https://olimpiada.ic.unicamp.br/pratique/p2/",
    "rotuloPratica": "Resolver tarefas deste nível",
    "versaoProgresso": "v3"
  },
  "senior": {
    "titulo": "Programação Sênior",
    "escolaridade": "4º ano técnico ou 1º ano da graduação cursado pela primeira vez",
    "iniciacao": false,
    "nota": "Checklist detalhado dos itens e subtópicos da ementa oficial consultada em 25/11/2026, com explicações da Central. Inclui o conteúdo dos níveis anteriores. As técnicas de demonstração ajudam no raciocínio; a prova não pede demonstrações teóricas escritas. Nível 2 e Sênior compartilham o escopo da ementa.",
    "topicos": [
      {
        "id": "ementa2026_001",
        "titulo": "Inteiros e cálculos",
        "explicacao": "Calcule com valores positivos e negativos, potências e comparações; confira a ordem das operações.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 1
      },
      {
        "id": "ementa2026_002",
        "titulo": "Sinal, pares e divisores",
        "explicacao": "Reconheça o sinal de um inteiro, sua paridade e quando uma divisão é exata.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 2
      },
      {
        "id": "ementa2026_003",
        "titulo": "Reconhecer primos",
        "explicacao": "Diferencie números primos de compostos pela quantidade de divisores positivos.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 3
      },
      {
        "id": "ementa2026_004",
        "titulo": "Partes e percentuais",
        "explicacao": "Converta frações em porcentagens e resolva cálculos proporcionais.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 4
      },
      {
        "id": "ementa2026_005",
        "titulo": "Figuras e ângulos",
        "explicacao": "Identifique retas, segmentos, ângulos, triângulos, retângulos, quadrados e círculos em problemas.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 5
      },
      {
        "id": "ementa2026_006",
        "titulo": "Localização no plano",
        "explicacao": "Represente um ponto por coordenadas e interprete deslocamentos nos eixos.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 6
      },
      {
        "id": "ementa2026_007",
        "titulo": "Medir distâncias",
        "explicacao": "Calcule a distância em linha reta entre pontos usando suas coordenadas.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 7
      },
      {
        "id": "ementa2026_008",
        "titulo": "Relação de Pitágoras",
        "explicacao": "Relacione catetos e hipotenusa em triângulos retângulos.",
        "grupo": "PM",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 8
      },
      {
        "id": "ementa2026_009",
        "titulo": "Contas com restos",
        "explicacao": "Some, subtraia e multiplique valores considerando o resto por um módulo.",
        "grupo": "PJ",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 9
      },
      {
        "id": "ementa2026_010",
        "titulo": "Propriedades de polígonos",
        "explicacao": "Identifique lados, vértices, convexidade, cruzamentos e área de um polígono.",
        "grupo": "PJ",
        "secao": "Conceitos de Aritmética e   Geometria",
        "referencia": 10
      },
      {
        "id": "ementa2026_011",
        "titulo": "Raciocínio formal",
        "explicacao": "Interprete afirmações, conectivos, quantificadores e implicações para justificar conclusões.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11
      },
      {
        "id": "ementa2026_011_1",
        "titulo": "Afirmações verdadeiras ou falsas",
        "explicacao": "Reconheça proposições e determine seu valor lógico a partir das condições dadas.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 1
      },
      {
        "id": "ementa2026_011_2",
        "titulo": "Conectivos de lógica",
        "explicacao": "Combine afirmações usando E, OU e NÃO e compare os resultados.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 2
      },
      {
        "id": "ementa2026_011_3",
        "titulo": "Existe ou vale para todos",
        "explicacao": "Distinga afirmações sobre um elemento daquelas que precisam valer para todos.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 3
      },
      {
        "id": "ementa2026_011_4",
        "titulo": "Se uma condição, então outra",
        "explicacao": "Identifique hipótese e conclusão de uma implicação e quando ela é falsa.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 4
      },
      {
        "id": "ementa2026_011_5",
        "titulo": "Condições equivalentes",
        "explicacao": "Interprete uma equivalência como implicações válidas nos dois sentidos.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 5
      },
      {
        "id": "ementa2026_011_6",
        "titulo": "Enumerar valores de verdade",
        "explicacao": "Monte tabelas-verdade para conferir todas as combinações das proposições.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 6
      },
      {
        "id": "ementa2026_011_7",
        "titulo": "Inferências por implicação",
        "explicacao": "Pratique Modus Ponens e Modus Tollens: concluir a consequência ou negar a hipótese conforme as premissas.",
        "grupo": "PM",
        "secao": "Fundamentos de Lógica",
        "referencia": 11,
        "subitem": 7
      },
      {
        "id": "ementa2026_012",
        "titulo": "Argumentos e contraexemplos",
        "explicacao": "Confira ideias com prova direta, contradição ou contrapositiva; encontre exemplos que derrubem afirmações falsas.",
        "grupo": "PJ",
        "secao": "Fundamentos de Lógica",
        "referencia": 12
      },
      {
        "id": "ementa2026_013",
        "titulo": "Indução simples e forte",
        "explicacao": "Estabeleça um caso inicial e justifique a passagem para os próximos casos, usando um ou vários casos anteriores.",
        "grupo": "P1",
        "secao": "Fundamentos de Lógica",
        "referencia": 13
      },
      {
        "id": "ementa2026_014",
        "titulo": "Relacionar entradas e saídas",
        "explicacao": "Reconheça relações entre conjuntos e funções que associam uma saída a cada entrada.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 14
      },
      {
        "id": "ementa2026_015",
        "titulo": "Comparar sequências em ordem",
        "explicacao": "Compare textos ou sequências pela primeira posição diferente, como em um dicionário.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 15
      },
      {
        "id": "ementa2026_016",
        "titulo": "Operações com conjuntos",
        "explicacao": "Determine elementos comuns, reunidos ou ausentes por interseção, união e complemento.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 16
      },
      {
        "id": "ementa2026_017",
        "titulo": "Definições recursivas",
        "explicacao": "Descreva um objeto matemático por versões menores e um caso inicial.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 17
      },
      {
        "id": "ementa2026_018",
        "titulo": "Reordenações e fatorial",
        "explicacao": "Conte ordenações de elementos e calcule produtos sucessivos com a função fatorial.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 18
      },
      {
        "id": "ementa2026_019",
        "titulo": "Sequências de diferença constante",
        "explicacao": "Identifique a razão de uma progressão aritmética e calcule termos e somas.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 19
      },
      {
        "id": "ementa2026_020",
        "titulo": "Distribuir objetos em caixas",
        "explicacao": "Use o princípio da casa dos pombos para provar que alguma repetição é inevitável.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 20
      },
      {
        "id": "ementa2026_021",
        "titulo": "Contagem por soma e produto",
        "explicacao": "Some alternativas exclusivas e multiplique escolhas sucessivas sem contar casos repetidos.",
        "grupo": "PM",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 21
      },
      {
        "id": "ementa2026_022",
        "titulo": "Estados de jogos",
        "explicacao": "Classifique posições como vencedoras ou perdedoras a partir das jogadas disponíveis.",
        "grupo": "PJ",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 22
      },
      {
        "id": "ementa2026_023",
        "titulo": "Sequências de razão constante",
        "explicacao": "Calcule termos e somas em progressões geométricas.",
        "grupo": "P1",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 23
      },
      {
        "id": "ementa2026_024",
        "titulo": "Escolher sem ordenar",
        "explicacao": "Conte seleções em que a ordem dos elementos não faz diferença.",
        "grupo": "P1",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 24
      },
      {
        "id": "ementa2026_025",
        "titulo": "Coeficientes e Pascal",
        "explicacao": "Construa o triângulo de Pascal e relacione seus valores às escolhas combinatórias.",
        "grupo": "P1",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 25
      },
      {
        "id": "ementa2026_026",
        "titulo": "Corrigir contagens sobrepostas",
        "explicacao": "Some tamanhos de conjuntos e desconte interseções pelo princípio da inclusão-exclusão.",
        "grupo": "P1",
        "secao": "Conceitos de Matemática   Discreta",
        "referencia": 26
      },
      {
        "id": "ementa2026_027",
        "titulo": "Ligações sem direção",
        "explicacao": "Modele vértices, arestas, vizinhança, grau e pesos em um grafo não direcionado.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 27
      },
      {
        "id": "ementa2026_028",
        "titulo": "Ligações com direção",
        "explicacao": "Modele setas e distinga o número de ligações que entram e saem de cada vértice.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 28
      },
      {
        "id": "ementa2026_029",
        "titulo": "Percursos e retornos",
        "explicacao": "Reconheça caminhos entre vértices e ciclos que retornam ao ponto de partida.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 29
      },
      {
        "id": "ementa2026_030",
        "titulo": "Grupos conectados",
        "explicacao": "Separe um grafo em regiões cujos vértices conseguem alcançar uns aos outros.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 30
      },
      {
        "id": "ementa2026_031",
        "titulo": "Contar graus e arestas",
        "explicacao": "Relacione a soma dos graus ao dobro do número de arestas em grafos não direcionados.",
        "grupo": "PM",
        "secao": "Conceitos de Grafos",
        "referencia": 31
      },
      {
        "id": "ementa2026_032",
        "titulo": "Grafos sem ciclos",
        "explicacao": "Reconheça árvores conectadas e florestas compostas por várias árvores.",
        "grupo": "PJ",
        "secao": "Conceitos de Grafos",
        "referencia": 32
      },
      {
        "id": "ementa2026_033",
        "titulo": "Hierarquia em árvores",
        "explicacao": "Escolha uma raiz e identifique folhas, parentesco, ancestrais, descendentes, subárvores e profundidade.",
        "grupo": "P1",
        "secao": "Conceitos de Grafos",
        "referencia": 33
      },
      {
        "id": "ementa2026_034",
        "titulo": "Componentes do computador",
        "explicacao": "Entenda os papéis do processador, da memória e dos demais componentes ao executar programas.",
        "grupo": "PM",
        "secao": "Informática Básica",
        "referencia": 34
      },
      {
        "id": "ementa2026_035",
        "titulo": "Usar o ambiente do computador",
        "explicacao": "Pratique janelas, editor, navegador e aplicativos básicos de Windows ou Linux. As ferramentas permitidas na prova seguem o regulamento.",
        "grupo": "PM",
        "secao": "Informática Básica",
        "referencia": 35
      },
      {
        "id": "ementa2026_036",
        "titulo": "Organizar arquivos",
        "explicacao": "Crie, copie e mova pastas e arquivos para localizar o código e os dados de treino.",
        "grupo": "PM",
        "secao": "Informática Básica",
        "referencia": 36
      },
      {
        "id": "ementa2026_037",
        "titulo": "Executar uma solução",
        "explicacao": "Escreva, compile quando necessário e rode programas por uma IDE ou pelo terminal.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 37
      },
      {
        "id": "ementa2026_038",
        "titulo": "Regras da linguagem",
        "explicacao": "Diferencie a forma válida de escrever instruções do comportamento que elas produzem.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 38
      },
      {
        "id": "ementa2026_039",
        "titulo": "Guardar e atualizar valores",
        "explicacao": "Use variáveis, expressões e atribuições para acompanhar o estado de uma solução.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 39
      },
      {
        "id": "ementa2026_040",
        "titulo": "Escolher tipos de dados",
        "explicacao": "Distinga inteiros, números reais, valores booleanos e caracteres e seus limites.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 40
      },
      {
        "id": "ementa2026_041",
        "titulo": "Operações numéricas no código",
        "explicacao": "Use soma, subtração, produto, divisão inteira ou real e resto conforme o problema.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 41
      },
      {
        "id": "ementa2026_042",
        "titulo": "Ler e imprimir dados",
        "explicacao": "Receba a entrada padrão e escreva a resposta sem mensagens extras, no formato solicitado.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 42
      },
      {
        "id": "ementa2026_043",
        "titulo": "Escolhas condicionais",
        "explicacao": "Use decisões simples, alternativas e condições combinadas para escolher instruções.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 43
      },
      {
        "id": "ementa2026_044",
        "titulo": "Laços simples e aninhados",
        "explicacao": "Repita operações e combine laços, verificando contadores e condições de parada.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 44
      },
      {
        "id": "ementa2026_045",
        "titulo": "Combinar condições",
        "explicacao": "Use E, OU e NÃO para construir testes e entenda a prioridade dos operadores.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 45
      },
      {
        "id": "ementa2026_046",
        "titulo": "Trabalhar com textos",
        "explicacao": "Acesse caracteres, percorra e compare strings, que são sequências de caracteres.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 46
      },
      {
        "id": "ementa2026_047",
        "titulo": "Listas e tabelas indexadas",
        "explicacao": "Use vetores de uma ou várias dimensões e respeite os limites dos índices.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 47
      },
      {
        "id": "ementa2026_048",
        "titulo": "Funções com argumentos",
        "explicacao": "Separe tarefas em funções e passe as informações necessárias por parâmetros.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 48
      },
      {
        "id": "ementa2026_049",
        "titulo": "Chamadas recursivas",
        "explicacao": "Resolva um caso por chamadas menores e defina um caso-base que encerre a execução.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 49
      },
      {
        "id": "ementa2026_050",
        "titulo": "Ocupação de memória",
        "explicacao": "Estime bytes dos tipos, alocação estática e espaço usado pela pilha de chamadas recursivas.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 50
      },
      {
        "id": "ementa2026_051",
        "titulo": "Endereços e referências",
        "explicacao": "Entenda acesso indireto a dados, referências e ponteiros nas linguagens em que se aplicam.",
        "grupo": "PM",
        "secao": "Programação",
        "referencia": 51
      },
      {
        "id": "ementa2026_052",
        "titulo": "Manipular bits",
        "explicacao": "Represente inteiros em binário e use E, OU, XOR, negação e deslocamentos de bits.",
        "grupo": "P1",
        "secao": "Programação",
        "referencia": 52
      },
      {
        "id": "ementa2026_053",
        "titulo": "Descrever um algoritmo correto",
        "explicacao": "Defina entradas, saídas e condições antes e depois da execução; use invariantes para justificar a solução.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 53
      },
      {
        "id": "ementa2026_054",
        "titulo": "Estimar o crescimento do custo",
        "explicacao": "Analise informalmente como tempo e memória crescem com o tamanho da entrada.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54
      },
      {
        "id": "ementa2026_054_1",
        "titulo": "Notação de crescimento",
        "explicacao": "Use Big O para expressar um limite de crescimento do custo, ignorando constantes.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 1
      },
      {
        "id": "ementa2026_054_2",
        "titulo": "Comparar classes de custo",
        "explicacao": "Compare custos constantes, logarítmicos, lineares, n log n, quadráticos, cúbicos, exponenciais e fatoriais.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 2
      },
      {
        "id": "ementa2026_054_3",
        "titulo": "Trocar espaço por tempo",
        "explicacao": "Avalie quando guardar resultados usa mais memória, mas reduz o trabalho repetido.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 3
      },
      {
        "id": "ementa2026_054_4",
        "titulo": "Custo ao longo de operações",
        "explicacao": "Na análise amortizada, distribua operações caras por uma sequência de operações baratas.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 54,
        "subitem": 4
      },
      {
        "id": "ementa2026_055",
        "titulo": "Medir desempenho",
        "explicacao": "Execute casos de tamanhos diferentes e estime tempo e memória para comparar com os limites.",
        "grupo": "PM",
        "secao": "Fundamentos de Análise de   Algoritmos",
        "referencia": 55
      },
      {
        "id": "ementa2026_056",
        "titulo": "Percorrer dados",
        "explicacao": "Use iterações para acumular resultados, contar ocorrências ou simular passos.",
        "grupo": "PM",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 56
      },
      {
        "id": "ementa2026_057",
        "titulo": "Enumerar todas as soluções",
        "explicacao": "Teste as possibilidades com força bruta e estime se a quantidade de casos cabe no tempo disponível.",
        "grupo": "PM",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 57
      },
      {
        "id": "ementa2026_058",
        "titulo": "Escolher uma ação local",
        "explicacao": "Use uma estratégia gulosa apenas quando conseguir justificar que as escolhas locais levam à resposta correta.",
        "grupo": "PM",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 58
      },
      {
        "id": "ementa2026_059",
        "titulo": "Explorar e desfazer escolhas",
        "explicacao": "Use backtracking para tentar alternativas; faça podas quando um ramo não pode produzir uma solução.",
        "grupo": "P1",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 59
      },
      {
        "id": "ementa2026_060",
        "titulo": "Dividir e combinar",
        "explicacao": "Separe o problema em partes, resolva cada parte e combine os resultados.",
        "grupo": "P1",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 60
      },
      {
        "id": "ementa2026_061",
        "titulo": "Reutilizar subproblemas",
        "explicacao": "Defina estados, transições e casos-base de programação dinâmica para evitar repetir trabalho.",
        "grupo": "P1",
        "secao": "Estratégias de   Algoritmos",
        "referencia": 61
      },
      {
        "id": "ementa2026_062",
        "titulo": "Contar por valor",
        "explicacao": "Use um vetor de frequências para guardar quantas vezes cada valor aparece.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 62
      },
      {
        "id": "ementa2026_063",
        "titulo": "Acumular prefixos e sufixos",
        "explicacao": "Pré-calcule soma, máximo ou mínimo até cada posição para responder consultas com menos repetição.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 63
      },
      {
        "id": "ementa2026_064",
        "titulo": "Conjuntos da biblioteca",
        "explicacao": "Guarde valores sem duplicatas e consulte existência com a implementação padrão da linguagem.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 64
      },
      {
        "id": "ementa2026_065",
        "titulo": "Mapas da biblioteca",
        "explicacao": "Associe chaves a valores em um dicionário e faça consultas e atualizações.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 65
      },
      {
        "id": "ementa2026_066",
        "titulo": "Prioridades com heap",
        "explicacao": "Use a fila de prioridade da biblioteca para retirar primeiro o elemento de maior ou menor prioridade.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 66
      },
      {
        "id": "ementa2026_067",
        "titulo": "Pilha e fila",
        "explicacao": "Distinga retirar o último elemento inserido de retirar o primeiro, conforme a ordem necessária.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 67
      },
      {
        "id": "ementa2026_068",
        "titulo": "Guardar um grafo",
        "explicacao": "Compare lista de arestas, lista de adjacências e matriz de adjacências pelo uso de memória e consultas.",
        "grupo": "PM",
        "secao": "Estruturas de Dados",
        "referencia": 68
      },
      {
        "id": "ementa2026_069",
        "titulo": "Unir grupos com Union-Find",
        "explicacao": "Mantenha conjuntos disjuntos e consulte se dois elementos já pertencem ao mesmo grupo.",
        "grupo": "P1",
        "secao": "Estruturas de Dados",
        "referencia": 69
      },
      {
        "id": "ementa2026_070",
        "titulo": "Consultar com Fenwick",
        "explicacao": "Use uma árvore de índices binários em uma dimensão para atualizações e consultas acumuladas.",
        "grupo": "P1",
        "secao": "Estruturas de Dados",
        "referencia": 70
      },
      {
        "id": "ementa2026_071",
        "titulo": "Tabela esparsa",
        "explicacao": "Pré-processe um vetor que não muda para responder consultas de mínimo em intervalos.",
        "grupo": "P2",
        "secao": "Estruturas de Dados",
        "referencia": 71
      },
      {
        "id": "ementa2026_072",
        "titulo": "Árvore de segmentos",
        "explicacao": "Organize intervalos em uma árvore e use lazy propagation para adiar atualizações em blocos.",
        "grupo": "P2",
        "secao": "Estruturas de Dados",
        "referencia": 72
      },
      {
        "id": "ementa2026_073",
        "titulo": "Ordenar com a biblioteca",
        "explicacao": "Use a ordenação padrão e escreva um comparador consistente; conheça seu custo de tempo.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 73
      },
      {
        "id": "ementa2026_074",
        "titulo": "Ordenar por frequência",
        "explicacao": "Conte valores em um intervalo adequado e reconstrua a sequência em ordem.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 74
      },
      {
        "id": "ementa2026_075",
        "titulo": "Mover dois índices",
        "explicacao": "Avance dois ponteiros em uma sequência para localizar faixas ou pares sem recomeçar a busca.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 75
      },
      {
        "id": "ementa2026_076",
        "titulo": "Busca pela metade",
        "explicacao": "Use busca binária em dados ordenados ou numa resposta com propriedade monotônica.",
        "grupo": "PM",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 76
      },
      {
        "id": "ementa2026_077",
        "titulo": "Ordenar por intercalação",
        "explicacao": "Divida a sequência, ordene as metades e intercale-as com merge sort.",
        "grupo": "P2",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 77
      },
      {
        "id": "ementa2026_078",
        "titulo": "Enumerar duas metades",
        "explicacao": "Divida as escolhas em dois grupos e combine resultados com meet-in-the-middle.",
        "grupo": "P2",
        "secao": "Algoritmos de Ordenação e   Busca",
        "referencia": 78
      },
      {
        "id": "ementa2026_079",
        "titulo": "Converter bases",
        "explicacao": "Transforme números entre bases usando valor posicional, divisões e restos.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 79
      },
      {
        "id": "ementa2026_080",
        "titulo": "MDC por Euclides",
        "explicacao": "Encontre o maior divisor comum repetindo a divisão com resto.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 80
      },
      {
        "id": "ementa2026_081",
        "titulo": "Testar divisores",
        "explicacao": "Procure fatores até a raiz quadrada para testar primalidade e listar divisores sem duplicação.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 81
      },
      {
        "id": "ementa2026_082",
        "titulo": "Marcar primos com crivo",
        "explicacao": "Elimine múltiplos para identificar vários primos até um limite.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 82
      },
      {
        "id": "ementa2026_083",
        "titulo": "Decompor em fatores",
        "explicacao": "Decomponha inteiros por tentativas ou usando informações obtidas por um crivo.",
        "grupo": "PM",
        "secao": "Algoritmos de   Matemática",
        "referencia": 83
      },
      {
        "id": "ementa2026_084",
        "titulo": "Calcular potências rapidamente",
        "explicacao": "Reduza expoentes por quadraturas sucessivas e trate os casos pares e ímpares.",
        "grupo": "P1",
        "secao": "Algoritmos de   Matemática",
        "referencia": 84
      },
      {
        "id": "ementa2026_085",
        "titulo": "Selecionar itens na mochila",
        "explicacao": "Modele limite de capacidade e valor, com ou sem repetição de itens, usando estados adequados.",
        "grupo": "P1",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 85
      },
      {
        "id": "ementa2026_086",
        "titulo": "Contar com estados",
        "explicacao": "Conte formas de construir uma solução usando programação dinâmica e casos-base corretos.",
        "grupo": "P1",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 86
      },
      {
        "id": "ementa2026_087",
        "titulo": "Estados em prefixos",
        "explicacao": "Pratique Kadane, subsequência comum e distância de edição com estados em vetores ou matrizes.",
        "grupo": "P1",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 87
      },
      {
        "id": "ementa2026_088",
        "titulo": "Decidir jogadas com estados",
        "explicacao": "Modele posições vencedoras e perdedoras e decisões adversárias com Minimax.",
        "grupo": "P1",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 88
      },
      {
        "id": "ementa2026_089",
        "titulo": "Subsequência crescente eficiente",
        "explicacao": "Encontre uma maior subsequência crescente sem exigir que seus elementos sejam consecutivos.",
        "grupo": "P1",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 89
      },
      {
        "id": "ementa2026_090",
        "titulo": "Estados em grafos acíclicos",
        "explicacao": "Processe um grafo direcionado sem ciclos em ordem adequada, por exemplo para obter o caminho mais longo.",
        "grupo": "P2",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 90
      },
      {
        "id": "ementa2026_091",
        "titulo": "Estados por intervalo",
        "explicacao": "Resolva trechos menores antes dos maiores, como na escolha da ordem de multiplicação de matrizes.",
        "grupo": "P2",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 91
      },
      {
        "id": "ementa2026_092",
        "titulo": "Estados com conjuntos em bits",
        "explicacao": "Represente conjuntos visitados por máscaras de bits, por exemplo em percursos Hamiltonianos.",
        "grupo": "P2",
        "secao": "Algoritmos de Programação   Dinâmica",
        "referencia": 92
      },
      {
        "id": "ementa2026_093",
        "titulo": "Exploração em profundidade",
        "explicacao": "Use DFS para continuar por um ramo antes de retornar e explorar os outros.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93
      },
      {
        "id": "ementa2026_093_1",
        "titulo": "Componentes por DFS",
        "explicacao": "Inicie uma busca em cada vértice ainda não visitado para identificar regiões conectadas.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93,
        "subitem": 1
      },
      {
        "id": "ementa2026_093_2",
        "titulo": "Verificar bipartição",
        "explicacao": "Tente atribuir dois grupos alternadamente e detecte conflitos entre vizinhos.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93,
        "subitem": 2
      },
      {
        "id": "ementa2026_093_3",
        "titulo": "Preencher regiões",
        "explicacao": "Aplique flood fill para visitar células conectadas de uma grade respeitando as regras de vizinhança.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 93,
        "subitem": 3
      },
      {
        "id": "ementa2026_094",
        "titulo": "Exploração por camadas",
        "explicacao": "Use BFS com uma fila para visitar primeiro os vértices mais próximos em número de arestas.",
        "grupo": "PM",
        "secao": "Algoritmos em Grafos",
        "referencia": 94
      },
      {
        "id": "ementa2026_095",
        "titulo": "Distâncias com Dijkstra",
        "explicacao": "Calcule caminhos mínimos com pesos não negativos e uma estrutura adequada para escolher o próximo vértice.",
        "grupo": "P1",
        "secao": "Algoritmos em Grafos",
        "referencia": 95
      },
      {
        "id": "ementa2026_096",
        "titulo": "Conectar com custo mínimo",
        "explicacao": "Use Prim ou Kruskal para construir uma árvore geradora mínima e reconheça quando o grafo não é conectado.",
        "grupo": "P1",
        "secao": "Algoritmos em Grafos",
        "referencia": 96
      },
      {
        "id": "ementa2026_097",
        "titulo": "Ordenar dependências",
        "explicacao": "Aplique Kahn para obter uma ordem topológica de um grafo direcionado sem ciclos.",
        "grupo": "P1",
        "secao": "Algoritmos em Grafos",
        "referencia": 97
      },
      {
        "id": "ementa2026_098",
        "titulo": "Outros caminhos mínimos",
        "explicacao": "Compare Bellman-Ford e Floyd-Warshall, seus custos e o tratamento de pesos negativos e ciclos negativos.",
        "grupo": "P2",
        "secao": "Algoritmos em Grafos",
        "referencia": 98
      },
      {
        "id": "ementa2026_099",
        "titulo": "Informações da árvore de DFS",
        "explicacao": "Use a estrutura formada pela busca para analisar percursos e pontos importantes do grafo.",
        "grupo": "P2",
        "secao": "Algoritmos em Grafos",
        "referencia": 99
      },
      {
        "id": "ementa2026_099_1",
        "titulo": "Percorrer todas as arestas",
        "explicacao": "Estude condições e construção de caminhos ou ciclos de Euler.",
        "grupo": "P2",
        "secao": "Algoritmos em Grafos",
        "referencia": 99,
        "subitem": 1
      },
      {
        "id": "ementa2026_099_2",
        "titulo": "Pontes e articulações",
        "explicacao": "Use as informações de descoberta da DFS nos algoritmos de Tarjan para detectar arestas ou vértices cuja remoção desconecta o grafo.",
        "grupo": "P2",
        "secao": "Algoritmos em Grafos",
        "referencia": 99,
        "subitem": 2
      },
      {
        "id": "ementa2026_100",
        "titulo": "Conexão em ambas as direções",
        "explicacao": "Encontre componentes fortemente conexas com Kosaraju ou Tarjan em grafos direcionados.",
        "grupo": "P2",
        "secao": "Algoritmos em Grafos",
        "referencia": 100
      },
      {
        "id": "ementa2026_101",
        "titulo": "Agregar dados das subárvores",
        "explicacao": "Calcule, por exemplo, tamanho e folha mais distante usando resultados dos filhos.",
        "grupo": "P1",
        "secao": "Algoritmos em Árvores",
        "referencia": 101
      },
      {
        "id": "ementa2026_102",
        "titulo": "Maior distância e centro da árvore",
        "explicacao": "Encontre o diâmetro e os vértices centrais aproveitando a estrutura sem ciclos.",
        "grupo": "P1",
        "secao": "Algoritmos em Árvores",
        "referencia": 102
      },
      {
        "id": "ementa2026_103",
        "titulo": "Grafos de sucessor único",
        "explicacao": "Decomponha grafos funcionais em ciclos e árvores ligadas a esses ciclos.",
        "grupo": "P2",
        "secao": "Algoritmos em Árvores",
        "referencia": 103
      },
      {
        "id": "ementa2026_104",
        "titulo": "Saltos e ancestral comum",
        "explicacao": "Pré-calcule saltos binários e encontre o ancestral comum mais profundo de dois vértices.",
        "grupo": "P2",
        "secao": "Algoritmos em Árvores",
        "referencia": 104
      },
      {
        "id": "ementa2026_105",
        "titulo": "Transformar árvores em sequências",
        "explicacao": "Use pré-ordem, em-ordem, pós-ordem e passeio de Euler para organizar percursos e intervalos de subárvores.",
        "grupo": "P2",
        "secao": "Algoritmos em Árvores",
        "referencia": 105
      },
      {
        "id": "ementa2026_106",
        "titulo": "Trocar a raiz dos estados",
        "explicacao": "Reaproveite resultados ao mudar a raiz com a técnica de rerooting.",
        "grupo": "P2",
        "secao": "Algoritmos em Árvores",
        "referencia": 106
      },
      {
        "id": "ementa2026_107",
        "titulo": "Unir o menor ao maior",
        "explicacao": "Combine informações de subárvores movendo a coleção menor para a maior, com small-to-large.",
        "grupo": "P2",
        "secao": "Algoritmos em Árvores",
        "referencia": 107
      },
      {
        "id": "ementa2026_108",
        "titulo": "Objetos geométricos no código",
        "explicacao": "Represente vetores, retas e segmentos e escolha tipos numéricos apropriados.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 108
      },
      {
        "id": "ementa2026_109",
        "titulo": "Reduzir coordenadas",
        "explicacao": "Substitua coordenadas por posições ordenadas sem perder as relações de ordem.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 109
      },
      {
        "id": "ementa2026_110",
        "titulo": "Produtos entre vetores",
        "explicacao": "Use produto escalar e produto vetorial para obter informações geométricas.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 110
      },
      {
        "id": "ementa2026_110_1",
        "titulo": "Três pontos alinhados",
        "explicacao": "Use o produto vetorial dos deslocamentos para testar colinearidade.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 110,
        "subitem": 1
      },
      {
        "id": "ementa2026_110_2",
        "titulo": "Vetores paralelos ou perpendiculares",
        "explicacao": "Use os produtos vetorial e escalar e trate vetores nulos conforme o problema.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 110,
        "subitem": 2
      },
      {
        "id": "ementa2026_110_3",
        "titulo": "Orientação de um giro",
        "explicacao": "Use o sinal do produto vetorial para distinguir o sentido de rotação entre dois vetores.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 110,
        "subitem": 3
      },
      {
        "id": "ementa2026_111",
        "titulo": "Cruzar retas",
        "explicacao": "Calcule a interseção de duas retas e trate paralelismo e coincidência.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 111
      },
      {
        "id": "ementa2026_112",
        "titulo": "Varreduras geométricas",
        "explicacao": "Ordene eventos por posição ou ângulo em uma varredura linear ou radial.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 112
      },
      {
        "id": "ementa2026_113",
        "titulo": "Contorno convexo",
        "explicacao": "Encontre o fecho convexo, isto é, o menor contorno convexo que envolve os pontos.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 113
      },
      {
        "id": "ementa2026_114",
        "titulo": "Área por vértices",
        "explicacao": "Calcule a área de um polígono pela fórmula do cadarço ou método equivalente.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 114
      },
      {
        "id": "ementa2026_115",
        "titulo": "Ponto dentro do polígono",
        "explicacao": "Use lançamento de raio ou método equivalente e trate pontos sobre a borda.",
        "grupo": "P2",
        "secao": "Algoritmos de Geometria",
        "referencia": 115
      }
    ],
    "ementa": "https://olimpiada.ic.unicamp.br/prepare/ementas/ementa_prog/",
    "pratica": "https://olimpiada.ic.unicamp.br/pratique/pu/",
    "rotuloPratica": "Resolver tarefas deste nível",
    "versaoProgresso": "v3"
  }
};
 function chave(cat) { return 'obi_checklist_2026_' + (categorias[cat].versaoProgresso || 'v2') + '_' + cat; }
 function progresso(cat) {
   try {
     const valor = JSON.parse(localStorage.getItem(chave(cat)) || '{}');
     return valor && typeof valor === 'object' && !Array.isArray(valor) ? valor : {};
   } catch (erro) { return {}; }
 }
 function concluidos(cat) { const valores = progresso(cat); return categorias[cat].topicos.filter(t => valores[t.id] === true).length; }
 window.OBIEstudos = { categorias, chave, progresso, concluidos, edicao: 2026, consulta: '25/11/2026',
   categoriaDoNivel: {iniciacao_jr:'iniciacao_jr',iniciacao_1:'iniciacao_1',iniciacao_2:'iniciacao_2',prog_mirim:'prog_mirim',prog_jr:'prog_jr',prog_1:'nivel_1',prog_2:'nivel_2',prog_sr:'senior'} };
})();
