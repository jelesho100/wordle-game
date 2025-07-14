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
const wordBank = ['RIGHT', 'STARS', 'MONEY', 'GRACE', 'SHOOT'];

const userInput = [];
let currentTry = 1;
let randomWord;
let rowEl;

function randWordGenerator() {
    let randomIndex = Math.floor(Math.random() * wordBank.length);
    randomWord = wordBank[randomIndex];
    console.dir(randomWord + ' is console log')
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
    console.log(currentTry)
    console.log(userInput)
    //change array to string
    const stringRandomWord = userInput.join(''); //First initialized here (beofre eidts)
    console.log(stringRandomWord, 'is string random word');
    //iterate throu user input n compar to correct word
    // Create a copy of the random word to track which letters get used
    const tempWord = randomWord.split([]); // or split('')

    // First pass — check for green matches
    for (let i = 0; i < stringRandomWord.length; i++) {
        const guessedLetter = stringRandomWord[i];

        if (guessedLetter === randomWord[i]) {
            rowEl[i].classList.add('green');
            tempWord[i] = null; // Mark that letter as used
        }
    }

    // Second pass — check for yellow and gray
    for (let i = 0; i < stringRandomWord.length; i++) {
        const guessedLetter = stringRandomWord[i];

        // Skip already marked greens
        if (rowEl[i].classList.contains('green')) continue;

        const indexInTemp = tempWord.indexOf(guessedLetter);

        if (indexInTemp !== -1) {
            rowEl[i].classList.add('yellow');
            tempWord[indexInTemp] = null; // Consume the letter
        } else {
            rowEl[i].classList.add('gray');
        }
    }

    //win logic
    if (stringRandomWord === randomWord) {
        console.log('Matching word');
        displayCorrectWord();
        return;
    }
    if (userInput.length === 5) {
        currentTry++;
        userInput.length = 0;
    }

    //userInput.length = 0;
}
function handleUndoKey() {
    //userInput = userInput.slice(0, -1)
    userInput.pop();
    updateDisplay();
}



keyboardElement.addEventListener('click', handleKeyboardInput)
enterElement.addEventListener('click', handleEnterKey)
undoElement.addEventListener('click', handleUndoKey)
randWordGenerator();

