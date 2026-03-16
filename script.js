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
const TIME_LIMIT = 15; // 15 segundos para leitura acadêmica

// Objeto com as perguntas do quiz
const quizQuestions = {
    historia_africa: [
        {
            question: "Qual era a principal fonte de riqueza do Império de Mali?",
            answers: ["Ouro e sal", "Peles e marfim", "Diamantes e especiarias", "Escravos e tabaco"],
            correct: "Ouro e sal",
            explanation: "O Império de Mali controlava as rotas comerciais que ligavam as minas de ouro e as minas de sal do Saara."
        },
        {
            question: "Quem foi o líder do movimento anti-apartheid na África do Sul?",
            answers: ["Desmond Tutu", "Thabo Mbeki", "Nelson Mandela", "Jomo Kenyatta"],
            correct: "Nelson Mandela",
            explanation: "Nelson Mandela foi o líder do CNA e o principal ativista contra o regime de segregação racial."
        }
    ],
    historia_america1: [
        {
            question: "Qual a capital do Império Asteca antes da chegada dos espanhóis?",
            answers: ["Cuzco", "Tenochtitlán", "Palenque", "Chichén Itzá"],
            correct: "Tenochtitlán",
            explanation: "Tenochtitlán, construída sobre uma ilha no lago Texcoco, era a capital do Império Asteca."
        }
    ],
    historia_brasil1: [
        {
            question: "Qual foi o principal produto explorado no Brasil no período pré-colonial?",
            answers: ["Ouro", "Açúcar", "Pau-Brasil", "Algodão"],
            correct: "Pau-Brasil",
            explanation: "O Pau-Brasil era uma madeira de alto valor na Europa por produzir um pigmento vermelho."
        }
    ],
    geohistoria: [
        {
            question: "Qual o papel do Rio Nilo no Egito Antigo?",
            answers: ["Fonte de água potável apenas", "Transporte de mercadorias", "Essencial para a agricultura e unificação", "Obstáculo natural"],
            correct: "Essencial para a agricultura e unificação",
            explanation: "O Nilo fornecia solo fértil e servia como via de comunicação vital para o reino."
        }
    ],
    
    historia_brasil2: [
        {
            question: "A Lei de Terras de 1850 no Brasil teve como principal objetivo:",
            answers: ["Promover a reforma agrária", "Impedir o acesso de imigrantes e ex-escravos à terra", "Distribuir terras para quilombolas", "Acabar com o latifúndio"],
            correct: "Impedir o acesso de imigrantes e ex-escravos à terra",
            explanation: "Ao determinar que a terra só poderia ser adquirida por compra, a lei garantiu a concentração fundiária nas mãos da elite."
        },
        {
            question: "O que foi a 'Questão Christie' no Segundo Reinado?",
            answers: ["Um conflito religioso", "Um incidente diplomático entre Brasil e Inglaterra", "Uma revolta camponesa", "A disputa pelo trono de Portugal"],
            correct: "Um incidente diplomático entre Brasil e Inglaterra",
            explanation: "Foi um rompimento diplomático causado por tensões sobre o tráfico negreiro e a soberania brasileira."
        },
        {
            question: "Qual foi a principal causa da Revolta da Vacina (1904)?",
            answers: ["Aumento do preço do café", "Autoritarismo sanitário e reforma urbana no Rio de Janeiro", "O fim da escravidão", "A entrada do Brasil na 1ª Guerra"],
            correct: "Autoritarismo sanitário e reforma urbana no Rio de Janeiro",
            explanation: "A população reagiu à vacinação obrigatória imposta por Oswaldo Cruz e às demolições do 'Bota-abaixo' de Pereira Passos."
        },
        {
            question: "O Plano Salte (Saúde, Alimentação, Transporte e Energia) foi uma tentativa de planejamento econômico de qual governo?",
            answers: ["Getúlio Vargas", "Eurico Gaspar Dutra", "Juscelino Kubitschek", "João Goulart"],
            correct: "Eurico Gaspar Dutra",
            explanation: "Foi o primeiro grande plano de metas do Brasil, embora tenha tido pouco sucesso prático."
        },
        {
            question: "O que caracterizou o período do 'Milagre Econômico' (1969-1973)?",
            answers: ["Crescimento do PIB com arrocho salarial", "Redução da dívida externa", "Fim da inflação", "Distribuição de renda"],
            correct: "Crescimento do PIB com arrocho salarial",
            explanation: "O país cresceu a taxas de 10%, mas à custa do aumento da desigualdade e censura política."
        },
        {
            question: "O 'Atentado da Rua Tonelero' desencadeou a crise que levou ao:",
            answers: ["Golpe de 1964", "Suicídio de Getúlio Vargas em 1954", "Impeachment de Collor", "Renúncia de Jânio Quadros"],
            correct: "Suicídio de Getúlio Vargas em 1954",
            explanation: "O atentado contra Carlos Lacerda aumentou a pressão militar e política sobre Vargas."
        },
        {
            question: "Qual movimento social lutou contra o regime militar na década de 1980?",
            answers: ["Tenentismo", "Diretas Já", "Revolta da Chibata", "Inconfidência Mineira"],
            correct: "Diretas Já",
            explanation: "A campanha pelas Diretas Já uniu diversos setores da sociedade civil pedindo eleições diretas para presidente."
        },
        {
            question: "A política econômica de Juscelino Kubitschek ficou conhecida como:",
            answers: ["Estado Novo", "Desenvolvimentismo", "Neoliberalismo", "Encilhamento"],
            correct: "Desenvolvimentismo",
            explanation: "Focada no Plano de Metas e na construção de Brasília, visava crescer '50 anos em 5'."
        },
        {
            question: "O governo de João Goulart (Jango) foi marcado pela defesa das:",
            answers: ["Reformas de Base", "Privatizações", "Leis de Cercamento", "Monarquia constitucional"],
            correct: "Reformas de Base",
            explanation: "Incluíam reformas agrária, educacional e bancária, o que gerou forte oposição das elites e militares."
        },
        {
            question: "Qual foi o principal objetivo do Plano Real (1994)?",
            answers: ["Aumentar o salário mínimo em 100%", "Combater a hiperinflação", "Criar a Petrobras", "Estatizar os bancos"],
            correct: "Combater a hiperinflação",
            explanation: "Implementado no governo Itamar Franco, o plano estabilizou a economia através da URV e da nova moeda, o Real."
        }
    ],

    historiografia: [
        {
            question: "Para o Positivismo de Leopold von Ranke, o papel do historiador é:",
            answers: ["Interpretar o passado com sua visão pessoal", "Narrar o fato exatamente como ele aconteceu", "Fazer militância política", "Ignorar documentos oficiais"],
            correct: "Narrar o fato exatamente como ele aconteceu",
            explanation: "O positivismo buscava uma objetividade absoluta e o uso rigoroso de documentos oficiais como 'verdade'."
        },
        {
            question: "Quem são os fundadores da Escola dos Annales em 1929?",
            answers: ["Karl Marx e Engels", "Marc Bloch e Lucien Febvre", "Michel Foucault e Derrida", "Fernand Braudel e Jacques Le Goff"],
            correct: "Marc Bloch e Lucien Febvre",
            explanation: "Eles fundaram a revista que revolucionou a história, combatendo a história puramente política e biográfica."
        },
        {
            question: "O conceito de 'Longa Duração' (Longue Durée) foi desenvolvido por:",
            answers: ["Fernand Braudel", "Auguste Comte", "Eric Hobsbawm", "Edward Thompson"],
            correct: "Fernand Braudel",
            explanation: "Braudel propôs que certas estruturas (geográficas, mentais) mudam muito lentamente ao longo dos séculos."
        },
        {
            question: "A 'Nova História Cultural' desloca o olhar do historiador para:",
            answers: ["Apenas grandes batalhas", "Representações, práticas e subjetividades", "Dados estatísticos puramente econômicos", "A vida dos grandes reis"],
            correct: "Representações, práticas e subjetividades",
            explanation: "A NHC foca em como os sujeitos dão significado à sua realidade através de símbolos e rituais."
        },
        {
            question: "O que define a categoria de 'Classe Social' para Edward P. Thompson?",
            answers: ["Um dado estatístico de renda", "Uma relação e uma experiência vivida", "Algo que não existe na história", "Um grupo determinado apenas pela biologia"],
            correct: "Uma relação e uma experiência vivida",
            explanation: "Thompson critica o determinismo econômico, vendo a classe como algo construído na cultura e na luta cotidiana."
        },
        {
            question: "O Materialismo Histórico considera que a 'Infraestrutura' da sociedade é:",
            answers: ["A religião e a arte", "A base econômica e as relações de produção", "O sistema jurídico", "A filosofia"],
            correct: "A base econômica e as relações de produção",
            explanation: "Para Marx, as mudanças na base material determinam as mudanças na 'Superestrutura' (leis, política, cultura)."
        },
        {
            question: "Qual a crítica da pós-modernidade à historiografia tradicional?",
            answers: ["Diz que a história deve ser um dogma", "Questiona as grandes narrativas e a verdade única", "Defende o retorno ao positivismo", "Nega a existência de arquivos"],
            correct: "Questiona as grandes narrativas e a verdade única",
            explanation: "Pensadores como Hayden White enfatizam a natureza narrativa e linguística do conhecimento histórico."
        },
        {
            question: "O conceito de 'Lugar de Memória' foi cunhado por:",
            answers: ["Pierre Nora", "Carlo Ginzburg", "Walter Benjamin", "Joan Scott"],
            correct: "Pierre Nora",
            explanation: "Refere-se a locais (monumentos, arquivos, datas) onde a memória coletiva se ancora após a perda da memória viva."
        },
        {
            question: "A 'Micro-história' italiana (ex: Carlo Ginzburg) propõe:",
            answers: ["Estudar apenas grandes impérios", "A redução da escala de observação para detalhes singulares", "O fim da pesquisa documental", "A história vista apenas por satélites"],
            correct: "A redução da escala de observação para detalhes singulares",
            explanation: "Ginzburg, em 'O Queijo e os Vermes', analisa um moleiro para entender a cultura popular do século XVI."
        },
        {
            question: "O uso do gênero como categoria de análise histórica foi impulsionado por:",
            answers: ["Michel Foucault", "Joan Scott", "Philippe Ariès", "Leopold von Ranke"],
            correct: "Joan Scott",
            explanation: "Scott definiu o gênero como uma forma primária de significar relações de poder, essencial para a historiografia contemporânea."
        }
    ]
};

// --- RESTANTE DA LÓGICA DO JOGO ---

function shuffleArray(array) {
    if (!array) return [];
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function startQuiz(theme) {
    const username = usernameInput.value.trim();
    if (username === '') {
        alert('Por favor, digite seu nome!');
        return;
    }
    if (!quizQuestions[theme] || quizQuestions[theme].length === 0) {
        alert('Tema em construção!');
        return;
    }
    currentUsername = username;
    currentTheme = theme;
    currentScore = 0;
    currentQuestionIndex = 0;
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    const formattedTheme = currentTheme.replace(/_/g, ' ').toUpperCase();
    userInfo.textContent = `Olá, ${currentUsername}! | Tema: ${formattedTheme}`;
    scoreDisplay.textContent = `Pontuação: ${currentScore}`;
    quizQuestions[currentTheme] = shuffleArray(quizQuestions[currentTheme]);
    showQuestion();
}

function showQuestion() {
    resetState();
    const questionData = quizQuestions[currentTheme][currentQuestionIndex];
    questionText.textContent = questionData.question;
    const shuffledAnswers = shuffleArray(questionData.answers);
    shuffledAnswers.forEach(answer => {
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
        if (button.textContent === correctAnswer) button.classList.add('correct');
        else if (button.textContent === selectedAnswer) button.classList.add('wrong');
        button.disabled = true;
    });
    if (selectedAnswer === correctAnswer) {
        currentScore += 10;
    } else {
        showFeedback(correctAnswer, explanation);
    }
    scoreDisplay.textContent = `Pontuação: ${currentScore}`;
    nextButton.classList.remove('hidden');
}

function showFeedback(correctAnswer, explanation) {
    feedbackContainer.innerHTML = `<h4>Resposta Correta: ${correctAnswer}</h4><p>${explanation}</p>`;
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
            const correct = quizQuestions[currentTheme][currentQuestionIndex].correct;
            const explanation = quizQuestions[currentTheme][currentQuestionIndex].explanation;
            selectAnswer('Tempo esgotado!', correct, explanation);
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

themeButtons.forEach(button => {
    button.addEventListener('click', () => startQuiz(button.dataset.theme));
});
nextButton.addEventListener('click', handleNextButton);
restartButton.addEventListener('click', restartGame);
