// variables to handle interactions
var timeCounter = document.querySelector("#time-counter");
var questions = document.querySelector("#heading-questions");
var quizWrapper = document.querySelector("#quiz-wrapper");
var quizStatus = document.querySelector("#quiz-status");
var scoreWrapper = document.querySelector("#score-wrapper");
var quizContainer = document.querySelector("#start-quiz-container");
var answersContainer = document.querySelector("#answers-container");
var answersButton = document.getElementsByClassName("answers");
var divider = document.querySelector(".dropdown-divider");
var result = document.querySelector(".question-result");
var quizTimer = 0;
var timeClock = null;
var score = 0;
var quizDataId = 0;
var scoreData = [];
var scoreDataObject = {};
var scoreDataId = 0;
var penaltyTime = 0;

// quiz questions
var quizData = [
    {
        "id": 1,
        "question": "What is right way to Add an item to the end of an Array named fruits?",
        "answers": {
          "answer_a": "fruits.onArray('Orange')",
          "answer_b": "fruits.push('Orange')",
          "answer_c": "fruits.insideArray('Orange')",
          "answer_d": "fruits.pop('Orange')"
        },
        "correct_answer_id": "answer_b"
      },
      
      {
        "id": 2,
        "question": "______ method removes the first element from an array and returns that removed element.",
        "answers": {
          "answer_a": "slice",
          "answer_b": "unshift",
          "answer_c": "shift",
          "answer_d": "pop"
        },
        "correct_answer_id": "answer_c"
      },
      
      {
        "id": 3,
        "question": "object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.",
        "answers": {
          "answer_a": "promise",
          "answer_b": "async function",
          "answer_c": "generator",
          "answer_d": "proxy"
        },
        "correct_answer_id": "answer_a"
      },
      
      {
        "id": 4,
        "question": "____________ object enables language-sensitive date and time formatting.",
        "answers": {
          "answer_a": "Intl.DateTimeFormat",
          "answer_b": "Intl.PluralRules",
          "answer_c": "Intl.NumberFormat",
          "answer_d": "Intl.Locale"
        },
        "correct_answer_id": "answer_a"
      },
      
      {
        "id": 5,
        "question": "which of the following are methods of array?",
        "answers": {
          "answer_a": "Array.prototype.entries()",
          "answer_b": "Array.prototype.flat()",
          "answer_c": "Array.prototype.find()",
          "answer_d": "All of the Above"
        },
        "correct_answer_id": "answer_d"
      },
      
      {
        "id": 6,
        "question": "What is use of String.prototype.charAt()?",
        "answers": {
          "answer_a": "returns a string created from the specified sequence of UTF-16 code units.",
          "answer_b": "returns a new string consisting of the single UTF-16 code unit located at the specified offset into the string.",
          "answer_c": "returns an integer between 0 and 65535 representing the UTF-16 code unit at the given index.",
          "answer_d": "returns a non-negative integer that is the UTF-16 code point value."
        },
        "correct_answer_id": "answer_b"
      },
      
      {
        "id": 7,
        "question": "_________ property returns a live HTMLCollection which contains all of the child elements of the document upon which it was called.",
        "answers": {
          "answer_a": "children",
          "answer_b": "append",
          "answer_c": "parent",
          "answer_d": "kidNodes"
        },
        "correct_answer_id": "answer_a"
      },
      
      {
        "id": 8,
        "question": "you can get or set the current title of the document using _______",
        "answers": {
          "answer_a": "var docTitle = document.contentTitle;",
          "answer_b": "var docTitle = document.titleName;",
          "answer_c": "var docTitle = document.title;",
          "answer_d": "var docTitle = document.heading;"
        },
        "correct_answer_id": "answer_c"
      },
      
      {
        "id": 9,
        "question": "object holds key-value pairs and remembers the original insertion order of the keys?",
        "answers": {
          "answer_a": "map",
          "answer_b": "string",
          "answer_c": "int",
          "answer_d": "local storage"
        },
        "correct_answer_id": "answer_a"
      },
      
      {
        "id": 10,
        "question": "method _________ sets up a function that will be called whenever the specified event is delivered to the target.",
        "answers": {
          "answer_a": "addeventlistener()",
          "answer_b": "addEvent()",
          "answer_c": "clickTarget()",
          "answer_d": "addEventListener()"
        },
        "correct_answer_id": "answer_d"
      }
  ]

// count down for quiz time clock
function countDown(){
    timeCounter.textContent = quizTimer.toLocaleString(undefined, {minimumIntegerDigits: 2});    
    quizTimer --;
    if (quizTimer <= -1) {
        quizStatus.textContent = "Times Up!";
        logScores();
        stopCountDown();
    }
}

// stop the countdown
function stopCountDown (){
    clearInterval(timeClock)
}

// start the countdown
function startCountDown(){
    timeClock = setInterval(countDown,1000);
}

// begin the quiz
function startQuiz(){
    startCountDown();
    quizContainer.classList.add('d-none');
    scoreWrapper.classList.add('d-none');
    answersContainer.classList.remove('d-none');
    quizWrapper.classList.add("quiz-ongoing");
    quizStatus.textContent = "All Done!";
    quizTimer = 150;
    penaltyTime = 10;
    score = 0;
    quizDataId = 0;
    addQuestion();

    if (localStorage.getItem("scores") !== null) {
        scoreData = JSON.parse(localStorage.getItem("scores"));
        scoreDataId = scoreData.length;
    }
    
}

//get questions
function addQuestion(){
    questions.textContent = quizData[quizDataId].question;
    addAnswers();
    for (var i = 0; i < answersButton.length; i++) {
        answersButton[i].addEventListener('click', function(e) {
            checkAnswers(e);
        }, false);
    }
}

//get answers
function addAnswers(){
    document.querySelector("#answer_a").textContent = quizData[quizDataId].answers.answer_a;
    document.querySelector("#answer_b").textContent = quizData[quizDataId].answers.answer_b;
    document.querySelector("#answer_c").textContent = quizData[quizDataId].answers.answer_c;
    document.querySelector("#answer_d").textContent = quizData[quizDataId].answers.answer_d;
}


// validate answers and display next question
function checkAnswers(event){
    event.preventDefault();
    if(event.target.id === quizData[quizDataId].correct_answer_id && quizData[quizDataId].id <= quizData.length){
        score++;
        event.stopImmediatePropagation();
        quizDataId++;
        getResult("That was correct answer!");
        if (quizDataId < quizData.length) {
            addQuestion();
        } else {
            logScores();
            return;
        }
    } else {
        quizTimer = quizTimer - penaltyTime;
        event.stopImmediatePropagation();
        quizDataId++;
        getResult("That was wrong answer!");
        if (quizDataId < quizData.length && quizTimer > -1) {
            addQuestion();
        } else {
            timeCounter.textContent = quizTimer.toLocaleString(undefined, {minimumIntegerDigits: 2});
             getResult("That was wrong answer!");
            logScores();
            stopCountDown();
            return;
        }
    }
}


//show your final score
function logScores(){
    document.querySelector("#score-text").textContent = score;
    quizTimer = 0;
    timeCounter.textContent = quizTimer.toLocaleString(undefined, {minimumIntegerDigits: 2}); 
    scoreWrapper.classList.remove('d-none');
    answersContainer.classList.add('d-none');
    quizWrapper.classList.add('d-none');
    quizWrapper.classList.remove('quiz-ongoing');
    quizWrapper.classList.add('score-updating');
    stopCountDown();
}

// save your score
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
    quizWrapper.classList.remove('score-updating');
    removeResult();
    viewScoreBoard();
}

// view your score on score board
function viewScoreBoard(){
    if(quizWrapper.classList.contains('quiz-ongoing')===false && quizWrapper.classList.contains('score-updating') === false){
        document.querySelector("#score-board-wrapper").classList.remove("d-none");
        if(scoreWrapper.classList.contains('d-none')===false){
            scoreWrapper.classList.add('d-none');
        }
        if(quizWrapper.classList.contains('d-none')===false){
            quizWrapper.classList.add('d-none');
        }
        updateScoreBoard();
    } else {
        alert("please complete quiz and submit initials in order to see score board!");
    }
}


// update score board based on latest addition
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

// refresh the page to go back
function refreshPage(){
    window.location.reload();
} 

// remove all the scores
function clearScores(){
    window.localStorage.clear();
    updateScoreBoard();
} 

// display if the selected answer was correct or wrong
function getResult(answerState){
    divider.classList.remove("d-none");
    result.classList.remove("d-none");
    result.textContent = answerState;
} 

// remove result
function removeResult(){
    divider.classList.add("d-none");
    result.classList.add("d-none");
    result.textContent = "";
}

// event handler for starting the quiz
document.querySelector("#start-quiz").addEventListener("click", startQuiz);

