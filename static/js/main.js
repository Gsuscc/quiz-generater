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
    clearButtons();
    loadQuestions('/quiz', getQuestions);

}

function clearButtons() {
    let randomButtonContainer = document.getElementById('random-quiz-button');
    let normalButtonContainer = document.getElementById('quiz-button');
    normalButtonContainer.style.display = 'none';
    randomButtonContainer.style.display = 'none';
}


function displayQuestion(questions){
    let questionHeader = document.getElementById('question')
    let questionHeaderContainer = document.getElementById('question-container');
    let nextQuestionButton = document.createElement("button");
    nextQuestionButton.innerText = 'Next'
    nextQuestionButton.setAttribute('class', 'btn btn-primary btn-lg')
    nextQuestionButton.addEventListener('click', displayQuestion.bind(event, questions));
    questionHeaderContainer.appendChild(nextQuestionButton)
    let question = getNextQuestion(questions)
    console.log('question :' + question )
    let index = questions.indexOf(question);
    console.log('index: ' + index)
    questions.splice(index,1);
    questionHeader.innerText = question
    console.log(questions)

}


function getQuestions(result) {
    for (let question of result) {
        questionArr.push(question['question'])
    }
    displayQuestion(questionArr)
}

function getRandomQuestion(questions) {
    return questions[Math.floor(Math.random() * questions.length)]
}

function getNextQuestion(questions) {
    return getRandomQuestion(questions)
}


function loadQuestions(url, callback) {
    fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(result => callback(result))
}
