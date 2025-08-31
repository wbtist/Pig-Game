'use strict';

// Game Configuration Constants
const GAME_CONFIG = {
    WINNING_SCORE: 100,
    DICE_FACES: 6,
    MAX_PLAYER_NAME_LENGTH: 18,
    DICE_IMAGE_PATH: 'img/dice--{number}.png'
};

// Game State Management Object
const PigGame = {
    // Game state
    scores: [0, 0],
    currentScore: 0,
    currentPlayer: 0,
    isGameActive: false,
    playerNames: [],

    // DOM elements cache
    elements: {
        diceButtonsRow: document.querySelector('.dice-buttons-row'),
        playersContainer: document.getElementById('players-container'),
        player0Score: document.querySelector('#player--0-score'),
        player1Score: document.querySelector('#player--1-score'),
        player0Turn: document.querySelector('#player--0-turn'),
        player1Turn: document.querySelector('#player--1-turn'),
        winMessage: document.querySelector('.win-message'),
        newGameButton: document.querySelector('#newGame-button'),
        diceButton: document.querySelector('.dice-button'),
        holdButton: document.querySelector('#hold-button'),
        setNamesButton: document.querySelector('.set-names-button'),
        diceImage: document.querySelector('.dice-image'),
        diceImageContainer: document.querySelector('#dice-image-container'),
        player0NameDisplay: document.querySelector('.player--0-name'),
        player1NameDisplay: document.querySelector('.player--1-name')
    },

    // Initialize game
    init() {
        this.bindEvents();
        this.setDefaults();
    },

    // Bind all event listeners
    bindEvents() {
        this.elements.newGameButton.addEventListener('click', () => this.setDefaults());
        this.elements.setNamesButton.addEventListener('click', () => this.handleSetNames());
        this.elements.diceButton.addEventListener('click', () => this.rollDice());
        this.elements.holdButton.addEventListener('click', () => this.holdScore());
    },

    // Input validation and sanitization
    validatePlayerName(name) {
        if (!name || typeof name !== 'string') {
            return false;
        }
        
        const trimmedName = name.trim();
        return trimmedName.length > 0 && trimmedName.length <= GAME_CONFIG.MAX_PLAYER_NAME_LENGTH;
    },

    sanitizePlayerName(name) {
        if (!name || typeof name !== 'string') {
            return '';
        }
        
        return name.trim().slice(0, GAME_CONFIG.MAX_PLAYER_NAME_LENGTH);
    },

    // Set game defaults and reset state
    setDefaults() {
        try {
            // Reset game state
            this.scores = [0, 0];
            this.currentScore = 0;
            this.playerNames = [];
            this.isGameActive = false;

            // Generate random starting player securely
            this.currentPlayer = Math.floor(Math.random() * 2);

            // Reset UI elements with error handling
            this.updateElementClass(this.elements.newGameButton, 'disappear', 'add');
            this.updateElementClass(this.elements.diceButtonsRow, 'disappear', 'add');
            this.updateElementClass(this.elements.diceImageContainer, 'disappear', 'remove');
            this.updateElementClass(this.elements.setNamesButton, 'disappear', 'remove');
            this.updateElementClass(this.elements.playersContainer, 'disappear', 'add');
            this.updateElementClass(this.elements.player0NameDisplay, 'player-highlighted', 'remove');
            this.updateElementClass(this.elements.player1NameDisplay, 'player-highlighted', 'remove');
            this.updateElementClass(this.elements.diceImage, 'hidden', 'add');
            this.updateElementClass(this.elements.winMessage, 'disappear', 'add');

            // Reset score displays
            this.updateScoreDisplay(0, 0);
            this.updateTurnDisplay(0, 0);
            this.updateScoreDisplay(1, 0);
            this.updateTurnDisplay(1, 0);

            // Clear player name inputs
            if (this.elements.player0NameDisplay) {
                this.elements.player0NameDisplay.value = '';
            }
            if (this.elements.player1NameDisplay) {
                this.elements.player1NameDisplay.value = '';
            }

        } catch (error) {
            console.error('Error setting game defaults:', error);
            this.showErrorMessage('Failed to initialize game. Please refresh the page.');
        }
    },

    // Handle setting player names with validation
    handleSetNames() {
        try {
            const player0Name = this.sanitizePlayerName(this.elements.player0NameDisplay.value);
            const player1Name = this.sanitizePlayerName(this.elements.player1NameDisplay.value);

            // Validate both player names
            if (!this.validatePlayerName(player0Name)) {
                this.showErrorMessage('Player 1 name must be between 1 and 18 characters.');
                return;
            }

            if (!this.validatePlayerName(player1Name)) {
                this.showErrorMessage('Player 2 name must be between 1 and 18 characters.');
                return;
            }

            // Store sanitized names
            this.playerNames[0] = player0Name;
            this.playerNames[1] = player1Name;

            // Update UI
            this.updateElementClass(this.elements.setNamesButton, 'disappear', 'add');
            this.updateElementClass(this.elements.playersContainer, 'disappear', 'remove');
            this.updateElementClass(this.elements.diceButtonsRow, 'disappear', 'remove');

            // Highlight current player
            const currentPlayerElement = document.querySelector(`.player--${this.currentPlayer}-name`);
            if (currentPlayerElement) {
                currentPlayerElement.classList.add('player-highlighted');
            }

            this.toggleButtons();
            this.isGameActive = true;

        } catch (error) {
            console.error('Error setting player names:', error);
            this.showErrorMessage('Failed to set player names. Please try again.');
        }
    },

    // Roll dice with error handling
    rollDice() {
        if (!this.isGameActive) {
            return;
        }

        try {
            // Generate secure random number for dice (1-6)
            const diceValue = Math.floor(Math.random() * GAME_CONFIG.DICE_FACES) + 1;

            // Update dice image with error handling
            this.updateDiceImage(diceValue);

            if (diceValue !== 1) {
                // Add to current score
                this.currentScore += diceValue;
                this.updateTurnDisplay(this.currentPlayer, this.currentScore);
            } else {
                // Player rolled 1, switch turns
                this.updateTurnDisplay(this.currentPlayer, 0);
                this.switchPlayers();
                this.currentScore = 0;
            }

        } catch (error) {
            console.error('Error rolling dice:', error);
            this.showErrorMessage('Error rolling dice. Please try again.');
        }
    },

    // Hold current score
    holdScore() {
        if (!this.isGameActive) {
            return;
        }

        try {
            // Add current score to total
            this.scores[this.currentPlayer] += this.currentScore;
            this.updateScoreDisplay(this.currentPlayer, this.scores[this.currentPlayer]);
            this.updateTurnDisplay(this.currentPlayer, 0);

            // Check for win condition
            if (this.scores[this.currentPlayer] >= GAME_CONFIG.WINNING_SCORE) {
                this.handleGameWin();
            } else {
                this.switchPlayers();
                this.currentScore = 0;
            }

        } catch (error) {
            console.error('Error holding score:', error);
            this.showErrorMessage('Error holding score. Please try again.');
        }
    },

    // Handle game win
    handleGameWin() {
        try {
            this.isGameActive = false;
            
            const winnerName = this.playerNames[this.currentPlayer] || `Player ${this.currentPlayer + 1}`;
            
            this.updateElementClass(this.elements.diceImageContainer, 'disappear', 'add');
            this.updateElementClass(this.elements.diceImage, 'hidden', 'add');
            this.updateElementClass(this.elements.diceButtonsRow, 'disappear', 'add');
            this.updateElementClass(this.elements.newGameButton, 'disappear', 'remove');

            // Display win message with sanitized player name
            if (this.elements.winMessage) {
                this.elements.winMessage.textContent = `🏆 Congratulations, ${winnerName} won! 🏆`;
                this.updateElementClass(this.elements.winMessage, 'disappear', 'remove');
            }

        } catch (error) {
            console.error('Error handling game win:', error);
            this.showErrorMessage('Game completed but there was an error displaying the result.');
        }
    },

    // Switch active player
    switchPlayers() {
        try {
            this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
            
            if (this.elements.player0NameDisplay && this.elements.player1NameDisplay) {
                this.elements.player0NameDisplay.classList.toggle('player-highlighted');
                this.elements.player1NameDisplay.classList.toggle('player-highlighted');
            }
            
            this.toggleButtons();

        } catch (error) {
            console.error('Error switching players:', error);
        }
    },

    // Toggle button positioning based on current player
    toggleButtons() {
        try {
            if (!this.elements.diceButtonsRow) {
                return;
            }

            if (this.currentPlayer === 0) {
                this.elements.diceButtonsRow.classList.remove('justify-content-end');
                this.elements.diceButtonsRow.classList.add('justify-content-start');
            } else {
                this.elements.diceButtonsRow.classList.remove('justify-content-start');
                this.elements.diceButtonsRow.classList.add('justify-content-end');
            }

        } catch (error) {
            console.error('Error toggling buttons:', error);
        }
    },

    // Update dice image with fallback handling
    updateDiceImage(diceValue) {
        try {
            if (!this.elements.diceImage) {
                return;
            }

            const imagePath = GAME_CONFIG.DICE_IMAGE_PATH.replace('{number}', diceValue);
            
            // Create new image element to test loading
            const testImage = new Image();
            testImage.onload = () => {
                this.elements.diceImage.src = imagePath;
                this.updateElementClass(this.elements.diceImage, 'hidden', 'remove');
            };
            testImage.onerror = () => {
                console.error(`Failed to load dice image: ${imagePath}`);
                this.showErrorMessage('Failed to load dice image.');
            };
            testImage.src = imagePath;

        } catch (error) {
            console.error('Error updating dice image:', error);
        }
    },

    // Utility function to safely update element classes
    updateElementClass(element, className, action) {
        try {
            if (!element || !className) {
                return;
            }

            if (action === 'add') {
                element.classList.add(className);
            } else if (action === 'remove') {
                element.classList.remove(className);
            } else if (action === 'toggle') {
                element.classList.toggle(className);
            }

        } catch (error) {
            console.error('Error updating element class:', error);
        }
    },

    // Update score display safely
    updateScoreDisplay(playerIndex, score) {
        try {
            const element = playerIndex === 0 ? this.elements.player0Score : this.elements.player1Score;
            if (element) {
                element.textContent = score;
            }
        } catch (error) {
            console.error('Error updating score display:', error);
        }
    },

    // Update turn display safely
    updateTurnDisplay(playerIndex, score) {
        try {
            const element = playerIndex === 0 ? this.elements.player0Turn : this.elements.player1Turn;
            if (element) {
                element.textContent = score;
            }
        } catch (error) {
            console.error('Error updating turn display:', error);
        }
    },

    // Show error message to user
    showErrorMessage(message) {
        try {
            // Simple alert for now - could be enhanced with custom modal
            alert(message);
        } catch (error) {
            console.error('Error showing error message:', error);
        }
    }
};

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        PigGame.init();
    } catch (error) {
        console.error('Failed to initialize Pig Game:', error);
        alert('Failed to initialize game. Please refresh the page.');
    }
});

// Export game object for testing purposes (if in module environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PigGame, GAME_CONFIG };
}