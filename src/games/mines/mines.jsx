
import React, { useState,useEffect } from 'react';
import MinesBoot from './scenes/MinesBoot';
import MinesGame from './scenes/MinesGame';
import usePreloader from './Hooks/PreloaderHook';
import blueBg from '../../assets/mines/images/blueBg.webp';
import mines from '../../assets/mines/images/mines.webp';
import slider1 from '../../assets/mines/images/slider1.webp';
import slider2 from '../../assets/mines/images/slider2.webp';
import volatilityFull from '../../assets/common/images/volatilityFull.png';
import volatilityEmpty from '../../assets/common/images/volatilityEmpty.png';
import arrowRight from '../../assets/common/images/arrowRight.png';
import arrowLeft from '../../assets/common/images/arrowLeft.png';
import ContinueBtn from '../../assets/common/images/Continue.png';
import mine from '../../assets/mines/images/mine.webp';
import star from '../../assets/mines/images/star.webp';
import goldChest from '../../assets/mines/images/goldChest.webp';
import blueChest from '../../assets/mines/images/blueChest.webp';
import refresh from '../../assets/mines/images/refresh.webp'
import bootMusic from '../../assets/mines/audio/mines.mp3';
import { useLocation } from 'react-router-dom'


const Mines = () => {
    //  useEffect(() => {
    //         const audio = new Audio(bootMusic);
    //         audio.loop = true;
        
    //         const handlePlayAudio = () => {
    //           audio.play().catch(error => {
    //             console.log('Autoplay prevented:', error);
    //           });
    //         };
        
    //         document.addEventListener('click', handlePlayAudio, { once: true });
        
    //         const handleVisibilityChange = () => {
    //           if (document.hidden) {
    //             audio.pause();
              
    //           } else {
    //             audio.play();
    //           }
    //         };
        
    //         document.addEventListener('visibilitychange', handleVisibilityChange);
        
    //         return () => {
    //           audio.pause();
    //           audio.currentTime = 0;
    //           document.removeEventListener('click', handlePlayAudio);
    //           document.removeEventListener("visibilitychange", handleVisibilityChange);
    //         };
    //       }, []);
    
    // Current view state
    const [currentView, setCurrentView] = useState('boot');
    const switchToGame = () => setCurrentView('game');

    // Asset URLs
    const assetUrls = [
        { name: 'background', src: blueBg },
        { name: 'mines', src: mines },
        { name: 'slider1', src: slider1 },
        { name: 'slider2', src: slider2 },
        { name: 'volatilityFull', src: volatilityFull },
        { name: 'volatilityEmpty', src: volatilityEmpty },
        { name: 'rightArrow', src: arrowRight },
        { name: 'leftArrow', src: arrowLeft },
        { name: 'continue', src: ContinueBtn },

        { name: 'mine', src: mine },
        { name: 'star', src: star },
        { name: 'gold', src: goldChest },
        { name: 'blueChest', src: blueChest },
        { name: 'refresh', src: refresh },
    ];

    // Use the preloader hook
    const { loadedAssets, isLoaded, progress } = usePreloader(assetUrls);

    return (
        <div className="p-2 flex items-center justify-center ">
            <div className="md:w-[50%] h-[94vh] mt-2 w-full overflow-hidden" id="mines">
                {isLoaded ? (
                    currentView === 'boot' ? (
                        <MinesBoot assets={loadedAssets} onContinue={switchToGame} />
                    ) : (
                        <MinesGame assets={loadedAssets} />
                    )
                ) : (
                    <div className="flex items-center justify-center md:h-[90vh] h-screen">
                        <div className="text-xl font-semibold text-gray-800">
                            Loading... {progress.toFixed(0)}%
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mines;

