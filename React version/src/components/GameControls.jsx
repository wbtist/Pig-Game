import React, { useState } from 'react';

const GameControls = ({ gameState }) => {
  const [inputNames, setInputNames] = useState(['', '']);
  const [error, setError] = useState('');
  
  const {
    isGameStarted,
    isGameActive,
    diceValue,
    currentPlayer,
    winner,
    startNewGame,
    savePlayerNames,
    rollDice,
    holdScore
  } = gameState;

  const handleNameChange = (index, value) => {
    const newNames = [...inputNames];
    newNames[index] = value;
    setInputNames(newNames);
    setError('');
  };

  const handleSaveNames = () => {
    try {
      savePlayerNames(inputNames[0], inputNames[1]);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleNewGame = () => {
    startNewGame();
    setInputNames(['', '']);
    setError('');
  };

  const handleRollDice = () => {
    try {
      rollDice();
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleHoldScore = () => {
    try {
      holdScore();
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="game-controls">
      <button 
        type="button" 
        className="btn btn-outline-light"
        onClick={handleNewGame}
      >
        NEW GAME
      </button>

      {!isGameStarted && (
        <>
          <div className="player-names">
            <input
              className={`playernames ${currentPlayer === 0 && isGameActive ? 'player-highlighted' : ''}`}
              type="text"
              placeholder="Enter Player 1 Name"
              maxLength="18"
              value={inputNames[0]}
              onChange={(e) => handleNameChange(0, e.target.value)}
            />
            <input
              className={`playernames ${currentPlayer === 1 && isGameActive ? 'player-highlighted' : ''}`}
              type="text"
              placeholder="Enter Player 2 Name"
              maxLength="18"
              value={inputNames[1]}
              onChange={(e) => handleNameChange(1, e.target.value)}
            />
          </div>

          <button 
            className="btn btn-sm btn-outline-info set-names-button"
            onClick={handleSaveNames}
          >
            Save names
          </button>
        </>
      )}

      {isGameStarted && !winner && (
        <>
          <div className="dice-controls">
            <button 
              type="button" 
              className="btn btn-outline-success dice-button"
              onClick={handleRollDice}
              disabled={!isGameActive}
            >
              DICE
            </button>
            <button 
              type="button" 
              className="btn btn-outline-warning"
              onClick={handleHoldScore}
              disabled={!isGameActive}
            >
              HOLD
            </button>
          </div>

          <div className="dice-display">
            <img 
              className="dice-image" 
              src={`/dice-${diceValue}.png`} 
              alt={`Dice showing ${diceValue}`}
            />
          </div>
        </>
      )}

      {winner !== null && (
        <div className="winner">
          <h3 className="win-message">
            🎉 {gameState.playerNames[winner]} Wins! 🎉
          </h3>
        </div>
      )}

      {error && (
        <div className="error-message" style={{ color: 'red', marginTop: '1rem' }}>
          {error}
        </div>
      )}
    </section>
  );
};

export default GameControls;