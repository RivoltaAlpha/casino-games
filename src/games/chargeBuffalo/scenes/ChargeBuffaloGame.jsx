import React, { useState, useRef,useEffect } from 'react'

const BASE_SPINNING_DURATION = 2.7;
const COLUMN_SPINNING_DURATION = 0.3;

function randomDuration() {
    return Math.floor(Math.random() * 10) / 100;
}

function ChargeBuffaloGame({ assets }) {

    const icons = [
       assets.ten.src,
       assets.nine.src,
       assets.a.src,
       assets.k.src,
       assets.j.src,
       assets.q.src,
       assets.buffalo.src,
       assets.bear.src,
       assets.wolf.src,
       assets.eagle.src,
       assets.moose.src,


    ];

    //game state
    const [gameStarted, setGameStarted] = useState(false)
    const [balance, setBalance] = useState(200)
    const [win, setWin] = useState(0)

    //setting bet amount
    const [showBetPopup, setShowBetPopup] = useState(false)
    const [betAmount, setBetAmount] = useState(1)
    const bets = [1, 2, 3, 4, 5, 10, 20, 30, 50, 100, 200, 300, 600, 700, 800, 1000]
    const handleBetAmountClick = (amount) => {
        setBetAmount(amount)
        //console.log(`Selected bet amount: ${amount}`);
        setShowBetPopup(false);
    };
    const handleBetButtonClick = () => {
        setShowBetPopup(true);
    };

    //setting mines count
    const [showMinesPopup, setShowMinesPopup] = useState(false)
    const [minesCount, setMinesCount] = useState(3)
    const mines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    const handleMineCountClick = (amount) => {
        setMinesCount(amount)
        setShowMinesPopup(false);
    };
    const handleMinesButtonClick = () => {
        setShowMinesPopup(true);
    };


    //settings
    const handleSettingsButtonClick = () => {
        setShowSettingsPopup(true);
    };

    const muteAllAudio = () => {
        const audioElements = document.querySelectorAll('audio');
        audioElements.forEach(audioElement => {
            audioElement.pause();
            audioElement.volume = 0;
        });
        setShowSettingsPopup(false);
    };

    const enableAllAudio = () => {
        const audioElements = document.querySelectorAll('audio');
        audioElements.forEach(audioElement => {
            audioElement.volume = 1;
            audioElement.play().catch(err => console.log('Audio play interrupted: ', err));
        });
        setShowSettingsPopup(false);
    };
    const [showSettingsPopup, setShowSettingsPopup] = useState(false);
    const handleMuteButtonClick = () => {
        //mute page sound
        muteAllAudio()
        setShowSettingsPopup(false);
    };

    const handleSpeakerButtonClick = () => {
        //allow sound in page
        enableAllAudio()
        setShowSettingsPopup(false);
    };


    //slot and reels
    const [cols, setCols] = useState([]);
    const containerRef = useRef(null);

    function getRandomIcon() {
        return icons[Math.floor(Math.random() * icons.length)];
    }

    useEffect(() => {
        if (containerRef.current) {
            const initialCols = Array.from(containerRef.current.querySelectorAll('.col'));
            setCols(initialCols);
            setInitialItems(initialCols);
        }
    }, []);

    //set items
    const setInitialItems = (cols) => {
        let baseItemAmount = 8;
        cols.forEach((col, i) => {
            let amountOfItems = baseItemAmount + (1 * 3);
            let elms = '';
            let firstThreeElms = '';

            for (let x = 0; x < amountOfItems; x++) {
                let icon = getRandomIcon();
                let item = `<div class="icon" data-item="${icon}"><img src="${icon}" 
                    alt="${icon}"></div>`;
                elms += item;

                if (x < 3) firstThreeElms += item;
            }
            col.innerHTML = elms + firstThreeElms;
        });
    };

    // const spin = (e) => {
    //     let duration = BASE_SPINNING_DURATION + randomDuration();
    //     cols.forEach(col => {
    //         duration += COLUMN_SPINNING_DURATION + randomDuration();
    //         col.style.animationDuration = `${duration}s`;
    //     });

    //     e.target.disabled = true;
    //     containerRef.current.classList.add('spinning');

    //     setTimeout(() => setResult(), (BASE_SPINNING_DURATION * 1000) / 2);

    //     setTimeout(() => {
    //         containerRef.current.classList.remove('spinning');
    //         e.target.disabled = false;
    //     }, duration * 1000);
    // };

    // const setResult = () => {
    //     cols.forEach(col => {
    //         let results = [
    //             getRandomIcon(),
    //             getRandomIcon(),
    //             getRandomIcon(),
    //             getRandomIcon(),
    //         ];
    //         let icons = col.querySelectorAll('.icon img');
    //         for (let x = 0; x < 4; x++) {
    //             icons[x].src = `${results[x]}.webp`;
    //             icons[(icons.length - 4) + x].src = `${results[x]}.webp`;
    //         }
    //     });
    // };
    /*
    const spin = async (e) => {
        e.target.disabled = true;
      
        // Start continuous spinning (apply a CSS class that uses infinite animation)
        containerRef.current.classList.add('spinning');
      
        // try {
        //   // Start fetching your results (replace with your actual fetch logic)
        //   const response = await fetch('/api/slot-results');
        //   const results = await response.json();
      
        //   // Once results are fetched, stop the infinite animation
        //   containerRef.current.classList.remove('spinning');
      
        //   // Trigger the deceleration/final stop animation:
        //   // You can do this by setting a new CSS class or dynamically adjusting animation duration.
        //   stopAndAlignReels(results);
        // } catch (error) {
        //   console.error("Error fetching results:", error);
        //   // Handle errors (maybe stop spinning or show an error message)
        //   containerRef.current.classList.remove('spinning');
        // }
      
        e.target.disabled = false;
      };
      
     const stopAndAlignReels = () => {
        containerRef.current.classList.remove('spinning');
        // For each column, update the final visible icons to match the results.
        cols.forEach(col => {
          const icons = col.querySelectorAll('.icon img');
          for (let x = 0; x < 4; x++) {
            icons[x].src = `demo1.webp`;
            icons[(icons.length - 4) + x].src = `demo1.webp`;
          }
      
          // Option 1: If you want to use CSS animations to decelerate,
          // add a new class (e.g., 'decelerate') that has a defined duration and easing.
          containerRef.current.classList.add('decelerate');
      
          // Option 2: Alternatively, you can manipulate the inline styles,
          // such as setting a new animation duration dynamically.
          // col.style.animationDuration = '1.5s'; // for example
        });
      }; */

       // When the user clicks "Play", call fakeServerSpin and update the reels.
  const spin = async (e) => {
    e.target.disabled = true;
    containerRef.current.classList.add('spinning');
    //balance
    setBalance(balance-betAmount)
    try {
      const result = await fakeServerSpin(betAmount);
      // Update reels with the server result (the 6x4 grid)
      stopAndAlignReels(result.combinations);
      // Update the win amount displayed
      console.log(result,'res s')
      setWin(result.winAmount);
      setBalance(balance+result.winAmount)
      // Optionally, you can also use result.winningCombination for further UI details.
    } catch (error) {
      console.error("Error fetching spin result:", error);
    } finally {
      containerRef.current.classList.remove('spinning');
      e.target.disabled = false;
    }
  };

      const stopAndAlignReels = (combinations) => {
        containerRef.current.classList.remove('spinning');
        cols.forEach((col, index) => {
          const iconsElements = col.querySelectorAll('.icon img');
          const reelSymbols = combinations[index]; // Array of 4 symbols for this reel
          for (let x = 0; x < 4; x++) {
            // Update the visible icons (and the duplicate items at the bottom for looping)
            iconsElements[x].src = symbolMapping[reelSymbols[x]];
            iconsElements[iconsElements.length - 4 + x].src = symbolMapping[reelSymbols[x]];
          }
          containerRef.current.classList.add('decelerate');
        });
      };

      //server

      // --- Helper for initial random icon (used for initial reel setup) ---
  function getRandomIcon() {
    // Use the assets in your icons array.
    const icons = [
      assets.ten.src,
      assets.nine.src,
      assets.a.src,
      assets.k.src,
      assets.j.src,
      assets.q.src,
      assets.buffalo.src,
      assets.bear.src,
      assets.wolf.src,
      assets.eagle.src,
      assets.moose.src,
    ];
    return icons[Math.floor(Math.random() * icons.length)];
  }

      // Map symbol keys to asset image URLs.
  const symbolMapping = {
    buffalo: assets.buffalo.src,
    eagle: assets.eagle.src,
    bear: assets.bear.src,
    wolf: assets.wolf.src,
    moose: assets.moose.src,
    A: assets.a.src,
    K: assets.k.src,
    Q: assets.q.src,
    J: assets.j.src,
    "10": assets.ten.src,
    "9": assets.nine.src,
  };

   // Define the paytable as on the server.
   const paytable = {
    symbols: {
      buffalo: { 6: 7.5, 5: 5, 4: 3, 3: 2, 2: 1 },
      eagle: { 6: 5, 5: 3, 4: 2.25, 3: 1.5, 2: 0.5 },
      bear: { 6: 5, 5: 3, 4: 2.25, 3: 1.5, 2: 0.5 },
      wolf: { 6: 3.75, 5: 2.25, 4: 1.5, 3: 1, 2: 0.25 },
      moose: { 6: 3.75, 5: 2.25, 4: 1.5, 3: 1, 2: 0.25 },
      A: { 6: 2, 5: 1.5, 4: 1, 3: 0.5 },
      K: { 6: 2, 5: 1.5, 4: 1, 3: 0.5 },
      Q: { 6: 1.5, 5: 1, 4: 0.75, 3: 0.25 },
      J: { 6: 1.5, 5: 1, 4: 0.75, 3: 0.25 },
      "10": { 6: 1, 5: 0.75, 4: 0.5, 3: 0.25 },
      "9": { 6: 1, 5: 0.75, 4: 0.5, 3: 0.25 },
    },
    specialSymbols: {
      wild: { substitutes: "all except Scatter", appearsOn: [2, 3, 4, 5, 6] },
      scatter: { triggersFreeSpins: true, freeSpinsAwarded: { 6: 100, 5: 25, 4: 15, 3: 8 } },
    },
    multipliers: {
      wildInFreeSpins: [2, 3, 5],
      wildMultiplierStack: true,
    },
  };

  // Get the pool of symbol keys.
  const symbolsPool = Object.keys(paytable.symbols);

  // Return a random symbol key.
  function getRandomSymbol() {
    const idx = Math.floor(Math.random() * symbolsPool.length);
    return symbolsPool[idx];
  }

  // Generate a winning outcome.
  function generateWinningOutcome(betAmount) {
    console.log('generating win')
    const winningSymbol = getRandomSymbol();
    const availableCounts = Object.keys(paytable.symbols[winningSymbol])
      .map(Number)
      .filter((n) => n >= 3);
    const matchCount = availableCounts[Math.floor(Math.random() * availableCounts.length)];
    const multiplier = paytable.symbols[winningSymbol][matchCount];
    const winAmount = betAmount * multiplier;

    // Generate grid: 6 reels with 4 symbols each.
    const reels = [];
    for (let i = 0; i < 6; i++) {
      const reelSymbols = [];
      for (let j = 0; j < 4; j++) {
        reelSymbols.push(getRandomSymbol());
      }
      reels.push(reelSymbols);
    }
    // Force the winning symbol on the top row (index 0) for the first `matchCount` reels.
    for (let i = 0; i < matchCount; i++) {
      reels[i][0] = winningSymbol;
    }

    return {
      combinations: reels,
      winAmount,
      winningCombination: { symbol: winningSymbol, matchCount, multiplier },
    };
  }



  // Generate a losing outcome.
//   function generateLosingOutcome() {
//     console.log('generating win')
//     const reels = [];
//     for (let i = 0; i < 6; i++) {
//       const reelSymbols = [];
//       for (let j = 0; j < 4; j++) {
//         reelSymbols.push(getRandomSymbol());
//       }
//       reels.push(reelSymbols);
//     }
//     // For the top row, ensure that adjacent reels do not have the same symbol.
//     for (let i = 0; i < 6; i++) {
//       let symbol;
//       do {
//         symbol = getRandomSymbol();
//       } while (i > 0 && symbol === reels[i - 1][0]);
//       reels[i][0] = symbol;
//     }
//     return {
//       combinations: reels,
//       winAmount: 0,
//     };
//   }

// Helper: calculates win amount based on the top row payline.
function calculateOutcome(reels, betAmount, paytable) {
    const payline = reels.map(reel => reel[0]);
    const symbol = payline[0];
    let count = 1;
    for (let i = 1; i < payline.length; i++) {
      if (payline[i] === symbol) {
        count++;
      } else {
        break;
      }
    }
    const symbolPayout = paytable.symbols[symbol];
    if (symbolPayout && symbolPayout[count]) {
      return betAmount * symbolPayout[count];
    }
    return 0;
  }
  
  // Modified generateLosingOutcome that calculates win amount.
  function generateLosingOutcome(betAmount) {
    console.log('Generating outcome (not forced win)');
    const reels = [];
    for (let i = 0; i < 6; i++) {
      const reelSymbols = [];
      for (let j = 0; j < 4; j++) {
        reelSymbols.push(getRandomSymbol());
      }
      reels.push(reelSymbols);
    }
    
    // Optionally: remove or modify the following block if you want accidental wins.
    // For example, to force a truly losing top row:
    // for (let i = 0; i < 6; i++) {
    //   let symbol;
    //   do {
    //     symbol = getRandomSymbol();
    //   } while (i > 0 && symbol === reels[i - 1][0]);
    //   reels[i][0] = symbol;
    // }
    
    const winAmount = calculateOutcome(reels, betAmount, paytable);
    
    return {
      combinations: reels,
      winAmount,
    };
  }
  





  // Fake server response: returns a winning outcome with 20% chance.
  function fakeServerSpin(betAmount) {
    //console.log('fake server')
    return new Promise((resolve) => {
      setTimeout(() => {
        const isWin = Math.random() < 0.25;
        const outcome = isWin ? generateWinningOutcome(betAmount) : generateLosingOutcome();
        resolve(outcome);
      }, 3500); // Simulated network delay
    });
  }
      


    return (
        <div className='w-full h-full flex relative rounded-lg flex-col gap-3 
         px-6 items-center justify-center '
            style={{
                backgroundImage: `url(${assets.background.src})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}

        >
            {/*wide screen ie  laptop */}
            <div className=' flex w-full h-full flex-col items-center justify-center'>
                <div className='relative flex items-center justify-center md:w-[88%] md:h-[450px]'
                    style={{
                        backgroundImage: `url(${assets.slotContainer.src})`,
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute top-0 left-0 w-full h-[30px] flex items-center 
                    justify-center ">
                        <div className='h-5 w-[150px]'
                            style={{
                                backgroundImage: `url(${assets.chargeBuffalo.src})`,
                                backgroundSize: '100% 100%',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center'
                            }}
                        >
                        </div>

                    </div>

                    <div className='w-[83%] md:h-[380px] buffalo mb-2 ml-1 flex items-center justify-center p-1'>
                        <div className=' opacity-75 w-full h-full relative'>
                            <div id="container" ref={containerRef} className='absolute w-full h-full
                                grid grid-cols-6 bg-red-400'>
                                <div className=' relative flex justify-center outer-col overflow-y-hidden'>
                                    <div className='absolute col'>
                                    </div>
                                </div>
                                <div className='relative flex justify-center  outer-col overflow-y-hidden'>
                                    <div className='absolute col'>

                                    </div>
                                </div>
                                <div className='relative flex justify-center  outer-col overflow-y-hidden'>
                                    <div className='absolute col'>
                                    </div>
                                </div>
                                <div className='relative flex justify-center  outer-col overflow-y-hidden'>
                                    <div className='absolute col'>
                                    </div>
                                </div>
                                <div className='relative flex justify-center  outer-col  overflow-y-hidden'>
                                    <div className='absolute col'>

                                    </div>
                                </div>
                                <div className='relative flex justify-center  outer-col overflow-y-hidden'>
                                    <div className='absolute col'>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>


                </div>

                {/* game bar */}
                <div className='absolute bottom-1 h-[17%] md:w-[85%] flex items-center justify-center'>
                    <div className='w-full  z-40 flex items-center justify-center 
                px-4 mt-2'>
                        <div className='w-full h-full flex flex-row justify-between'>
                            <div className='flex items-center justify-center'>
                                {showSettingsPopup && (
                                    <div className="absolute bg-gray-600 rounded-lg shadow-lg 
                                                flex flex-col gap-1 bottom-20 p-2 z-50">
                                        <div>
                                            <button
                                                onClick={handleMuteButtonClick}
                                                className='px-2 '>
                                                <img src={assets.mute.src} alt="Slot Bg" className="cursor-pointer w-10 h-10" />
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                onClick={handleSpeakerButtonClick}
                                                className='px-2'>
                                                <img src={assets.speaker.src} alt="Slot Bg" className="cursor-pointer w-10 h-10" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <button
                                    onClick={handleSettingsButtonClick}
                                    className='flex items-center justify-center p-1 rounded-full
                                             bg-gray-800 shadow-lg hover:shadow-xl transform hover:translate-y-1 
                                             transition duration-300'>
                                    <img src={assets.settings.src} alt="Slot Bg" className="cursor-pointer h-10
                                                 w-10" />
                                </button>
                            </div>

                            <div className='flex items-center justify-center flex-col '>
                                <p className='text-2xl text-yellow-300 font-bold'>
                                    Balance
                                </p>
                                <p className='text-2xl text-white font-bold'>
                                    {balance ? <div>
                                        {balance}
                                    </div> : 0}
                                </p>

                            </div>

                            <div className='flex flex-col items-center justify-center'>
                                {showBetPopup && (
                                    <div className="absolute bg-gray-600 rounded-lg shadow-lg 
                                                grid grid-cols-4 bottom-20 z-50">
                                        {bets.map(amount => (
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
                                    className='flex items-center justify-center p-1 rounded-full
                                             bg-gray-800 shadow-lg hover:shadow-xl transform hover:translate-y-1 
                                             transition duration-300'>
                                    <img src={assets.bet.src} alt="Slot Bg" className="cursor-pointer h-10
                                                 w-10" />
                                </button>
                                <p className='text-white'>Bet $ {betAmount}</p>
                            </div>
                            <div className='flex items-center justify-center flex-col '>
                                <p className='text-2xl text-yellow-300 font-bold'>
                                    WIN
                                </p>
                                <p className='text-2xl text-white font-bold'>
                                    {win ? <div>
                                        {win}
                                    </div> : 0}
                                </p>

                            </div>

                            <div className='flex items-center justify-center flex-row '>
                                <div className='grid grid-cols-2'>
                                    <div>
                                        <button className='flex items-center justify-center p-1 rounded-full
                                             bg-gray-800 shadow-lg hover:shadow-xl transform hover:translate-y-1 
                                             transition duration-300'>
                                            <img src={assets.turbo.src} alt="Slot Bg" className="cursor-pointer h-10
                                                 w-10" />
                                        </button>
                                    </div>
                                    <div>
                                        <button className='flex items-center justify-center p-1 rounded-full
                                             bg-gray-800 shadow-lg hover:shadow-xl transform hover:translate-y-1 
                                             transition duration-300'>
                                            <img src={assets.auto.src} alt="Slot Bg" className="cursor-pointer h-10
                                                 w-12" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='ml-4 flex items-center justify-center'>
                                <button onClick={spin} className='flex relative items-center justify-center p-1 rounded-full
                                             bg-gray-800 shadow-lg hover:shadow-xl transform hover:translate-y-1 
                                             transition duration-300'
                                // style={{
                                //     backgroundImage: `url(${playBg})`,
                                //     backgroundSize: '100% 100%',
                                //     backgroundRepeat: 'no-repeat',
                                //     backgroundPosition: 'center',
                                //     overflow: 'hidden'
                                // }}
                                >
                                    <img src={assets.playCoil.src} alt="Slot Bg" className="cursor-pointer h-16
                                                 w-16" />
                                    <p className='absolute text-yellow-400 font-semibold'>Play</p>
                                </button>
                            </div>

                            {/* <div className='flex items-center justify-center'>
                                            <button className='flex items-center justify-center p-1 rounded-full
                                             bg-gray-800 shadow-lg hover:shadow-xl transform hover:translate-y-1 
                                             transition duration-300'>
                                                <img src={bar1} alt="Slot Bg" className="cursor-pointer h-10
                                                 w-10" />
                                            </button>
                                        </div> */}
                            {/* <button  onClick={stopAndAlignReels}
                            className='p-2 bg-red-400 text-white rounded-lg'>
                                Stop
                            </button> */}


                        </div>
                        <div></div>
                    </div>
                </div>



            </div>

        </div>
    )
}

export default ChargeBuffaloGame;

