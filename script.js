
const questions = [
  {
    question: "Which language is used for React?",
    options: ["Java", "JavaScript", "Python", "C++"],
    answer: 1
  },
  {
    question: "Which database is used in MERN Stack?",
    options: ["MySQL", "Oracle", "MongoDB", "SQLite"],
    answer: 2
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Home Tool Markup Language",
      "Hyperlinks Text Markup Language"
    ],
    answer: 0
  },
  {
    question: "Which CSS property changes text color?",
    options: ["font-color", "text-color", "color", "background"],
    answer: 2
  },
  {
    question: "JavaScript is a ____ language.",
    options: ["Programming", "Database", "Operating System", "Browser"],
    answer: 0
  },
  {
    question: "Which tag is used to create a hyperlink?",
    options: ["<img>", "<a>", "<div>", "<table>"],
    answer: 1
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Microsoft", "Facebook", "Amazon"],
    answer: 2
  },
  {
    question: "Node.js is used for?",
    options: ["Frontend", "Backend", "Database", "Design"],
    answer: 1
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "#", "<!-- -->", "**"],
    answer: 0
  },
  {
    question: "Which method prints in browser console?",
    options: ["print()", "echo()", "console.log()", "display()"],
    answer: 2
  }
];
 
let currentQuestion = 0;
let score = 0;
let timer = null;
let time = 600;
let userAnswers = new Array(questions.length).fill(null); // store user picks per question
 
function startExam() {
  if (timer !== null) return; // already running
 
  currentQuestion = 0;
  score = 0;
  userAnswers = new Array(questions.length).fill(null);
  time = 600;
 
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("questionCard").style.display = "block";
  document.getElementById("resultBox").style.display = "none";
 
  loadQuestion();
 
  timer = setInterval(function () {
    time--;
    updateTimer();
    if (time <= 0) {
      clearInterval(timer);
      timer = null;
      document.getElementById("timer").innerHTML = "Time Left : 00:00";
      alert("⏰ Time Up!");
      submitExam();
    }
  }, 1000);
}
 
function updateTimer() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  document.getElementById("timer").innerHTML =
    "Time Left : " +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0");
}
 
function loadQuestion() {
  const q = questions[currentQuestion];
 
  document.getElementById("questionNo").innerHTML =
    "Question " + (currentQuestion + 1) + " of " + questions.length;
  document.getElementById("question").innerHTML = q.question;
  document.getElementById("opt1").innerHTML = q.options[0];
  document.getElementById("opt2").innerHTML = q.options[1];
  document.getElementById("opt3").innerHTML = q.options[2];
  document.getElementById("opt4").innerHTML = q.options[3];
 
  // Reset radio buttons
  let radios = document.querySelectorAll("input[name='answer']");
  radios.forEach(r => r.checked = false);
 
  // Restore previously selected answer for this question (if any)
  if (userAnswers[currentQuestion] !== null) {
    radios[userAnswers[currentQuestion]].checked = true;
  }
}
 
function nextQuestion() {
  // Save selected answer for current question
  let selected = document.querySelector("input[name='answer']:checked");
  userAnswers[currentQuestion] = selected ? parseInt(selected.value) : null;
 
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    submitExam();
  }
}
 
function previousQuestion() {
  // Save selected answer before going back
  let selected = document.querySelector("input[name='answer']:checked");
  userAnswers[currentQuestion] = selected ? parseInt(selected.value) : null;
 
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}
 
function submitExam() {
  clearInterval(timer);
  timer = null;
 
  // Save last answer if not already saved
  let selected = document.querySelector("input[name='answer']:checked");
  if (selected) {
    userAnswers[currentQuestion] = parseInt(selected.value);
  }
 
  // Calculate score
  score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
 
  document.getElementById("questionCard").style.display = "none";
  document.getElementById("resultBox").style.display = "block";
 
  let percentage = Math.round((score / questions.length) * 100);
  let grade = percentage >= 80 ? "Excellent! 🎉" : percentage >= 60 ? "Good Job! 👍" : "Keep Practicing! 💪";
 
  document.getElementById("score").innerHTML =
    "Your Score: " + score + " / " + questions.length +
    " (" + percentage + "%) — " + grade;
}