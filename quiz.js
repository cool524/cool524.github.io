const quizDatabase = {
    hub: {
        title: "Hub & Music Audio Quiz",
        questions: [
            { question: "What file extension are our site's audio files running on?", options: [".mp3", ".wav", ".ogg", ".flac"], correct: 0 },
            { question: "What icon is featured as our custom webpage browser icon?", options: ["Minecraft Block", "saltguy", "Bow and Arrow", "Globe"], correct: 1 },
            { question: "What track sits at position Index 0 in our music playlist array?", options: ["power-hour.mp3", "minecraft-speedrun.mp3", "the-bones-of-the-body.mp3", "adhd.mp3"], correct: 3 },
            { question: "Which browser storage system shares volume toggles across tabs?", options: ["cookies", "sessionStorage", "localStorage", "IndexedDB"], correct: 2 },
            { question: "What layout file holds the bottom-left fixed rules for the speaker button?", options: ["index.html", "style.css", "music.js", "quiz.js"], correct: 1 }
        ]
    },
    minecraft: {
        title: "Minecraft Trivia Master",
        questions: [
            { question: "What was Minecraft originally named back when development started in 2009?", options: ["Block World", "Cave Game", "Infiniminer", "Minecraft"], correct: 1 },
            { question: "What is the exact mathematical probability of an adult pink sheep naturally spawning in a newly generated Overworld chunk?", options: ["0.12%", "0.05%", "0.136%", "0.164%"], correct: 3 },
            { question: "Which of these light sources emits an internal light level value of exactly 13 in vanilla Minecraft?", options: ["Soul Campfire", "Redstone Torch", "Lit Blast Furnace", "Jack o'Lantern"], correct: 2 },
            { question: "What is the maximum distance in blocks from an active Beacon pyramid that a player can receive its level-four status effects?", options: ["30", "50", "100", "150"], correct: 1 },
            { question: "Which completely invisible, solid technical block was added in the 2010 Halloween Update exclusively to prevent Nether Portals from spawning inside solid walls?", options: ["tile.airportal", "tile.portal", "tile.piston_moving", "tile.locked_chamber"], correct: 1 }
        ]
    },
    archery: {
        title: "Archery History & Target Quiz",
        questions: [
            { question: "How long ago did early humans start practicing archery in Africa?", options: ["7,000 years ago", "25,000 years ago", "70,000 years ago", "100,000 years ago"], correct: 2 },
            { question: "Which historical empire was famous for shooting arrows accurately from horseback?", options: ["The Mongols", "Ancient Egypt", "Medieval England", "The Romans"], correct: 0 },
            { question: "What was the estimated effective range of a medieval English Longbow?", options: ["50 yards", "100 yards", "180 yards", "Over 300 yards"], correct: 3 },
            { question: "Around what year BC did Ancient Egypt begin using bows in major battles?", options: ["500 BC", "1500 BC", "3500 BC", "5000 BC"], correct: 2 },
            { question: "What is the name of the modern archery bow that curves away from the archer when unstrung?", options: ["Longbow", "Recurve Bow", "Compound Bow", "Crossbow"], correct: 1 }
        ]
    },
    infinite: {
        title: "Infinity & Math Paradox Quiz",
        questions: [
            { question: "What is the classic typographic name of the loop symbol (∞) used to represent infinity?", options: ["Asterisk", "Lemniscate", "Tilde", "Ampersand"], correct: 1 },
            { question: "Which mathematician proved that some infinities are larger than other infinities?", options: ["Georg Cantor", "Isaac Newton", "Albert Einstein", "Carl Friedrich Gauss"], correct: 0 },
            { question: "What is the famous thought experiment involving a fully booked hotel with infinite rooms?", options: ["Zeno's Paradox", "Hilbert's Grand Hotel", "Schrödinger's Suite", "The Infinite Inn"], correct: 1 },
            { question: "What do you call a geometric pattern that repeats itself infinitely at smaller scales?", options: ["Matrix", "Fractal", "Vector", "Polyhedron"], correct: 1 },
            { question: "What is the result when you attempt to divide any standard real number by zero?", options: ["Zero", "Infinity", "Undefined", "One"], correct: 2 }
        ]
    }
};

let flatQuestionBank = [];
let currentQuestionIndex = 0;
let userScore = 0;
let answeredCount = 0;

function buildFlatBank() {
    flatQuestionBank = [
        ...quizDatabase.hub.questions,
        ...quizDatabase.minecraft.questions,
        ...quizDatabase.archery.questions,
        ...quizDatabase.infinite.questions
    ];
}

function updateHeaderTitle() {
    const titleEl = document.getElementById("quizTopicTitle");
    if (!titleEl) return;

    if (currentQuestionIndex < 5) {
        titleEl.textContent = quizDatabase.hub.title;
    } else if (currentQuestionIndex < 10) {
        titleEl.textContent = quizDatabase.minecraft.title;
    } else if (currentQuestionIndex < 15) {
        titleEl.textContent = quizDatabase.archery.title;
    } else if (currentQuestionIndex < 20) {
        titleEl.textContent = quizDatabase.infinite.title;
    }
}

function loadQuizQuestion() {
    const qEl = document.getElementById("quizQuestion");
    const optsEl = document.getElementById("quizOptions");
    const feedbackEl = document.getElementById("quizFeedback");
    const nextBtn = document.getElementById("nextQuizBtn");

    if (!qEl || !optsEl) return;

    feedbackEl.textContent = "";
    nextBtn.style.display = "none";
    optsEl.innerHTML = "";

    if (currentQuestionIndex >= flatQuestionBank.length) {
        showEndScreen();
        return;
    }

    updateHeaderTitle();

    let currentQ = flatQuestionBank[currentQuestionIndex];
    qEl.textContent = `${currentQuestionIndex + 1}. ${currentQ.question}`;

    currentQ.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.addEventListener("click", () => handleAnswerSelection(index, btn));
        optsEl.appendChild(btn);
    });
}

function handleAnswerSelection(selectedIndex, clickedBtn) {
    const optsEl = document.getElementById("quizOptions");
    const feedbackEl = document.getElementById("quizFeedback");
    const nextBtn = document.getElementById("nextQuizBtn");
    const scoreEl = document.getElementById("quizScore");

    let currentQ = flatQuestionBank[currentQuestionIndex];
    let buttons = optsEl.querySelectorAll("button");

    buttons.forEach(btn => btn.disabled = true);
    answeredCount++;

    if (selectedIndex === currentQ.correct) {
        clickedBtn.classList.add("correct");
        feedbackEl.textContent = "✅ Correct! Nicely done.";
        feedbackEl.style.color = "#155724";
        userScore++;
    } else {
        clickedBtn.classList.add("wrong");
        buttons[currentQ.correct].classList.add("correct");
        feedbackEl.textContent = "❌ Incorrect.";
        feedbackEl.style.color = "#721c24";
    }

    scoreEl.textContent = `Score: ${userScore}/${answeredCount}`;

    if (currentQuestionIndex === flatQuestionBank.length - 1) {
        nextBtn.textContent = "Finish Grand Quiz";
    } else {
        nextBtn.textContent = "Next Question →";
    }
    nextBtn.style.display = "block";
}

function showEndScreen() {
    const qEl = document.getElementById("quizQuestion");
    const optsEl = document.getElementById("quizOptions");
    const nextBtn = document.getElementById("nextQuizBtn");
    const titleEl = document.getElementById("quizTopicTitle");

    if (titleEl) titleEl.textContent = "Grand Quiz Summary";

    const percentage = Math.round((userScore / flatQuestionBank.length) * 100);

    qEl.innerHTML = ` <strong>All Sections Completed!</strong>`;
    optsEl.innerHTML = `
        <div style="font-size: 18px; line-height: 1.6; color: #334155; margin: 10px 0;">
            You conquered all topics directly from the Hub page.<br>
            Final Master Score: <strong>${userScore} out of ${flatQuestionBank.length}</strong><br>
            Overall Accuracy Grade: <strong>${percentage}%</strong>
        </div>
    `;

    nextBtn.textContent = "Restart Quiz";
    nextBtn.style.display = "block";
}

function resetQuiz() {
    currentQuestionIndex = 0;
    userScore = 0;
    answeredCount = 0;
    document.getElementById("quizScore").textContent = "Score: 0/0";
    loadQuizQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
    buildFlatBank();
    loadQuizQuestion();

    const nextBtn = document.getElementById("nextQuizBtn");
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (nextBtn.textContent.includes("Restart")) {
                resetQuiz();
            } else {
                currentQuestionIndex++;
                loadQuizQuestion();
            }
        });
    }
});

