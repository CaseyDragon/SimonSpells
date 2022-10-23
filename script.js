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

