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
const TIME_LIMIT = 15; // Ajustado para 15 segundos conforme sugerido

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
    
    // NOVAS CATEGORIAS - GRADE UFF
    historia_brasil2: [
        {
            question: "O que caracterizou a 'Política dos Governadores' na República Velha?",
            answers: ["Voto secreto e universal", "Acordo entre governo federal e oligarquias estaduais", "Fim da corrupção eleitoral", "Nacionalização das indústrias"],
            correct: "Acordo entre governo federal e oligarquias estaduais",
            explanation: "Consolidada por Campos Sales, era um sistema de troca de favores que garantia apoio ao presidente em troca de autonomia para as elites locais."
        },
        {
            question: "Qual foi o marco econômico da Era Vargas (1930-1945)?",
            answers: ["Foco na agroexportação de café", "Industrialização por substituição de importações", "Abertura total ao capital estrangeiro", "Privatização da Petrobras"],
            correct: "Industrialização por substituição de importações",
            explanation: "Vargas impulsionou a indústria nacional e de base (como a CSN) para modernizar o Brasil e diminuir a dependência externa."
        }
    ],
    historiografia: [
        {
            question: "Qual a principal inovação da Escola dos Annales?",
            answers: ["Foco exclusivo em fatos políticos", "Interdisciplinaridade e história das mentalidades", "Retorno ao positivismo de Ranke", "Uso apenas de documentos escritos oficiais"],
            correct: "Interdisciplinaridade e história das mentalidades",
            explanation: "Os Annales romperam com a narrativa tradicional factual, focando em processos sociais, econômicos e culturais de longa duração."
        },
        {
            question: "Segundo o Materialismo Histórico de Marx, o que move a história?",
            answers: ["A vontade dos reis", "As ideias religiosas", "A luta de classes", "O determinismo geográfico"],
            correct: "A luta de classes",
            explanation: "Para o marxismo, as transformações sociais derivam das contradições materiais e dos conflitos entre classes com interesses opostos."
        }
    ]

    /* CATEGORIAS COMENTADAS (CIÊNCIAS, BIOLOGIA CELULAR, GEOGRAFIA, ZOOLOGIA, CONHECIMENTOS GERAIS):
    ,ciencias: [],
    biologia_celular: [],
    geografia: [],
    zoologia: [],
    conhecimentos_gerais: [],
    fundamentos_da_educacao: []
    */
};

// Função para embaralhar um array (algoritmo Fisher-Yates)
function shuffleArray(array) {
    if (!array) return [];
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Funções do Jogo
function startQuiz(theme) {
    const username = usernameInput.value.trim();
    if (username === '') {
        alert('Por favor, digite seu nome para começar!');
        return;
    }

    if (!quizQuestions[theme]) {
        alert('Este tema ainda não possui perguntas ativas!');
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
    
    // Embaralha as perguntas do tema escolhido
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
        } else if (button.textContent === selectedAnswer) {
            button.classList.add('wrong');
        }
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
            const currentQuestion = quizQuestions[currentTheme][currentQuestionIndex];
            selectAnswer('Tempo esgotado!', currentQuestion.correct, currentQuestion.explanation);
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
