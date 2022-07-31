'use scrict'
// Scores
const player_0_htmlScore = document.querySelector('#player--0-score');
const player_1_htmlScore = document.querySelector('#player--1-score');
const player_0_htmlturn = document.querySelector('#player--0-turn');
const player_1_htmlturn = document.querySelector('#player--1-turn');
const win_Message = document.querySelector('.win-message');
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
  win_Message.classList.add('hidden');
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
    document.querySelector(`#player--${currentPlayer}-turn`).textContent = currentScore;

  } else {
    document.querySelector(`#player--${currentPlayer}-turn`).textContent = 0;
    // Switch players
    switchPlayers();
    currentScore = 0;
  };

});

hold_Button.addEventListener('click', () => {
  // Add current player current score to score.
  scores[currentPlayer] += currentScore;
  // Display the score
  document.querySelector(`#player--${currentPlayer}-score`).textContent = scores[currentPlayer];
  // Clear turn value
  document.querySelector(`#player--${currentPlayer}-turn`).textContent = 0;
  if (scores[currentPlayer] >= 100) {
    dice_image.classList.add('hidden');
    win_Message.classList.remove('hidden');
    // alert(`Hurray Player-${currentPlayer} win!`);

  } else {
    switchPlayers();
    currentScore = 0;
  };


});

function switchPlayers() {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
};
