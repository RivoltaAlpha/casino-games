import React, { useState,useEffect } from 'react';
import ChargeBuffaloBoot from './scenes/ChargeBuffaloBoot';
import ChargeBuffaloGame from './scenes/ChargeBuffaloGame';
import usePreloader from './Hooks/PreloaderHook';
import blueBg from '../../assets/mines/images/blueBg.webp';
import mines from '../../assets/mines/images/mines.webp';
// import slider1 from '../../assets/mines/images/slider1.webp';
// import slider2 from '../../assets/mines/images/slider2.webp';
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

//buffalo assets
import bg1 from '../../assets/chargeBuffalo/images/bg1.webp';
import buffaloImage from '../../assets/chargeBuffalo/images/buffaloImage.webp';
import slider1 from '../../assets/chargeBuffalo/images/slider1.webp';
import slider2 from '../../assets/chargeBuffalo/images/slider2.webp';
import scatter from '../../assets/chargeBuffalo/images/scatter.webp';
import chargeBuffalo from '../../assets/chargeBuffalo/images/chargeBuffalo.webp';
import slotContainer from '../../assets/chargeBuffalo/images/slotContainer.png'

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

//symbols
import ten from '../../assets/chargeBuffalo/images/symbols/10.webp';
import nine from '../../assets/chargeBuffalo/images/symbols/nine.webp';
import a from '../../assets/chargeBuffalo/images/symbols/a.webp';
import bear from '../../assets/chargeBuffalo/images/symbols/bear.webp';
import q from '../../assets/chargeBuffalo/images/symbols/q.webp';
import k from '../../assets/chargeBuffalo/images/symbols/k.webp';
import buffalo from '../../assets/chargeBuffalo/images/symbols/buffalo.webp';
import eagle from '../../assets/chargeBuffalo/images/symbols/eagle.webp';
import j from '../../assets/chargeBuffalo/images/symbols/j.webp';
import moose from '../../assets/chargeBuffalo/images/symbols/moose.webp';
import wolf from '../../assets/chargeBuffalo/images/symbols/wolf.webp';

import bootMusic from '../../assets/chargeBuffalo/audio/buffalo.mp3';

const ChargeBuffalo = () => {
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
    // Current view state
    const [currentView, setCurrentView] = useState('boot');
    const switchToGame = () => setCurrentView('game');

    // Asset URLs
    const assetUrls = [
        { name: 'background', src: bg1 },
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

        { name: 'buffaloImage', src: buffaloImage },
        { name: 'chargeBuffalo', src: chargeBuffalo },
        { name: 'scatter', src: scatter },
        { name: 'slotContainer', src: slotContainer },

        //game bar
        { name: 'settings', src: settings },
        { name: 'bet', src: bet },
        { name: 'auto', src: auto },
        { name: 'turbo', src: turbo },
        { name: 'speaker', src: speaker },
        { name: 'mute', src: mute },
        { name: 'playCoil', src: playCoil },

         //game symbols
         { name: 'ten', src: ten },
         { name: 'nine', src: nine },
         { name: 'a', src: a },
         { name: 'k', src: k },
         { name: 'q', src: q },
         { name: 'j', src: j },
         { name: 'bear', src: bear },
        { name: 'wolf', src: wolf },
        { name: 'buffalo', src: buffalo },
        { name: 'eagle', src: eagle },
        { name: 'moose', src: moose },


    ];

    const payTable = {
        "symbols": {
            "buffalo": {
                "3": 40,
                "4": 100,
                "5": 200,
                "6": 300
            },
            "eagle": {
                "3": 20,
                "4": 50,
                "5": 100,
                "6": 200
            },
            "bear": {
                "3": 20,
                "4": 50,
                "5": 100,
                "6": 200
            },
            "wolf": {
                "3": 10,
                "4": 30,
                "5": 80,
                "6": 150
            },
            "moose": {
                "3": 10,
                "4": 30,
                "5": 80,
                "6": 150
            },
            "A": {
                "3": 5,
                "4": 20,
                "5": 50,
                "6": 100
            },
            "K": {
                "3": 5,
                "4": 20,
                "5": 50,
                "6": 100
            },
            "Q": {
                "3": 5,
                "4": 10,
                "5": 30,
                "6": 80
            },
            "J": {
                "3": 5,
                "4": 10,
                "5": 30,
                "6": 80
            },
            "10": {
                "3": 5,
                "4": 10,
                "5": 20,
                "6": 50
            },
            "9": {
                "3": 5,
                "4": 10,
                "5": 20,
                "6": 50
            }
        },
        "special_symbols": {
            "wild": {
                "substitutes": "all except Scatter",
                "appears_on": "reels 2, 3, 4, 5, 6"
            },
            "scatter": {
                "triggers_free_spins": true,
                "free_spins_awarded": {
                    "3": 8,
                    "4": 15,
                    "5": 25,
                    "6": 100
                }
            }
        },
        "multipliers": {
            "wild_in_free_spins": [2, 3, 5],
            "wild_multiplier_stack": true
        }
    }


    // Use the preloader hook
    const { loadedAssets, isLoaded, progress } = usePreloader(assetUrls);

    return (
        <div className="p-2 flex items-center justify-center rounded-lg mt-2 ">
            <div className="md:w-[75%] h-[99vh] w-full rounded-lg p-2 bg-black"

            >
                {isLoaded ? (
                    currentView === 'boot' ? (
                        <ChargeBuffaloBoot assets={loadedAssets} onContinue={switchToGame} />
                    ) : (
                        <ChargeBuffaloGame assets={loadedAssets} />
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

export default ChargeBuffalo;

