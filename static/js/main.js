init();


function init() {

    setRandomQuiz()
    // loadQuestions('/quiz', function (result) {
    //
    // })
}


function setRandomQuiz() {
    let randomButton = document.getElementById('random-quiz-button').firstElementChild;
    randomButton.addEventListener('click', startRandomQuiz);
}


function setNormalQuiz() {
    let quizButton = document.getElementById('quiz-button').firstElementChild;
    quizButton.addEventListener('click', startQuiz)
}

function startQuiz() {
    clearScreen()
}

function startRandomQuiz() {
    clearScreen();
    loadQuestionScreen()
}

function clearScreen() {
    let randomButtonContainer = document.getElementById('random-quiz-button');
    let normalButtonContainer = document.getElementById('quiz-button');
    normalButtonContainer.style.display = 'none';
    randomButtonContainer.style.display = 'none';
}

function loadQuestionScreen(){
    let questionContainer = document.getElementById('question')
    loadQuestions('/quiz', getRandomQuestion)
}



function getRandomQuestion(result) {
    let questionArr = []
    for (let question of result) {
        questionArr.push(question.question)
    }
    console.log(questionArr)
}


function loadQuestions(url, callback) {
    fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(result => callback(result))
}
