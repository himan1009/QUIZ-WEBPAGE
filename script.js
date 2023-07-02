const questions = [
    {
        question: "Which is the largest animal in the world ?",
        answers: [
            { text: "shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Girrafe", correct: false },
        ]
    },
    {
        question: "Which is the longest building in the world ?",
        answers: [
            { text: "Mannat", correct: false },
            { text: "Anesia", correct: false },
            { text: "Burj Khalifa", correct: true },
            { text: "Lusia", correct: false },
        ]
    },
    {
        question: "Which is the smallest city in the world ?",
        answers: [
            { text: "Buxar", correct: false },
            { text: "Vatican City", correct: true },
            { text: "Muzaffarpur", correct: false },
            { text: "Nawada", correct: false },
        ]
    },
    {
        question: "Which is the largest animal in the India ?",
        answers: [
            { text: "Octopus", correct: false },
            { text: "Gold fish", correct: false },
            { text: "Elephant", correct: false },
            { text: "Bumblebee bat", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionindex = 0;
let score = 0;

function startQuiz() {
    currentQuestionindex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
};

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionindex];
    let questionNo = currentQuestionindex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
};

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
};

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
};

function handleNextButton() {
    currentQuestionindex++;
    if (currentQuestionindex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
};

nextButton.addEventListener("click", () => {
    if (currentQuestionindex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});


startQuiz();