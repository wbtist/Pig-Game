'use scrict'

// Scores
const player_0_htmlScore = document.querySelector('.player--0-score');
const player_1_htmlScore = document.querySelector('.player--1-score');
const player_0_htmlturn = document.querySelector('.player--0-turn');
const player_1_htmlturn = document.querySelector('.player--1-turn');
let scores = [0, 0];
let currentScore;
// Current player
let currentPlayer;
// Buttons
const new_Game_Button = document.querySelector('#newGame-button');
const dice_Button = document.querySelector('#dice-button');
const hold_Button = document.querySelector('#hold-button');
// Dice image
const dice_image = document.querySelector('.dice-image');

//* Setting up game defaults
function setDefaults() {
  currentPlayer = 0;
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  dice_image.classList.add('hidden');
  player_0_htmlScore.textContent = 0;
  player_0_htmlturn.textContent = 0;
  player_1_htmlScore.textContent = 0;
  player_1_htmlturn.textContent = 0;
};
setDefaults();

new_Game_Button.addEventListener('click', () => {
  setDefaults();
});

dice_Button.addEventListener('click', () => {
  // * Generate Random Number
  const dice_Random_Number = Math.trunc(Math.random() * (7 - 1) + 1);
  // * Display image based on random number
  dice_image.src = `img/dice--${dice_Random_Number}.png`;
  dice_image.classList.remove('hidden');


  if (dice_Random_Number !== 1) {
    currentScore += dice_Random_Number;
    document.querySelector(`.player--${currentPlayer}-turn`).textContent = currentScore;

  } else {
    document.querySelector(`.player--${currentPlayer}-turn`).textContent = 0;
    // Switch players
    switchPlayers();
    currentScore = 0;
  };


});

hold_Button.addEventListener('click', () => {
  // Add current player current score to score.
  scores[currentPlayer] += currentScore;
  // Display the score
  document.querySelector(`.player--${currentPlayer}-score`).textContent = scores[currentPlayer];
  // Clear turn value
  document.querySelector(`.player--${currentPlayer}-turn`).textContent = 0;
  switchPlayers();
  currentScore = 0;

});

function switchPlayers() {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
};


/* Declaring const variables*/
/* Declaring let variables*/
/* Declaring Functions*/
// Creating startConditions function

// Creating newGame function

/* Button click event listeners*/
// New Game Button Click Event
// Dice Button Click Event
// Hold button Click Event











// Code V0.5
// let scores = [0, 0];
// let activePlayer = 0;
// let player_1_Turn = document.querySelector('.player--0-turn');
// let player_2_Turn = document.querySelector('.player--1-turn');
// let dice;
// let dice_image;

// // Generate random number 1-6
// function setDefaults() {
//   scores = [0, 0];
//   activePlayer = 0;
// };
// setDefaults();
// // Set the dice image based on dice.


// document.querySelector('#dice-button').addEventListener('click', diceClicked);

// function diceClicked() {
//   // On click, generate a random number, display it and if it is not 1, add to plaer`s Turn
//   dice = Math.floor(Math.random() * (6 - 1) + 1);
//   dice_image = document.querySelector('.dice-image').setAttribute('src', `img/dice--${dice}.png`);
//   if (dice !== 1) {
//     player_1_Turn.textContent = Number(player_1_Turn.textContent) + Number(dice);
//     console.log('after ', + player_1_Turn.textContent);
//   }


// };

// document.querySelector('#hold-button').addEventListener('click', holdClicked);

// function holdClicked() {
//   // add turn value to player1s score. If score >=100, player wins
//   scores[activePlayer] += Number(player_1_Turn.textContent);
//   alert(scores[activePlayer]);
// };

// document.querySelector('#newGame-button').addEventListener('click', newGameButtonClicked);

// function newGameButtonClicked() {
//   alert('New Game button clicked');
// };