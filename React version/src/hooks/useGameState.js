import { useState, useCallback } from 'react';

const useGameState = () => {
  const [scores, setScores] = useState([0, 0]);
  const [currentScore, setCurrentScore] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [diceValue, setDiceValue] = useState(0);
  const [playerNames, setPlayerNames] = useState(['Player 1', 'Player 2']);
  const [winner, setWinner] = useState(null);

  // Sanitize and validate player names
  const sanitizePlayerName = (name) => {
    if (!name || typeof name !== 'string') return '';
    return name.trim().replace(/[<>]/g, '').substring(0, 18);
  };

  const validatePlayerName = (name) => {
    return name && name.length >= 1 && name.length <= 18;
  };

  // Start new game
  const startNewGame = useCallback(() => {
    setScores([0, 0]);
    setCurrentScore(0);
    setCurrentPlayer(Math.floor(Math.random() * 2));
    setIsGameActive(false);
    setIsGameStarted(false);
    setDiceValue(0);
    setWinner(null);
    setPlayerNames(['Player 1', 'Player 2']);
  }, []);

  // Save player names and start game
  const savePlayerNames = useCallback((name1, name2) => {
    const sanitizedName1 = sanitizePlayerName(name1);
    const sanitizedName2 = sanitizePlayerName(name2);

    if (!validatePlayerName(sanitizedName1)) {
      throw new Error('Player 1 name must be between 1 and 18 characters.');
    }

    if (!validatePlayerName(sanitizedName2)) {
      throw new Error('Player 2 name must be between 1 and 18 characters.');
    }

    setPlayerNames([sanitizedName1, sanitizedName2]);
    setIsGameStarted(true);
    setIsGameActive(true);
  }, []);

  // Switch players
  const switchPlayer = useCallback(() => {
    setCurrentPlayer(prev => prev === 0 ? 1 : 0);
    setCurrentScore(0);
  }, []);

  // Roll dice
  const rollDice = useCallback(() => {
    if (!isGameActive || winner) return;

    try {
      const newDiceValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(newDiceValue);

      if (newDiceValue === 1) {
        // Player rolled 1 - lose turn and current score
        setCurrentScore(0);
        switchPlayer();
      } else {
        // Add to current score
        setCurrentScore(prev => prev + newDiceValue);
      }
    } catch (error) {
      console.error('Error rolling dice:', error);
      throw new Error('Error rolling dice. Please try again.');
    }
  }, [isGameActive, winner, switchPlayer]);

  // Hold score
  const holdScore = useCallback(() => {
    if (!isGameActive || winner) return;

    try {
      const newScores = [...scores];
      newScores[currentPlayer] += currentScore;
      setScores(newScores);

      // Check for winner
      if (newScores[currentPlayer] >= 100) {
        setWinner(currentPlayer);
        setIsGameActive(false);
      } else {
        switchPlayer();
      }
    } catch (error) {
      console.error('Error holding score:', error);
      throw new Error('Error holding score. Please try again.');
    }
  }, [scores, currentScore, currentPlayer, isGameActive, winner, switchPlayer]);

  return {
    // State
    scores,
    currentScore,
    currentPlayer,
    isGameActive,
    isGameStarted,
    diceValue,
    playerNames,
    winner,
    
    // Actions
    startNewGame,
    savePlayerNames,
    rollDice,
    holdScore
  };
};

export default useGameState;