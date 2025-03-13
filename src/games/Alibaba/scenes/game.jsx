import React, { useState, useEffect, useRef } from 'react';
import Bg from '../../../assets/Alibaba/images/gameBg.jpg';
import SlotContainer from '../../../assets/Alibaba/images/slotContainer.webp';
import slotOpen from '../../../assets/Alibaba/audio/slotOpen.mp3';

// game bar assets
import settings from '../../../assets/common/images/settings.webp';
import bet from '../../../assets/common/images/bet.webp';
import auto from '../../../assets/common/images/auto.png';
import turbo from '../../../assets/common/images/turbo.webp';
import speaker from '../../../assets/common/images/speaker.webp';
import mute from '../../../assets/common/images/mute.webp';
import playCoil from '../../../assets/common/images/buttonCoil.webp';

//audio
import spinningSound from '../../../assets/Alibaba/audio/spinning.mp3';

const BASE_SPINNING_DURATION = 2.7;
const COLUMN_SPINNING_DURATION = 0.3;

function randomDuration() {
  return Math.floor(Math.random() * 10) / 100;
}

function AlibabaGame() {
  //music
  
  


  // The symbols used in the game
  const icons = ['emerald', 'k', 'q', 'sultan', 'pot', 'wild', 'morgiana', 'sword'];

  // A simple paytable for the eight symbols.
  // For each symbol, if the leftmost reels match consecutively,
  // the win multiplier is applied to the bet.
  const paytable = {
    emerald:   { "3": 1.0, "4": 2.0, "5": 3.0, "6": 4.0 },
    k:         { "3": 0.8, "4": 1.6, "5": 2.4, "6": 3.2 },
    q:         { "3": 0.6, "4": 1.2, "5": 1.8, "6": 2.4 },
    sultan:    { "3": 1.2, "4": 2.4, "5": 3.6, "6": 4.8 },
    pot:       { "3": 0.5, "4": 1.0, "5": 1.5, "6": 2.0 },
    wild:      { "3": 2.0, "4": 4.0, "5": 6.0, "6": 8.0 },
    morgiana:  { "3": 1.5, "4": 3.0, "5": 4.5, "6": 6.0 },
    sword:     { "3": 0.7, "4": 1.4, "5": 2.1, "6": 2.8 }
  };

  // State variables
  const [isAnimating, setIsAnimating] = useState(false);
  const [slotLoaded, setSlotLoaded] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const audio = new Audio(slotOpen);
  const [balance,setBalanace]=useState(200);

  // Buttons and popups
  const [showBetPopup, setShowBetPopup] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [betAmount, setBetAmount] = useState(1);
  const bets = [1, 2, 3, 4, 5, 8, 10, 20, 50, 100, 200, 300, 400, 500, 700, 1000];

  // Refs for the two containers (vertical & horizontal reels)
  const containerRef = useRef(null); // Vertical spinning container
  const containerOneRef = useRef(null); // Horizontal spinning container

  // Returns a random icon name
  function getRandomIcon() {
    return icons[Math.floor(Math.random() * icons.length)];
  }

  // Populate each reel column with a series of random symbols.
  // We add extra items at the end to allow smooth looping.
  const setInitialItems = (cols) => {
    const baseItemAmount = 8;
    cols.forEach((col) => {
      const amountOfItems = baseItemAmount + 3;
      let elms = '';
      let firstThreeElms = '';
      for (let x = 0; x < amountOfItems; x++) {
        const icon = getRandomIcon();
        const item = `<div class="icon flex-none" data-item="${icon}">
                        <img src="${icon}.webp" alt="${icon}" />
                      </div>`;
        elms += item;
        if (x < 3) firstThreeElms += item;
      }
      // Append the first three items again for smooth looping
      col.innerHTML = elms + firstThreeElms;
    });
  };

  // Initialize both containers’ columns when the component mounts
  useEffect(() => {
    if (containerRef.current) {
      const verticalCols = Array.from(containerRef.current.querySelectorAll('.col'));
      setInitialItems(verticalCols);
    }
    if (containerOneRef.current) {
      const horizontalCols = Array.from(containerOneRef.current.querySelectorAll('.col'));
      setInitialItems(horizontalCols);
    }
  }, []);

  // Button Handlers (bet, settings, mute/speaker, etc.)
  const handleBetButtonClick = () => {
    setShowBetPopup(true);
  };

  const handleBetAmountClick = (amount) => {
    setBetAmount(amount);
    console.log(`Selected bet amount: ${amount}`);
    setShowBetPopup(false);
  };

  const handleSettingsButtonClick = () => {
    setShowSettingsPopup(true);
  };

  const muteAllAudio = () => {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach((audioElement) => {
      audioElement.pause();
      audioElement.volume = 0;
    });
    setShowSettingsPopup(false);
  };

  const enableAllAudio = () => {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach((audioElement) => {
      audioElement.volume = 1;
      audioElement.play().catch(err => console.log('Audio play interrupted: ', err));
    });
    setShowSettingsPopup(false);
  };

  const handleMuteButtonClick = () => {
    muteAllAudio();
  };

  const handleSpeakerButtonClick = () => {
    enableAllAudio();
  };

  // This function simulates a server response.
  // It generates a random combination (one symbol per reel) and calculates the win amount.
  const fakeServerResponse = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a combination for 6 reels:
        const combination = [];
        for (let i = 0; i < 6; i++) {
          const randomSymbol = icons[Math.floor(Math.random() * icons.length)];
          combination.push(randomSymbol);
        }

        // Calculate win amount by checking consecutive matching symbols starting from reel 0.
        let consecutive = 1;
        for (let i = 1; i < combination.length; i++) {
          if (combination[i] === combination[0]) {
            consecutive++;
          } else {
            break;
          }
        }
        let winMultiplier = 0;
        if (consecutive >= 3 && paytable[combination[0]] && paytable[combination[0]][consecutive]) {
          winMultiplier = paytable[combination[0]][consecutive];
        }
        const winAmountCalculated = betAmount * winMultiplier;

        resolve({ combination, winAmount: winAmountCalculated });
      }, 2500);
    });
  };

  // Spin handler: starts the spinning animations and calls the fake server.
  const spin = async (e) => {
    e.target.disabled = true;
    //setBalanace(balance-betAmount)

    // play spinning audio sound
    const spinningAudio = new Audio(spinningSound);
    spinningAudio.play().catch(err => console.log('Audio play interrupted: ', err));

    // Start vertical and horizontal spinning animations
    containerRef.current.classList.add('spinning');
    containerOneRef.current.classList.add('spinning-horizontal');

    // (Simulate fetching results from the server)
    const response = await fakeServerResponse();
    console.log(response,'ress')

    // When results arrive, align the reels to show the returned combination and update win amount.
    stopAndAlignReels(response.combination);
    setWinAmount(response.winAmount);
    console.log(balance,response.winAmount,'uuu')
    setBalanace(balance -betAmount + response.winAmount)
    e.target.disabled = false;
  };

  // Stop and align the reels using the combination from the fake server.
  // Instead of replacing the entire column in the vertical container,
  // we update only the payline icon (here assumed to be the center icon).
  const stopAndAlignReels = (combination) => {
    // Remove spinning classes to stop animations
    containerRef.current.classList.remove('spinning');
    containerOneRef.current.classList.remove('spinning-horizontal');

    // For vertical container: update only the payline icon in each reel.
    const verticalCols = Array.from(containerRef.current.querySelectorAll('.outer-col'));
    verticalCols.forEach((outerCol, index) => {
      const col = outerCol.querySelector('.col');
      if (!col) return;
      const iconElements = col.querySelectorAll('.icon');
      // Assume the payline is the center icon of the visible area.
      // (Adjust the index as needed based on your reel design.)
      const paylineIndex = Math.floor(iconElements.length / 2);
      if (iconElements[paylineIndex]) {
        const symbol = combination[index] || getRandomIcon();
        // Only update the payline symbol while leaving the rest of the reel intact.
        iconElements[paylineIndex].innerHTML = `<img src="${symbol}.webp" alt="${symbol}" />`;
        iconElements[paylineIndex].setAttribute('data-item', symbol);
      }
    });

    // For horizontal container: update its inner column to display the combination horizontally.
    const horizontalCol = containerOneRef.current.querySelector('.col');
    if (horizontalCol) {
      let newHtml = '';
      combination.forEach((symbol) => {
        newHtml += `<div class="icon flex-none mx-1" data-item="${symbol}">
                      <img src="${symbol}.webp" alt="${symbol}" />
                    </div>`;
      });
      horizontalCol.innerHTML = newHtml;
    }
  };

  return (
    <div
      className="w-full h-full flex relative rounded-lg flex-col gap-3 py-2 px-6 items-center justify-center"
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        overflow: 'hidden'
      }}
    >
      <div
        className={`w-[94%] flex items-center gap-2 flex-col h-[86%] absolute slot-container ${
          isAnimating ? 'animate-slide-up' : ''
        }`}
        style={{
          backgroundImage: `url(${SlotContainer})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        {/* Horizontal Reel Container */}
        <div className="p-2 flex items-center overflow-hidden justify-center mt-1 h-[13%] w-[49%]">
          <div
            id="container-one"
            ref={containerOneRef}
            className="relative w-full h-full flex items-center justify-center"
          >
            <div className="absolute col gap-3 upper flex flex-row shrink-0 mr-3">
              {/* Horizontal reel content will be initialized here */}
            </div>
          </div>
        </div>

        {/* Vertical Reel Container */}
        <div className="px-2 flex items-center justify-center h-[67%] w-[74%]">
          <div id="container" ref={containerRef} className="w-full h-full grid grid-cols-6">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="relative outer-col overflow-y-hidden">
                  <div className="absolute col">
                    {/* Vertical reel content will be initialized here */}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Game Controls */}
        <div className="w-full h-[20%] z-40 flex items-center justify-center px-4 mt-2">
          <div className="w-full h-full grid grid-cols-7">
            <div className="flex items-center justify-center">
              {showSettingsPopup && (
                <div className="absolute bg-gray-600 rounded-lg shadow-lg flex flex-col gap-1 bottom-20 p-2 z-50">
                  <button onClick={handleMuteButtonClick} className="px-2">
                    <img src={mute} alt="Mute" className="cursor-pointer w-10 h-10" />
                  </button>
                  <button onClick={handleSpeakerButtonClick} className="px-2">
                    <img src={speaker} alt="Speaker" className="cursor-pointer w-10 h-10" />
                  </button>
                </div>
              )}
              <button
                onClick={handleSettingsButtonClick}
                className="flex items-center justify-center p-1 rounded-full bg-gray-800 shadow-lg hover:shadow-xl transform hover:translate-y-1 transition duration-300"
              >
                <img src={settings} alt="Settings" className="cursor-pointer h-10 w-10" />
              </button>
            </div>

            <div className="flex items-center justify-center flex-col">
              <p className="text-2xl text-yellow-300 font-bold">Balance</p>
              <p className="text-2xl text-white font-bold">{balance}</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              {showBetPopup && (
                <div className="absolute bg-gray-600 rounded-lg shadow-lg grid grid-cols-4 bottom-20 z-50">
                  {bets.map((amount) => (
                    <button
                      key={amount}
                      className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                      onClick={() => handleBetAmountClick(amount)}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
              )}
              <button
                onClick={handleBetButtonClick}
                className="flex items-center justify-center p-1 rounded-full bg-gray-800 shadow-lg hover:shadow-xl transform hover:translate-y-1 transition duration-300"
              >
                <img src={bet} alt="Bet" className="cursor-pointer h-10 w-10" />
              </button>
              <p className="text-white">Bet $ {betAmount}</p>
            </div>

            <div className="flex items-center justify-center flex-col">
              <p className="text-2xl text-yellow-300 font-bold">WIN</p>
              <p className="text-2xl text-white font-bold">{winAmount}</p>
            </div>

            <div className="flex items-center justify-center flex-row">
              <div className="grid grid-cols-2">
                <button className="flex items-center justify-center p-1 rounded-full bg-gray-800 shadow-lg hover:shadow-xl transform hover:translate-y-1 transition duration-300">
                  <img src={turbo} alt="Turbo" className="cursor-pointer h-10 w-10" />
                </button>
                <button className="flex items-center justify-center p-1 rounded-full bg-gray-800 shadow-lg hover:shadow-xl transform hover:translate-y-1 transition duration-300">
                  <img src={auto} alt="Auto" className="cursor-pointer h-10 w-12" />
                </button>
              </div>
            </div>

            <div className="ml-4 flex items-center justify-center">
              <button
                onClick={spin}
                className="flex relative items-center justify-center p-1 rounded-full bg-gray-800 shadow-lg hover:shadow-xl transform hover:translate-y-1 transition duration-300"
              >
                <img src={playCoil} alt="Play" className="cursor-pointer h-16 w-16" />
                <p className="absolute text-yellow-400 font-semibold">Play</p>
              </button>
            </div>

            {/* <button onClick={stopAndAlignReels} className="p-2 bg-red-400 text-white rounded-lg">
              Stop
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlibabaGame;
