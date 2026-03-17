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
const TIME_LIMIT = 20; // Aumentado para 20s devido à complexidade acadêmica

// Banco de Dados Atualizado (Foco em Brasil Império e Historiografia - Grade UFF)
const quizQuestions = {
    historia_brasil2: [
        {
            question: "A Constituição de 1824 estabeleceu o Poder Moderador. Qual era sua função principal segundo a teoria de Benjamin Constant adaptada por D. Pedro I?",
            answers: ["Garantir a harmonia entre os poderes como um 'mecanismo de equilíbrio'", "Submeter o Executivo às decisões do Legislativo", "Promover a descentralização administrativa das províncias", "Extinguir a vitaliciedade do Senado"],
            correct: "Garantir a harmonia entre os poderes como um 'mecanismo de equilíbrio'",
            explanation: "Na prática, o Poder Moderador dava ao Imperador autoridade sobre os demais poderes, sendo a chave da organização política imperial.",
            source: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao24.htm"
        },
        {
            question: "A Confederação do Equador (1824) foi uma reação direta a qual medida de D. Pedro I?",
            answers: ["A outorga da Constituição e o fechamento da Constituinte", "A abdicação do trono em favor de D. Maria da Glória", "A assinatura do Tratado de Aliança e Amizade com a Inglaterra", "A criação da Guarda Nacional"],
            correct: "A outorga da Constituição e o fechamento da Constituinte",
            explanation: "O autoritarismo do Imperador e a centralização do poder no Rio de Janeiro provocaram a revolta republicana no Nordeste.",
            source: "https://mundoeducacao.uol.com.br/historiadobrasil/confederacao-equador.htm"
        },
        {
            question: "Durante o Período Regencial, o Ato Adicional de 1834 representou:",
            answers: ["Uma experiência descentralizadora e federalista", "O fortalecimento imediato do Poder Moderador", "A criação do parlamentarismo às avessas", "A proibição do tráfico negreiro"],
            correct: "Uma experiência descentralizadora e federalista",
            explanation: "O Ato criou as Assembleias Legislativas Provinciais, dando maior autonomia local antes do 'Regresso' conservador.",
            source: "https://brasilescola.uol.com.br/historiab/ato-adicional-1834.htm"
        },
        {
            question: "Qual foi a principal característica social da Revolta dos Malês (1835) em Salvador?",
            answers: ["Foi liderada por escravizados de origem islâmica que sabiam ler e escrever", "Buscava a manutenção da monarquia constitucional", "Tinha como objetivo a expulsão dos imigrantes europeus", "Foi um movimento da elite contra o centralismo regencial"],
            correct: "Foi liderada por escravizados de origem islâmica que sabiam ler e escrever",
            explanation: "Os Malês utilizaram o árabe para organizar o levante, sendo o maior movimento de resistência escrava urbana no Brasil.",
            source: "https://www.gov.br/palmares/pt-br/assuntos/noticias/revolta-dos-males-um-levante-contra-a-escravidao-na-bahia"
        },
        {
            question: "A Lei de Terras (1850) foi aprovada quase simultaneamente à Lei Eusébio de Queirós. A correlação entre elas explica-se por:",
            answers: ["Impedir que imigrantes e ex-escravizados tivessem acesso fácil à terra após o fim do tráfico", "Distribuir terras devolutas para colonos pobres", "Acabar com o regime de sesmarias para favorecer a reforma agrária", "Facilitar a compra de terras por escravos libertos"],
            correct: "Impedir que imigrantes e ex-escravizados tivessem acesso fácil à terra após o fim do tráfico",
            explanation: "Com o fim do tráfico, a terra tornou-se o novo mecanismo de controle social da elite latifundiária.",
            source: "https://www.jusbrasil.com.br/artigos/a-lei-de-terras-de-1850-e-sua-relacao-com-a-questao-fundiaria-no-brasil/838743929"
        },
        {
            question: "O sistema de 'Parlamentarismo às Avessas' no Segundo Reinado caracterizava-se por:",
            answers: ["O Imperador nomear o Presidente do Conselho antes das eleições legislativas", "O Parlamento ter o poder de destituir o Imperador a qualquer momento", "A inexistência da figura do Primeiro-Ministro", "O controle total da Igreja Católica sobre as decisões do Senado"],
            correct: "O Imperador nomear o Presidente do Conselho antes das eleições legislativas",
            explanation: "Diferente do modelo inglês, no Brasil o Poder Moderador garantia que o Executivo moldasse o Legislativo através de eleições fraudulentas.",
            source: "https://www.historiadobrasil.net/resumos/parlamentarismo_as_avessas.htm"
        },
        {
            question: "A Guerra do Paraguai (1864-1870) teve como uma de suas consequências políticas para o Império:",
            answers: ["O fortalecimento do Exército como ator político e o crescimento do abolicionismo", "A consolidação imediata da monarquia por mais 50 anos", "A entrega da província do Rio Grande do Sul ao Uruguai", "O fim do endividamento brasileiro com bancos ingleses"],
            correct: "O fortalecimento do Exército como ator político e o crescimento do abolicionismo",
            explanation: "O contato de soldados com repúblicas e escravizados que lutaram na guerra gerou uma crise de legitimidade da monarquia.",
            source: "https://www.todamateria.com.br/guerra-do-paraguai/"
        },
        {
            question: "O 'Baile da Ilha Fiscal' (1889) ficou marcado na historiografia como:",
            answers: ["A última grande festa da monarquia dias antes da Proclamação da República", "O local onde foi assinada a Lei Áurea", "A comemoração pela vitória na Guerra do Paraguai", "O encontro que uniu monarquistas e republicanos"],
            correct: "A última grande festa da monarquia dias antes da Proclamação da República",
            explanation: "O evento simbolizou o isolamento da elite imperial frente à crise política que culminaria no golpe republicano.",
            source: "https://aventurasnahistoria.com.br/noticias/almanaque/ultima-festa-do-imperio-o-que-foi-o-baile-da-ilha-fiscal.phtml"
        },
        {
            question: "A Questão Christie (1862) exemplifica as tensões entre Brasil e Inglaterra relacionadas a:",
            answers: ["Soberania nacional e o cumprimento dos tratados de fim do tráfico negreiro", "A disputa pela posse da região da Cisplatina", "O controle das minas de ouro em Minas Gerais", "A influência inglesa na Revolução Farroupilha"],
            correct: "Soberania nacional e o cumprimento dos tratados de fim do tráfico negreiro",
            explanation: "O rompimento diplomático mostrou a resistência brasileira às pressões britânicas sobre o tráfico e incidentes marítimos.",
            source: "https://brasilescola.uol.com.br/historiab/questao-christie.htm"
        },
        {
            question: "O movimento abolicionista, a partir da década de 1880, diferenciou-se por:",
            answers: ["Contar com a participação ativa de intelectuais negros, jornalistas e ações de desobediência civil", "Ser um movimento puramente parlamentar e restrito às elites", "Defender a indenização dos proprietários de escravos", "Ser liderado exclusivamente pela Princesa Isabel"],
            correct: "Contar com a participação ativa de intelectuais negros, jornalistas e ações de desobediência civil",
            explanation: "Nomes como José do Patrocínio, André Rebouças e Luiz Gama deram um caráter popular e combativo ao movimento.",
            source: "https://anpuh.org.br/uploads/anais-simposios/pdf/2019-01/1548875176_97b8cb5603c40377de3d58bb9f458af5.pdf"
        },
        {
            question: "A Tarifa Alves Branco (1844) teve como impacto na economia imperial:",
            answers: ["O protecionismo alfandegário que estimulou os primeiros surtos industriais (Barão de Mauá)", "A redução total dos impostos sobre produtos ingleses", "O fim da exportação de café para a Europa", "A criação da primeira moeda única da América Latina"],
            correct: "O protecionismo alfandegário que estimulou os primeiros surtos industriais (Barão de Mauá)",
            explanation: "Ao aumentar as taxas de importação, o governo buscou equilibrar as contas e acabou favorecendo investimentos internos.",
            source: "https://mundoeducacao.uol.com.br/historiadobrasil/a-tarifa-alves-branco.htm"
        },
        {
            question: "A 'Crise Religiosa' da década de 1870, fator de queda da monarquia, envolveu:",
            answers: ["O conflito entre o Imperador (Padroado) e a Igreja sobre a influência da Maçonaria", "A tentativa de D. Pedro II de transformar o Brasil em um país protestante", "A proibição de cultos africanos nas fazendas de café", "A expulsão dos Jesuítas do território nacional"],
            correct: "O conflito entre o Imperador (Padroado) e a Igreja sobre a influência da Maçonaria",
            explanation: "O governo imperial não aceitou as bulas papais contra maçons, gerando a prisão de bispos e a perda de apoio da Igreja.",
            source: "https://www12.senado.leg.br/noticias/especiais/arquivo-s/trono-altar-questao-religiosa-teve-prisao-de-bispos-e-enfraqueceu-imperio"
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
            answers: ["A religião", "A economy e os modos de produção", "As leis", "A filosofia"],
            correct: "A economy e os modos de produção",
            explanation: "As relações materiais determinam as formas de consciência e política (Superestrutura).",
            source: "https://cafecomsociologia.com/infraestrutura-e-superestrutura-em-marx/"
        },
        {
            question: "A 'História das Mentalidades' foi uma marca de qual geração dos Annales?",
            answers: ["Primeira", "Segunda", "Terceira", "Quarta"],
            correct: "Terceira",
            explanation: "Focou nas percepções, imaginários e cotidiano das populações.",
            source: "https://pt.wikipedia.org/wiki/Escola_dos_Annales"
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
        },
        {
            question: "O conceito de 'Invenção das Tradições' foi popularizado por:",
            answers: ["Eric Hobsbawm", "Ferdinand Saussure", "Benedict Anderson", "Roger Chartier"],
            correct: "Eric Hobsbawm",
            explanation: "Analisa como rituais e símbolos 'antigos' são criados recentemente para forjar identidades nacionais.",
            source: "https://pt.wikipedia.org/wiki/A_Inven%C3%A7%C3%A3o_das_Tradi%C3%A7%C3%B5es"
        },
        {
            question: "Edward P. Thompson, na historiografia inglesa, é referência em:",
            answers: ["Cultura operária e 'História vista de baixo'", "Estatística demográfica pura", "História dos grandes reis e generais", "Arqueologia medieval"],
            correct: "Cultura operária e 'História vista de baixo'",
            explanation: "Em 'A Formação da Classe Operária Inglesa', ele foca na experiência e agência dos trabalhadores.",
            source: "https://pt.wikipedia.org/wiki/E._P._Thompson"
        }
    ],
    // Temas vazios para não dar erro ao clicar, caso mantenha os botões
    historia_africa: [], 
    historia_america1: [],
    historia_brasil1: [],
    geohistoria: []
};

// Funções do Motor do Jogo
function shuffleArray(array) {
    if (!array || array.length === 0) return [];
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
    if (!quizQuestions[theme] || quizQuestions[theme].length === 0) { 
        alert('Tema ainda não configurado com as novas questões!'); return; 
    }

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
    
    // Sorteia as questões do tema escolhido
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
            <p><strong>Resposta Correta:</strong> ${correct}</p>
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
    
    // --- ALTERAÇÃO AQUI: Adição do GIF de Vencedor (John Snow) ---
    // Remove GIF antigo se existir (garante limpeza)
    const oldGif = document.getElementById('win-gif');
    if (oldGif) oldGif.remove();

    const gifContainer = document.createElement('div');
    gifContainer.id = "win-gif";
    gifContainer.style.margin = "20px 0";
    
    // GIF do John Snow piscando/aprovando
    gifContainer.innerHTML = `<img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXZ4MHU2Y2xwNnl6b2d2MTBjc3VsZTZvMGh3Y3h3NzVuZXp2dDBoeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/has1WKhoorwLS/giphy.webp" alt="John Snow Approves" style="width: 100%; max-width: 300px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">`;
    
    // Insere o GIF antes do botão de reiniciar
    endScreen.insertBefore(gifContainer, restartButton);
    // -------------------------------------------------------------

    if (wrongAnswers.length > 0) {
        reviewArea.classList.remove('hidden');
        reviewList.innerHTML = wrongAnswers.map(item => `
            <div style="border-bottom: 1px solid #666; padding: 10px 0; text-align: left;">
                <p><strong>Questão:</strong> ${item.q}</p>
                <p><strong>Correta:</strong> ${item.correct}</p>
                <a href="${item.src}" target="_blank" style="color: #00e676;">Estudar mais sobre isso</a>
            </div>
        `).join('');
    } else {
        reviewArea.classList.add('hidden');
        reviewList.innerHTML = "<p>Incrível! Você gabaritou!</p>";
    }
}

function restartGame() {
    location.reload(); // Recarrega para limpar tudo
}

// Event Listeners
themeButtons.forEach(button => {
    button.addEventListener('click', () => startQuiz(button.dataset.theme));
});
nextButton.addEventListener('click', handleNextButton);
restartButton.addEventListener('click', restartGame);
