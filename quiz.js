const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("nextbutn");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let quizChoice1 = document.getElementById("choice-1");
let quizChoice2 = document.getElementById("choice-2");
let quizChoice3 = document.getElementById("choice-3");
let quizChoice4 = document.getElementById("choice-4");


let questions = [
  {
    question: "Relays are generally divided into _______ & ______ Relays?",
    choice1: "Manual & Automated",
    choice2: "Digital & Manual",
    choice3: "Electromechanical  & Solid-state",
    choice4: "Simple & Complex",
    answer: 3
  },
  {
    question: "How many characters can a QR code hold?",
    choice1: "1024",
    choice2: "4296",
    choice3: "5022",
    choice4: "680",
    answer: 2
  },
  {
    question: "How much was recently recovered from Abacha's loot from the US,
    choice1: "$281 million",
    choice2: "$218 million",
    choice3: "$321 million",
    choice4: "$312 million ",
    answer: 4
  },
  {
    question: "In chess, how many pieces does each player begin with?",
    choice1: "16",
    choice2: "32",
    choice3: "10",
    choice4: "22",
    answer: 1,
  },
  {
    question: "_________ is the first colonizer of a bare rock",
    choice1: "sundew",
    choice2: "liverwort",
    choice3: "lichen",
    choice4: "mosses",
    answer: 4,
  },
];

//CONSTANTS
const CORRECT_Bonus = 10;
const MAX_Questions = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //go to the end page instead
    return window.location.assign("end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_Questions}`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_Bonus);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 550);
  });
});

nextButton.addEventListener("click", (event) => {
  getNewQuestion();
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
