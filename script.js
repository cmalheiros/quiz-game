// Elementos do DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const usernameInput = document.getElementById('username');
const themeButtons = document.querySelectorAll('.theme-button');
const userInfo = document.getElementById('user-info');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const feedbackContainer = document.getElementById('feedback-container');
const nextButton = document.getElementById('next-button');
const finalUsernameDisplay = document.getElementById('final-username');
const finalScoreDisplay = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

// Variáveis do Jogo
let currentUsername = '';
let currentTheme = '';
let currentScore = 0;
let currentQuestionIndex = 0;
let timer = null;
const TIME_LIMIT = 10; // 10 segundos por pergunta

// Objeto com as perguntas do quiz
// O tema 'historia' genérico foi substituído por temas de disciplinas
// tema 'historia', mantidas para caso você queira usá-las depois.
/*
const oldHistoryQuestions = [
    {
        question: "Quem foi o primeiro imperador do Brasil?",
        answers: ["Dom Pedro I", "Dom Pedro II", "Getúlio Vargas", "Tiradentes"],
        correct: "Dom Pedro I",
        explanation: "Dom Pedro I proclamou a independência e se tornou o primeiro imperador do Brasil em 1822."
    },
    {
        question: "Qual foi o estopim da Primeira Guerra Mundial?",
        answers: ["O ataque a Pearl Harbor", "A invasão da Polônia", "O assassinato do arquiduque Francisco Ferdinando", "A Crise de 1929"],
        correct: "O assassinato do arquiduque Francisco Ferdinando",
        explanation: "O assassinato de Francisco Ferdinando em Sarajevo, em 1914, desencadeou uma série de alianças que levaram à guerra."
    },
    {
        question: "Em que ano a Lei Áurea foi assinada no Brasil?",
        answers: ["1822", "1888", "1889", "1900"],
        correct: "1888",
        explanation: "A Lei Áurea, que aboliu a escravidão no Brasil, foi assinada pela Princesa Isabel em 13 de maio de 1888."
    }
];
*/

const quizQuestions = {
    historia_africa: [
        {
            question: "Em que ano o Brasil foi 'descoberto' por Pedro Álvares Cabral?",
            answers: ["1492", "1500", "1520", "1534"],
            correct: "1500",
            explanation: "Pedro Álvares Cabral chegou ao território que hoje é o Brasil em 22 de abril de 1500, durante uma viagem para as Índias."
        },
        {
            question: "Qual era a principal fonte de riqueza do Império de Mali?",
            answers: ["Ouro e sal", "Peles e marfim", "Diamantes e especiarias", "Escravos e tabaco"],
            correct: "Ouro e sal",
            explanation: "O Império de Mali controlava as rotas comerciais que ligavam as minas de ouro e as minas de sal do Saara, tornando-se uma potência econômica e militar na África Ocidental."
        },
        {
            question: "O que foi a Conferência de Berlim de 1884-1885?",
            answers: ["Uma aliança militar europeia", "A partilha da África entre potências europeias", "Uma conferência sobre a descolonização africana", "Um acordo de paz entre tribos africanas"],
            correct: "A partilha da África entre potências europeias",
            explanation: "A Conferência de Berlim foi um evento crucial do 'Scramble for Africa', onde potências europeias estabeleceram as regras para a colonização e exploração do continente, ignorando as fronteiras étnicas e culturais existentes."
        },
        {
            question: "Quem foi o líder do movimento anti-apartheid na África do Sul?",
            answers: ["Desmond Tutu", "Thabo Mbeki", "Nelson Mandela", "Jomo Kenyatta"],
            correct: "Nelson Mandela",
            explanation: "Nelson Mandela foi o líder do Congresso Nacional Africano e um dos principais ativistas contra o regime de segregação racial do apartheid na África do Sul, passando 27 anos na prisão por sua luta."
        },
        {
            question: "Qual era a capital do Império Songai?",
            answers: ["Timbuktu", "Gao", "Jenne", "Djenne"],
            correct: "Gao",
            explanation: "Gao foi a capital do Império Songai e um importante centro comercial. No entanto, Timbuktu foi o centro intelectual e espiritual do império, famoso por suas bibliotecas e universidades."
        },
        {
            question: "O que significa o termo 'negritude'?",
            answers: ["Um movimento político africano", "Um movimento literário e filosófico que celebra a identidade negra", "Um termo pejorativo para pessoas negras", "Um tipo de arte africana"],
            correct: "Um movimento literário e filosófico que celebra a identidade negra",
            explanation: "A Negritude foi um movimento intelectual liderado por intelectuais francófonos como Aimé Césaire e Léopold Sédar Senghor, que buscava revalorizar a cultura, história e valores do povo negro como forma de resistência ao colonialismo e à assimilação cultural."
        },
        {
            question: "Qual foi o principal motivo para a eclosão da Guerra Civil em Angola?",
            answers: ["Disputa religiosa", "Conflito étnico", "Disputas territoriais com países vizinhos", "Divergência política e ideológica entre facções"],
            correct: "Divergência política e ideológica entre facções",
            explanation: "A Guerra Civil Angolana (1975-2002) foi um dos mais longos conflitos do continente. Ela eclodiu logo após a independência de Portugal, com facções (MPLA, UNITA e FNLA) lutando por controle político e ideológico."
        },
        {
            question: "Qual era a religião predominante no Império de Gana?",
            answers: ["Cristianismo", "Islamismo", "Paganismo", "Judaísmo"],
            correct: "Paganismo",
            explanation: "O Império de Gana praticava uma religião tradicional (pagã). O Islã se espalhou na região através do comércio, mas não se tornou a religião predominante até mais tarde em outros impérios como Mali e Songai."
        },
        {
            question: "Qual a importância da cidade de Timbuktu?",
            answers: ["Era o centro político do Mali", "Era o maior centro de comércio de escravos", "Era um centro de aprendizado islâmico e biblioteca", "Era uma fortaleza militar"],
            correct: "Era um centro de aprendizado islâmico e biblioteca",
            explanation: "Timbuktu se destacou como um grande centro de aprendizado e espiritualidade islâmica, com manuscritos e escolas que atraíam estudiosos de todo o mundo muçulmano durante o Império de Mali e Songai."
        },
        {
            question: "Qual país africano foi o primeiro a obter sua independência na era moderna?",
            answers: ["Etiópia", "Gana", "Egito", "Líbia"],
            correct: "Gana",
            explanation: "Gana foi a primeira colônia africana subsaariana a obter sua independência, em 1957. A luta foi liderada por Kwame Nkrumah."
        },
        {
            question: "O que foi a 'Revolta dos Mau-Mau'?",
            answers: ["Uma rebelião de escravos na Somália", "Uma revolta contra a colonização britânica no Quênia", "Um movimento de independência na Angola", "Uma guerra civil na Etiópia"],
            correct: "Uma revolta contra a colonização britânica no Quênia",
            explanation: "A Revolta dos Mau-Mau foi uma insurgência violenta contra a dominação britânica no Quênia durante a década de 1950, liderada por membros do grupo étnico Kikuyu."
        }
    ],
    historia_america1: [
        {
            question: "Qual a capital do Império Asteca antes da chegada dos espanhóis?",
            answers: ["Cuzco", "Tenochtitlán", "Palenque", "Chichén Itzá"],
            correct: "Tenochtitlán",
            explanation: "Tenochtitlán, construída sobre uma ilha no lago Texcoco, era a impressionante capital do Império Asteca, que hoje é a Cidade do México."
        },
        {
            question: "Qual foi o principal objetivo das 'Leyes de Indias' (Leis das Índias) estabelecidas pela Coroa espanhola?",
            answers: ["Incentivar a escravidão indígena", "Proteger os direitos dos povos nativos e regular as relações coloniais", "Promover a exploração de ouro", "Aumentar a autonomia das colônias"],
            correct: "Proteger os direitos dos povos nativos e regular as relações coloniais",
            explanation: "As Leis das Índias foram um conjunto de decretos que tentavam regular a vida nas colônias, com o objetivo de proteger os indígenas dos abusos dos colonos, embora seu cumprimento fosse muitas vezes ineficaz."
        },
        {
            question: "O que foi o 'Columbian Exchange' (Intercâmbio Colombiano)?",
            answers: ["A rota de comércio de escravos", "O tratado de paz entre nativos e europeus", "A troca de plantas, animais, doenças e cultura entre o Velho e o Novo Mundo", "A primeira grande guerra entre potências coloniais"],
            correct: "A troca de plantas, animais, doenças e cultura entre o Velho e o Novo Mundo",
            explanation: "O Intercâmbio Colombiano foi um período de vasta troca de recursos e ideias. Doenças como a varíola e animais como cavalos foram para a América, enquanto batatas, milho e tomates foram para a Europa, transformando as sociedades de ambos os continentes."
        },
        {
            question: "Qual foi o principal sistema de trabalho compulsório imposto pelos espanhóis aos povos andinos?",
            answers: ["Escravidão africana", "Mita", "Encomienda", "Peculato"],
            correct: "Mita",
            explanation: "A 'mita' era um sistema de trabalho forçado nas minas, herança de uma prática inca, que foi intensificada pelos espanhóis. Já a 'encomienda' era a concessão de grupos de indígenas para o trabalho em fazendas e minas."
        },
        {
            question: "Qual foi o impacto das doenças europeias sobre as populações nativas americanas?",
            answers: ["Aumentou a imunidade dos nativos", "Causou um declínio populacional catastrófico", "Não teve impacto significativo", "Fortaleceu suas economias"],
            correct: "Causou um declínio populacional catastrófico",
            explanation: "As doenças como a varíola, o sarampo e a gripe, para as quais os nativos não tinham imunidade, foram o fator mais devastador na conquista da América, matando milhões e facilitando o domínio europeu."
        },
        {
            question: "Qual era a principal base econômica da colônia de St. Domingue (atual Haiti)?",
            answers: ["Ouro", "Tabaco", "Algodão", "Açúcar"],
            correct: "Açúcar",
            explanation: "St. Domingue era a colônia francesa mais rica no século XVIII, com sua economia baseada na produção massiva de açúcar em plantações, trabalho este realizado por escravos africanos."
        },
        {
            question: "Quem foi o líder indígena que resistiu à conquista espanhola no Peru, liderando o Império Inca?",
            answers: ["Moctezuma II", "Atahualpa", "Tupac Amaru I", "Tupac Amaru II"],
            correct: "Atahualpa",
            explanation: "Atahualpa era o último imperador inca quando foi capturado e executado pelos conquistadores espanhóis liderados por Francisco Pizarro em 1533."
        },
        {
            question: "O que foi o 'Tratado de Tordesilhas'?",
            answers: ["Um acordo de paz entre Espanha e Portugal sobre as fronteiras europeias", "A divisão das terras descobertas no Novo Mundo entre Espanha e Portugal", "Um tratado que aboliu a escravidão", "Um acordo para o comércio de especiarias"],
            correct: "A divisão das terras descobertas no Novo Mundo entre Espanha e Portugal",
            explanation: "O Tratado de Tordesilhas (1494) foi um acordo que dividiu o mundo recém-descoberto fora da Europa em duas metades: uma para o Império Espanhol e outra para o Império Português."
        },
        {
            question: "Qual das colônias britânicas foi fundada por peregrinos em 1620?",
            answers: ["Virgínia", "Massachusetts", "Nova Iorque", "Pensilvânia"],
            correct: "Massachusetts",
            explanation: "A Colônia de Plymouth, em Massachusetts, foi fundada pelos Peregrinos (separatistas ingleses) que chegaram a bordo do navio Mayflower em 1620."
        },
        {
            question: "Quem foi o principal conquistador do Império Asteca?",
            answers: ["Francisco Pizarro", "Hernán Cortés", "Vasco da Gama", "Bartolomeu Dias"],
            correct: "Hernán Cortés",
            explanation: "Hernán Cortés foi o conquistador espanhol que liderou a expedição que resultou na queda do Império Asteca em 1521, com a tomada de Tenochtitlán."
        }
    ],
    historia_brasil1: [
        {
            question: "Qual foi o principal produto explorado no Brasil no período pré-colonial?",
            answers: ["Ouro", "Açúcar", "Pau-Brasil", "Algodão"],
            correct: "Pau-Brasil",
            explanation: "O Pau-Brasil era uma madeira de alto valor na Europa por produzir um pigmento vermelho. Sua exploração foi a primeira atividade econômica significativa dos portugueses no território."
        },
        {
            question: "O que foram as 'Capitanias Hereditárias'?",
            answers: ["Regiões de caça e pesca", "Divisões administrativas da colônia do Brasil para doação a nobres portugueses", "Unidades militares portuguesas", "Grandes plantações de cana de açúcar"],
            correct: "Divisões administrativas da colônia do Brasil para doação a nobres portugueses",
            explanation: "As Capitanias Hereditárias foram um modelo de administração territorial, onde o rei dividia a terra em faixas e as doava a capitães-donatários. O modelo fracassou em sua maioria, com exceção de Pernambuco e São Vicente."
        },
        {
            question: "Em que contexto ocorreu a Inconfidência Mineira?",
            answers: ["Luta contra a escravidão", "Revolta contra a 'derrama' e o domínio português", "Protesto contra a presença dos holandeses", "Movimento separatista da Revolução Farroupilha"],
            correct: "Revolta contra a 'derrama' e o domínio português",
            explanation: "A Inconfidência Mineira foi uma conspiração de elite contra a coroa portuguesa, motivada pela 'derrama', um imposto para cobrar o quinto do ouro devido à metrópole. O movimento foi liderado por Tiradentes e outros intelectuais."
        },
        {
            question: "Qual foi a importância da 'Casa da Suplicação' criada por Dom João VI no Brasil?",
            answers: ["Era um órgão militar", "Era a câmara dos deputados do Brasil", "Era o órgão judicial máximo da colônia", "Era um hospital para a família real"],
            correct: "Era o órgão judicial máximo da colônia",
            explanation: "A Casa da Suplicação foi o primeiro tribunal de justiça de última instância do Brasil, criada por Dom João VI quando a corte portuguesa se mudou para a colônia, elevando o status jurídico do Brasil."
        },
        {
            question: "Quem proclamou a Independência do Brasil?",
            answers: ["Dom João VI", "Dom Pedro I", "Tiradentes", "Princesa Isabel"],
            correct: "Dom Pedro I",
            explanation: "Dom Pedro I, filho do rei de Portugal, proclamou a Independência do Brasil em 7 de setembro de 1822, às margens do riacho Ipiranga."
        },
        {
            question: "O que foi o 'Período Regencial' na história do Brasil?",
            answers: ["O governo de Dom João VI", "O período de transição entre o Primeiro e o Segundo Reinado, antes da maioridade de Dom Pedro II", "O período de governo dos vice-reis", "A primeira república brasileira"],
            correct: "O período de transição entre o Primeiro e o Segundo Reinado, antes da maioridade de Dom Pedro II",
            explanation: "Após a abdicação de Dom Pedro I, o Brasil foi governado por regentes até a maioridade de seu filho, Dom Pedro II. Foi um período de grande instabilidade política e revoltas regionais."
        },
        {
            question: "Qual foi o principal fator que motivou o fim da monarquia no Brasil e a Proclamação da República?",
            answers: ["O fim da escravidão", "O aumento de impostos", "O descontentamento do Exército e da elite cafeicultora", "A morte de Dom Pedro II"],
            correct: "O descontentamento do Exército e da elite cafeicultora",
            explanation: "A Proclamação da República em 1889 foi resultado do crescente descontentamento de setores importantes da sociedade, como o Exército, que buscava maior participação política, e a elite cafeicultora, que desejava mais poder e autonomia regional."
        },
        {
            question: "Qual foi a última grande revolta do Período Regencial?",
            answers: ["Cabanagem", "Balaiada", "Farroupilha", "Revolta dos Malês"],
            correct: "Farroupilha",
            explanation: "A Revolução Farroupilha (1835-1845) foi a mais longa e uma das mais significativas revoltas do período regencial, liderada por estancieiros gaúchos que se opunham ao governo central."
        },
        {
            question: "O que foi a 'Guerra do Paraguai'?",
            answers: ["Um conflito entre Brasil e Paraguai", "Um conflito entre Paraguai e Argentina", "Um conflito em que o Brasil lutou contra a Tríplice Aliança", "Um conflito entre o Brasil e o Uruguai"],
            correct: "Um conflito entre Brasil e Paraguai",
            explanation: "A Guerra do Paraguai foi um grande conflito armado na América do Sul (1864-1870), onde o Brasil, a Argentina e o Uruguai formaram a Tríplice Aliança para lutar contra o Paraguai."
        },
        {
            question: "Quem foi o principal líder da Revolução Farroupilha?",
            answers: ["Tiradentes", "Bento Gonçalves", "José Bonifácio", "Duque de Caxias"],
            correct: "Bento Gonçalves",
            explanation: "Bento Gonçalves da Silva foi o principal líder militar e político da Revolução Farroupilha, que estabeleceu a República Rio-Grandense no sul do Brasil."
        }
    ],
    geohistoria: [
        {
            question: "Como o 'Crescente Fértil' influenciou o desenvolvimento das primeiras civilizações?",
            answers: ["Era uma área de recursos minerais", "Apenas abrigava desertos", "Sua localização entre rios permitiu o desenvolvimento da agricultura e cidades", "Era uma região isolada de montanhas"],
            correct: "Sua localização entre rios permitiu o desenvolvimento da agricultura e cidades",
            explanation: "O Crescente Fértil, região do Oriente Médio com os rios Tigre e Eufrates, oferecia solo rico e água para irrigação, permitindo o surgimento da agricultura e o crescimento das primeiras grandes cidades e civilizações como a Mesopotâmia."
        },
        {
            question: "Qual a relação entre o clima e a migração de povos no Período Neolítico?",
            answers: ["O clima quente impedia a migração", "Mudanças climáticas levaram ao surgimento da agricultura e assentamentos fixos", "O clima não teve impacto", "O clima frio acelerou a migração para o norte"],
            correct: "Mudanças climáticas levaram ao surgimento da agricultura e assentamentos fixos",
            explanation: "Após a última era glacial, o clima global se tornou mais estável e quente. Isso permitiu o cultivo de grãos, levando os grupos humanos a se fixarem em aldeias e desenvolverem a agricultura, marcando o início do Período Neolítico."
        },
        {
            question: "Como a geografia do Japão influenciou a formação de sua cultura e sociedade?",
            answers: ["A paisagem montanhosa facilitou a unificação", "A proximidade com a China impediu a criação de uma cultura própria", "A insularidade e o relevo montanhoso favoreceram o isolamento e a formação de feudos", "O clima temperado impedia o cultivo de arroz"],
            correct: "A insularidade e o relevo montanhoso favoreceram o isolamento e a formação de feudos",
            explanation: "Por ser um arquipélago, o Japão esteve relativamente isolado de invasões. A geografia fragmentada e montanhosa dificultou a centralização política, favorecendo o sistema feudal com poder local de senhores de terra."
        },
        {
            question: "De que forma as monções afetam a história da Índia?",
            answers: ["Ajudam a secar a colheita", "Causam inundações que destroem cidades", "Seu padrão de chuvas é crucial para a agricultura local", "Não têm impacto significativo"],
            correct: "Seu padrão de chuvas é crucial para a agricultura local",
            explanation: "As monções são ventos sazonais que trazem chuvas torrenciais. O ciclo de monções é vital para a agricultura na Índia, influenciando diretamente a produção de alimentos e, consequentemente, o desenvolvimento histórico da civilização indiana."
        },
        {
            question: "Qual o papel do Rio Nilo no Egito Antigo?",
            answers: ["Era apenas uma fonte de água potável", "Servia para transporte de mercadorias", "Foi essencial para a agricultura, o transporte e a unificação do Egito", "Era um obstáculo natural para a civilização"],
            correct: "Foi essencial para a agricultura, o transporte e a unificação do Egito",
            explanation: "O Nilo não apenas fornecia água e solo fértil para a agricultura, mas também atuava como uma 'espinha dorsal' do Egito, facilitando o transporte e a comunicação entre as cidades, o que foi vital para a unificação do reino."
        },
        {
            question: "Como a localização geográfica de Constantinopla contribuiu para sua importância histórica?",
            answers: ["Era uma cidade costeira isolada", "Sua posição de fácil acesso a montanhas a tornou inexpugnável", "Sua posição entre a Europa e a Ásia a tornou um importante centro comercial", "Era um centro militar no meio de um deserto"],
            correct: "Sua posição entre a Europa e a Ásia a tornou um importante centro comercial",
            explanation: "Constantinopla (atual Istambul) está estrategicamente localizada no estreito de Bósforo, conectando o Mar Negro ao Mediterrâneo. Essa posição a tornou uma ponte crucial entre a Europa e a Ásia, e um centro de comércio e cultura por séculos."
        },
        {
            question: "Qual o impacto da geografia da Grécia Antiga em sua organização política?",
            answers: ["O terreno plano favoreceu um império unificado", "A geografia fragmentada por montanhas e ilhas favoreceu a formação de cidades-estado independentes", "A riqueza mineral permitiu a formação de um império marítimo", "Os rios facilitaram o comércio interno"],
            correct: "A geografia fragmentada por montanhas e ilhas favoreceu a formação de cidades-estado independentes",
            explanation: "O relevo montanhoso e a grande quantidade de ilhas dificultavam a comunicação e a unificação territorial. Isso levou ao desenvolvimento de cidades-estado (pólis) como Atenas e Esparta, com identidades políticas e culturais próprias."
        },
        {
            question: "De que forma o Canal do Panamá impactou o comércio global?",
            answers: ["Aumentou o custo do transporte marítimo", "Conectou o Oceano Pacífico e o Atlântico, encurtando rotas comerciais", "Ajudou a conectar o comércio com a África", "Não teve grande impacto comercial"],
            correct: "Conectou o Oceano Pacífico e o Atlântico, encurtando rotas comerciais",
            explanation: "A construção do Canal do Panamá permitiu que navios navegassem entre o Oceano Pacífico e o Atlântico sem ter que contornar a América do Sul, reduzindo drasticamente o tempo e o custo das viagens comerciais."
        },
        {
            question: "Como a geografia da Rússia influenciou as invasões de Napoleão e Hitler?",
            answers: ["O terreno rochoso impediu a passagem dos exércitos", "O rigoroso inverno russo foi crucial na derrota dos invasores", "O clima temperado permitiu a rápida expansão dos exércitos", "O território montanhoso facilitou a defesa"],
            correct: "O rigoroso inverno russo foi crucial na derrota dos invasores",
            explanation: "A vasta extensão territorial da Rússia e, principalmente, as condições climáticas extremas de seu inverno foram fatores decisivos na derrota das invasões de Napoleão (1812) e de Hitler (1941), exaurindo as tropas inimigas e seus suprimentos."
        },
        {
            question: "Qual é o termo para a disciplina que estuda a relação entre a geografia e os eventos históricos?",
            answers: ["Geopolítica", "Paleontologia", "Geohistória", "Sociologia"],
            correct: "Geohistória",
            explanation: "Geohistória é a disciplina que analisa como fatores geográficos, como clima, relevo, rios e localização, influenciam e interagem com os processos históricos e a evolução das sociedades humanas."
        }
    ],
    biologia_celular: [
        {
            question: "Qual a principal função do retículo endoplasmático liso?",
            answers: ["Síntese de proteínas", "Síntese de lipídios e desintoxicação", "Armazenamento de DNA", "Digestão celular"],
            correct: "Síntese de lipídios e desintoxicação",
            explanation: "O retículo endoplasmático liso (REL) não possui ribossomos e está envolvido na síntese de lipídios, esteroides e na desintoxicação de substâncias, como álcool e drogas."
        },
        {
            question: "O que são 'células-tronco'?",
            answers: ["Células que formam tecidos especializados", "Células que não se dividem", "Células indiferenciadas com capacidade de se transformar em diferentes tipos de células", "Células que combatem infecções"],
            correct: "Células indiferenciadas com capacidade de se transformar em diferentes tipos de células",
            explanation: "Células-tronco são células mestras do corpo que têm a capacidade de se auto-renovar e de se diferenciar em vários tipos de células, como neurônios, células musculares ou sanguíneas."
        },
        {
            question: "Qual a diferença fundamental entre uma célula procarionte e uma célula eucarionte?",
            answers: ["A presença de membrana plasmática", "A presença de núcleo delimitado por membrana", "O tamanho da célula", "A forma da célula"],
            correct: "A presença de núcleo delimitado por membrana",
            explanation: "A principal característica das células eucariontes é a presença de um núcleo que armazena o material genético (DNA), enquanto as células procariontes não possuem núcleo e seu DNA está disperso no citoplasma."
        },
        {
            question: "O que é o processo de 'mitose'?",
            answers: ["Divisão celular que produz gametas", "Morte celular programada", "Divisão celular para o crescimento e reparo de tecidos", "Fusão de duas células"],
            correct: "Divisão celular para o crescimento e reparo de tecidos",
            explanation: "A mitose é o processo pelo qual uma célula se divide para produzir duas células-filhas idênticas. É essencial para o crescimento, desenvolvimento e a regeneração de tecidos no corpo."
        },
        {
            question: "Qual a função do Complexo de Golgi?",
            answers: ["Produzir energia", "Sintetizar DNA", "Empacotar, modificar e distribuir proteínas e lipídios", "Realizar a fotossíntese"],
            correct: "Empacotar, modificar e distribuir proteínas e lipídios",
            explanation: "O Complexo de Golgi atua como uma 'estação de correios' da célula, recebendo, modificando, empacotando e endereçando moléculas como proteínas e lipídios para outras partes da célula ou para fora dela."
        },
        {
            question: "O que são 'lisossomos'?",
            answers: ["Organelas que armazenam água", "Organelas responsáveis pela digestão celular", "Centros de produção de energia", "Locais de síntese de proteínas"],
            correct: "Organelas responsáveis pela digestão celular",
            explanation: "Os lisossomos são pequenas vesículas que contêm enzimas digestivas e são responsáveis por digerir substâncias, organelas desgastadas e até mesmo o próprio corpo celular em um processo de autodigestão."
        },
        {
            question: "Qual organela é conhecida como a 'fábrica de proteínas'?",
            answers: ["Mitocôndria", "Complexo de Golgi", "Lisossomo", "Ribossomo"],
            correct: "Ribossomo",
            explanation: "Os ribossomos são as organelas responsáveis pela síntese de proteínas (tradução do RNA mensageiro em uma cadeia de aminoácidos) nas células."
        },
        {
            question: "O que é a 'membrana plasmática'?",
            answers: ["A parede celular de vegetais", "Uma camada que protege o núcleo", "Uma barreira seletiva que controla o que entra e sai da célula", "Uma estrutura que gera energia"],
            correct: "Uma barreira seletiva que controla o que entra e sai da célula",
            explanation: "A membrana plasmática é uma barreira semipermeável que delimita todas as células, controlando a passagem de substâncias e mantendo o ambiente interno estável (homeostase)."
        },
        {
            question: "Qual o nome da estrutura celular que armazena o material genético?",
            answers: ["Mitocôndria", "Ribossomo", "Vacúolo", "Núcleo"],
            correct: "Núcleo",
            explanation: "O núcleo é a principal organela que armazena o DNA (ácido desoxirribonucleico) nas células eucariontes e controla as atividades celulares."
        },
        {
            question: "O que é o processo de 'transcrição' na síntese de proteínas?",
            answers: ["A tradução do RNA em proteína", "A duplicação do DNA", "A produção de uma molécula de RNA a partir de um molde de DNA", "A divisão celular"],
            correct: "A produção de uma molécula de RNA a partir de um molde de DNA",
            explanation: "A transcrição é a primeira etapa da expressão gênica, onde uma porção do DNA é 'copiada' para produzir uma molécula de RNA mensageiro (mRNA) que levará a informação para os ribossomos."
        }
    ],
    zoologia: [
        {
            question: "Qual é o maior grupo de vertebrados em número de espécies?",
            answers: ["Peixes", "Aves", "Mamíferos", "Répteis"],
            correct: "Peixes",
            explanation: "Os peixes representam o grupo mais diversificado de vertebrados, com mais de 34 mil espécies catalogadas, superando o número combinado de todas as outras classes de vertebrados."
        },
        {
            question: "O que caracteriza a classe 'Insecta'?",
            answers: ["Terem corpo dividido em duas partes", "Possuírem 8 pernas", "Corpo dividido em cabeça, tórax e abdômen, e 6 pernas", "Terem corpo mole e concha"],
            correct: "Corpo dividido em cabeça, tórax e abdômen, e 6 pernas",
            explanation: "Os insetos são artrópodes que possuem corpo segmentado em três partes: cabeça, tórax e abdômen, e, tipicamente, três pares de pernas."
        },
        {
            question: "Qual é a principal diferença entre um 'crustáceo' e um 'inseto'?",
            answers: ["O número de asas", "O tipo de esqueleto", "O número de antenas e o ambiente em que vivem", "A presença de olhos"],
            correct: "O número de antenas e o ambiente em que vivem",
            explanation: "Crustáceos, como camarões e caranguejos, geralmente vivem em ambientes aquáticos e possuem dois pares de antenas. Insetos, em sua maioria, vivem em terra e têm apenas um par de antenas."
        },
        {
            question: "O que é um 'organismo ectotérmico'?",
            answers: ["Um animal que mantém a temperatura corporal constante", "Um animal que regula sua temperatura através do ambiente externo", "Um animal que vive em ambientes frios", "Um animal que produz seu próprio calor interno"],
            correct: "Um animal que regula sua temperatura através do ambiente externo",
            explanation: "Organismos ectotérmicos, como répteis e anfíbios, dependem de fontes externas, como o sol, para regular sua temperatura corporal. O oposto de organismos endotérmicos (mamíferos e aves)."
        },
        {
            question: "Qual característica diferencia as 'aves' de todos os outros vertebrados?",
            answers: ["A presença de bico", "A capacidade de voar", "A presença de penas", "O sistema respiratório"],
            correct: "A presença de penas",
            explanation: "A principal e exclusiva característica das aves é a presença de penas. Embora outros animais voem ou tenham bicos, as penas são uma característica única da classe Aves."
        },
        {
            question: "O que são 'anfíbios'?",
            answers: ["Animais que vivem na água e em terra, mas não sofrem metamorfose", "Animais que vivem apenas na água", "Animais que têm uma fase de vida aquática e outra terrestre, com metamorfose", "Animais que vivem apenas em terra"],
            correct: "Animais que têm uma fase de vida aquática e outra terrestre, com metamorfose",
            explanation: "O termo anfíbio significa 'duas vidas', referindo-se ao fato de que esses animais, como sapos e rãs, têm um ciclo de vida que inclui uma fase larval aquática e uma fase adulta terrestre, com o processo de metamorfose."
        },
        {
            question: "Qual é a principal característica dos 'mamíferos'?",
            answers: ["A presença de pelos e glândulas mamárias", "A capacidade de andar em duas pernas", "A presença de escamas", "O voo"],
            correct: "A presença de pelos e glândulas mamárias",
            explanation: "Os mamíferos são caracterizados pela presença de pelos (ou vestígios deles) e, principalmente, por possuírem glândulas mamárias que produzem leite para alimentar os filhotes."
        },
        {
            question: "Qual o grupo de animais que possui um 'esqueleto hidrostático'?",
            answers: ["Artrópodes", "Vertebrados", "Moluscos", "Anelídeos (minhocas)"],
            correct: "Anelídeos (minhocas)",
            explanation: "Anelídeos, como as minhocas, não possuem esqueleto rígido, mas usam a pressão interna do líquido de seus segmentos corporais (celoma) para manter a forma e auxiliar no movimento."
        },
        {
            question: "O que é 'simetria radial'?",
            answers: ["Um animal com dois lados simétricos", "A ausência de simetria", "Um tipo de simetria onde o animal pode ser dividido em partes iguais ao redor de um eixo central", "A simetria de espelho"],
            correct: "Um tipo de simetria onde o animal pode ser dividido em partes iguais ao redor de um eixo central",
            explanation: "A simetria radial é comum em animais como estrelas-do-mar e águas-vivas, onde qualquer corte que passe pelo centro resulta em partes aproximadamente iguais, como as fatias de uma pizza."
        },
        {
            question: "Qual o maior filo de animais do planeta?",
            answers: ["Chordata", "Mollusca", "Arthropoda", "Annelida"],
            correct: "Arthropoda",
            explanation: "O filo Arthropoda (artrópodes) é o maior em número de espécies, incluindo insetos, aracnídeos, crustáceos e miriápodes, representando cerca de 80% de todas as espécies de animais conhecidas."
        }
    ],
    fundamentos_da_educacao: [
        {
            question: "Quem foi o principal pensador do 'construtivismo' na educação?",
            answers: ["Jean Piaget", "Paulo Freire", "Vygotsky", "Skinner"],
            correct: "Jean Piaget",
            explanation: "Jean Piaget é o principal expoente do construtivismo. Sua teoria sugere que o conhecimento não é transmitido, mas sim construído ativamente pelo estudante a partir de suas interações com o mundo."
        },
        {
            question: "Qual o conceito central da 'Pedagogia Histórico-Crítica' de Saviani?",
            answers: ["Aprender na prática", "A centralidade do professor no processo educativo", "A compreensão da educação como um processo social e histórico para a transformação da sociedade", "A aprendizagem por descoberta"],
            correct: "A compreensão da educação como um processo social e histórico para a transformação da sociedade",
            explanation: "A Pedagogia Histórico-Crítica, de Dermeval Saviani, defende que a educação deve ser um instrumento para que o aluno compreenda a realidade social, se aproprie do conhecimento historicamente acumulado e atue na transformação da sociedade."
        },
        {
            question: "Qual a importância da 'zona de desenvolvimento proximal' de Vygotsky?",
            answers: ["É a diferença entre o que o aluno sabe e o que ele não sabe", "É a distância entre o que o aluno pode fazer sozinho e o que ele pode fazer com a ajuda de um mediador", "É o espaço físico de aprendizagem", "É a fase de desenvolvimento infantil"],
            correct: "É a distância entre o que o aluno pode fazer sozinho e o que ele pode fazer com a ajuda de um mediador",
            explanation: "A Zona de Desenvolvimento Proximal (ZDP) de Vygotsky é o espaço de aprendizado onde o aluno, com o auxílio de um professor ou colega mais experiente, pode realizar tarefas que ainda não consegue fazer de forma autônoma."
        },
        {
            question: "O que foi o movimento da 'Escola Nova' no Brasil?",
            answers: ["Um movimento que defendia a educação tradicional", "Um movimento que defendia a educação voltada para a moral e a religião", "Um movimento que defendia a modernização da educação com foco no aluno e na ciência", "Um movimento que defendia a educação apenas para a elite"],
            correct: "Um movimento que defendia a modernização da educação com foco no aluno e na ciência",
            explanation: "O movimento da Escola Nova, liderado por Anísio Teixeira e outros intelectuais, defendia a educação como um direito de todos, com métodos ativos centrados no aluno, e baseada na ciência para formar cidadãos críticos."
        },
        {
            question: "Qual a função do 'plano de aula' no trabalho docente?",
            answers: ["É um documento formal para a direção da escola", "Serve apenas para o registro burocrático", "É uma ferramenta de planejamento que organiza as etapas, conteúdos e recursos para a aula", "É um material de estudo para o aluno"],
            correct: "É uma ferramenta de planejamento que organiza as etapas, conteúdos e recursos para a aula",
            explanation: "O plano de aula é essencial para o docente. Ele serve como um roteiro detalhado que estrutura a sequência de atividades, define os objetivos, seleciona os conteúdos e prevê os recursos necessários para que a aula seja eficaz."
        },
        {
            question: "O que é 'educação inclusiva'?",
            answers: ["Um tipo de educação exclusiva para alunos com deficiência", "Um sistema de ensino que atende apenas alunos superdotados", "Um modelo de ensino que busca garantir o acesso e a participação plena de todos os alunos, independentemente de suas características", "A educação de adultos"],
            correct: "Um modelo de ensino que busca garantir o acesso e a participação plena de todos os alunos, independentemente de suas características",
            explanation: "A educação inclusiva é um paradigma educacional que defende a igualdade de oportunidades e a participação de todos os alunos (com ou sem deficiência, altas habilidades, etc.) no sistema regular de ensino, com os apoios necessários."
        },
        {
            question: "Quem escreveu o livro 'Pedagogia do Oprimido'?",
            answers: ["Anísio Teixeira", "Vygotsky", "Paulo Freire", "Montessori"],
            correct: "Paulo Freire",
            explanation: "Paulo Freire é um dos educadores brasileiros mais influentes. Sua obra 'Pedagogia do Oprimido' critica a educação bancária (onde o aluno é um recipiente de conhecimento) e propõe uma educação libertadora, baseada no diálogo e na criticidade."
        },
        {
            question: "O que é 'didática'?",
            answers: ["A parte da pedagogia que se preocupa com as teorias da aprendizagem", "A parte da pedagogia que se dedica às metodologias de ensino", "A parte da pedagogia que estuda a história da educação", "A parte da pedagogia que estuda as políticas educacionais"],
            correct: "A parte da pedagogia que se dedica às metodologias de ensino",
            explanation: "A didática é a disciplina que estuda o processo de ensino e aprendizagem. Ela se preocupa com o 'como' ensinar, definindo os métodos, técnicas e estratégias para que o conhecimento seja transmitido de forma eficaz."
        },
        {
            question: "Qual a Lei de Diretrizes e Bases da Educação Nacional (LDB)?",
            answers: ["A lei que criou a universidade", "A lei que regulamenta o ensino superior no Brasil", "A principal lei que organiza a educação brasileira", "A lei que regulamenta a educação a distância"],
            correct: "A principal lei que organiza a educação brasileira",
            explanation: "A LDB (Lei nº 9.394/96) é a principal legislação que estabelece os princípios e as diretrizes da educação brasileira, desde a educação infantil até o ensino superior."
        },
        {
            question: "Qual o papel do 'mediador' na teoria de Vygotsky?",
            answers: ["É a pessoa que faz tudo pelo aluno", "É a pessoa que transmite o conhecimento de forma passiva", "É a pessoa que auxilia o aluno no processo de aprendizagem, servindo como uma ponte entre o que ele já sabe e o que ele pode aprender", "É o professor que não se envolve no aprendizado do aluno"],
            correct: "É a pessoa que auxilia o aluno no processo de aprendizagem, servindo como uma ponte entre o que ele já sabe e o que ele pode aprender",
            explanation: "Para Vygotsky, o mediador (professor, colega) é fundamental no processo de aprendizagem. Ele ajuda o aluno a superar desafios e a internalizar novos conceitos, tornando a aprendizagem mais significativa."
        }
    ],
    geografia: [
        {
            question: "Qual é o maior deserto do mundo?",
            answers: ["Deserto do Saara", "Deserto do Atacama", "Deserto de Gobi", "Antártida"],
            correct: "Antártida",
            explanation: "Embora seja coberta de gelo, a Antártida é tecnicamente o maior deserto do mundo, pois recebe muito pouca precipitação."
        },
        {
            question: "Qual é o rio mais longo do mundo?",
            answers: ["Rio Nilo", "Rio Amazonas", "Rio Mississipi", "Rio Yangtzé"],
            correct: "Rio Amazonas",
            explanation: "Recentemente, o Rio Amazonas foi reclassificado como o mais longo do mundo, superando o Rio Nilo."
        },
        {
            question: "Em qual continente o Monte Everest está localizado?",
            answers: ["África", "América do Sul", "Ásia", "Europa"],
            correct: "Ásia",
            explanation: "O Monte Everest é a montanha mais alta do mundo, localizada na cordilheira do Himalaia, na fronteira entre o Nepal e o Tibete (China)."
        },
        {
            question: "Qual a capital do Canadá?",
            answers: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
            correct: "Ottawa",
            explanation: "Embora Toronto seja a maior cidade, a capital do Canadá é Ottawa."
        },
        {
            question: "Qual o menor país do mundo?",
            answers: ["Mônaco", "Nauru", "Vaticano", "San Marino"],
            correct: "Vaticano",
            explanation: "O Vaticano é o menor país do mundo, tanto em área quanto em população."
        },
        {
            question: "Qual é o maior oceano do planeta?",
            answers: ["Oceano Atlântico", "Oceano Índico", "Oceano Pacífico", "Oceano Ártico"],
            correct: "Oceano Pacífico",
            explanation: "O Oceano Pacífico é o maior e mais profundo dos cinco oceanos do mundo."
        },
        {
            question: "Qual país é conhecido como 'Terra do Sol Nascente'?",
            answers: ["China", "Coreia do Sul", "Japão", "Vietnã"],
            correct: "Japão",
            explanation: "A expressão vem da tradução literal do nome japonês para o país, 'Nihon' ou 'Nippon'."
        },
        {
            question: "Qual é a capital da Austrália?",
            answers: ["Sydney", "Melbourne", "Brisbane", "Camberra"],
            correct: "Camberra",
            explanation: "Muitas pessoas confundem, mas a capital da Austrália não é Sydney ou Melbourne, e sim Camberra."
        },
        {
            question: "Onde fica a Grande Muralha da China?",
            answers: ["Japão", "China", "Índia", "Rússia"],
            correct: "China",
            explanation: "A Grande Muralha da China é uma série de fortificações construídas no norte da China."
        },
        {
            question: "Em qual continente fica a Floresta Amazônica?",
            answers: ["África", "Ásia", "América do Sul", "América do Norte"],
            correct: "América do Sul",
            explanation: "A maior parte da Floresta Amazônica, a maior floresta tropical do mundo, está localizada no Brasil e em outros países da América do Sul."
        }
    ],
    conhecimentos_gerais: [
        {
            question: "Qual é a capital da França?",
            answers: ["Londres", "Berlim", "Roma", "Paris"],
            correct: "Paris",
            explanation: "A capital da França, Paris, é mundialmente famosa por seus monumentos como a Torre Eiffel e o Museu do Louvre."
        },
        {
            question: "Quantos planetas existem no sistema solar, excluindo Plutão?",
            answers: ["7", "8", "9", "10"],
            correct: "8",
            explanation: "Após a reclassificação de Plutão como um 'planeta anão' em 2006, o sistema solar tem 8 planetas principais."
        },
        {
            question: "Quem pintou a Mona Lisa?",
            answers: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
            correct: "Leonardo da Vinci",
            explanation: "A Mona Lisa, uma das obras de arte mais famosas do mundo, foi pintada por Leonardo da Vinci no século XVI."
        },
        {
            question: "Qual o maior animal terrestre?",
            answers: ["Girafa", "Elefante-africano", "Rinoceronte branco", "Urso-polar"],
            correct: "Elefante-africano",
            explanation: "O elefante-africano é o maior animal terrestre em massa."
        },
        {
            question: "Quantas cores tem um arco-íris?",
            answers: ["5", "6", "7", "8"],
            correct: "7",
            explanation: "As cores do arco-íris são: vermelho, laranja, amarelo, verde, azul, anil e violeta."
        },
        {
            question: "Qual o metal mais abundante na crosta terrestre?",
            answers: ["Ferro", "Alumínio", "Cobre", "Ouro"],
            correct: "Alumínio",
            explanation: "O alumínio é o metal mais abundante na crosta terrestre, embora o oxigênio seja o elemento mais abundante."
        },
        {
            question: "Qual o maior órgão do corpo humano?",
            answers: ["Cérebro", "Pulmão", "Pele", "Coração"],
            correct: "Pele",
            explanation: "A pele é o maior órgão do corpo humano, tanto em área quanto em peso."
        },
        {
            question: "Qual dos seguintes esportes é jogado com os pés?",
            answers: ["Basquete", "Vôlei", "Futebol", "Tênis"],
            correct: "Futebol",
            explanation: "O futebol é o esporte em que a bola é movida principalmente com os pés."
        },
        {
            question: "Qual o autor de 'Romeu e Julieta'?",
            answers: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            correct: "William Shakespeare",
            explanation: "William Shakespeare é um dos maiores dramaturgos de todos os tempos, conhecido por obras como 'Romeu e Julieta'."
        },
        {
            question: "Qual é a moeda oficial do Japão?",
            answers: ["Yuan", "Dólar", "Iene", "Euro"],
            correct: "Iene",
            explanation: "A moeda oficial do Japão é o Iene (JPY)."
        }
    ]
};

// tema 'ciencias', mantidas para caso você queira usá-las depois.
// Basta copiar e colar dentro do objeto 'quizQuestions' se precisar delas.
/*
const oldScienceQuestions = [
    {
        question: "Qual a função principal da mitocôndria?",
        answers: ["Síntese de proteínas", "Produção de energia", "Armazenamento de água", "Digestão celular"],
        correct: "Produção de energia",
        explanation: "A mitocôndria é conhecida como a 'casa de força' da célula, pois é responsável pela respiração celular e produção de ATP (energia)."
    },
    {
        question: "Qual é o nome do processo onde a planta usa a luz para produzir seu próprio alimento?",
        answers: ["Respiração", "Transpiração", "Fotossíntese", "Osmose"],
        correct: "Fotossíntese",
        explanation: "A fotossíntese é o processo onde as plantas, algas e algumas bactérias convertem energia luminosa em energia química."
    },
    {
        question: "Qual o principal componente da membrana plasmática?",
        answers: ["Celulose", "DNA", "Fosfolipídios", "Água"],
        correct: "Fosfolipídios",
        explanation: "A membrana plasmática é formada por uma bicamada de fosfolipídios, que regulam a passagem de substâncias para dentro e fora da célula."
    },
    {
        question: "Qual planeta é conhecido como 'Planeta Vermelho'?",
        answers: ["Vênus", "Marte", "Júpiter", "Saturno"],
        correct: "Marte",
        explanation: "Marte é conhecido como 'Planeta Vermelho' devido ao óxido de ferro em sua superfície, que lhe dá uma cor avermelhada."
    },
    {
        question: "Qual gás os seres humanos precisam respirar para viver?",
        answers: ["Dióxido de carbono", "Hidrogênio", "Oxigênio", "Nitrogênio"],
        correct: "Oxigênio",
        explanation: "O oxigênio é essencial para a respiração celular, o processo que gera energia para o corpo humano."
    },
    {
        question: "Quem propôs a teoria da relatividade?",
        answers: ["Isaac Newton", "Galileu Galilei", "Albert Einstein", "Stephen Hawking"],
        correct: "Albert Einstein",
        explanation: "Albert Einstein é o físico mais conhecido por desenvolver a teoria da relatividade, um dos pilares da física moderna."
    },
    {
        question: "Qual é a fórmula química da água?",
        answers: ["CO2", "H2O", "O2", "NaCl"],
        correct: "H2O",
        explanation: "A molécula de água é composta por dois átomos de hidrogênio e um átomo de oxigênio."
    },
    {
        question: "O que é um 'buraco negro'?",
        answers: ["Uma estrela sem luz", "Uma nebulosa", "Uma região do espaço-tempo com gravidade extrema", "Um cometa extinto"],
        correct: "Uma região do espaço-tempo com gravidade extrema",
        explanation: "Um buraco negro é uma região do espaço onde a gravidade é tão forte que nada, nem mesmo a luz, pode escapar."
    },
    {
        question: "Qual é o maior órgão do corpo humano?",
        answers: ["Coração", "Cérebro", "Fígado", "Pele"],
        correct: "Pele",
        explanation: "A pele é o maior órgão do corpo humano, protegendo-o contra infecções e perdas de água."
    },
    {
        question: "O que é o 'cogito ergo sum' de Descartes?",
        answers: ["Penso, logo existo", "Acredito para entender", "A vida é uma luta", "O homem é a medida de todas as coisas"],
        correct: "Penso, logo existo",
        explanation: "Essa famosa frase de René Descartes serve como o ponto de partida de sua filosofia, estabelecendo a existência do eu pensante."
    }
];
*/


// Função para embaralhar um array (algoritmo Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Funções do Jogo
function startQuiz(theme) {
    const username = usernameInput.value.trim();
    if (username === '') {
        alert('Por favor, digite seu nome para começar!');
        return;
    }

    currentUsername = username;
    currentTheme = theme;
    currentScore = 0;
    currentQuestionIndex = 0;

    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');

    const formattedTheme = currentTheme.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    userInfo.textContent = `Olá, ${currentUsername}! (Tema: ${formattedTheme})`;
    scoreDisplay.textContent = `Pontuação: ${currentScore}`;
    
    // Embaralha as perguntas do tema escolhido no início da rodada
    quizQuestions[currentTheme] = shuffleArray(quizQuestions[currentTheme]);

    showQuestion();
}

function showQuestion() {
    resetState();
    const questionData = quizQuestions[currentTheme][currentQuestionIndex];
    questionText.textContent = questionData.question;

    questionData.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-button');
        answersContainer.appendChild(button);

        button.addEventListener('click', () => selectAnswer(answer, questionData.correct, questionData.explanation));
    });

    startTimer();
}

function selectAnswer(selectedAnswer, correctAnswer, explanation) {
    clearInterval(timer);
    const answerButtons = answersContainer.querySelectorAll('.answer-button');

    answerButtons.forEach(button => {
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }
        button.disabled = true; // Desabilita todos os botões após a escolha
    });

    if (selectedAnswer === correctAnswer) {
        currentScore += 10; // Adiciona pontos
    } else {
        showFeedback(correctAnswer, explanation);
    }
    
    scoreDisplay.textContent = `Pontuação: ${currentScore}`;
    nextButton.classList.remove('hidden');
}

function showFeedback(correctAnswer, explanation) {
    feedbackContainer.innerHTML = `<h4>Resposta Correta:</h4><p>${correctAnswer}</p><h4>Explicação:</h4><p>${explanation}</p>`;
}

function resetState() {
    answersContainer.innerHTML = '';
    feedbackContainer.innerHTML = '';
    nextButton.classList.add('hidden');
}

function startTimer() {
    let timeLeft = TIME_LIMIT;
    timerDisplay.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            // Simula a escolha de uma resposta errada para mostrar o feedback
            const currentQuestion = quizQuestions[currentTheme][currentQuestionIndex];
            selectAnswer('Time is up!', currentQuestion.correct, currentQuestion.explanation);
        }
    }, 1000);
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions[currentTheme].length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    quizScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    finalUsernameDisplay.textContent = currentUsername;
    finalScoreDisplay.textContent = `${currentScore} pontos`;
}

function restartGame() {
    startScreen.classList.remove('hidden');
    endScreen.classList.add('hidden');
    usernameInput.value = '';
}

// Event Listeners
themeButtons.forEach(button => {
    button.addEventListener('click', () => startQuiz(button.dataset.theme));
});
nextButton.addEventListener('click', handleNextButton);
restartButton.addEventListener('click', restartGame);
