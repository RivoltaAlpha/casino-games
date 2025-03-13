import React, { useState, useRef } from 'react'
import { BiCaretDown, BiCaretLeft, BiCaretRight, BiPlay } from 'react-icons/bi'
import { BsInbox, BsPlayBtn } from 'react-icons/bs'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { FaInbox } from 'react-icons/fa6'
import { MdClose } from 'react-icons/md'

function MinesGame({ assets }) {
    //history widget
    const [showHistory, setShowHistory] = useState(false)
    const toggleShowHistory = () => {
        setShowHistory(!showHistory);
    }
    //win and balance
    const [win ,setWin]=useState(null)
    const [balance ,setBalance]=useState(200) 

    const [gameStarted, setGameStarted] = useState(false)
    const [gameEnded,setGameEnded]=useState(false)

    const odds = [1.1, 1.21, 1.31, 1.45, 1.51, 1.61, 1.71, 1.81, 1.91]
    const scrollRef = useRef(null);
    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 200; // Adjust as needed
            current.scrollBy({ left: direction === "next" ? scrollAmount : -scrollAmount, behavior: "smooth" });
        }
    };


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

    const [revealed, setRevealed] = useState(Array(25).fill(null));
    // Default cell backgrounds before game starts
    const getInitialCellBackground = (index) => {
        if ([0, 4, 20, 24].includes(index)) return assets.mine.src; // Corners → Mines
        if (index === 12) return assets.gold.src; // Center → Gold
        return assets.star.src; // Others → Stars
    };


    // Get current cell background based on game state
    const getCellBackground = (index) => {
        if (!gameStarted) {
            return getInitialCellBackground(index); // Default grid before game starts
        }
        return revealed[index] ? revealed[index] : assets.blueChest.src; // Covered until revealed
    };

    // Handle cell click: Send index to server and update response
    const handleCellClick = async (index) => {
        if (!gameStarted || revealed[index]) return;

        console.log("Sending index to server:", index);

        try {
            // Simulating a server response
            const number_of_plays=playNum+1
            setPlayNum(number_of_plays)
            const response = await fakeServerResponse(index,number_of_plays);
            console.log(response,'res')

            //map to imgs
            const images = [assets.mine.src, assets.star.src];

             // Compute the updated board locally.
    let newRevealed = [...revealed];
    newRevealed[index] = images[response.outcome];
            //console.log(response.outcome)
            if (response.outcome === 1) {
                setRevealed(newRevealed);
                setWin((prev) => prev + response.win);
            } // If a mine is hit, reveal the remaining cells.
            else if (response.outcome === 0) {
                setWin(0);
                const finalBoard = revealRemainingCells(newRevealed);
                setRevealed(finalBoard);
                setGameEnded(true);
                //setGameStarted(false);
            }

        } catch (error) {
            console.error("Server error:", error);
        }
    };

    // Simulated server response (Replace this with actual API call)
    const [playNum,setPlayNum]=useState(0)
    const fakeServerResponse = async (index, number_of_plays) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                //0 is mine and 1 is star
                const numOutcome=[0,1]
                const randomOutcome = numOutcome[Math.floor(Math.random() *numOutcome.length)];
    
                let winAmount = 0; // Default win amount is zero
    
                if (randomOutcome === 1) {
                    let multiplier;
                    if (minesCount >= 1 && minesCount <= 6) {
                        multiplier = multiplierTable1[number_of_plays - 1][minesCount - 1];
                    } else if (minesCount >= 7 && minesCount <= 12) {
                        multiplier = multiplierTable2[number_of_plays - 1][minesCount - 7];
                    } else if (minesCount >= 13 && minesCount <= 18) {
                        multiplier= multiplierTable3[number_of_plays - 1][minesCount - 13];
                    } else if (minesCount >= 19 && minesCount <= 24) {
                        multiplier = multiplierTable4[number_of_plays - 1][minesCount - 19];
                    }
    
                    winAmount = betAmount * multiplier; // Calculate win only if it's a star
                }
            
    
                resolve({ outcome: randomOutcome, win: winAmount});
            }, 500); // Simulating network delay
        });
    };
    

    const cashOut=async()=>{ 
        setBalance(()=>{
            const newBalance=win+balance
            return newBalance
        })

        let currentRevealed = [...revealed];

        const finalBoard = revealRemainingCells(currentRevealed);
        setRevealed(finalBoard);

        setGameEnded(true);
        //setGameStarted(false);
    }

   
    // Helper: Shuffle an array in place (Fisher-Yates algorithm)
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  // Function to reveal all remaining cells after a mine is hit.
  // It receives the updated board (which already includes the clicked mine) and then
  // fills the rest with the appropriate number of mines and stars.
  const revealRemainingCells = (currentRevealed) => {
    // Copy the board that was passed in
    const updatedRevealed = [...currentRevealed];
    console.log(updatedRevealed, 'before manipulation');
  
    // Count the number of mines already revealed.
    const currentRevealedMines = updatedRevealed.filter(
      (cell) => cell === assets.mine.src
    ).length;
  
    // Calculate how many more mines need to be placed.
    const minesToAdd = minesCount - currentRevealedMines;
  
    // Get the indices of cells that are still unrevealed.
    const unrevealedIndices = updatedRevealed.reduce((acc, cell, idx) => {
      if (cell === null) {
        acc.push(idx);
      }
      return acc;
    }, []);
  
    if (unrevealedIndices.length) {
      // Shuffle the unrevealed indices.
      const shuffledIndices = shuffleArray([...unrevealedIndices]);
      // Select the first `minesToAdd` indices to become mines.
      const selectedMineIndices = shuffledIndices.slice(0, minesToAdd);
  
      // For every unrevealed cell, assign either a mine or a star.
      unrevealedIndices.forEach((index) => {
        if (selectedMineIndices.includes(index)) {
          updatedRevealed[index] = assets.mine.src;
        } else {
          updatedRevealed[index] = assets.star.src;
        }
      });
    }
  
    console.log(updatedRevealed, 'after revealRemainingCells');
    return updatedRevealed;
  };
  

    const multiplierTable1 = [
        [1.03, 1.03, 1.07, 1.13, 1.18, 1.25],  // 1 diamond found
        [1.04, 1.12, 1.23, 1.35, 1.50, 1.66],  // 2 diamonds
        [1.05, 1.23, 1.41, 1.64, 1.91, 2.25],  // 3 diamonds
        [1.05, 1.35, 1.64, 2.00, 2.48, 3.10],  // 4 diamonds
        [1.06, 1.50, 1.91, 2.48, 3.25, 4.34],  // 5 diamonds
        [1.07, 1.66, 2.25, 3.10, 4.34, 6.20]   // 6 diamonds
      ];
      
      // Table for mines 7 to 12
      const multiplierTable2 = [
        [1.31, 1.39, 1.48, 1.58, 1.69, 1.82],
        [1.86, 2.09, 2.37, 2.71, 3.13, 3.65],
        [2.67, 3.21, 3.90, 4.80, 6.00, 7.63],
        [3.92, 5.04, 6.60, 8.80, 12.00, 16.80],
        [5.89, 8.15, 11.50, 16.80, 25.21, 39.21],
        [9.06, 13.59, 21.00, 33.61, 56.02, 98.04]
      ];
      
      // Table for mines 13 to 18
      const multiplierTable3 = [
        [1.97, 2.15, 2.51, 2.63, 2.96, 3.39],
        [4.31, 5.18, 6.33, 7.91, 10.17, 13.57],
        [9.93, 13.24, 18.20, 26.01, 39.01, 62.42],
        [24.27, 36.41, 57.22, 95.37, 171.67, 343.35],
        [63.72, 109.25, 200.29, 458.00, 901.31, 2400.00],
        [182.08, 364.16, 801.16, 2000.00, 6010.00, 24030.00]
      ];
      
      // Table for mines 19 to 24
      const multiplierTable4 = [
        [3.95, 4.75, 5.93, 7.91, 11.87, 23.75],
        [19.00, 28.50, 47.50, 95.00, 285.00, null],
        [109.25, 218.50, 546.25, 2190.00, null, null],
        [801.16, 2400.00, 12020.00, null, null, null],
        [8410.00, 50470.00, null, null, null, null],
        [168000.00, null, null, null, null, null]
      ];
      


    return (
        <div className='w-full h-full flex relative rounded-lg flex-col gap-3 
         px-6 items-center justify-center overflow-hidden' >
            <div className='flex flex-col gap-2 md:w-[60%] w-[97%] h-full '>
                <div className='relative flex items-center text-white justify-center w-full'>
                    <div className='flex  items-center  w-full
                    text-sm flex-row justify-between bg-[#2a4c97] py-1 px-4 rounded-b-lg z-20'>
                        <p>Mines</p>
                        <p>1.23</p>
                        <p>3.45</p>

                        <button className='p-0' onClick={toggleShowHistory}>
                            <BiCaretDown className='h-4 w-6 p-0' />
                        </button>


                    </div>
                    <div className={`absolute top-0 z-30 p-2 w-full  transition-transform duration-300
                       flex justify-center ${showHistory ? 'translate-y-0' : '-translate-y-full'}`}>
                        <div className='flex flex-col bg-[#2a4c97] opacity-75 p-2 w-[80%]'>
                            <div className='flex justify-between'>
                                <p>History</p>
                                <MdClose onClick={toggleShowHistory} className='' />
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>


                <div className='flex justify-center'>
                    <div className=' h-3 w-[90px]'
                        style={{
                            backgroundImage: `url(${assets.mines.src})`,
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                        }}
                    >

                    </div>
                </div>


                <div className='flex flex-row text-white justify-center  w-full'>
                    <div className='flex flex-row  w-full justify-between'>
                        <div className='flex flex-col items-center px-2 py-1 rounded-lg bg-[#2a4c97]'>
                            <div className=' h-5 w-7'
                                style={{
                                    backgroundImage: `url(${assets.star.src})`,
                                    backgroundSize: '100% 100%',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center'
                                }}
                            >

                            </div>
                            <p className='text-xs font-semibold'>{25-minesCount}</p>
                        </div>

                        <div className='flex flex-col items-center px-2 py-1 rounded-lg bg-[#2a4c97]'>
                            <div className=' h-5 w-7'
                                style={{
                                    backgroundImage: `url(${assets.mine.src})`,
                                    backgroundSize: '100% 100%',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center'
                                }}
                            >

                            </div>
                            <p className='text-xs font-semibold'>{minesCount}</p>
                        </div>

                    </div>
                </div>


                <div className="flex flex-row items-center gap-2 w-full">
                    {/* Back Button */}

                    <BiCaretLeft onClick={() => scroll("back")} className='w-12 h-12 text-blue-500' />

                    {/* Scrollable Odds List */}
                    <div ref={scrollRef} className="flex overflow-x-auto hide-scrollbar  flex-nowrap gap-2 w-full scrollbar-hide">
                        {odds.map((odd, index) => (
                            <div key={index} className="flex items-center justify-center px-2 py-1 bg-blue-500 text-white rounded-lg min-w-[40px]">
                                {odd}
                            </div>
                        ))}
                    </div>

                    {/* Next Button */}
                    <BiCaretRight onClick={() => scroll("next")} className='w-12 h-12 text-blue-500' />
                </div>

                {/* grid */}
                <div className='w-full'>
                    {/* 5x5 Grid */}
                    <div className="grid grid-cols-5 gap-1 w-full">
                        {Array.from({ length: 25 }, (_, index) => (
                            <div className='p-2 flex items-center justify-center rounded-lg bg-[#2a4c97]'>
                                <div
                                    key={index}
                                    onClick={() => handleCellClick(index)}
                                    className="w-10 h-10 rounded-md flex items-center justify-center 
                                cursor-pointer"
                                    style={{
                                        backgroundImage: `url(${getCellBackground(index)})`,
                                        backgroundSize: "100% 100%",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>

                </div>

                <div className='flex flex-col  w-full justify-between'>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-row gap-1 items-center justify-center'>
                            <p className='font-semibold text-white'>Balance : </p>
                            <p className='text-yellow-400 text-lg font-semibold'>
                                {balance?balance:0}
                            </p>
                        </div>

                        <div className='flex flex-row gap-1 items-center justify-center'>
                            <p className='font-semibold text-white'>Win : </p>
                            <p className='text-yellow-400 text-lg font-semibold'>
                            {win?win:0}
                            </p>
                        </div>

                    </div>

                    <div className='flex flex-row text-sm text-white justify-between'>
                        {showBetPopup && (
                            <div className="absolute text-white bg-gray-600 rounded-lg shadow-lg 
                                grid grid-cols-4 bottom-20 z-50">
                                {bets.map(amount => (
                                    <button
                                        key={amount}
                                        className="bg-blue-400 p-2 rounded hover:bg-blue-800"
                                        onClick={() => handleBetAmountClick(amount)}
                                    >
                                        {amount}
                                    </button>
                                ))}
                            </div>
                        )}

                        {showMinesPopup && (
                            <div className="absolute text-white bg-gray-600 rounded-lg shadow-lg 
                                grid grid-cols-5 bottom-20 z-50">
                                {mines.map(count => (
                                    <button
                                        key={count}
                                        className="bg-blue-400 p-2 rounded hover:bg-blue-800"
                                        onClick={() => handleMineCountClick(count)}
                                    >
                                        {count}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className='flex w-[20%] flex-col items-center justify-center px-2
                         bg-blue-500 rounded-lg cursor-pointer' onClick={handleBetButtonClick}>
                            <p className='text-xs font-bold'>Bet</p>
                            <p className=''>{betAmount}</p>

                        </div>
                        <div className='flex w-[20%] flex-col items-center justify-center px-2
                         bg-blue-500 rounded-lg cursor-pointer' onClick={handleMinesButtonClick}>
                            <p className='text-xs font-bold'>Mines</p>
                            <p className=''>{minesCount}</p>

                        </div>
                        <div className='flex w-[25%] flex-col items-center justify-center px-2
                         bg-blue-500 rounded-lg'>
                            {!gameStarted &&(
                                <div className='cursor-pointer' onClick={() => {
                                    setGameStarted(true);
                                    gameEnded(false)
                                    setBalance(balance-betAmount);
                                    setRevealed(Array(25).fill(null)); // Reset revealed state
                                }}>
                                    <p className='text-xs font-semibold'>Start Game</p>
                                </div>
                            )}
                           {gameStarted && (
                            gameEnded 
                                ?  <div className='cursor-pointer' onClick={() => {
                                    setGameStarted(true);
                                    setGameEnded(false)
                                    setBalance(balance-betAmount);
                                    setRevealed(Array(25).fill(null)); // Reset revealed state
                                }}>
                                    <p className='text-xs font-semibold'>Restart</p>
                                </div> 
                                : <div onClick={cashOut} className='cursor-pointer'>
                                    CashOut
                                </div>
                            )}


                        </div>
                        <div className='flex w-[20%] flex-col items-center justify-center px-2
                         bg-blue-500 rounded-lg'>
                            <p className=''>Settings</p>

                        </div>
                        {/* <div className='flex w-[20%] flex-col items-center justify-center
                         bg-blue-500 rounded-lg'>
                            <p>Mines</p>
                            <p>3</p>

                        </div>
                        <div className='flex w-[35%] flex-col items-center justify-center
                         bg-blue-500 rounded-lg '>
                            <button>
                                <p>Cashout</p>
                                
                            </button>
                        </div> */}

                    </div>

                </div>

            </div>
        </div>
    )
}

export default MinesGame