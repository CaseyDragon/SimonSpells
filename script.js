// set up of the directions modal
const modal = document.querySelector('.modal');
const close = document.querySelector('.closeButton')

const openModal = () => {
    modal.style.display = 'block';
}
setTimeout(openModal, 1000);

close.addEventListener("click", () => { modal.style.display = 'none'; });


//creating a start button so the word doesnt show up until I want it to or as i want it to
const buttonRow = document.querySelector(".buttonRow")
const startButton = document.createElement('button')
    startButton.classList.add('start')
    startButton.innerText = 'Start';
    buttonRow.appendChild(startButton)
    startButton.addEventListener('click', gameStart)

//create a button to restart the game

const restartButton = document.createElement('button');
    restartButton.classList.add('start')
    buttonRow.appendChild(restartButton)
    restartButton.innerText = 'Try Again'
    restartButton.addEventListener('click', restart)


//create a function to restart the game, commented out until ready to use cause it breaks stuff
function restart(text) {
    console.log("lets try that again")
    // alert(text);
    // spellIt = [];
    // myGuess = [];
    // level = 0;
    // letterKeys.classList.add(waitToClick);
}


//create a function to start the game
function gameStart() {
    console.log("lets the games begin")
}


//code for picking a word, using an array and math random to select one 
let wordArray = ['about', 'every', 'paper', 'knife', 'ghost', 'phone', 'chair', 'plate', 'maybe', 'piano', 'clown', 'towel', 'lunch'];

function pickAWord(wordArray) {
    const randomWord = Math.floor(Math.random() * wordArray.length);
    const word = wordArray[randomWord];
    return word;
}
const getAWord = pickAWord(wordArray);
console.log(getAWord)


//code for splitting the word into an array
const spellIt = getAWord.split('');//array of letters that spell the word
console.log(spellIt)

//create the circles for the spelling Word to go into
const teachingSpot = document.querySelector('.simonSpells')//renames where the spelling word is shown

for (i = 0; i < spellIt.length; i++) {
    const showMeTheLetter = document.createElement('div') //creates a dvi for every letter in the array
    showMeTheLetter.setAttribute('id', 'spellingLetter-' + spellIt[i]) //each each div an id of the letter at that index number
    const correctSpelling = spellIt[i];//gives a name to the letters in the index so they can be put in the div
    showMeTheLetter.innerHTML = correctSpelling;//puts letters into the divs
    teachingSpot.appendChild(showMeTheLetter)//actually add the divs to the page
    showMeTheLetter.classList.add('circle')//makes them cirlcles

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

//entry field set up
const spellingSpot = document.querySelector('.youSpell')//names the div where the game is played

const myGuess = ['', '', '', '', '']; //this array represents the letters that the player enters in the circles

myGuess.forEach((eachGuessLetter, eachGuessLetterIndex) => {
    const letterGoesHere = document.createElement('div') //creates the divs that are the circles where the players letters go
    letterGoesHere.setAttribute('id', 'eachGuessLetter-' + eachGuessLetterIndex)//gives each circle an id of the number of its place in the guess array
    spellingSpot.appendChild(letterGoesHere)//actually adds the spots to the page
    letterGoesHere.classList.add('circle') //gives each one a class of circle for the sake of styling
})

//getting letters to show up in entry field
currentCircle = 0; //gives the position that we are currently typing in
function addLetter(letter) {
    if (currentCircle < 5) {//stops you from being able to type more than 5 letters
        const circle = document.querySelector('#eachGuessLetter-' + currentCircle)// renames each circle with its place in the row
        circle.textContent = letter; //sets the text inside of the circle to be what the player clicks on
        myGuess[currentCircle] = letter; // places that letter in the actual circle on the game board
        currentCircle++;//iterates to the next circle
        console.log(myGuess)//just shows that the letters are making it to the guess array
    }
}

//deleting letters 
function oopsKey() {
    if (currentCircle > 0) {
        currentCircle--;//iterates backwards to go back a circle
        const circle = document.querySelector('#eachGuessLetter-' + currentCircle) //renames each spot with its index
        circle.textContent = '';//resets the circle to blank
        myGuess[currentCircle] = ''; //resets the array index to blank
    }
}

//very basic checking if the lines are the same will need a lot of work but basic ooutline to get started
function checkIt() {
    // if (currentCircle === 5) {//will change to match each iteration of the game to add letters using an index
    const answer = myGuess.join('');
    if (getAWord === answer) {//check it the 2 arrays are the same
        alert('yay, you did it!');
    } else {
        alert('not quite but good try!')
    }
    // }
}



//show spellit letters one at a time 
//compare my guess with spell it after each letter
//timeout to make example show and then disappear

