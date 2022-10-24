const modal= document.querySelector('.modal');
const close= document.querySelector('.closeButton')

const openModal= () => {
    modal.style.display= 'block';
}
setTimeout(openModal, 1000);

close.addEventListener("click", () => { modal.style.display = 'none';});




//code for picking a word
let wordArray = ['about', 'every', 'paper', 'knife', 'ghost', 'phone', 'chair', 'plate', 'maybe', 'piano', 'clown', 'towel', 'lunch'];

function pickAWord (wordArray) {
    const randomWord = Math.floor(Math.random() * wordArray.length);
    const word = wordArray[randomWord];
    return word;
}
const getAWord = pickAWord(wordArray);
console.log(getAWord)

//code for splitting the word into an array

const spellIt = getAWord.split('');
console.log(spellIt)

//keyboard buttons and getting the letters to console when clicked
const letterKeys = document.querySelector('.letterKeys');
const letters = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','Oops!', 'z','x','c','v','b','n','m', 'Check it!'];

const enterLetter = (letter) => {
    console.log("is it workign yet?", letter);
    addLetter(letter)
}

letters.forEach(letter => {
    const letterKey = document.createElement('button')
    letterKey.textContent = letter
    letterKey.setAttribute('id', letter)
    letterKey.addEventListener('click', () => enterLetter(letter));
    letterKeys.appendChild(letterKey);

})

//entry field set up
const spellingSpot = document.querySelector('.simonSpells')

const myGuess = ['','','','',''];

myGuess.forEach((eachGuessLetter, eachGuessLetterIndex) => {
   const letterGoesHere = document.createElement('div')
   letterGoesHere.setAttribute('id', 'eachGuessLetter-' + eachGuessLetterIndex)
    spellingSpot.appendChild(letterGoesHere)
    letterGoesHere.classList.add('circle')
})

//getting letters to show up in entry field
currentCircle = 0;
const addLetter = (letter) => {
    const circle = document.querySelector('#eachGuessLetter' + currentCircle)
    circle.innerHTML= letter;
}

//timeout to make example show and then disappear

