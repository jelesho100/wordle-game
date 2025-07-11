const keyboardElement = document.querySelector('#keyboard')
const display = document.querySelector('.display')
const enterElement = document.querySelector('.enter')
const undoElement = document.querySelector('.undo')
const userLetter = document.querySelectorAll('.user-letter')
const wordOneRow = document.querySelectorAll('.row-one')
const wordTwoRow = document.querySelectorAll('.row-two')
const wordThreeRow = document.querySelectorAll('.row-three')
const maxTries = 3;
const maxWordLength = 5;
const wordBank = ['RIGHT']; //['RIGHT', 'STARS', 'MONEY', 'GRACE', 'SHOOT']

const userInput = [];
let currentTry = 1;
let randomWord;

function randWordGenerator() {
    let randomIndex = Math.floor(Math.random() * wordBank.length);
    randomWord = wordBank[randomIndex];
}
function displayCorrectWord() {
    display.innerText = 'Word was' + randomWord;
}
function handleKeyboardInput(){

}
function handleEnterKey(){

}
function handleUndoKey(){

}
keyboardElement.addEventListener('click', handleKeyboardInput)
enterElement.addEventListener('click', handleEnterKey)
undoElement.addEventListener('click', handleUndoKey)


