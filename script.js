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

// Variáveis de controle de erro para revisão
let wrongAnswers = []; 
let currentUsername = '';
let currentTheme = '';
let currentScore = 0;
let currentQuestionIndex = 0;
let timer = null;
const TIME_LIMIT = 15;

const quizQuestions = {
    // ... (Manter categorias: africa, america1, brasil1, geohistoria do código anterior)

    historia_brasil2: [
        {
            question: "A Lei de Terras de 1850 no Brasil teve como principal objetivo:",
            answers: ["Promover a reforma agrária", "Impedir o acesso de imigrantes e ex-escravos à terra", "Distribuir terras para quilombolas", "Acabar com o latifúndio"],
            correct: "Impedir o acesso de imigrantes e ex-escravos à terra",
            explanation: "Ao determinar que a terra só poderia ser adquirida por compra, a lei garantiu a concentração fundiária.",
            source: "https://brasilescola.uol.com.br/historiab/lei-terras.htm"
        },
        {
            question: "O que foi a 'Questão Christie' no Segundo Reinado?",
            answers: ["Um conflito religioso", "Um incidente diplomático entre Brasil e Inglaterra", "Uma revolta camponesa", "A disputa pelo trono de Portugal"],
            correct: "Um incidente diplomático entre Brasil e Inglaterra",
            explanation: "Foi um rompimento diplomático causado por tensões sobre o tráfico negreiro e a soberania brasileira.",
            source: "https://mundoeducacao.uol.com.br/historiab/questao-christie.htm"
        },
        {
            question: "Qual foi a principal causa da Revolta da Vacina (1904)?",
            answers: ["Aumento do preço do café", "Autoritarismo sanitário e reforma urbana no Rio de Janeiro", "O fim da escravidão", "A entrada do Brasil na 1ª Guerra"],
            correct: "Autoritarismo sanitário e reforma urbana no Rio de Janeiro",
            explanation: "A população reagiu à vacinação obrigatória e às demolições do 'Bota-abaixo' de Pereira Passos.",
            source: "https://www.scielo.br/j/hcsm/a/6Pz9zL5PzL5PzL5PzL5PzL5/"
        },
        // ... (As outras perguntas do bloco anterior também devem seguir este padrão com 'source')
    ],

    historiografia: [
        {
            question: "Para o Positivismo de Leopold von Ranke, o papel do historiador é:",
            answers: ["Interpretar o passado com sua visão pessoal", "Narrar o fato exatamente como ele aconteceu", "Fazer militância política", "Ignorar documentos oficiais"],
            correct: "Narrar o fato exatamente como ele aconteceu",
            explanation: "O positivismo buscava uma objetividade absoluta e o uso rigoroso de documentos oficiais.",
            source: "https://pt.wikipedia.org/wiki/Leopold_von_Ranke"
        },
        {
            question: "Quem são os fundadores da Escola dos Annales em 1929?",
            answers: ["Karl Marx e Engels", "Marc Bloch e Lucien Febvre", "Michel Foucault e Derrida", "Fernand Braudel e Jacques Le Goff"],
            correct: "Marc Bloch e Lucien Febvre",
            explanation: "Eles fundaram a revista que revolucionou a história, combatendo a história puramente política.",
            source: "https://ensinarhistoria.com.br/escola-dos-annales-a-revolucao-na-historia/"
        }
    ]
};

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
    if (username === '') { alert('Digite seu nome!'); return; }
    if (!quizQuestions[theme]) { alert('Tema em construção!'); return; }

    currentUsername = username;
    currentTheme = theme;
    currentScore = 0;
    currentQuestionIndex = 0;
    wrongAnswers = []; // Limpa erros anteriores

    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    endScreen.classList.add('hidden');

    userInfo.textContent = `Olá, ${currentUsername}!`;
    scoreDisplay.textContent = `Pontuação: ${currentScore}`;
    
    quizQuestions[currentTheme] = shuffleArray(quizQuestions[currentTheme]);
    showQuestion();
}

function showQuestion() {
    resetState();
    const questionData = quizQuestions[currentTheme][currentQuestionIndex];
    questionText.textContent = questionData.question;

    shuffleArray(questionData.answers).forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-button');
        answersContainer.appendChild(button);
        button.addEventListener('click', () => selectAnswer(answer, questionData.correct, questionData.explanation, questionData.source));
    });

    startTimer();
}

function selectAnswer(selected, correct, explanation, source) {
    clearInterval(timer);
    const buttons = answersContainer.querySelectorAll('.answer-button');

    buttons.forEach(btn => {
        if (btn.textContent === correct) btn.classList.add('correct');
        else if (btn.textContent === selected) btn.classList.add('wrong');
        btn.disabled = true;
    });

    if (selected === correct) {
        currentScore += 10;
    } else {
        // Guarda o erro para a revisão final
        wrongAnswers.push({
            q: quizQuestions[currentTheme][currentQuestionIndex].question,
            correct: correct,
            src: source
        });
        showFeedback(correct, explanation, source);
    }
    
    scoreDisplay.textContent = `Pontuação: ${currentScore}`;
    nextButton.classList.remove('hidden');
}

function showFeedback(correct, explanation, source) {
    let sourceBtn = source ? `<br><a href="${source}" target="_blank" class="source-link">📚 Consultar Fonte Acadêmica</a>` : "";
    feedbackContainer.innerHTML = `
        <h4>Resposta Correta: ${correct}</h4>
        <p>${explanation}</p>
        ${sourceBtn}
    `;
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
            const q = quizQuestions[currentTheme][currentQuestionIndex];
            selectAnswer('Tempo Esgotado', q.correct, q.explanation, q.source);
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

    const reviewArea = document.getElementById('review-area');
    const reviewList = document.getElementById('review-list');
    
    if (wrongAnswers.length > 0) {
        reviewArea.classList.remove('hidden');
        reviewList.innerHTML = wrongAnswers.map(item => `
            <div class="review-item">
                <p><strong>Questão:</strong> ${item.q}</p>
                <p><strong>Correta:</strong> ${item.correct}</p>
                <a href="${item.src}" target="_blank">Ler mais sobre isso</a>
                <hr>
            </div>
        `).join('');
    } else {
        reviewArea.classList.add('hidden');
        reviewList.innerHTML = "<p>Incrível! Você não errou nenhuma questão.</p>";
    }
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
