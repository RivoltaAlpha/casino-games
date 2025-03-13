import React, { useState,useEffect } from 'react'
import AlibabaBoot from './scenes/boot';
import AlibabaGame from './scenes/game';
import bootMusic from '../../assets/Alibaba/audio/alibaba.mp3';
function Alibaba() {
  const [currentView, setCurrentView] = useState('boot')
    useEffect(() => {
        const audio = new Audio(bootMusic);
        audio.loop = true;
    
        const handlePlayAudio = () => {
          audio.play().catch(error => {
            console.log('Autoplay prevented:', error);
          });
        };
    
        document.addEventListener('click', handlePlayAudio, { once: true });
    
        const handleVisibilityChange = () => {
          if (document.hidden) {
            audio.pause();
          
          } else {
            audio.play();
          }
        };
    
        document.addEventListener('visibilitychange', handleVisibilityChange);
    
        return () => {
          audio.pause();
          audio.currentTime = 0;
          document.removeEventListener('click', handlePlayAudio);
          document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
      }, []);

  // Function to switch to the game view
  const switchToGame = () => {
    setCurrentView('game');
  };

  return (
    <div className="w-screen h-screen  flex items-center justify-center">
      <div className='lg:w-[65%] lg:h-[89vh] m-4 w-full h-full rounded-lg p-2 bg-black'>
        {currentView === 'boot' ? (
          <AlibabaBoot onContinue={switchToGame} />
        ) : (
          <AlibabaGame />
        )}
      </div>
    </div>
  );
}

export default Alibaba;
