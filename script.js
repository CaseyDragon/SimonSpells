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
let intervalId;//used to clear timeouts
let on = false;//hoping to use this so that the player can only use the keyboard on their turn
let win;//cause we gotta win eventually, right?

//creating a start button so the word doesnt show up until I want it to or as i want it to
const buttonRow = document.querySelector(".buttonRow")
const startButton = document.createElement('button')
    startButton.classList.add('start')
    startButton.innerText = 'Start';
    buttonRow.appendChild(startButton)
    startButton.addEventListener('click', playGame)

//create a button to restart the game

const restartButton = document.createElement('button');
    restartButton.classList.add('start')
    buttonRow.appendChild(restartButton)
    restartButton.innerText = 'Try Again'
    restartButton.addEventListener('click', restart)


//create a function to restart the game, commented out until ready to use cause it breaks stuff
function restart() {
    console.log("lets try that again")
    alert("lets play again");
    noHighlights();//sets all the circles to default size and color
    clearIntervalId();//clears all the timeouts
    turn = 0;//resets turns
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

for (i = 0; i < spellIt.length; i++) {
    const blankSpaces = document.createElement('div') //creates a dvi for every letter in the array
    blankSpaces.setAttribute('id', 'spellingLetter-' + spellIt[i]) //each each div an id of the letter at that index number
    blankSpaces.setAttribute ('id', 'letter-' + i )// hopefully give the letter an number id as well
    const correctSpelling = spellIt[i];//gives a name to the letters in the index so they can be put in the div
    blankSpaces.innerHTML = correctSpelling;//puts letters into the divs, but need to find a way to hide them until needed
    teachingSpot.appendChild(blankSpaces)//actually add the divs to the page
    blankSpaces.classList.add('circle')//makes them cirlcles
}

//keyboard buttons and getting the letters to console when clicked
const letterKeys = document.querySelector('.letterKeys');
const letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Oops!', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Check it!'];

function enterLetter(letter) {//function added to each letterKey button
    if (letter === 'Oops!') {
        oopsKey();// functions from below that clears and moves backwards
        return;//here I want to clear the letter and then be able to stop iterating and re enter a letter
    }
    if (letter === 'Check it!') {
        checkIt(); //function from below to check if the 2 arrays are the same
        //    return;
        //here i want to run the actual comparing functions to determine whether it is correct
    }
    addLetter(letter);//adds letter to the circles below
}


letters.forEach(letter => {
    const letterKey = document.createElement('button') //makes a button for each letter in the array
    letterKey.textContent = letter //makes the letter show up on the key
    letterKey.setAttribute('id', letter) //gives each button the id of the letter that is to be
    letterKey.addEventListener('click', () => enterLetter(letter)); //when button is clicked enter letter function from line 35 is used
    letterKeys.appendChild(letterKey); // adds the buttons to the page
    letterKey.classList.add('buttonKeys') //styling for buttons
})

//getting letters to show up in entry field
currentCircle = 0; //gives the position that we are currently typing in
function addLetter(letter) {
    if (currentCircle < characters) {//stops you from being able to type more than 5 letters
        const circle = document.querySelector('#eachGuessLetter-' + currentCircle)// renames each circle with its place in the row
        circle.textContent = letter; //sets the text inside of the circle to be what the player clicks on
        myGuess[currentCircle] = letter; // places that letter in the actual circle on the game board
        playersWord[currentCircle] = letter;//places the letter in the comparison array as well
        currentCircle++;//iterates to the next circle
        console.log(myGuess)//just shows that the letters are making it to the guess array
        console.log(playersWord)//just checking
    }
}

//entry field set up
const spellingSpot = document.querySelector('.youSpell')//names the div where the game is played

const myGuess = ['', '', '', '', '']; //this array represents the letters that the player enters in the circles

myGuess.forEach((eachGuessLetter, eachGuessLetterIndex) => {
    const letterGoesHere = document.createElement('div') //creates the divs that are the circles where the players letters go
    letterGoesHere.setAttribute('id', 'eachGuessLetter-' + eachGuessLetterIndex)//gives each circle an id of the number of its place in the guess array
    spellingSpot.appendChild(letterGoesHere)//actually adds the spots to the page
    letterGoesHere.classList.add('circle') //gives each one a class of circle for the sake of styling
})

//deleting letters 
function oopsKey() {
    if (currentCircle > 0) {
        currentCircle--;//iterates backwards to go back a circle
        const circle = document.querySelector('#eachGuessLetter-' + currentCircle) //renames each spot with its index
        circle.textContent = '';//resets the circle to blank
        myGuess[currentCircle] = ''; //resets the array index to blank
        playersWord[currentCircle] = '';//resets the comparision array space to blank
    }
}

// // //create a function to start the game
function playGame() {//this is just the set up for the game not actually a turn
    win = false;//cause no ones won yet
  simonsWord=[];//nothing in the arrray yet but simons letters will go hear
  playersWord=[];//empty now but players letters will be stored her
  characters=0; //keeps track of how many characters have been played for comparisions and counter
  intervalId = 0;//still trying to figure this interval thing out but im pretty sure i need it
  turn = 0; //how many turns have been played
  lettersLeft.innerHTML = 5 - turn; //for the counter that i havent reated yet but to show how many letters are left and to display other messages
  correct = true;//nothing has been entered yet so it cant be incorrect yet
  for (let i = 0; i< spellIt.length; i++){
    simonsWord.push(spellIt(i)); //for loop to add the simons letters to simons word, i suspect that this is incorrect and will add all in one turn
  }  
  simonsTurn=true;//simon has to go first cause we dont know the word yet
  intervalId=setInterval(gameRound, 800); //determines how long until gameRound starts
}
function gameRound() {//one full turn of play
    on = false;//player cant go yet
    if (characters == turn) {//i need the number of letters showing to equal the number of turns that have been played
      clearIntervalId(IntervalId);//rests the timeout
      simonsTurn=false;//changes the turn not simons turn, aka players turn
      noHighlight();
      on=true; //player can type now
    }
    if (simonsTurn) {//what is simon going to do
      noHighlight();//default is nothing highlighted
      setTimeout(() => { //on simons turn he will preform whichever function is true for this turn
        if (simonsWord[characters] == 0) firstLetter();//such as if the number of characters in simonsword is 1 we will use function firstletter
        if (simonsWord[characters] == 1) secondLetter();//and so on
        if (simonsWord[characters] == 2) thirdLetter();
        if (simonsWord[characters] == 3) forthLetter();
        if (simonsWord[characters] == 4) fifthLetter();
        characters++;// adds a charachter for the next round
      },500);//pause cause we dont want everything at the same time
    }
  }
  
  function firstLetter() {// if the character is zero i want to show the first letter as well as make the circle a little biger and brighter
  
    document.querySelector('#letter-1').classList.add('highlighted')
    document.querySelector('#letter-1').style.display = 'block';
    //display(x.style.display === "none") {
      //x.style.display = "block";
  }
  
  function secondLetter() { //for the second letter i want both the first and second letter to appear 
   
    document.querySelector('#letter-1').classList.add('highlighted')
    document.querySelector('#letter-1').style.display = 'block';
    document.querySelector('#letter-2').classList.add('highlighted')
    document.querySelector('#letter-2').classList.remove('hideText')
  }
  
  function thirdLetter() {
    document.querySelector('#letter-1').classList.add('highlighted')
    document.querySelector('#letter-1').style.display = 'block';
    document.querySelector('#letter-2').classList.add('highlighted')
    document.querySelector('#letter-2').classList.remove('hideText')
    document.querySelector('#letter-3').classList.add('highlighted')
    document.querySelector('#letter-3').classList.remove('hideText')
  }
  
  function fourthLetter() {
     document.querySelector('#letter-1').classList.add('highlighted')
    document.querySelector('#letter-1').style.display = 'block';
    document.querySelector('#letter-2').classList.add('highlighted')
    document.querySelector('#letter-2').classList.remove('hideText')
    document.querySelector('#letter-3').classList.add('highlighted')
    document.querySelector('#letter-3').classList.remove('hideText')
    document.querySelector('#letter-4').classList.add('highlighted')
    document.querySelector('#letter-4').classList.remove('hideText')
  }
  
  function fifthLetter() {
    document.querySelector('#letter-1').classList.add('highlighted')
    document.querySelector('#letter-1').style.display = 'block';
    document.querySelector('#letter-2').classList.add('highlighted')
    document.querySelector('#letter-2').classList.remove('hideText')
    document.querySelector('#letter-3').classList.add('highlighted')
    document.querySelector('#letter-3').classList.remove('hideText')
    document.querySelector('#letter-4').classList.add('highlighted')
    document.querySelector('#letter-4').classList.remove('hideText')
    document.querySelector('#letter-5').classList.add('highlighted')
    document.querySelector('#letter-5').classList.remove('hideText')
  }

  function noHighlight () {//sets the circles to their normal default look
    document.querySelector('.circle').classList.remove('highlighted')
  }

function playersTurn(){
    addLetter(letter);
    checkIt();
}
//very basic checking if the lines are the same will need a lot of work but basic ooutline to get started
function checkIt() {
    // if (currentCircle === 5) {//will change to match each iteration of the game to add letters using an index
    // const answer = myGuess.join('');
    // if (getAWord === answer) {//check it the 2 arrays are the same
    //     alert('yay, you did it!');
    // } else {
    //     alert('not quite but good try!')
    // }
    // }
    if (myGuess !== nextLetter) {
        cosole.log('not it');
        turn -= 1;
        setTimeout(() => {
          nextTurn();
        }, 1000);
        return
      } else if (myGuess === nextLetter) {
        console.log('great job');
        setTimeout(()=> {
          nextTurn();
        }, 1000);
        return;
      }

}

function checkIt(){
  
    if (playersWord[playersWord -1]!== simonsWord[simonsWord.length -1]) {
      correct = false;} // arrays are not equal that you are not correct

    if (playersWord.length = 5 && correct) {
        winGame(); //if the array is the correct length and letters then you win
    }
  
    if (correct == false) {//if the answer is not correct
    bounceCircles(); //visual afffect to reset
    lettersLeft.innerHTML = "oops"; 
    setTimeout (() => {
      lettersLeft.innerHTML = 5 - turn; //reset the letters left to correct number
      noHighlight();//remove highlights
    }, 800);
    }
  
    if (turn == playersWord.length && correct && !win) { // everything is correct but you havent finsihed the word
    turn ++; // progress to the next turn
    playersWord = [];//reset the array for the next turn
    simonsTurn=true;//its simons turn again
    characters= 0; //reset the characters so we can use this for calculating win
    lettersLeft.innerHTML= 5 - turn; //counter will go down
    intervalId = setIntervalVal(gameTurn, 800); //reset the interval timer
    }
}
  
  
    function winGame (); {
        bounceCircles();//visual affect
        lettersLeft.innerHTML = 'win'; //display some sort of win messgae
        on= false;//cant type anymore
        win = true;// congratulations
        alert(YAY!!);//just for my own checking methods
    }
  
  bounceCircles() {//highlights all the circles so they are bigger and brighter
    document.querySelector(".circles").classList.add('highlighted')
  }

//show spellit letters one at a time 
// function gameStart() {
//     console.log("lets the games begin")
    
//     simonsTurn();
// }
// //set up turn plays so that the computer displays one letter at a time
// let turn = 0;//keeps track of the turns

// function simonsTurn() {
//     turn +=1; //increases the turn number above
//     // buttonKeys.classList.add(waitYourTurn);// NO CHEATING! makes it so player cant click until the letters disappear
//     const nextLetter = [];
//     nextLetter.push(spellIt[turn]);
//     // playTurn(nextLetter);
//     //spellIt = [nextLetter]; not sure about this logic here i think im confused
//     setTimeout(() => {playerTurn(turn);
//     }, turn * 500 + 1000)
// }

// // function playTurn(nextLetter) {
// //         nextLetter.forEach(() => {
// //             setTimeout(() => {
// //                 letterDisplay();
// //             }, (turn + 1) * 500)
// //         })
// // }

// // function letterDisplay() {
// //     showMeTheLetter.classList.add("highlighted");
// // }

// // all this is going into the players turn
// function playerTurn(turn) {
//     letterKeys.classList.remove("waitYourTurn"); //allows player to type during turn

// //checkIt() not sure if I want it auto check or if it should be manual yet
// }
// //compare my guess with spell it after each letter
// //timeout to make example show and then disappear

