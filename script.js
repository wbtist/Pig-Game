'use scrict'

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