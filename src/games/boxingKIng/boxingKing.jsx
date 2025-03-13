
import React, { useState,useEffect } from 'react';
import usePreloader from './Hooks/PreloaderHook';
import bgRingBlue from '../../assets/boxingKing/images/bgRingBlue.jpg';
import boxingKIng from '../../assets/boxingKing/images/boxingKing.webp';
import slider1 from '../../assets/boxingKing/images/slider.png';
import boxer from '../../assets/boxingKing/images/man.png'
import slider2 from '../../assets/boxingKing/images/slider1.png';
import slotContainer from '../../assets/boxingKing/images/slotContainer.png';
import container from '../../assets/boxingKing/images/container.png';

import volatilityFull from '../../assets/common/images/volatilityFull.png';
import volatilityEmpty from '../../assets/common/images/volatilityEmpty.png';
import arrowRight from '../../assets/common/images/arrowRight.png';
import arrowLeft from '../../assets/common/images/arrowLeft.png';
import ContinueBtn from '../../assets/common/images/Continue.png';

//game bar
import settings from '../../assets/common/images/settings.webp';
import smButtonBg from '../../assets/common/images/buttonSmBgD.webp';
import bet from '../../assets/common/images/bet.webp';
import auto from '../../assets/common/images/auto.png';
import turbo from '../../assets/common/images/turbo.webp';
import speaker from '../../assets/common/images/speaker.webp';
import mute from '../../assets/common/images/mute.webp';
import playBg from '../../assets/common/images/buttonBgDark.webp';
import playCoil from '../../assets/common/images/buttonCoil.webp';
import bar0 from '../../assets/common/images/settings.png';
import bar1 from '../../assets/common/images/settings.png';
import bar2 from '../../assets/common/images/settings.png';


import mine from '../../assets/mines/images/mine.webp';
import star from '../../assets/mines/images/star.webp';
import goldChest from '../../assets/mines/images/goldChest.webp';
import blueChest from '../../assets/mines/images/blueChest.webp';
import refresh from '../../assets/mines/images/refresh.webp'

//symbols
import wild from '../../assets/boxingKing/images/symbols/wild.webp';
import blueBoxer from '../../assets/boxingKing/images/symbols/blueBoxer.webp';
import redBoxer from '../../assets/boxingKing/images/symbols/redBoxer.webp';
import redBoxerGloves from '../../assets/boxingKing/images/symbols/redBoxerGloves.webp';
import blueFist from '../../assets/boxingKing/images/symbols/blueFist.webp';
import redBoxerTrunks from '../../assets/boxingKing/images/symbols/redBoxerTrunks.webp';
import blueBoxerTrunks from '../../assets/boxingKing/images/symbols/blueBoxerTrunks.webp';
import a from '../../assets/boxingKing/images/symbols/a.webp';
import q from '../../assets/boxingKing/images/symbols/q.webp';
import k from '../../assets/boxingKing/images/symbols/k.webp';
import j from '../../assets/boxingKing/images/symbols/j.webp';

import bootMusic from '../../assets/boxingKing/audio/boxing.mp3';
import { useLocation } from 'react-router-dom';


import BoxingKingBoot from './scenes/BoxingKingBoot';
import BoxingKingGame from './scenes/BoxingKingGame';

const BoxingKIng = () => {
    const location = useLocation();
    useEffect(() => {
        // Check if the current path contains "home"
       // if (!location.pathname.includes("home")) return;

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
    
    // Current view state
    const [currentView, setCurrentView] = useState('boot');
    const switchToGame = () => setCurrentView('game');

    // Asset URLs
    const assetUrls = [
        { name: 'bgRingBlue', src: bgRingBlue },
        { name: 'boxingKing', src: boxingKIng },
        { name: 'boxer', src: boxer },
        { name: 'slotContainer', src: slotContainer },
        { name: 'container', src: container },

        { name: 'slider1', src: slider1 },
        { name: 'slider2', src: slider2 },
        { name: 'volatilityFull', src: volatilityFull },
        { name: 'volatilityEmpty', src: volatilityEmpty },
        { name: 'rightArrow', src: arrowRight },
        { name: 'leftArrow', src: arrowLeft },
        { name: 'continue', src: ContinueBtn },

        // { name: 'mine', src: mine },
        // { name: 'star', src: star },
        // { name: 'gold', src: goldChest },
        // { name: 'blueChest', src: blueChest },
        // { name: 'refresh', src: refresh },
        //game bar
        { name: 'settings', src: settings },
        { name: 'bet', src: bet },
        { name: 'auto', src: auto },
        { name: 'turbo', src: turbo },
        { name: 'speaker', src: speaker },
        { name: 'mute', src: mute },
        { name: 'playCoil', src: playCoil },

        //game symbols
        { name: 'wild', src: wild },
        { name: 'blueBoxer', src: blueBoxer },
        { name: 'a', src: a },
        { name: 'k', src: k },
        { name: 'q', src: q },
        { name: 'j', src: j },
        { name: 'redBoxer', src: redBoxer },
        { name: 'blueFist', src: blueFist },
        { name: 'redBoxerTrunks', src: redBoxerTrunks },
        { name: 'blueBoxerTrunks', src: blueBoxerTrunks },
        { name: 'redBoxerGloves', src: redBoxerGloves },
    ];

    // Use the preloader hook
    const { loadedAssets, isLoaded, progress } = usePreloader(assetUrls);

    return (

        <div className="p-2 flex items-center justify-center rounded-lg mt-2 ">
            <div className="md:w-[75%] h-[99vh] w-full rounded-lg p-2 bg-black"

            >
                {isLoaded ? (
                    currentView === 'boot' ? (
                        <BoxingKingBoot assets={loadedAssets} onContinue={switchToGame} />
                    ) : (
                        <BoxingKingGame assets={loadedAssets} />
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

export default BoxingKIng;

