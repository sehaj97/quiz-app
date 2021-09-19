var timeCounter = document.querySelector("#time-counter");
var questions = document.querySelector("#heading-questions");
var quizWrapper = document.querySelector("#quiz-wrapper");
var quizStatus = document.querySelector("#quiz-status");
var scoreWrapper = document.querySelector("#score-wrapper");
var quizContainer = document.querySelector("#start-quiz-container");
var answersContainer = document.querySelector("#answers-container");
var answersButton = document.getElementsByClassName("answers");
var quizTimer = 0;
var timeClock = null;
var score = 0;
var quizData = [
    {
        "id": 1,
        "question": "Question1?",
        "description": "this is question 1",
        "answers": {
          "answer_a": "wrong",
          "answer_b": "correct",
          "answer_c": "wrong",
          "answer_d": "wrong"
        },
        "correct_answer_id": "answer_b"
      },
      
      {
        "id": 2,
        "question": "Question2?",
        "description": "this is question 2",
        "answers": {
          "answer_a": "correct",
          "answer_b": "wrong",
          "answer_c": "wrong",
          "answer_d": "wrong"
        },
        "correct_answer_id": "answer_a"
      },
      
      {
        "id": 3,
        "question": "Question3?",
        "description": "this is question 3",
        "answers": {
          "answer_a": "wrong",
          "answer_b": "wrong",
          "answer_c": "correct",
          "answer_d": "wrong"
        },
        "correct_answer_id": "answer_c"
      }
  ]
var quizDataId = 0;
var scoreData = [];
var scoreDataObject = {};
var scoreDataId = 0;
function countDown(){
    timeCounter.textContent = quizTimer.toLocaleString(undefined, {minimumIntegerDigits: 2});    
    quizTimer --;
    if (quizTimer <= -1) {
        quizStatus.textContent = "Times Up!";
        logScores();
        stopCountDown();
    }
}

function stopCountDown (){
    clearInterval(timeClock)
}

function startCountDown(){
    timeClock = setInterval(countDown,1000);
}

function startQuiz(){
    startCountDown();
    quizContainer.classList.add('d-none');
    scoreWrapper.classList.add('d-none');
    answersContainer.classList.remove('d-none');
    
    quizStatus.textContent = "All Done!";
    quizTimer = 10;
    score = 0;
    quizDataId = 0;
    addQuestion();

    if (localStorage.getItem("scores") !== null) {
        scoreData = JSON.parse(localStorage.getItem("scores"));
        scoreDataId = scoreData.length;
    }
    
}

function addQuestion(){
    questions.textContent = quizData[quizDataId].question;
    addAnswers();
    for (var i = 0; i < answersButton.length; i++) {
        answersButton[i].addEventListener('click', function(e) {
            checkAnswers(e);
        }, false);
    }
}

function addAnswers(){
    document.querySelector("#answer_a").textContent = quizData[quizDataId].answers.answer_a;
    document.querySelector("#answer_b").textContent = quizData[quizDataId].answers.answer_b;
    document.querySelector("#answer_c").textContent = quizData[quizDataId].answers.answer_c;
    document.querySelector("#answer_d").textContent = quizData[quizDataId].answers.answer_d;
}

function checkAnswers(event){
    event.preventDefault();
    if(event.target.id === quizData[quizDataId].correct_answer_id && quizData[quizDataId].id <= quizData.length){
        score++;
        event.stopImmediatePropagation();
        quizDataId++;
        if (quizDataId < quizData.length) {
            addQuestion();
        } else {
            logScores();
            return;
        }
    } else {
        quizTimer = quizTimer - 5;
        event.stopImmediatePropagation();
        quizDataId++;
        if (quizDataId < quizData.length && quizTimer > -1) {
            addQuestion();
        } else {
            timeCounter.textContent = quizTimer.toLocaleString(undefined, {minimumIntegerDigits: 2});
            logScores();
            stopCountDown();
            return;
        }
    }
}

function logScores(){
    document.querySelector("#score-text").textContent = score;
    scoreWrapper.classList.remove('d-none');
    answersContainer.classList.add('d-none');
    quizWrapper.classList.add('d-none');
    stopCountDown();
}

function saveScore(){
    if (document.querySelector("#name-initials").value === ""){
        alert("please enter initials");
        return;
    }
    scoreDataObject = {
        id: scoreDataId,
        initials: document.querySelector("#name-initials").value,
        score: score
    };
    console.log(scoreData);
    scoreData.unshift(scoreDataObject);
    scoreDataId++;
    for(i=0;i<scoreData.length; i++){
        scoreData[i].id = i;
    }
    localStorage.setItem("scores", JSON.stringify(scoreData));
    viewScoreBoard();
}
function viewScoreBoard(){
    document.querySelector("#score-board-wrapper").classList.remove("d-none");
    if(scoreWrapper.classList.contains('d-none')===false){
        scoreWrapper.classList.add('d-none');
    }
    if(quizWrapper.classList.contains('d-none')===false){
        quizWrapper.classList.add('d-none');
    }
    updateScoreBoard();
}

function updateScoreBoard(){
    var scoreTable = document.querySelector("#score-board-list");
    scoreTable.innerHTML = "";
    data = JSON.parse(localStorage.getItem("scores"));
    if (data !== null) {
        for(i=0;i<data.length;i++){
            var scoreRow = document.createElement('tr');
            scoreRow.setAttribute("class", "table-primary");
            scoreTable.appendChild(scoreRow);
    
            var scoreNameCol = document.createElement('td');
            scoreNameCol.setAttribute("class", "table-primary");
            scoreNameCol.textContent = data[i].initials;
            scoreRow.appendChild(scoreNameCol);
    
            var scoreCol = document.createElement('td');
            scoreCol.setAttribute("class", "table-primary");
            scoreCol.textContent = data[i].score;
            scoreRow.appendChild(scoreCol);
        }
    }
}

function refreshPage(){
    window.location.reload();
} 

function clearScores(){
    window.localStorage.clear();
    updateScoreBoard();
}

document.querySelector("#start-quiz").addEventListener("click", startQuiz);

