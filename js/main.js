let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 60;
let countdown;
const quizArray = [
    {
      id: "0",
      question: "What is JavaScript?",
      options: ["A Programming language for Website", "A Scripture written in books", "A video Game", "A glossary"],
      correct: "A Programming language for Website",
    },
    {
      id: "1",
      question: "What is the difference between == and ===",
      options: ["== and === will do type conversion ", "== does not do type conversion", "=== does not do type conversion", "== and === does type conversion"],
      correct: "=== does not do type conversion",
    },
    {
      id: "2",
      question: "Does an array have a fixed size?",
      options: ["An array has a fixed size", "An array can be changed later by another code", "An array can be shrinked", "An array can be re-declared"],
      correct: "An array has a fixed size",

      id: "3",
      question: "What is an Object in JavaScript?",
      options:["A collection of properties containing primitive data types", "A collection of arrays","A collection of Yes and No","A collection of Magazines"],
      correct: "A collection of properties containing primitive data types",

      id: "4",
      question:"What operator is used to calculate the remainder in JavaScript",
      options:["*"," %" , "/" , "&"],
      correct:["%"],

      id: "5",
      question:"What operator is used to calculate the remainder in JavaScript",
      options:["*"," %" , "/" , "&"],
      correct:["%"],

      id: "6",
      question:"What operator is used to calculate the remainder in JavaScript",
      options:["*"," %" , "/" , "&"],
      correct:["%"],

      id: "7",
      question:"What operator is used to calculate the remainder in JavaScript",
      options:["*"," %" , "/" , "&"],
      correct:["%"],

      id: "8",
      question:"What operator is used to calculate the remainder in JavaScript",
      options:["*"," %" , "/" , "&"],
      correct:["%"],

      id: "9",
      question:"What operator is used to calculate the remainder in JavaScript",
      options:["*"," %" , "/" , "&"],
      correct:["%"],
    },
  ];
  
  //Restart Quiz
  restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
  });
  
  //Next Button
  nextBtn.addEventListener(
    "click",
    (displayNext = () => {
      //increment questionCount
      questionCount += 1;
      //if last question
      if (questionCount == quizArray.length) {
        //hide question container and display score
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        //user score
        userScore.innerHTML =
          "Your score is " + scoreCount + " out of " + questionCount;
      } else {
        //display questionCount
        countOfQuestion.innerHTML =
          questionCount + 1 + " of " + quizArray.length + " Question";
        //display quiz
        quizDisplay(questionCount);
        count;
        clearInterval(countdown);
        timerDisplay();
      }
    })
  );
  
  //Timer
  const timerDisplay = () => {
    countdown = setInterval(() => {
      count--;
      timeLeft.innerHTML = `${count}s`;
      if (count == 0) {
        clearInterval(countdown);
        displayNext();
      }
    }, 1000);

  };
  
  //Display quiz
  const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
      card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
  };
  
  //Quiz Creation
  function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
      //randomly sort options
      i.options.sort(() => Math.random() - 0.5);
      //quiz card creation
      let div = document.createElement("div");
      div.classList.add("container-mid", "hide");
      //question number
      countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
      //question
      let question_DIV = document.createElement("p");
      question_DIV.classList.add("question");
      question_DIV.innerHTML = i.question;
      div.appendChild(question_DIV);
      //options
      div.innerHTML += `
      <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
         <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
      `;
      quizContainer.appendChild(div);
    }
  }
  
  //Checker Function to check if option is correct or not
  function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
      document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
  
    //if user clicks the correct answer it is stored in a object
    if (userSolution === quizArray[questionCount].correct) {
      userOption.classList.add("correct");
      scoreCount++;
    } else {
      userOption.classList.add("incorrect");
      count--;
      //Marks the correct answer
      options.forEach((element) => {
        if (element.innerText == quizArray[questionCount].correct) {
          element.classList.add("correct");
        }
      });
    }
  
    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
      element.disabled = true;
    });
  }
  
  //initial setup
  function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
  }
  
  //when user clicks the start button
  startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
  });
  
  //hide quiz and display start screen
  window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
  };