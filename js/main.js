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
let count = 120;
let countdown;
var quizArray = [{
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
    },
    {
      id: "3",
      question: "What is an Object in JavaScript?",
      options:["A collection of properties containing primitive data types", "A collection of arrays","A collection of Yes and No","A collection of Magazines"],
      correct: "A collection of properties containing primitive data types",
    },
    {
      id: "4",
      question:"What operator is used to calculate the remainder in JavaScript",
      options:["*","%" , "/" , "&"],
      correct:"%",
    },
    {
      id: "5",
      question:"What is the 9+10",
      options:["18","19" , "20" , "21"],
      correct:"19",
    },
    {
      id: "6",
      question:"What is the difference between Java and JavaScript",
      options:["JavaScript is more commonly used in web applications like browsers, while Java is more widely used in app development"," Java is used more in web browser while JavaScript isn't" , "JavaScript is not interpreted but Java Is" , "JavaScript is Object-Based Programming Language while Java is Object Oriented"],
      correct:"JavaScript is more commonly used in web applications like browsers, while Java is more widely used in app development",
    },
    {
      id: "7",
      question:"What is 2*2/2(2)",
      options:["4","6" , "8" , "10"],
      correct:"4",
    },
    {
      id: "8",
      question:"What operator is used for equal in JavaScript",
      options:["=","*" , "&" , "!"],
      correct:"=",
    },
    {
      id: "9",
      question:"What operator is used to calculate the addition in JavaScript",
      options:["+","-" , "/" , "&"],
      correct:"+",
    },
  ];
  
  //Restart Quiz
  restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
  });
  
  //Next Button
  nextBtn.addEventListener("click",(displayNext = () => {
      //increment questionCount
      questionCount += 1;
      //console.log(quizArray.length)
      //console.log(quizArray)
      //if last question
      if (questionCount == quizArray.length) {
        endQuiz();
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
  
const endQuiz = function (){
        //hide question container and display score
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        //user score
        userScore.innerHTML =
          "Your score is " + scoreCount + " out of " + questionCount;
          stored();
      }
  //Timer
  const timerDisplay = () => {
    countdown = setInterval(() => {
      count--;
      timeLeft.innerHTML = `${count}s`;
      if (count <= 0) {
        clearInterval(countdown);
        endQuiz();
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
    quizArray.sort(() => Math.random() - 0.1);
    //generate quiz
    for (let i of quizArray) {
      //randomly sort options
      i.options.sort(() => Math.random() - 0.1);
      //quiz card creation
      let div = document.createElement("div");
      div.classList.add("container-mid", "hide");
      //question number
      countOfQuestion.innerHTML = 1 + " of " + quizArray.length;
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
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
  
    //if user clicks the correct answer it is stored in a object
    if (userSolution === quizArray[questionCount].correct) {
      userOption.classList.add("correct");
      scoreCount++; //Add +1 in score if correct
    } else {
      userOption.classList.add("incorrect");
      count = count - 15; //Subtract 15s if wrong
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
    count = 120;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();//Creates the questions
    quizDisplay(questionCount); //Shows the question
  }
  
  //when user clicks the start button
  startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
  });
  var scores =   localStorage.getItem("Scores") || [ ] // get existing scores from local storage if there is already an array saved and if not make an empty array
  function stored(){
      var initialName;
      initialName = prompt("Enter your initials").toString();
      var userScores = JSON.stringify({"initial":initialName, "score":scoreCount}) //create score object
      scores.push(userScores)
      localStorage.setItem("Scores",scores);   //update local storage value of scores with new object    
    }
  //hide quiz and display start screen
  window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
  };
