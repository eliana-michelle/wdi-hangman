console.log("hey");

/*----- constants -----*/
const MAX_WRONG_GUESSES = 6;
const WORDS = [
  'BOHEMIAN RHAPSODY', 'BLACKKKLANSMAN', 'A STAR IS BORN', 'ROMA', 'THE FAVOURITE', 'GREEN BOOK', 'ROMA', 'BLACK PANTHER', 'VICE'
];
/*----- app's state (variables) -----*/
let usedLetters, wrongGuesses, secretWord, guess

/*----- cached element references -----*/
const letterButtons = document.querySelectorAll('#letters button');

const hangmanImg = document.querySelector('section');

const currentGuess = document.getElementById('guess');

const message = document.querySelector('h2');
/*----- event listeners -----*/
document.getElementById('letters').addEventListener('click', handleLetterClick);
document.getElementById('replay').addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
    usedLetters = [];
    wrongGuesses = [];
    let randomIndex = Math.floor(Math.random() * WORDS.length);
    secretWord = WORDS[randomIndex];
    console.log(secretWord);
    guess = "";
    for (let i=0; i < secretWord.length; i++) {
      if (secretWord[i] === " ") {
        guess += " ";
      } else {
        guess += "_";
      }
    }
    render();
};

function render () {
  currentGuess.textContent = guess;
  hangmanImg.style.backgroundPosition =  `${'-75' * wrongGuesses.length}px 0`;
  if(guess === secretWord) {
    message.textContent = ('Congrats!');
  } else if (wrongGuesses.length === MAX_WRONG_GUESSES) {
    message.textContent = ('Whoops! Gotchya! Better luck next time!');
  } else {
    message.textContent = ('Guess the word!');
  }
  letterButtons.forEach(function(btn){
    if(usedLetters.includes(btn.textContent)){
      btn.setAttribute('disabled', true);
    } else {
      btn.removeAttribute('disabled');
    };
    if (wrongGuesses.includes(btn.textContent)){
      btn.style.backgroundColor = 'black';
      btn.style.color = 'white';
    } else if (usedLetters.includes(btn.textContent)){
      btn.style.backgroundColor = 'gray';
      btn.style.color = 'black';
    } else {
      btn.style.backgroundColor = 'white';
      btn.style.color = 'gray';
    }
  });
}


function handleLetterClick(evt) {
  if (evt.target.tagName !== 'BUTTON' || wrongGuesses.length === MAX_WRONG_GUESSES || secretWord === guess) {
    return;
  };
  let letter = evt.target.textContent;
  let guessChars = guess.split('');
  if (secretWord.includes(letter)) {
    for (let i=0; i < secretWord.length; i++) {
      let char = secretWord.charAt(i);
      if (char === letter) {
      guessChars[i] = letter;
      }
    }
    guess = guessChars.join('');
  } else {
      wrongGuesses.push(letter);
    }
  usedLetters.push(letter);
  render();
  console.log(wrongGuesses);
  };
