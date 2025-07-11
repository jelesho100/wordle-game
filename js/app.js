// 1. Game board and Input
//  Game structure: 5x6 grid of boxes //create an array called gridContainer
//  Input fields: text boxes for each letter in a guess //
//  Keyboard: on screen keyboard //event listener to detect when player has clicked on a letter. 
//  Feedback display: the on-screen keyboard display feedback logic //when event listener happens call feedback logic function to display feedback logic
// 2. Game logic: 
//  Word list: list of words. //Outsource from dictionary.com? //create a list for testing
//  Random word selection. // Not sure //
//  Guess validation: checks if guess is a valid five letter word//
//  feed back logic: green if correct letter and placement, yellow if correct letter wrong placement, red if other //if else statement
// 3. Game state logic:
//  Guesses remaining: track how guesses player has left //create variable guesses to track input
//  w/l condition: determine if when player has won or lost //if else statement to track if player guessed correctly

/*-------------------------------- Constants --------------------------------*/
//get reference to the keyboard container (used for event delegation)
const keyboardElement = document.querySelector('#keyboard')

//display text of the button click on the keyboard
const display = document.querySelector('.display')
const enter = document.querySelector('.enter')
const undo = document.querySelector('.undo')
const userLetter = document.querySelectorAll('.user-letter')
const wordOneRow = document.querySelectorAll('.row-one')
const wordTwoRow = document.querySelectorAll('.row-two')
const wordThreeRow = document.querySelectorAll('.row-three')

//wordTwoRow[0].innerText = 'W';

const numRows = 5;
const columnRows = 3;
const wordBank = ['RIGHT']; //['RIGHT', 'STARS', 'MONEY', 'GRACE', 'SHOOT']
const userWordBank = [];





/*---------------------------- Variables (state) ----------------------------*/
let guess = 3;
let wordOne = [];
let wordTwo = [];
let wordThree = [];
let randomWord = '';
let userInput = '';
let currentUserRow = 1;



/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/
//logic to pick random word from the array
function randWordGenerator() {
    let randomIndex = Math.floor(Math.random() * wordBank.length);
    randomWord = wordBank[randomIndex];
    //console.dir(randomWord + ' is console log');
    return randomWord;
}
function displayCorrectWord() {
    display.innerText = randWordGenerator();
    return '\nWord was: ' + randWordGenerator();
}


/*----------------------------- Event Listeners -----------------------------*/
//makes button clickable and limits word to 5letters
keyboardElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('letter') && wordOne.length < 5) {
        wordOne.push(event.target.innerText);
        console.log(wordOne);
        //loop through div class 
        //dynamically set the proper array for what row the user is on
        console.log(currentUserRow)
        let currentArray, currentWordRow;
        switch (currentUserRow) {
            case 1: { 
                currentArray = wordOne;
                currentWordRow = wordOneRow; 
                break
            }
            case 2: { 
                currentArray = wordTwo;
                currentWordRow = wordTwoRow;
                break 
            }
            case 3: { 
                currentArray = wordThree;
                currentWordRow = wordThreeRow;
                break 
            }
        }
        for (let i = 0; i < currentArray.length; i++) {
            currentWordRow[i].innerText = currentArray[i];

        }
        userInput = currentArray.join(''); //array method that takes an array on converts it to a single string
        //display.innerText = userInput;
    }
})



//logic to enter the word and have user enter next word 
enter.addEventListener('click', (event) => {
    if (guess === 1) {
        console.log("Player has lost")
        // enter.removeEventListener('click', event)
        return display.innerText = displayCorrectWord();
    }
    //loop to track how many guesses player has
    // if(guess >= 2){ //
    if (userInput.length === 5) {
        // display.innerText = userInput;

        console.log('entered')
        guess--;
        //win logic
        if (randomWord === userInput) {
            console.log("You Win!")
            display.innerText = "Congrats! You win!";
        }

        userInput = '';
    }
    //increment the row the user is on
    switch (guess) {
        //fall through
        case 3:
        case 2: 
            currentUserRow+=1;
            break;
        
    }
    //lose logic. stops user from entering once guess. hits 0?
    // }
    // else{
    // console.log("Player has lost")
    // enter.removeEventListener('click', event)

    // return display.innerText = displayCorrectWord();

    // }

})
//user can backspace
undo.addEventListener('click', (event) => {
    userInput = userInput.slice(0, -1)
    display.innerText = userInput;
})


randWordGenerator();














