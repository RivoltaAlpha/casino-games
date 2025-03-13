import React, { useState, useEffect } from 'react';
import Bg from '../../../assets/tongits/images/bg.webp';
import Topbar1Img from '../../../assets/tongits/images/topbar1.webp';
import SlotContainerImg from '../../../assets/tongits/images/slotsContainer.webp';
import GreenSlots from '../../../assets/tongits/images/greenSlots.png';
import YellowSlot from '../../../assets/tongits/images/yellowSlot.png';

function MoneyComingGame() {
    const symbols = [
        { name: 'Cherry', symbol: '🍒' },
        { name: 'Bell', symbol: '🔔' },
        { name: 'Seven', symbol: '7️⃣' },
        { name: 'BAR', symbol: '🏁' },
        { name: 'Diamond', symbol: '💎' },
        { name: 'Star', symbol: '⭐' }
    ];

    const [spinning, setSpinning] = useState([false, false, false]);
    const [currentSymbolIndexes, setCurrentSymbolIndexes] = useState([0, 3, 5]);
    const [results, setResults] = useState([null, null, null]);
    const [speed,setSpeed]=useState(0.1)

    useEffect(() => {
        let intervals = [];

        spinning.forEach((isSpinning, index) => {
            if (isSpinning) {
                intervals[index] = setInterval(() => {
                    setCurrentSymbolIndexes(prevIndexes => {
                        const newIndexes = [...prevIndexes];
                        newIndexes[index] = (newIndexes[index] + 1) % symbols.length;
                        return newIndexes;
                    });
                }, 400);
            }
        });

        return () => intervals.forEach(interval => clearInterval(interval));
    }, [spinning, symbols.length]);

    const startSpin = () => {
        setSpinning([true, true, true]);
        setResults([null, null, null]);
       
        setSpeed(0.1)

        setTimeout(() => {
            stopReel(0);
            setSpeed(0.2)
        }, 2000);
        

        setTimeout(() => {
            stopReel(1);
        }, 2800);
        

        setTimeout(() => {
            stopReel(2);
            setSpeed(0.3)
        }, 3800);

        // setTimeout(() => {
        //     setSpeed(0.3)
        // },2100)

        // setTimeout(() => {
        //     setSpeed(0.4)
        // },2400)
    };

    const stopReel = (reelIndex) => {
        setSpinning(prevSpinning => {
            const newSpinning = [...prevSpinning];
            newSpinning[reelIndex] = false;
            return newSpinning;
        });

        setResults(prevResults => {
            const newResults = [...prevResults];
            newResults[reelIndex] = symbols[currentSymbolIndexes[reelIndex]].symbol;
            return newResults;
        });
    };

    return (
        <div className="w-full h-full bg-cover bg-center flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${Bg})` }}>
            <div className="flex flex-col h-[60%] md:w-[94%] w-full">
                {/* Top Bar Section */}
                <div className="w-full h-[40%] bg-cover bg-center relative">
                    <img src={Topbar1Img} alt="Slot Container"
                        className="w-[94%] absolute top-0 right-8 h-full " />
                </div>

                {/* Slot Container Section */}
                <div className="w-full h-[60%] px-2 relative">
                    <img src={SlotContainerImg} alt="Slot Container"
                        className="w-[98%] h-full " />

                    <div className="absolute w-[98%] inset-0 flex flex-row justify-between py-3 px-6">
                        <div className="w-[72.4%] relative">
                            <img src={GreenSlots} alt="Slot Container"
                                className="w-full h-full " />
                            <div className="absolute inset-0 grid gap-2 pl-5 py-4 grid-cols-3">
                                {[0, 1, 2].map(index => (
                                    <div className="flex items-center overflow-hidden justify-center relative" key={index}>
                                        <div className={`absolute h-full ${spinning[index] ? 'animate-spin-down' : ''}`}
                                        style={{
                                            animation: spinning[index] ? `spinDown ${speed}s infinite linear` : 'none'
                                        }}
                                        >
                                            <div className="flex  h-full items-center justify-center">
                                                <p className="text-4xl">{spinning[index] ? symbols[currentSymbolIndexes[index]].symbol : results[index] || symbols[currentSymbolIndexes[index]].symbol}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-[26.3%] flex items-center relative justify-center">
                            <img src={YellowSlot} alt="Slot Container"
                                className="w-full h-full " />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p>Content</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={startSpin}>
                Start Spin
            </button>

            <style jsx>{`
                @keyframes spinDown {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(100%); }
                }
            `}</style>
        </div>
    );
}

export default MoneyComingGame;
