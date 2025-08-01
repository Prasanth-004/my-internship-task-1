const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: 2
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: 3
    },
    {
        question: "What does CSS stand for?",
        options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
        answer: 1
    },
    {
        question: "What year was JavaScript launched?",
        options: ["1996", "1995", "1994", "None of the above"],
        answer: 1
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<style>", "<css>", "<script>", "<link>"],
        answer: 0
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const scoreBox = document.getElementById('score-box');

function loadQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = `Q${currentQuestion + 1}: ${q.question}`;
    optionsEl.innerHTML = '';
    feedbackEl.textContent = '';
    nextBtn.disabled = true;
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => selectOption(idx, btn);
        optionsEl.appendChild(btn);
    });
}

function selectOption(selectedIdx, btn) {
    const q = questions[currentQuestion];
    Array.from(optionsEl.children).forEach(b => {
        b.disabled = true;
        b.classList.remove('selected');
    });
    btn.classList.add('selected');
    if (selectedIdx === q.answer) {
        feedbackEl.textContent = 'Correct!';
        feedbackEl.style.color = '#27ae60';
        score++;
    } else {
        feedbackEl.textContent = `Wrong! Correct answer: ${q.options[q.answer]}`;
        feedbackEl.style.color = '#e74c3c';
    }
    nextBtn.disabled = false;
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
};

function showScore() {
    document.getElementById('quiz-box').classList.add('hidden');
    scoreBox.classList.remove('hidden');
    scoreBox.innerHTML = `<strong>Quiz Completed!</strong><br>Your Score: ${score} / ${questions.length}<br><button onclick="restartQuiz()">Restart</button>`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    scoreBox.classList.add('hidden');
    document.getElementById('quiz-box').classList.remove('hidden');
    loadQuestion();
}

// Initial load
loadQuestion();
