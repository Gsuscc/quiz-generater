init();
let questionArr = [];

function init() {
    setRandomQuiz()
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
    loadQuestions('/quiz', getQuestions);
    let questions = questionArr;
    displayQuestion(questions)
}

function clearScreen() {
    let randomButtonContainer = document.getElementById('random-quiz-button');
    let normalButtonContainer = document.getElementById('quiz-button');
    normalButtonContainer.style.display = 'none';
    randomButtonContainer.style.display = 'none';
}

function displayQuestion(questions){
    let questionContainer = document.getElementById('question')
    questionContainer.innerText = getNextQuestion(questions)

}


function getQuestions(result) {
    for (let question of result) {
        questionArr.push(question['question'])
    }
}

function getRandomQuestion(questions) {
    console.log(questions)
    return questions[Math.floor(Math.random() * questions.length)]
}

function getNextQuestion(questions) {
    let question = getRandomQuestion(questions);
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
