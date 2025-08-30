package com.piggame

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import kotlin.random.Random

data class Player(
    val name: String = "",
    val score: Int = 0,
    val currentTurnScore: Int = 0
)

enum class GamePhase {
    SETUP,      // Enter player names
    PLAYING,    // Game in progress
    GAME_OVER   // Someone won
}

class GameViewModel : ViewModel() {
    var gamePhase by mutableStateOf(GamePhase.SETUP)
        private set
    
    var player1 by mutableStateOf(Player())
        private set
    
    var player2 by mutableStateOf(Player())
        private set
    
    var currentPlayer by mutableStateOf(0) // 0 for player1, 1 for player2
        private set
    
    var lastDiceRoll by mutableStateOf(0)
        private set
    
    var winner by mutableStateOf<Player?>(null)
        private set
    
    var gameMessage by mutableStateOf("")
        private set
    
    // Player name inputs
    var player1Name by mutableStateOf("")
    var player2Name by mutableStateOf("")
    
    fun setPlayerNames(name1: String, name2: String) {
        if (name1.isNotBlank() && name2.isNotBlank()) {
            player1 = player1.copy(name = name1.trim())
            player2 = player2.copy(name = name2.trim())
            gamePhase = GamePhase.PLAYING
            currentPlayer = Random.nextInt(2) // Random starting player
            updateGameMessage("${getCurrentPlayerName()}'s turn")
        }
    }
    
    fun rollDice() {
        if (gamePhase != GamePhase.PLAYING) return
        
        val roll = Random.nextInt(1, 7)
        lastDiceRoll = roll
        
        if (roll == 1) {
            // Lost turn
            gameMessage = "You rolled a 1! Turn over."
            resetCurrentTurnScore()
            switchPlayer()
        } else {
            // Add to current turn score
            addToCurrentTurn(roll)
            gameMessage = "You rolled: $roll"
        }
    }
    
    fun hold() {
        if (gamePhase != GamePhase.PLAYING) return
        
        val currentTurnScore = getCurrentPlayer().currentTurnScore
        if (currentTurnScore > 0) {
            addToTotalScore(currentTurnScore)
            gameMessage = "Points banked! ${getCurrentPlayer().score} total points."
            
            // Check for winner
            if (getCurrentPlayer().score >= 100) {
                winner = getCurrentPlayer()
                gamePhase = GamePhase.GAME_OVER
                gameMessage = "🏆 Congratulations, ${getCurrentPlayerName()} won! 🏆"
                return
            }
            
            resetCurrentTurnScore()
            switchPlayer()
        }
    }
    
    fun newGame() {
        gamePhase = GamePhase.SETUP
        player1 = Player()
        player2 = Player()
        currentPlayer = 0
        lastDiceRoll = 0
        winner = null
        gameMessage = ""
        player1Name = ""
        player2Name = ""
    }
    
    private fun getCurrentPlayer(): Player {
        return if (currentPlayer == 0) player1 else player2
    }
    
    private fun getCurrentPlayerName(): String {
        return getCurrentPlayer().name
    }
    
    private fun addToCurrentTurn(points: Int) {
        if (currentPlayer == 0) {
            player1 = player1.copy(currentTurnScore = player1.currentTurnScore + points)
        } else {
            player2 = player2.copy(currentTurnScore = player2.currentTurnScore + points)
        }
    }
    
    private fun addToTotalScore(points: Int) {
        if (currentPlayer == 0) {
            player1 = player1.copy(score = player1.score + points)
        } else {
            player2 = player2.copy(score = player2.score + points)
        }
    }
    
    private fun resetCurrentTurnScore() {
        if (currentPlayer == 0) {
            player1 = player1.copy(currentTurnScore = 0)
        } else {
            player2 = player2.copy(currentTurnScore = 0)
        }
    }
    
    private fun switchPlayer() {
        currentPlayer = 1 - currentPlayer
        gameMessage = "${getCurrentPlayerName()}'s turn"
    }
}