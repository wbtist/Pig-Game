'use strict';

// Game Configuration Constants (Security improvement: Use constants)
const GAME_CONFIG = {
    WINNING_SCORE: 100,
    DICE_FACES: 6,
    MAX_PLAYER_NAME_LENGTH: 18
};

// Input validation functions (Security improvement: Input validation)
function validatePlayerName(name) {
    if (!name || typeof name !== 'string') {
        return false;
    }
    const trimmedName = name.trim();
    return trimmedName.length > 0 && trimmedName.length <= GAME_CONFIG.MAX_PLAYER_NAME_LENGTH;
}

function sanitizePlayerName(name) {
    if (!name || typeof name !== 'string') {
        return '';
    }
    return name.trim().slice(0, GAME_CONFIG.MAX_PLAYER_NAME_LENGTH);
}

// HTML ROW Selectors - Same as original but with error handling
const diceButtonsRow = document.querySelector('.dice-buttons-row');
const playersContainer = document.getElementById('players-container');
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
// Game state (Security improvement: Add game state tracking)
let isGameActive = false;
// Buttons
const new_Game_Button = document.querySelector('#newGame-button');
const dice_Button = document.querySelector('.dice-button');
const hold_Button = document.querySelector('#hold-button');
const setNames = document.querySelector('.set-names-button');
// Dice image
const dice_image = document.querySelector('.dice-image');
// Player names
let player_0_Name, player_1_Name;
const player_0_Name_Display = document.querySelector('.player--0-name');
const player_1_Name_Display = document.querySelector('.player--1-name');
const player_0_Display_Name = document.querySelector('.player--0-display-name');
const player_1_Display_Name = document.querySelector('.player--1-display-name');
let playerNameArray = [];

// Setting up game defaults - Enhanced with error handling
function setDefaults() {
    try {
        if (new_Game_Button) new_Game_Button.classList.add('disapper');
        if (diceButtonsRow) diceButtonsRow.classList.add('disapper');
        if (document.querySelector('#dice-image-container')) document.querySelector('#dice-image-container').classList.remove('disapper');
        if (setNames) setNames.classList.remove('disapper');
        if (playersContainer) playersContainer.classList.add('disapper');
        
        playerNameArray = [];
        // Security improvement: Better random number generation
        currentPlayer = Math.floor(Math.random() * 2);
        isGameActive = false;
        
        if (player_0_Name_Display) player_0_Name_Display.classList.remove('player-highlighted');
        if (player_1_Name_Display) player_1_Name_Display.classList.remove('player-highlighted');
        
        currentScore = 0;
        scores[0] = 0;
        scores[1] = 0;
        
        if (dice_image) dice_image.classList.add('hidden');
        if (win_Message) win_Message.classList.add('disapper');
        
        // Reset scores with error handling
        if (player_0_htmlScore) player_0_htmlScore.textContent = 0;
        if (player_0_htmlturn) player_0_htmlturn.textContent = 0;
        if (player_1_htmlScore) player_1_htmlScore.textContent = 0;
        if (player_1_htmlturn) player_1_htmlturn.textContent = 0;
        
        // Clear input fields (Security improvement)
        if (player_0_Name_Display) player_0_Name_Display.value = '';
        if (player_1_Name_Display) player_1_Name_Display.value = '';

    } catch (error) {
        console.error('Error in setDefaults:', error);
        alert('Failed to initialize game. Please refresh the page.');
    }
}

// Initialize game
setDefaults();

// Enhanced switch players function
function switchPlayers() {
    try {
        currentPlayer = currentPlayer === 0 ? 1 : 0;
        if (player_0_Name_Display) player_0_Name_Display.classList.toggle('player-highlighted');
        if (player_1_Name_Display) player_1_Name_Display.classList.toggle('player-highlighted');
        if (player_0_Display_Name) player_0_Display_Name.classList.toggle('player-highlighted');
        if (player_1_Display_Name) player_1_Display_Name.classList.toggle('player-highlighted');
        toggleButtons();
    } catch (error) {
        console.error('Error switching players:', error);
    }
}

function toggleButtons() {
    try {
        if (!diceButtonsRow) return;
        
        if (currentPlayer === 0) {
            diceButtonsRow.classList.remove('justify-content-end');
            diceButtonsRow.classList.add('justify-content-start');
        } else {
            diceButtonsRow.classList.remove('justify-content-start');
            diceButtonsRow.classList.add('justify-content-end');
        }
    } catch (error) {
        console.error('Error toggling buttons:', error);
    }
}

// Event Listeners - Enhanced with security and error handling
if (new_Game_Button) {
    new_Game_Button.addEventListener('click', () => {
        setDefaults();
    });
}

if (setNames) {
    setNames.addEventListener('click', () => {
        try {
            // Security improvement: Validate and sanitize input
            const player0Name = sanitizePlayerName(player_0_Name_Display?.value);
            const player1Name = sanitizePlayerName(player_1_Name_Display?.value);

            // Validate both player names
            if (!validatePlayerName(player0Name)) {
                alert('Player 1 name must be between 1 and 18 characters.');
                return;
            }

            if (!validatePlayerName(player1Name)) {
                alert('Player 2 name must be between 1 and 18 characters.');
                return;
            }

            playerNameArray[0] = player0Name;
            playerNameArray[1] = player1Name;
            
            // Update display names in scores section
            if (player_0_Display_Name) player_0_Display_Name.textContent = player0Name;
            if (player_1_Display_Name) player_1_Display_Name.textContent = player1Name;
            
            if (setNames) setNames.classList.add('disapper');
            if (playersContainer) playersContainer.classList.remove('disapper');
            if (diceButtonsRow) diceButtonsRow.classList.remove('disapper');
            
            const currentPlayerElement = document.querySelector(`.player--${currentPlayer}-name`);
            if (currentPlayerElement) {
                currentPlayerElement.classList.add('player-highlighted');
            }
            
            const currentPlayerDisplayName = document.querySelector(`.player--${currentPlayer}-display-name`);
            if (currentPlayerDisplayName) {
                currentPlayerDisplayName.classList.add('player-highlighted');
            }
            
            toggleButtons();
            isGameActive = true;

        } catch (error) {
            console.error('Error setting player names:', error);
            alert('Failed to set player names. Please try again.');
        }
    });
}

if (dice_Button) {
    dice_Button.addEventListener('click', () => {
        if (!isGameActive) return;

        try {
            // Security improvement: Better random generation and use constants
            const dice_Random_Number = Math.floor(Math.random() * GAME_CONFIG.DICE_FACES) + 1;
            
            // Display image based on random number with error handling
            if (dice_image) {
                dice_image.src = `img/dice--${dice_Random_Number}.png`;
                dice_image.classList.remove('hidden');
            }

            if (dice_Random_Number !== 1) {
                currentScore += dice_Random_Number;
                const turnElement = document.querySelector(`#player--${currentPlayer}-turn`);
                if (turnElement) turnElement.textContent = currentScore;
            } else {
                const turnElement = document.querySelector(`#player--${currentPlayer}-turn`);
                if (turnElement) turnElement.textContent = 0;
                // Switch players
                switchPlayers();
                currentScore = 0;
            }

        } catch (error) {
            console.error('Error rolling dice:', error);
            alert('Error rolling dice. Please try again.');
        }
    });
}

if (hold_Button) {
    hold_Button.addEventListener('click', () => {
        if (!isGameActive) return;

        try {
            // Add current player current score to score.
            scores[currentPlayer] += currentScore;
            
            // Display the score
            const scoreElement = document.querySelector(`#player--${currentPlayer}-score`);
            if (scoreElement) scoreElement.textContent = scores[currentPlayer];
            
            // Clear turn value
            const turnElement = document.querySelector(`#player--${currentPlayer}-turn`);
            if (turnElement) turnElement.textContent = 0;

            // Security improvement: Use constant for winning score
            if (scores[currentPlayer] >= GAME_CONFIG.WINNING_SCORE) {
                isGameActive = false;
                
                const diceImageContainer = document.querySelector('#dice-image-container');
                if (diceImageContainer) diceImageContainer.classList.add('disapper');
                if (dice_image) dice_image.classList.add('hidden');
                
                // Security improvement: Sanitized player name output
                const winnerName = playerNameArray[currentPlayer] || `Player ${currentPlayer + 1}`;
                if (win_Message) {
                    win_Message.textContent = `🏆 Congratulations, ${winnerName} won! 🏆`;
                    win_Message.classList.remove('disapper');
                }
                
                if (new_Game_Button) new_Game_Button.classList.remove('disapper');
                if (diceButtonsRow) diceButtonsRow.classList.add('disapper');
            } else {
                switchPlayers();
                currentScore = 0;
            }

        } catch (error) {
            console.error('Error holding score:', error);
            alert('Error holding score. Please try again.');
        }
    });
}

console.log('Secured Pig Game loaded successfully');