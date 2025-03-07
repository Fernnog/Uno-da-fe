// Dados dos quizzes (exemplos para vermelho, azul e curinga; adicione mais conforme necessário)
const quizzesVermelho = [
    {
        question: "Quem deu seu único filho por amor?",
        options: ["Abraão", "Deus"],
        correct: 1,
        verse: "João 3:16",
        reward: "Doe uma carta da sua mão a outro jogador e descarte outra.",
        penalty: "Compre 2 cartas."
    },
    {
        question: "Quem deu comida a milhares por amor?",
        options: ["José", "Jesus"],
        correct: 1,
        verse: "Mateus 14:19",
        reward: "Pule a vez do próximo jogador.",
        penalty: "Compre 1 carta."
    }
];

const quizzesAzul = [
    {
        question: "Quem acalmou a tempestade no mar?",
        options: ["Pedro", "Jesus"],
        correct: 1,
        verse: "Marcos 4:39",
        reward: "Inverta a ordem do jogo.",
        penalty: "Compre 2 cartas."
    }
];

const quizzesAmarelo = [
    {
        question: "Quem construiu uma arca para salvar sua família?",
        options: ["Noé", "Moisés"],
        correct: 0,
        verse: "Gênesis 6:14",
        reward: "Escolha um oponente para descartar 1 carta.",
        penalty: "Compre 1 carta."
    }
];

const quizzesVerde = [
    {
        question: "Quem foi chamado para libertar o povo do Egito?",
        options: ["Davi", "Moisés"],
        correct: 1,
        verse: "Êxodo 3:10",
        reward: "Descarte 2 cartas.",
        penalty: "Compre 2 cartas."
    }
];

const quizzesCuringa = [
    {
        question: "Quem é o caminho, a verdade e a vida?",
        options: ["Paulo", "Jesus"],
        correct: 1,
        verse: "João 14:6",
        reward: "Escolha qualquer jogador para comprar 4 cartas.",
        penalty: "Compre 4 cartas."
    }
];

const quizzesComprar4 = [
    {
        question: "Quem venceu o gigante com uma pedra?",
        options: ["Davi", "Sansão"],
        correct: 0,
        verse: "1 Samuel 17:49",
        reward: "Todos os outros jogadores compram 2 cartas.",
        penalty: "Compre 4 cartas."
    }
];

// Função para obter quizzes com base na categoria
function getQuizzes(category) {
    switch (category) {
        case 'vermelho': return quizzesVermelho;
        case 'azul': return quizzesAzul;
        case 'amarelo': return quizzesAmarelo;
        case 'verde': return quizzesVerde;
        case 'curinga': return quizzesCuringa;
        case 'comprar4': return quizzesComprar4;
        default: return [];
    }
}

// Event listeners para os botões de seleção
document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const color = btn.dataset.color;
        showQuiz(color);
    });
});

document.querySelectorAll('.curinga-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        showQuiz(type);
    });
});

// Função para exibir o quiz
function showQuiz(category) {
    const quizzes = getQuizzes(category);
    if (quizzes.length === 0) return; // Caso não haja quizzes
    const quiz = quizzes[Math.floor(Math.random() * quizzes.length)]; // Seleciona quiz aleatório
    document.getElementById('selection').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('question').textContent = quiz.question;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = ''; // Limpa opções anteriores
    quiz.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.addEventListener('click', () => checkAnswer(quiz, index));
        optionsDiv.appendChild(btn);
    });
}

// Função para verificar a resposta
function checkAnswer(quiz, selectedIndex) {
    const isCorrect = selectedIndex === quiz.correct;
    document.getElementById('quiz').style.display = 'none';
    const feedback = document.getElementById('feedback');
    feedback.style.display = 'block';
    const result = document.getElementById('result');
    const correctAnswer = document.getElementById('correct-answer');
    const verse = document.getElementById('verse');
    const gameAction = document.getElementById('game-action');

    if (isCorrect) {
        result.textContent = 'Parabéns! Você acertou!';
        gameAction.textContent = 'Ação no jogo: ' + quiz.reward;
        feedback.classList.add('correct');
    } else {
        result.textContent = 'Ops, não foi dessa vez.';
        correctAnswer.textContent = 'A resposta correta é: ' + quiz.options[quiz.correct];
        gameAction.textContent = 'Ação no jogo: ' + quiz.penalty;
        feedback.classList.add('incorrect');
    }
    verse.textContent = 'Versículo: ' + quiz.verse;
}

// Event listener para o botão "Próximo jogador"
document.getElementById('next').addEventListener('click', () => {
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('selection').style.display = 'block';
    document.getElementById('feedback').classList.remove('correct', 'incorrect');
});
