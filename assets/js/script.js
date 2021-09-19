var timeCounter = document.querySelector("#time-counter");
var questions = document.querySelector("#heading-questions");
var quizWrapper = document.querySelector("#quiz-wrapper");
var scoreWrapper = document.querySelector("#score-wrapper");
var quizContainer = document.querySelector("#start-quiz-container");
var answersContainer = document.querySelector("#answers-container");
var answersButton = document.getElementsByClassName("answers");
var quizTimer = 20;
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
        "correct_answer_id": "answer_b",
        "explanation": "this is why",
        "tip": "look mdn"
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
        "correct_answer_id": "answer_a",
        "explanation": "this is why",
        "tip": "look mdn"
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
        "correct_answer_id": "answer_c",
        "explanation": "this is why",
        "tip": "look mdn"
      }
  ]
var quizDataId = 0;

function countDown(){
    timeCounter.textContent = quizTimer.toLocaleString(undefined, {minimumIntegerDigits: 2});    
    quizTimer --;
    if (quizTimer <= -1) {
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
    quizTimer = 20;
    score = 0;
    quizDataId = 0;
    addQuestion();
    
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
        if (quizData[quizDataId].id === quizData.length) {
            event.stopImmediatePropagation();
            logScores();
            return;
        }
        quizDataId++;
        addQuestion();
    } else {
        
        event.stopImmediatePropagation();
        quizTimer = quizTimer - 5;
        if (quizTimer <= -1 || quizData[quizDataId].id === quizData.length) {
            timeCounter.textContent = quizTimer.toLocaleString(undefined, {minimumIntegerDigits: 2});
            logScores();
            stopCountDown();
            return;
        }
        quizDataId++;
        addQuestion();
    }
}

function logScores(){
    console.log("score", score);
    scoreWrapper.classList.remove('d-none');
    answersContainer.classList.add('d-none');
    quizWrapper.classList.add('d-none');
    stopCountDown();
}
document.querySelector("#start-quiz").addEventListener("click", startQuiz);

