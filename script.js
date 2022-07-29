'use scrict'

// Generate variables -- scores, dice, player_1_Turn, player_2_Turn,
let scores = [0, 0];
let player01Score = null;
let player_1_Turn = document.querySelector('.player--0-turn');
let player_2_Turn = document.querySelector('.player--1-turn');

// Generate random number 1-6
let dice = Math.floor(Math.random() * (6 - 1) + 1);

