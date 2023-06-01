// Quiz questions arrays
const questions = [
  {
    question: "What does CSS stand for?",
    choices: [
      "Cascading Style Sheets",
      "Color Simple Style",
      "Calculate Select Spectrum",
      "None Of The Above",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which CSS element is used to choose different border styles?",
    choices: ["border", "border-style", "border-radius", "None Of The Above"],
    answer: "border-style",
  },
  {
    question: "What CSS property is used for controlling the layout?",
    choices: ["color", "block", "display", "None Of The Above"],
    answer: "display",
  },
  {
    question: "Which of the following are parts of the CSS box model?",
    choices: ["padding", "margins", "borders", "All Of The Above"],
    answer: "All Of The Above",
  },
  {
    question: "What is used to align text in CSS?",
    choices: ["text", "text-middle", "text-position", "text-align"],
    answer: "text-align",
  },
  {
    question: "What does HTML stand for?",
    choices: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "None of the above",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "What does JavaScript do?",
    choices: [
      "Style the web pages",
      "Define the structure of the web pages",
      "Add interactivity to web pages",
      "Perform server-side operations",
    ],
    answer: "Add interactivity to web pages",
  },
  {
    question:
      "Which programming language is also known as the 'language of the web'?",
    choices: ["Python", "Java", "JavaScript", "C++"],
    answer: "JavaScript",
  },
  {
    question: "What is the file extension for a JavaScript file?",
    choices: [".html", ".js", ".css", ".jpg"],
    answer: ".js",
  },
];

//Variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

// Elements
const startButton = document.getElementById("start-btn");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const endScreen = document.getElementById("end-screen");
const finalScoreElement = document.getElementById("final-score");
const initialsForm = document.getElementById("score-form");
const initialsInput = document.getElementById("initials");
const highScoresElement = document.getElementById("high-scores");
const scoresList = document.getElementById("scores-list");
const timerElement = document.getElementById("timer");

// Function to start quiz
function startQuiz() {
  // Hide the start screen and show the question screen
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("question-screen").classList.remove("hidden");

  // Start timer
  timerInterval = setInterval(updateTimer, 1000);

  // Display first question
  displayQuestion();

  // Update timer immediately
  updateTimer();
}

// Function to show current question
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  // Update question text
  questionElement.textContent = currentQuestion.question;

  // Clear previous choices
  choicesElement.innerHTML = "";

  // Create choice buttons for each option
  currentQuestion.choices.forEach((choice) => {
    const choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choiceButton.classList.add("choice");
    choiceButton.addEventListener("click", checkAnswer);
    choicesElement.appendChild(choiceButton);
  });
}

// Function to check selected answer
function checkAnswer(event) {
  const selectedAnswer = event.target.textContent;
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.answer) {
    // Correct answer
    score += 10;
  } else {
    // wrong answer
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }

  // Move to next question
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

// Function to end quiz
function endQuiz() {
  clearInterval(timerInterval);

  // Hide question screen and show end screen
  document.getElementById("question-screen").classList.add("hidden");
  endScreen.classList.remove("hidden");

  // Display final score
  finalScoreElement.textContent = score;

  // Save high score
  saveHighScore();

  //high scores
  displayHighScores();
}

// Function to update timer display
function updateTimer() {
  timerElement.textContent = timeLeft;

  if (timeLeft <= 0) {
    endQuiz();
  }

  timeLeft--;
}

// Function to save high score
function saveHighScore() {
  const initials = initialsInput.value.trim();

  if (initials !== "") {
    // Get existing high scores from localStorage
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Create a new high score object
    const newScore = { initials, score };

    // Add new high score to the list
    highScores.push(newScore);

    // Sort high scores based on score
    highScores.sort((a, b) => b.score - a.score);

    // Save updated high scores to localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
}

// Function to display high scores
function displayHighScores() {
  scoresList.innerHTML = ""; // Clear previous scores

  // Retrieve scores from localStorage
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Iterate over high scores and create list items
  highScores.forEach((score) => {
    const scoreItem = document.createElement("li");
    scoreItem.textContent = `${score.initials}: ${score.score}`;
    scoresList.appendChild(scoreItem);
  });

  // Show high scores screen
  highScoresElement.classList.remove("hidden");
}

// Event listener for the start button
startButton.addEventListener("click", startQuiz);

// Event listener for score submission form
initialsForm.addEventListener("submit", function (event) {
  event.preventDefault();
  saveHighScore();
  initialsInput.value = "";
  displayHighScores();
});
