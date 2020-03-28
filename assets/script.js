var questionEl = document.querySelector(".question");
var answerEl = document.querySelector(".answer");
var timerEl = document.querySelector("#timer");
var highScoreEl = document.querySelector(".high-score");
var questionsArr = [{
    question: "Question 1",
    rightAnswer: "A2",
    answers: ["A1","A2","A3","A4"],
},{
    question: "Question 2",
    rightAnswer: "A2",
    answers: ["A5","A2","A3","A4"]
},{
    question: "Question 3",
    rightAnswer: "A2",
    answers: ["A9","A2","A3","A4"]
},{
    question: "Question 4",
    rightAnswer: "A2",
    answers: ["A13","A2","A3","A4"]
},{
    question: "Question 5",
    rightAnswer: "A2",
    answers: ["A17","A2","A3","A4"]
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
        button.textContent = questionsArr[questionNumber].answers[i];
    }
    document.querySelectorAll(".answerChoice").forEach(ans => { 
        ans.addEventListener("click",function(){
            questionNumber++;
            answerEl.innerHTML = "";

            (this)
            if(questionNumber < 5){
                questions();
            }else{
                userScoreScreen();
                // highScore();
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


    questionEl.textContent = "You're Score is " + timer
    questionEl.appendChild(hsLine);

    answerEl.appendChild(userScoreText);
    userScoreText.textContent = "Please enter your name below to save your score!!"
    answerEl.style = "text-align: center"

    answerEl.appendChild(userInput);
    answerEl.appendChild(submitBtn);
    submitBtn.textContent = "Submit"
    submitBtn.setAttribute("class", "submitBtn btn")
    
    saveScore();
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

function highScore(){
    var hsLine = document.createElement("hr");
    questionEl.textContent = "High Scores";
    questionEl.append(hsLine);
    answerEl.innerHTML = "";

    var hsName = document.createElement("p")
    var hsUsers = JSON.parse(localStorage.getItem("user"));

    for(i = 0; i < hsUsers.length; i++){
        var userInfo = answerEl.appendChild(document.createElement("p"));
        userInfo.textContent = hsUsers[i].Name + " " + " " + hsUsers[i].Score;
    }
    console.log(hsUsers);

    // var highScoreCard = document.createElement("<div>");
    // highScoreCard.setAttribute("id", "hsCard")
    // highScoreCard.setAttribute("class", "card")
    // highScoreCard.createElement()
}
function startTimer() {
    var timerInterval = setInterval(function() {
      timer--;
      timerEl.textContent ="Time: " + timer;
  
      if(timer === 0) {
        highScore();
      } else if(questionNumber === 5){
        clearInterval(timerInterval);
      }
  
    }, 1000);
  }

// document.querySelector(".high-score").addEventListener("click", highScore(event));

