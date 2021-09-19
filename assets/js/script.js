var timeCounter = document.querySelector("#time-counter");
var questions = document.querySelector("#heading-questions");
var quizContainer = document.querySelector("#start-quiz-container");
var answersContainer = document.querySelector("#answers-container");
var answersRadios = document.getElementsByTagName("label");
var quizTimer = 9;
var timeClock = null;
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
          "answer_b": "awrong",
          "answer_c": "bwrong",
          "answer_d": "cwrong"
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
          "answer_a": "correct",
          "answer_b": "awrong",
          "answer_c": "bwrong",
          "answer_d": "cwrong"
        },
        "correct_answer_id": "answer_c",
        "explanation": "this is why",
        "tip": "look mdn"
      }
  ]
var quizDataId = 0;

var quizData

function countDown(){
    
    timeCounter.textContent = quizTimer.toLocaleString(undefined, {minimumIntegerDigits: 2});
    quizTimer --;
    if (quizTimer === -1) {
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
    answersContainer.classList.remove('d-none');
    addQuestion();
    
}

function addQuestion(){
    questions.textContent = quizData[quizDataId].question;
    addAnswers();
    for (var i = 0; i < answersRadios.length; i++) {
        answersRadios[i].addEventListener('click', function(e) {
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
    if(event.target.id == quizData[quizDataId].correct_answer_id){
        console.log("right");
        if (quizData[quizDataId].id < quizData.length){
            quizDataId++;
            addQuestion();
        } else {
            window.location.reload();
        }
    } else {
        console.log("no");
    }
}
document.querySelector("#start-quiz").addEventListener("click", startQuiz);

