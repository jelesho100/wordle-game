const keyboardElement = document.querySelector('#keyboard')
const display = document.querySelector('.display')
const enterElement = document.querySelector('.enter')
const undoElement = document.querySelector('.undo')
const userLetter = document.querySelectorAll('.user-letter')
const wordOneRow = document.querySelectorAll('.row-one')
const wordTwoRow = document.querySelectorAll('.row-two')
const wordThreeRow = document.querySelectorAll('.row-three')
const gameResult = document.querySelector('#game-result')
const maxTries = 3;
const maxWordLength = 5;
let wordBank = [];

fetch('./words.txt')
    .then(res => res.text())
    .then(data => {
        wordBank = data.split('\n').map(word => word.trim().toUpperCase());
        randWordGenerator(); // once loaded, call your word setup
    });


const userInput = [];
let currentTry = 1;
let randomWord;
let rowEl;

function randWordGenerator() { //genetates random word
    let randomIndex = Math.floor(Math.random() * wordBank.length);
    randomWord = wordBank[randomIndex];
}
function displayCorrectWord() {
    display.innerText = 'Word was ' + randomWord;
}
function handleKeyboardInput(evt) {
    if (
        !(evt.target.classList.contains('letter')) ||
        userInput.length === 5 ||
        currentTry === 4
    ) return;
    userInput.push(evt.target.innerText)
    if (currentTry === 1) {
        rowEl = wordOneRow;
    } else if (currentTry === 2) {
        rowEl = wordTwoRow;
    } else if (currentTry === 3) {
        rowEl = wordThreeRow;
    }
    updateDisplay();
}
function updateDisplay() {
    userInput.forEach((item, idx) => {
        rowEl[idx].innerText = item
    })
}
function handleEnterKey() {
    //change array to string
    const stringRandomWord = userInput.join(''); //join array letters to a
    if(!wordBank.includes(stringRandomWord)) { //confirms user guess is a valid word
        display.innerText = 'Invalid word. Click undo button 5x';
        return;
    }

    //iterate throu user input n compar to correct word
    // Create a copy of the random word to track which letters get used
    const tempWord = randomWord.split('');

    // First pass — check for green matches
    for (let i = 0; i < stringRandomWord.length; i++) {
        const guessedLetter = stringRandomWord[i];
        if (guessedLetter === randomWord[i]) {
            rowEl[i].classList.add('flip', 'green');
            tempWord[i] = null; // Mark that letter as used
        }
    }

    // Second pass — check for yellow and gray
    for (let i = 0; i < stringRandomWord.length; i++) {
        const guessedLetter = stringRandomWord[i];
        // Skip already marked greens
        if (rowEl[i].classList.contains('green')) continue;

        const indexInTemp = tempWord.indexOf(guessedLetter);

        if (indexInTemp !== -1) { //if the letter is found
            rowEl[i].classList.add('flip', 'yellow');
            tempWord[indexInTemp] = null; // Consume the letter
        } else {
            rowEl[i].classList.add('flip', 'gray');
        }
    }

    //win logic
    if (stringRandomWord === randomWord) {
        gameResult.innerText = 'Congrats! You win! ' + displayCorrectWord();
        return;
    }
    if (userInput.length === 5) {
        currentTry++;
        userInput.length = 0;
        //display lose logic
        if (currentTry > 3) {
            gameResult.innerText = 'Word was ' + randomWord;
        }
    }



}
function handleUndoKey() {
    userInput.pop();
    updateDisplay();
}



keyboardElement.addEventListener('click', handleKeyboardInput)
enterElement.addEventListener('click', handleEnterKey)
undoElement.addEventListener('click', handleUndoKey)
randWordGenerator();

//Code Graveyard
// console.dir(randomWord + ' is console log'). ws last sentence in randowWordGenerator function
// console.log(currentTry)
// console.log(userInput). first 2 sentences in handle enter key fnction
// console.log('Matching word'); first sentence under win logic if statement
//userInput = userInput.slice(0, -1) acutlly unnecessary. 1st sentence in handleUndoKey func
//app.js is the rest of my graveyard
// console.log(stringRandomWord, 'is string random word'); 2nd line under enterHanldeKey function