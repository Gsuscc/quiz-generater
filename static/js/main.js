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
    nextQuestionButton.innerText = 'Next';
    nextQuestionButton.setAttribute('class', 'btn btn-primary btn-lg');
    nextQuestionButton.setAttribute('id', 'next-question');
    nextQuestionButton.addEventListener('click', function (event) {
            isRightAnswerModal()
            displayQuestion(questions)
    });
    container.appendChild(nextQuestionButton)
}

function clearNextButton() {
    let container = document.getElementById('container');
    if(container.lastChild)
        container.removeChild(container.lastChild)
}

function deleteQuestionFromArray(questions, question) {
    let index = questions.indexOf(question);
    questions.splice(index,1);
}
let result = 0;

function displayQuestion(questions){
    if (questions.length > 1){
        clearNextButton();
        clearQuestionContainer();
        createNextButton(questions);
        generateQuestionContainer();
        let questionHeader = document.getElementById('question');
        let question = getNextQuestion(questions);
        deleteQuestionFromArray(questions, question);
        questionHeader.innerText = question
    }
    else {
        showResult()
    }
}

function clearQuestionContainer() {
    let container = document.getElementById('container');
    if(container.lastChild)
        container.removeChild(container.lastChild)
}


function generateQuestionContainer() {
    let container = document.getElementById('container');
    let questionContainer = document.createElement('div');
    let questionHeader = document.createElement('h2');
    questionHeader.setAttribute('id', 'question');
    questionContainer.setAttribute('id', 'question-container');
    container.appendChild(questionContainer.appendChild(questionHeader))
}

function isRightAnswerModal (){
    $('#modal-body').empty();
    $('#modal-footer').empty();
    $('#modal-body').append('Did you know that?');
    $('#modal-footer').append(getRightAnswerButton());
    $("#modal").modal()

}

function getRightAnswerButton(){
    let button = document.createElement('button')
    button.innerText = 'Fuck Yeah, I knew it!'
    button.addEventListener('click', function () {
            result++
        $("#modal").modal('hide')

    })
    return button
}

function createRestartButton() {
    let restartButton = document.createElement('button');
    restartButton.innerText = 'Retry';
    restartButton.addEventListener('click', function (event) {
                loadQuestions('/quiz', getQuestions);
                $("#modal").modal('hide')
    })
    return restartButton
}
function showResult() {
    $('#container').empty();
    $('#modal-body').empty();
    $('#modal-footer').empty();
    $('#modal-body').append(`Your Result is : ${result} of 95 question`);
    $('#modal-footer').append(createRestartButton());
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
