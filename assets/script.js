var questionEl = document.querySelector(".question");
var answerEl = document.querySelector(".answer");
var timerEl = document.querySelector("#timer");
var highScoreEl = document.querySelector(".high-score");
var highScoreModalEl = document.querySelector(".high-score-modal")
var modalEl = document.querySelector(".modal")
var mainEl = document.querySelector(".main")
var questionsArr = [{
    question: "Which of the following elements is self closing",
    rightAnswer: "1",
    answers: ["<img>","<h1>","<div>","<a>"],
    answersValue: ["1","0","0","0"]
},{
    question: "The conditions in an if/else statement is enclosed within _____.",
    rightAnswer: "1",
    answers: ["quotation marks","curly brackets","parentheses","square brackets"],
    answersValue: ["0","0","1","0"]
},{
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    rightAnswer: "1",
    answers: ["JavaScript","console log","for loops","terminal/bash"],
    answersValue: ["0","1","0","0"]
},{
    question: "Commonly used data types DO NOT include:",
    rightAnswer: "1",
    answers: ["alerts","strings","booleans","numbers"],
    answersValue: ["1","0","0","0"]
},{
    question: "Which of the following IS NOT a coding language?",
    rightAnswer: "1",
    answers: ["HTML","JavaScript","CSS","JQuery"],
    answersValue: ["0","0","0","1"]
}]
var questionNumber = 0
var timer = 60;
var userName = null;
var userScore = null;

highScoreEl.addEventListener("click",function(){
    highScore()
})

document.querySelector(".start-button").addEventListener("click", function(){
    document.querySelector(".description").remove();
    document.querySelector(".start-button").remove();
    startTimer();
    questions();
});

function questions(){
    questionEl.textContent = questionsArr[questionNumber].question;
    
    for(var i = 0; i < questionsArr[questionNumber].answers.length; i++){
        var button = document.createElement("button");
        answerEl.appendChild(button);
        button.setAttribute("class", "ansbtn btn answerChoice");
        button.textContent = questionsArr[questionNumber].answers[i]
        button.setAttribute("value", questionsArr[questionNumber].answersValue[i]);
    }
    document.querySelectorAll(".answerChoice").forEach(ans => { 
        ans.addEventListener("click",function(){
            var answerChoice = event.target.value;
            var correctAnswer = questionsArr[questionNumber].rightAnswer
            console.log(answerChoice !== correctAnswer);
            
            if(answerChoice !== correctAnswer){
                timer = timer - 10
                console.log(timer - 10)
                timerEl.textContent ="Time: " + timer;
            }
            questionNumber++;
            answerEl.innerHTML = "";

            (this)
            if(questionNumber < 5){
                questions();
            }else{
                userScoreScreen();
               
            }
        })
    })  
}
    var userInput;
function userScoreScreen(){
    var hsLine = document.createElement("hr");
    var userScoreText = document.createElement("p")
    userInput = document.createElement("input")
    var submitBtn = document.createElement("button");
    var resetBtn = document.createElement("button");


    questionEl.textContent = "You're Score is " + timer
    questionEl.appendChild(hsLine);

    answerEl.appendChild(userScoreText);
    userScoreText.textContent = "Please enter your name below to save your score!!"
    answerEl.style = "text-align: center"

    answerEl.appendChild(userInput);
    answerEl.appendChild(submitBtn);
    submitBtn.textContent = "Submit"
    submitBtn.setAttribute("class", "submitBtn btn")
    
    answerEl.appendChild(resetBtn);
    resetBtn.textContent = "Reset"
    resetBtn.setAttribute("class", "resetBtn btn")
    resetBtn.style.margin = "10px"

    saveScore();
    resetQuiz();
}

function saveScore(){
    document.querySelector(".submitBtn").addEventListener("click", function(){
        userName = userInput.value;
        userScore = timer;

        var oldUsers = JSON.parse(localStorage.getItem("user"));
        console.log(oldUsers)
        var userArr = []
        var userObj = {
            "Name": userName,
            "Score": userScore
        }
        if(oldUsers == null) oldUsers = []
        oldUsers.push(userObj)

        var userObjStr = JSON.stringify(oldUsers);
        localStorage.setItem("user", userObjStr);

        highScore();
        
    })
}

function resetQuiz(){
    document.querySelector(".resetBtn").addEventListener("click", function(){
        location.reload();
    })
}

function highScore(){
    modalEl.style.display = "block";
    // mainEl.style.display = "none";
    var hsLine = document.createElement("hr");
    highScoreModalEl.prepend(hsLine);
    highScoreModalEl.innerHTML = "";

    var hsName = document.createElement("p")
    var hsUsers = JSON.parse(localStorage.getItem("user")) || [];

    for(i = 0; i < hsUsers.length; i++){
        var userInfo = highScoreModalEl.appendChild(document.createElement("p"));
        userInfo.textContent = hsUsers[i].Name + " " + " " + hsUsers[i].Score;
        }
    
    var closeBtnEl = document.createElement("button")
    closeBtnEl.textContent = "Close"
    highScoreModalEl.append(closeBtnEl)
    closeBtnEl.setAttribute("class", "btn close-button")

    document.querySelector(".close-button").addEventListener("click",function(){
        modalEl.style.display = "none"
        mainEl.style.display = "block"
    });
    
}

function startTimer() {
    var timerInterval = setInterval(function() {
      timer--;
      timerEl.textContent ="Time: " + timer;
  
      if(timer === 0) {
        highScore();
        clearInterval(timerInterval)
      } else if(questionNumber === 5){
        clearInterval(timerInterval);
      }
  
    }, 1000);
  }

