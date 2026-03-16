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

// Variáveis de Controle
let currentUsername = '';
let currentTheme = '';
let currentScore = 0;
let currentQuestionIndex = 0;
let timer = null;
let wrongAnswers = []; 
const TIME_LIMIT = 15; 

// Banco de Dados com 10 questões por tema (Grade UFF)
const quizQuestions = {
    historia_brasil2: [
        {
            question: "A Lei de Terras de 1850 no Brasil visava:",
            answers: ["Facilitar o acesso de imigrantes à terra", "Tornar a compra a única forma de acesso à terra", "Distribuir terras para ex-escravizados", "Extinguir o latifúndio monocultor"],
            correct: "Tornar a compra a única forma de acesso à terra",
            explanation: "Num contexto de fim do tráfico negreiro, a elite garantiu que a terra continuasse concentrada, impedindo o acesso de trabalhadores pobres.",
            source: "http://www.planalto.gov.br/ccivil_03/leis/l0601-1850.htm"
        },
        {
            question: "A 'Questão Christie' (1862-1865) envolveu o Brasil e qual país?",
            answers: ["França", "Estados Unidos", "Inglaterra", "Paraguai"],
            correct: "Inglaterra",
            explanation: "Foi um incidente diplomático causado por pressões inglesas sobre o tráfico negreiro e soberania brasileira.",
            source: "https://drive.google.com/file/d/1vuexpqoxvStnBBu5l2a-rLcdN8lrwsGl/view?usp=sharing"
        },
        {
            question: "O movimento de Canudos (1896-1897) foi liderado por:",
            answers: ["Padre Cícero", "Antônio Conselheiro", "João Cândido", "Lampião"],
            correct: "Antônio Conselheiro",
            explanation: "Um movimento messiânico que questionava a República e a opressão dos latifundiários no sertão baiano.",
            source: "https://cpdoc.fgv.br/sites/default/files/verbetes/primeira-republica/CANUDOS_GUERRA_DE.pdf"
        },
        {
            question: "Qual o objetivo do 'Convênio de Taubaté' em 1906?",
            answers: ["Industrializar o Brasil", "Valorizar o preço do café via compra estatal", "Criar o salário mínimo", "Modernizar os portos"],
            correct: "Valorizar o preço do café via compra estatal",
            explanation: "As oligarquias cafeeiras usaram o Estado para garantir seus lucros em momentos de superprodução.",
            source: "https://brasilescola.uol.com.br/historiab/convenio-taubate.htm"
        },
        {
            question: "A Revolução de 1930 marcou o fim de qual período?",
            answers: ["Brasil Império", "República Velha", "Estado Novo", "Ditadura Militar"],
            correct: "República Velha",
            explanation: "Marcou a queda da hegemonia paulista e o início da Era Vargas.",
            source: "https://brasilescola.uol.com.br/o-que-e/historia/o-que-foi-revolucao-1930.htm"
        },
        {
            question: "O que foi a 'Intentona Comunista' de 1935?",
            answers: ["Um golpe militar vitorioso", "Um levante liderado pela Aliança Nacional Libertadora", "Uma reforma agrária de Vargas", "O início da Guerra Fria"],
            correct: "Um levante liderado pela Aliança Nacional Libertadora",
            explanation: "Tentativa de derrubar Vargas, servindo de pretexto para a radicalização que levou ao Estado Novo.",
            source: "https://cpdoc.fgv.br/producao/dossies/AEraVargas1/anos30-37/RadicalizacaoPolitica/IntentonaComunista"
        },
        {
            question: "Qual era o lema do governo Juscelino Kubitschek?",
            answers: ["Brasil: ame-o ou deixe-o", "50 anos em 5", "Ordem e Progresso", "Tudo pelo Social"],
            correct: "50 anos em 5",
            explanation: "Focava no desenvolvimentismo industrial e na construção de Brasília.",
            source: "https://brasilescola.uol.com.br/historiab/juscelino-kubitschek.htm"
        },
        {
            question: "O Ato Institucional nº 5 (AI-5) foi baixado em qual governo?",
            answers: ["Castelo Branco", "Costa e Silva", "Emílio Médici", "Ernesto Geisel"],
            correct: "Costa e Silva",
            explanation: "Em 1968, marcou o início dos anos de chumbo, fechando o Congresso e suspendendo o habeas corpus.",
            source: "https://www.fgv.br/cpdoc/acervo/dicionario-pelas-fotos/ai-5"
        },
        {
            question: "As 'Diretas Já' (1983-1984) pediam a aprovação de qual emenda?",
            answers: ["Emenda Dante de Oliveira", "Emenda Lacerda", "Ato Adicional", "Constituição de 1988"],
            correct: "Emenda Dante de Oliveira",
            explanation: "Mobilizou milhões de brasileiros pelo voto direto para Presidente.",
            source: "https://infograficos.camara.leg.br/historia-e-fotos-da-campanha-diretas-ja-que-fez-40-anos/"
        },
        {
            question: "O Plano Real foi implementado sob a liderança de qual ministro?",
            answers: ["Delfim Netto", "Fernando Henrique Cardoso", "Guido Mantega", "Dilma Rousseff"],
            correct: "Fernando Henrique Cardoso",
            explanation: "No governo Itamar Franco, estabilizou a economia e acabou com a hiperinflação.",
            source: "https://mundoeducacao.uol.com.br/historiab/plano-real.htm"
        }
    ],

    historiografia: [
        {
            question: "A 'Longa Duração' é um conceito fundamental de qual historiador?",
            answers: ["Marc Bloch", "Fernand Braudel", "Michel Foucault", "Karl Marx"],
            correct: "Fernand Braudel",
            explanation: "Refere-se a estruturas geográficas ou mentais que mudam muito lentamente ao longo dos séculos.",
            source: "https://rima.ufrrj.br/jspui/bitstream/20.500.14407/13963/3/2022%20-%20Daniel%20Rodrigues%20da%20Silva%20Marques.Pdf"
        },
        {
            question: "O Positivismo Histórico de Ranke focava prioritariamente em:",
            answers: ["Cultura popular", "Documentos oficiais e elites políticas", "Economia camponesa", "Psicanálise histórica"],
            correct: "Documentos oficiais e elites políticas",
            explanation: "Buscava a 'verdade' através de fontes escritas oficiais do Estado.",
            source: "https://drive.google.com/file/d/14A7s1vKV5dPiBbSy9RubRdgkEdINZB7O/view?usp=sharing"
        },
        {
            question: "Qual escola rompeu com a história factual em 1929?",
            answers: ["Marxismo", "Escola dos Annales", "Positivismo", "Nova História Cultural"],
            correct: "Escola dos Annales",
            explanation: "Fundada por Bloch e Febvre, introduziu a interdisciplinaridade no estudo da história.",
            source: "https://mundoeducacao.uol.com.br/historia/escola-dos-annales.htm"
        },
        {
            question: "O conceito de 'Lugar de Memória' pertence a:",
            answers: ["Eric Hobsbawm", "Pierre Nora", "Carlo Ginzburg", "Edward Thompson"],
            correct: "Pierre Nora",
            explanation: "Estuda como a memória coletiva se ancora em objetos, locais ou datas.",
            source: "https://pt.wikipedia.org/wiki/Lugar_de_mem%C3%B3ria"
        },
        {
            question: "A Micro-história italiana ficou famosa com a obra de:",
            answers: ["Carlo Ginzburg", "Antonio Gramsci", "Umberto Eco", "Lévi-Strauss"],
            correct: "Carlo Ginzburg",
            explanation: "Em 'O Queijo e os Vermes', analisou a visão de mundo de um moleiro do século XVI.",
            source: "https://drive.google.com/file/d/10McVl1HlgXaitvXJlPjG4J-SpMrAOVKV/view?usp=sharing"
        },
        {
            question: "Para o Marxismo, a base da sociedade (Infraestrutura) é:",
            answers: ["A religião", "A economia e os modos de produção", "As leis", "A filosofia"],
            correct: "A economia e os modos de produção",
            explanation: "As relações materiais determinam as formas de consciência e política (Superestrutura).",
            source: "https://cafecomsociologia.com/infraestrutura-e-superestrutura-em-marx/"
        },
        {
            question: "A 'História das Mentalidades' foi uma marca de qual geração dos Annales?",
            answers: ["Primeira", "Segunda", "Terceira", "Quarta"],
            correct: "Terceira",
            explanation: "Focou nas percepções, imaginários e cotidiano das populações.",
            source: "https://pt.wikipedia.org/wiki/Escola_dos_Annales",
            source: "https://www.youtube.com/watch?v=hGA67lxUS_A&t=79s"
        },
        {
            question: "Quem defende que o 'Gênero' é uma categoria útil de análise histórica?",
            answers: ["Joan Scott", "Simone de Beauvoir", "Michel Foucault", "Hayden White"],
            correct: "Joan Scott",
            explanation: "Definiu gênero como uma forma primária de significar relações de poder.",
            source: "https://repositorio.sistemas.mpba.mp.br/xmlui/bitstream/handle/123456789/524/G%C3%AAnero_uma%20categoria%20%C3%BAtil%20para%20an%C3%A1lise%20hist%C3%B3rica%20-%20Joan%20Scott%2C%202016%20.pdf?sequence=1&isAllowed=y"
        },
        {
            question: "A 'Nova História Cultural' aproxima a História de qual disciplina?",
            answers: ["Física", "Antropologia", "Matemática", "Economia Clássica"],
            correct: "Antropologia",
            explanation: "Usa conceitos como 'descrição densa' de Geertz para entender rituais e símbolos sociais.",
            source: "https://www.webartigos.com/artigos/a-nova-historia-cultural/27489"
        },
        {
            question: "A obra 'A Sociedade Feudal' é um clássico de:",
            answers: ["Lucien Febvre", "Marc Bloch", "Fernand Braudel", "Jacques Le Goff"],
            correct: "Marc Bloch",
            explanation: "Um estudo magistral sobre as estruturas sociais e mentais da Idade Média.",
            source: "https://pt.wikipedia.org/wiki/Marc_Bloch"
        }
    ]
};

// Funções do Motor do Jogo
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
    if (!quizQuestions[theme]) { alert('Tema não encontrado!'); return; }

    currentUsername = username;
    currentTheme = theme;
    currentScore = 0;
    currentQuestionIndex = 0;
    wrongAnswers = []; 

    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    endScreen.classList.add('hidden');

    userInfo.textContent = `Aluno(a): ${currentUsername} | Tema: ${currentTheme.replace('_', ' ').toUpperCase()}`;
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
        wrongAnswers.push({ q: quizQuestions[currentTheme][currentQuestionIndex].question, correct: correct, src: source });
        showFeedback(correct, explanation, source);
    }
    
    scoreDisplay.textContent = `Pontuação: ${currentScore}`;
    nextButton.classList.remove('hidden');
}

function showFeedback(correct, explanation, source) {
    let link = source ? `<br><a href="${source}" target="_blank" style="color: #ffcc00; font-weight: bold; text-decoration: underline;">🔍 Consultar Fonte Acadêmica</a>` : "";
    feedbackContainer.innerHTML = `
        <div style="background: rgba(255, 255, 255, 0.1); padding: 10px; border-radius: 5px; margin-top: 10px;">
            <p><strong>Correta:</strong> ${correct}</p>
            <p>${explanation}</p>
            ${link}
        </div>
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
            selectAnswer('Esgotado', q.correct, q.explanation, q.source);
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
            <div style="border-bottom: 1px solid #666; padding: 10px 0;">
                <p><strong>Questão:</strong> ${item.q}</p>
                <p><strong>Resposta Correta:</strong> ${item.correct}</p>
                <a href="${item.src}" target="_blank" style="color: #00e676;">Estudar mais sobre isso</a>
            </div>
        `).join('');
    } else {
        reviewArea.classList.add('hidden');
    }
}

function restartGame() {
    location.reload(); // Recarrega para limpar tudo
}

themeButtons.forEach(button => {
    button.addEventListener('click', () => startQuiz(button.dataset.theme));
});
nextButton.addEventListener('click', handleNextButton);
restartButton.addEventListener('click', restartGame);
