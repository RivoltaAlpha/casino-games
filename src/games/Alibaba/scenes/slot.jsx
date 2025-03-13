import React,{ useState, useEffect, useRef } from 'react';
import VerticalCarousel from '../../../components/VerticalCarousel';

const ICONS = [
    'demo1', 'demo2', 'demo3', 'demo4', 'demo2', 
];

const BASE_SPINNING_DURATION = 2.7;
const COLUMN_SPINNING_DURATION = 0.3;

function getRandomIcon() {
    return ICONS[Math.floor(Math.random() * ICONS.length)];
}

function randomDuration() {
    return Math.floor(Math.random() * 10) / 100;
}

const Demo = () => {

    const images = [
        'demo1.webp',
        'demo2.webp',
        'demo3.webp',
        'demo4.webp',
        'demo2.webp',
        'demo3.webp',
    ];
    //const [spinning,setSpinning]=useState(false)


    const [cols, setCols] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            const initialCols = Array.from(containerRef.current.querySelectorAll('.col'));
            setCols(initialCols);
            setInitialItems(initialCols);
        }
    }, []);


    const setInitialItems = (cols) => {
        let baseItemAmount = 40;
        cols.forEach((col, i) => {
            let amountOfItems = baseItemAmount + (i * 3);
            let elms = '';
            let firstThreeElms = '';

            for (let x = 0; x < amountOfItems; x++) {
                let icon = getRandomIcon();
                let item = `<div class="icon" data-item="${icon}"><img src="${icon}.webp" 
                alt="${icon}"></div>`;
                elms += item;

                if (x < 3) firstThreeElms += item;
            }
            col.innerHTML = elms + firstThreeElms;
        });
    };

    const spin = (e) => {
        let duration = BASE_SPINNING_DURATION + randomDuration();
        cols.forEach(col => {
            duration += COLUMN_SPINNING_DURATION + randomDuration();
            col.style.animationDuration = `${duration}s`;
        });

        e.target.disabled = true;
        containerRef.current.classList.add('spinning');

        setTimeout(() => setResult(), (BASE_SPINNING_DURATION * 1000) / 2);

        setTimeout(() => {
            containerRef.current.classList.remove('spinning');
            e.target.disabled = false;
        }, duration * 1000);
    };

    const setResult = () => {
        cols.forEach(col => {
            let results = [
                getRandomIcon(),
                getRandomIcon(),
                getRandomIcon()
            ];
            let icons = col.querySelectorAll('.icon img');
            for (let x = 0; x < 3; x++) {
                icons[x].src = `items/${results[x]}.png`;
                icons[(icons.length - 3) + x].src = `items/${results[x]}.png`;
            }
        });
    };

    return (
        <div className='flex m-10 flex-col justify-center items-center'>
            <h1>Slot</h1>
            <div id="container" ref={containerRef}
            className='md:w-[30%]  grid grid-cols-3 h-[300px] '>
                <div className='relative flex items-center  border border-gray-900'>
                    <div className='col absolute bg-red-600'>
                        {/* <p>Slot</p> */}
                    </div>
                </div>
                <div className='relative flex items-center border border-gray-900'>
                    <div className='col absolute'>
                        {/* <p>Slot</p> */}
                    </div>
                </div>
                <div className='relative flex items-center border border-gray-900'>
                    <div className='col absolute'>
                        {/* <p>Slot</p> */}
                    </div>
                </div>

            </div>

            <button onClick={spin} className='py-2 px-4 rounded-lg bg-blue-500 text-white'>
                Spin
            </button>
        </div>
    );
};

export default Demo;
