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
            if(questionNumber < 5){
                questions();
            }else{
                highScore();
            }
        })
    })  
}
function highScore(){

}
function startTimer() {
    var timerInterval = setInterval(function() {
      timer--;
      timerEl.textContent ="Time: " + timer;
  
      if(timer === 0) {
        clearInterval(timerInterval);
        highScore();
      }
  
    }, 1000);
  }



