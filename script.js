// set up of the directions modal
const modal = document.querySelector('.modal');
const close = document.querySelector('.closeButton');

const openModal = () => {
    modal.style.display = 'block';
}
setTimeout(openModal, 1000);

close.addEventListener("click", () => { modal.style.display = 'none'; });


let simonsWord = [];//array that the computer word gets pushed into on each turn
let playersWord = [];//array that the plays word gets pushed into for comparisions
let characters; //charachters entered by player on this turn
let turn; //counts the turns that have passed
let correct;// used to determie if the player input is correct
let simonsTurn; //computers turn
let win;//cause we gotta win eventually, right?

//creating a start button so the word doesnt show up until I want it to or as i want it to
const buttonRow = document.querySelector(".buttonRow")
const startButton = document.createElement('button')
startButton.classList.add('start')
startButton.innerText = 'Start';
buttonRow.appendChild(startButton)
startButton.addEventListener('click', playGame)

//display to show game status
const lettersLeft = document.createElement('div');
lettersLeft.classList.add('gameStatus');
lettersLeft.innerHTML = "how many letters left";
buttonRow.appendChild(lettersLeft);
//create a button to restart the game

const restartButton = document.createElement('button');
restartButton.classList.add('start')
buttonRow.appendChild(restartButton)
restartButton.innerText = 'Try Again'
restartButton.addEventListener('click', restart)


//create a function to restart the game, commented out until ready to use cause it breaks stuff
function restart() {
    console.log("lets try that again")
    lettersLeft.innerHTML = 'another!'
    // noHighlights();//sets all the circles to default size and color
    // turn = 0;//resets turns
    playGame();//starts the game again
}


//code for picking a word, using an array and math random to select one 
let wordArray = ['about', 'every', 'paper', 'knife', 'ghost', 'phone', 'chair', 'plate', 'maybe', 'piano', 'clown', 'towel', 'lunch'];

function pickAWord(wordArray) {
    const randomWord = Math.floor(Math.random() * wordArray.length);//picks a random word from the word array
    const word = wordArray[randomWord];
    return word;
}
const getAWord = pickAWord(wordArray);//renames the choosen word
console.log(getAWord)


//code for splitting the word into an array
const spellIt = getAWord.split('');//array of letters that spell the word
console.log(spellIt)

//create the circles for the spelling Word to go into
const teachingSpot = document.querySelector('.simonSpells')//renames where the spelling word is shown
let correctSpelling;
for (i = 0; i < spellIt.length; i++) {
    const blankSpaces = document.createElement('div') //creates a dvi for every letter in the array
    blankSpaces.setAttribute('id', 'spellingLetter-' + spellIt[i]) //each each div an id of the letter at that index number
    blankSpaces.setAttribute('id', 'letter-' + i)// hopefully give the letter an number id as well
    correctSpelling = spellIt[i];//gives a name to the letters in the index so they can be put in the div
    blankSpaces.innerHTML = '';//puts letters into the divs, but need to find a way to hide them until needed
    teachingSpot.appendChild(blankSpaces)//actually add the divs to the page
    blankSpaces.classList.add('circle')//makes them cirlcles
}

//set up for the players circles
const spellingSpot = document.querySelector('.youSpell')//names the div where the game is played

let myGuess = ['', '', '', '', '']; //this array represents the letters that the player enters in the circles

myGuess.forEach((eachGuessLetter, eachGuessLetterIndex) => {
    const letterGoesHere = document.createElement('div') //creates the divs that are the circles where the players letters go
    letterGoesHere.setAttribute('id', 'eachGuessLetter-' + eachGuessLetterIndex)//gives each circle an id of the number of its place in the guess array
    spellingSpot.appendChild(letterGoesHere)//actually adds the spots to the page
    letterGoesHere.classList.add('circle') //gives each one a class of circle for the sake of styling
})

//array of letters to make the keyboard
const letterKeys = document.querySelector('.letterKeys');
const letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Oops!', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Check it!'];

//the actual keys to the key board
letters.forEach(letter => {
    const letterKey = document.createElement('button') //makes a button for each letter in the array
    letterKey.textContent = letter //makes the letter show up on the key
    letterKey.setAttribute('id', letter) //gives each button the id of the letter that is to be
    letterKey.addEventListener('click', () => 
        enterLetter(letter)); //when button is clicked enter letter function from line 35 is used
    letterKeys.appendChild(letterKey); // adds the buttons to the page
    letterKey.classList.add('buttonKeys') //styling for buttons
})

//assigns a letter to the keys
function enterLetter(letter) {//function added to each letterKey button
    if (letter === 'Oops!') {
        if (currentCircle > 0) {
            currentCircle--;//iterates backwards to go back a circle
            const circle = document.querySelector('#eachGuessLetter-' + currentCircle) //renames each spot with its index
            circle.textContent = '';//resets the circle to blank
            myGuess[currentCircle] = ''; //resets the array index to blank
            playersWord[currentCircle] = '';//resets the comparision array space to blank
        }// functions from below that clears and moves backwards
        return;//here I want to clear the letter and then be able to stop iterating and re enter a letter
    }else if (letter === 'Check it!') {
        checkIt(); //function from below to check if the 2 arrays are the same  
    } else {
    addLetter(letter);//adds letter to the circles
}}

// //deleting letters 
function oopsKey() {
    if (currentCircle > 0) {
        currentCircle--;//iterates backwards to go back a circle
        const circle = document.querySelector('#eachGuessLetter-' + currentCircle) //renames each spot with its index
        circle.textContent = '';//resets the circle to blank
        myGuess[currentCircle] = ''; //resets the array index to blank
        playersWord[currentCircle] = '';//resets the comparision array space to blank
    }
}
function clearWord() {
    while (currentCircle > 0) {
        currentCircle--;//iterates backwards to go back a circle
        const circle = document.querySelector('#eachGuessLetter-' + currentCircle) //renames each spot with its index
        circle.textContent = '';//resets the circle to blank
        myGuess[currentCircle] = ''; //resets the array index to blank
        playersWord[currentCircle] = '';//resets the comparision array space to blank
    }
}

// //getting letters to show up in entry field
 let currentCircle = 0; //gives the position that we are currently typing in
function addLetter(letter) {
    if (currentCircle <= turn) {//stops you from being able to type more than 5 letters
        const circle = document.querySelector('#eachGuessLetter-' + currentCircle)// renames each circle with its place in the row
        circle.textContent = letter; //sets the text inside of the circle to be what the player clicks on
        myGuess[currentCircle] = letter; // places that letter in the actual circle on the game board
        playersWord[currentCircle] = letter;//places the letter in the comparison array as well
        currentCircle++;//iterates to the next circle
        console.log(myGuess)//just shows that the letters are making it to the guess array
        console.log(playersWord)//just checking
    }
}

// // //create a function to start the game
function playGame() {//this is just the set up for the game not actually a turn
    win = false;//cause no ones won yet
    simonsWord = [];//nothing in the arrray yet but simons letters will go hear
    //empty now but players letters will be stored her  
    turn = 0; //how many turns have been played
    lettersLeft.innerHTML = 5 - turn; //for the counter that i havent reated yet but to show how many letters are left and to display other messages
    correct = true;//nothing has been entered yet so it cant be incorrect yet
    simonsTurn = true;//simon has to go first cause we dont know the word yet
    gameRound();
    console.log(simonsWord)
    playersTurn();
}

function gameRound() {//one full turn of play
    lettersLeft.innerHTML= "Simon's Turn"; 
   
    // if (characters == turn) {//i need the number of letters showing to equal the number of turns that have been played
    //   clearInterval(this.IntervalId);//rests the timeout
    //   simonsTurn=false;//changes the turn not simons turn, aka players turn
    //   noHighlight();
    //   on = true; //player can type now
    // }
    if (simonsTurn) {//what is simon going to do
       if (turn == 0) firstLetter();//such as if the number of characters in simonsword is 1 we will use function firstletter
        if (turn == 1) secondLetter();//and so on
        if (turn == 2) thirdLetter();
        if (turn == 3) fourthLetter();
        if (turn == 4) fifthLetter();
     
    }

    function firstLetter() {// if the character is zero i want to show the first letter as well as make the circle a little biger and brighter
        setTimeout(() => {
            document.querySelector('#letter-0').classList.add('highlighted')
            document.querySelector('#letter-0').textContent = spellIt[0];
        }, 500)
        document.querySelector('#letter-0').classList.remove('highlighted')
        document.querySelector('#letter-0').innerHTML = '';
        simonsWord.push(spellIt[0])
    }

    function secondLetter() { //for the second letter i want both the first and second letter to appear 
        setTimeout(() => {
            document.querySelector('#letter-0').classList.add('highlighted')
            document.querySelector('#letter-0').innerHTML = spellIt[0];
        }, 1000);
        setTimeout(() => {
            document.querySelector('#letter-1').classList.add('highlighted')
            document.querySelector('#letter-1').innerHTML = spellIt[1];
        }, 500)
        document.querySelector('#letter-0').classList.remove('highlighted')
        document.querySelector('#letter-0').innerHTML = '';
        document.querySelector('#letter-1').classList.remove('highlighted')
        document.querySelector('#letter-1').innerHTML = '';
        simonsWord.push(spellIt[1])
    }

    function thirdLetter() {
        setTimeout(() => {
            document.querySelector('#letter-0').classList.add('highlighted')
            document.querySelector('#letter-0').innerHTML = spellIt[0];
        }, 1000);
        setTimeout(() => {
            document.querySelector('#letter-1').classList.add('highlighted')
            document.querySelector('#letter-1').innerHTML = spellIt[1];
        }, 1000)
        setTimeout(() => {
            document.querySelector('#letter-2').classList.add('highlighted')
            document.querySelector('#letter-2').innerHTML = spellIt[2];
        }, 500)
        document.querySelector('#letter-0').classList.remove('highlighted')
        document.querySelector('#letter-0').innerHTML = '';
        document.querySelector('#letter-1').classList.remove('highlighted')
        document.querySelector('#letter-1').innerHTML = '';
        document.querySelector('#letter-2').classList.remove('highlighted')
        document.querySelector('#letter-2').innerHTML = '';
        simonsWord.push(spellIt[2]);
    }

    function fourthLetter() {
        setTimeout(() => {
            document.querySelector('#letter-0').classList.add('highlighted')
            document.querySelector('#letter-0').innerHTML = spellIt[0];
        }, 1000);
        setTimeout(() => {
            document.querySelector('#letter-1').classList.add('highlighted')
            document.querySelector('#letter-1').innerHTML = spellIt[1];
        }, 1000)
        setTimeout(() => {
            document.querySelector('#letter-2').classList.add('highlighted')
            document.querySelector('#letter-2').innerHTML = spellIt[2];
        }, 1000)
        setTimeout(() => {
            document.querySelector('#letter-3').classList.add('highlighted')
            document.querySelector('#letter-3').innerHTML = spellIt[3];
        }, 1000)
        document.querySelector('#letter-0').classList.remove('highlighted')
        document.querySelector('#letter-0').innerHTML = '';
        document.querySelector('#letter-1').classList.remove('highlighted')
        document.querySelector('#letter-1').innerHTML = '';
        document.querySelector('#letter-2').classList.remove('highlighted')
        document.querySelector('#letter-2').innerHTML = '';
        document.querySelector('#letter-3').classList.remove('highlighted')
        document.querySelector('#letter-3').innerHTML = '';
        simonsWord.push(spellIt[3]);
    }

    function fifthLetter() {
        setTimeout(() => {
            document.querySelector('#letter-0').classList.add('highlighted')
            document.querySelector('#letter-0').innerHTML = spellIt[0];
        }, 1000);
        setTimeout(() => {
            document.querySelector('#letter-1').classList.add('highlighted')
            document.querySelector('#letter-1').innerHTML = spellIt[1];
        }, 1000)
        setTimeout(() => {
            document.querySelector('#letter-2').classList.add('highlighted')
            document.querySelector('#letter-2').innerHTML = spellIt[2];
        }, 1000)
        setTimeout(() => {
            document.querySelector('#letter-3').classList.add('highlighted')
            document.querySelector('#letter-3').innerHTML = spellIt[3];
        }, 1000)
        setTimeout(() => {
            document.querySelector('#letter-4').classList.add('highlighted')
            document.querySelector('#letter-4').innerHTML = spellIt[4];
        }, 1000)
        document.querySelector('#letter-0').classList.remove('highlighted')
        document.querySelector('#letter-0').innerHTML = '';
        document.querySelector('#letter-1').classList.remove('highlighted')
        document.querySelector('#letter-1').innerHTML = '';
        document.querySelector('#letter-2').classList.remove('highlighted')
        document.querySelector('#letter-2').innerHTML = '';
        document.querySelector('#letter-3').classList.remove('highlighted')
        document.querySelector('#letter-3').innerHTML = '';
        document.querySelector('#letter-4').classList.remove('highlighted')
        document.querySelector('#letter-4').innerHTML = '';
        simonsWord.push(spellIt[4])
    }
}

function playersTurn(){
    lettersLeft.innerHTML= "Your Turn"
    
}

    function noHighlight() {//sets the circles to their normal default look
        document.querySelector('.circle').classList.remove('highlighted')
    }


    function checkIt() {
        lettersLeft.innerHTML = 'calculating...';
        let is_same = (playersWord.length == simonsWord.length) && playersWord.every(function(element, index) {
            return element === simonsWord[index]; 
        });
        console.log('is same',is_same)
        console.log(turn)
         if (!is_same) {//if the arrays are not equal then try again and rest back one turn
            turn--; 
            console.log('not the same')
            setTimeout(() => {
                lettersLeft.innerHTML = "not quite";
                // bounceCircles(); //visual afffect to reset
                }, 1000);
            lettersLeft.innerHTML = 5 - turn;
            noHighlight();//remove highlights
         } else if (turn +1 === playersWord.length && is_same && turn < 4) { // everything is correct but you havent finsihed the word
            console.log('next turn')
            turn++; // progress to the next turn
            clearWord()
            //remove the html
            playersWord = [];//reset the array for the next turn
            myGuess = [];
            //remove the html
            simonsTurn = true;//its simons turn again
            lettersLeft.innerHTML = 5 - turn; //counter will go down
            gameRound(); //reset the interval timer
            
        } else if (playersWord.length === 5 && is_same) { //if the array is the correct length and letters then you win
            
            lettersLeft.innerHTML = 'win';
            win = true;
            // bounceCircles();//visual affect
            //add a modal to offer another word/ round
        }
    }
    


    // function bounceCircles() {//highlights all the circles so they are bigger and brighter
    //     document.querySelector(".circles").classList.add('highlighted')
    // }
    