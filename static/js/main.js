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
    clearButtons()
    loadQuestions('/quiz', )
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

function createNextButton(questions) {
    let container = document.getElementById('container');
    let nextQuestionButton = document.createElement("button");
    nextQuestionButton.innerText = 'Next'
    nextQuestionButton.setAttribute('class', 'btn btn-primary btn-lg')
    nextQuestionButton.setAttribute('id', 'next-question')
    nextQuestionButton.addEventListener('click', displayQuestion.bind(event, questions));
    container.appendChild(nextQuestionButton)
}

function clearNextButton() {
    let container = document.getElementById('container');
    container.removeChild(container.lastChild)
}

function displayQuestion(questions){
    if (questions.length > 1){
    clearNextButton()
    createNextButton(questions)
    let questionHeader = document.getElementById('question')
    let question = getNextQuestion(questions)
    let index = questions.indexOf(question);
    questions.splice(index,1);
    questionHeader.innerText = question
    }
    else {
        showResult()
    }
}


function createRestartButton() {
    let restartButton = document.createElement('button');
    restartButton.innerText = 'Retry';
    restartButton.addEventListener('click', loadQuestions)
    return restartButton
}
function showResult() {
    $('#container').empty()
    $('#modal-body').empty()
    $('#modal-footer').empty()
    $('#modal-body').append(`Your Result is : ${result} of 95 question`)
    $('#modal-footer').append()

    $("#modal").modal()

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
