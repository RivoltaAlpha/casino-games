import React, { useState, useEffect } from 'react';

const VerticalCarousel = ({ images, interval = 3000 }) => {
    const [spinning, setSpinning] = useState(false);


    return (

        <div className='w-full h-full '>
            <div className='w-24 border border-gray-500 h-72 overflow-hidden flex flex-col '>
                {images.map((image, index) => (
                    <div className='relative h-28 mt-1 bg-red-300'
                        style={{
                            animation: spinning ? `spinDown ${speed}s infinite linear` : 'none'
                        }}
                    > 
                        <img src={image} alt={`Slide ${index}`} className='h-24 absolute' />
                    </div>
                ))}

            </div>


            <style jsx>{`
                @keyframes spinDown {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(100%); }
                }
            `}</style>
        </div>
    );
};

export default VerticalCarousel;
