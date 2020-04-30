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
    loadQuestions('/quiz', getQuestions)
}


function getQuestions(result) {
    let questionArr = []
    for (let question of result) {
        questionArr.push(question.question)
    }
    return questionArr
}

function getRandomQuestion(questions) {
    return questions[Math.floor(Math.random() * questions.length)]
}

function getNextQuestion(questions) {
    let question = getRandomQuestion();
    let index = questions.indexOf(question);
    questions.splice(index,question);
    return question
}


function loadQuestions(url, callback) {
    fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(result => callback(result))
}
