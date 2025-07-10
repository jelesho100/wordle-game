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


const numRows = 5; 
const columnRows = 3;
const wordBank = ['RIGHT']; //['RIGHT', 'STARS', 'MONEY', 'GRACE', 'SHOOT']
const userWordBank = [];





/*---------------------------- Variables (state) ----------------------------*/
let guesses = 3;
let userInput='';
let randomWord = '';


/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/
                        //logic to pick random word from the array
function randWordGenerator() {
     let randomIndex = Math.floor(Math.random() * wordBank.length);
     randomWord = wordBank[randomIndex];
    //console.dir(randomWord + ' is console log');
    return randomWord;
}


/*----------------------------- Event Listeners -----------------------------*/
//makes button clickable and limits word to 5letters
keyboardElement.addEventListener('click', (event) => {
    if(event.target.classList.contains('letter') && userInput.length<5){ 
        userInput+=event.target.innerText;
        console.log(userInput);
        display.innerText = userInput;
    }
})
//logic to enter the word and have user enter next word
enter.addEventListener('click', (event) => {
    if(userInput.length===5){
        display.innerText = userInput;
        
        console.log('entered')
       
        //win lose logic
        if(randomWord === userInput){
            console.log("You Win!")
                display.innerText = "Congrats! You win!";

        }
        userInput = '';
    }
    
})

randWordGenerator();













