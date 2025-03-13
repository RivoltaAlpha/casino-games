import React, { useState } from 'react'
import GoldenEmpireGame from './scenes/game';
import GoldenEmpireBoot from './scenes/boot'

function GoldenEmpire() {
  const [currentView, setCurrentView] = useState('boot')

  // Function to switch to the game view
  const switchToGame = () => {
    setCurrentView('game');
  };

  return (
    <div className="w-screen h-screen  flex items-center justify-center">
      <div className='lg:w-[60%] lg:h-[86vh] m-4 w-full h-full rounded-lg'>
        {currentView === 'boot' ? (
          <GoldenEmpireBoot onContinue={switchToGame} />
        ) : (
          <GoldenEmpireGame />
        )}
      </div>
    </div>
  );
}

export default GoldenEmpire;
