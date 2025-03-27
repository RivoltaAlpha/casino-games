import React, { useState } from 'react';

const Carousel = ({slides,arrowLeft,arrowRight}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    // const slides = [
    //     'https://via.placeholder.com/600x400?text=Image+1',
    //     'https://via.placeholder.com/600x400?text=Image+2',
    //     'https://via.placeholder.com/600x400?text=Image+3',
    // ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative w-full max-w-xl p-4 h-full flex items-center justify-center mx-auto">
            <div className="overflow-hidden rounded-lg">
                <div
                    className="flex  transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div key={index} className="relative  min-w-full flex items-center justify-center ">
                            <img src={slide} alt={`Slide ${index + 1}`} className="object-cover w-fu h-full " />

                            {/* <img src={gifImages[index]} alt="Anim" 
                            className='gif absolute top-10 left-40 '/> */}
                        </div>
                    ))}
                </div>
                
            </div>
            <button
                onClick={prevSlide}
                className="absolute -left-10 top-1/2 transform -translate-y-1/2  rounded-full"
            >
                <img src={arrowLeft} alt="arrow left" className=" " />
            </button>
            <button
                onClick={nextSlide}
                className="absolute -right-10 top-1/2 transform -translate-y-1/2  rounded-full"
            >
                <img src={arrowRight} alt="arrow right" className=" " />
            </button>
        </div>
    );
};

export default Carousel;
