import React from 'react';

const ScoresSection = ({ gameState }) => {
  const { 
    scores, 
    currentScore, 
    currentPlayer, 
    playerNames, 
    isGameStarted,
    isGameActive
  } = gameState;

  if (!isGameStarted) {
    return null;
  }

  return (
    <section className="scores-section">
      <div className="player-names-display">
        <div className="player-name-label">
          <h2 className={currentPlayer === 0 && isGameActive ? 'player-highlighted' : ''}>
            {playerNames[0]}
          </h2>
        </div>
        <div className="player-name-label">
          <h2 className={currentPlayer === 1 && isGameActive ? 'player-highlighted' : ''}>
            {playerNames[1]}
          </h2>
        </div>
      </div>
      
      <div className="score-display">
        <div className="player-score">
          <h2>SCORE</h2>
          <h2>{scores[0]}</h2>
        </div>
        <div className="player-score">
          <h2>SCORE</h2>
          <h2>{scores[1]}</h2>
        </div>
      </div>
      
      <div className="turn-display">
        <div className="player-turn">
          <h2>TURN</h2>
          <h2>{currentPlayer === 0 ? currentScore : 0}</h2>
        </div>
        <div className="player-turn">
          <h2>TURN</h2>
          <h2>{currentPlayer === 1 ? currentScore : 0}</h2>
        </div>
      </div>
      
      <h3 className="hints">
        ❕ Who first reach score 💯, wins.<br />Good luck little piggies!
      </h3>
    </section>
  );
};

export default ScoresSection;