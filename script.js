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
const TIME_LIMIT = 15; // 15 segundos por pergunta

// Objeto com as perguntas do quiz
const quizQuestions = {
    historia: [
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
    ],
    biologia: [
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
        }
    ],
    filosofia: [
        {
            question: "Quem foi o autor da frase 'Só sei que nada sei'?",
            answers: ["Aristóteles", "Platão", "Sócrates", "Tales de Mileto"],
            correct: "Sócrates",
            explanation: "Sócrates usava essa frase para demonstrar a humildade intelectual e a busca constante pelo conhecimento."
        },
        {
            question: "Qual a teoria de Platão que diferencia o mundo sensível do mundo das ideias?",
            answers: ["Mundo dos átomos", "Alegoria da Caverna", "Teoria das Ideias", "Imperativo categórico"],
            correct: "Teoria das Ideias",
            explanation: "A Teoria das Ideias de Platão postula que o mundo material é apenas uma cópia imperfeita do mundo das Ideias, que é a realidade verdadeira."
        },
        {
            question: "O que é o 'cogito ergo sum' de Descartes?",
            answers: ["Penso, logo existo", "Acredito para entender", "A vida é uma luta", "O homem é a medida de todas as coisas"],
            correct: "Penso, logo existo",
            explanation: "Essa famosa frase de René Descartes serve como o ponto de partida de sua filosofia, estabelecendo a existência do eu pensante."
        }
    ]
};

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

    userInfo.textContent = `Olá, ${currentUsername}! (Tema: ${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)})`;
    scoreDisplay.textContent = `Pontuação: ${currentScore}`;

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