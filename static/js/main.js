init();


function init() {
    loadQuestions('/quiz', function (result) {

    })
}


function setRandomQuiz() {
    let randomButton = document.getElementById('random-quiz-button').firstChild
    randomButton.addEventListener('click', startQuiz)
}

function startQuiz() {
    clearScreen()
    displayQuestion()
}

function clearScreen() {
    let randomButton = document.getElementById('random-quiz-button')
    let normalButton = document.getElementById('normal-button')
}

function getRandomQuestions() {

}


function loadQuestions(url, callback) {
    fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(result => callback(result))
}
