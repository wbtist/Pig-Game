import React from 'react';
import Header from './components/Header';
import InfoSection from './components/InfoSection';
import GameControls from './components/GameControls';
import ScoresSection from './components/ScoresSection';
import Footer from './components/Footer';
import useGameState from './hooks/useGameState';

function App() {
  const gameState = useGameState();

  return (
    <div className="app">
      <main className="game-container">
        <Header />
        <InfoSection />
        <GameControls gameState={gameState} />
        <ScoresSection gameState={gameState} />
      </main>
      <Footer />
    </div>
  );
}

export default App;