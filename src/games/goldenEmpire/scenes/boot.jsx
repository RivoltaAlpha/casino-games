import React, { useState, useEffect } from 'react'
import Mc from '../../../assets/tongits/images/mc.png';
import Bg from '../../../assets/tongits/images/bg.webp';
import volatilityFull from '../../../assets/tongits/images/volatilityFull.png';
import volatilityEmpty from '../../../assets/tongits/images/volatilityEmpty.png';
import arrowLeftImg from '../../../assets/tongits/images/arrowLeft.png';
import arrowRightImg from '../../../assets/tongits/images/arrowRight.png';
import Continue from '../../../assets/tongits/images/Continue.png';

import Slider1 from '../../../assets/tongits/images/slider1.png';
import Slider2 from '../../../assets/tongits/images/slider2.webp';
import times1000 from '../../../assets/tongits/images/1000x.webp';
import Scatter from '../../../assets/tongits/images/scatter.webp';

//audio
import bootMusic from '../../../assets/tongits/audio/mcBoot.mp3';

import Carousel from '../Components/carousel';

function GoldenEmpireBoot({ onContinue }) {

  const slides = [Slider1, Slider2]
  const slideGif = [times1000, Scatter]


  // useEffect(() => {
  //   const audio = new Audio(bootMusic);
  //   audio.loop = true;

  //   const handlePlayAudio = () => {
  //     audio.play().catch(error => {
  //       console.log('Autoplay prevented:', error);
  //     });
  //   };

  //   document.addEventListener('click', handlePlayAudio, { once: true });

  //   const handleVisibilityChange = () => {
  //     if (document.hidden) {
  //       audio.pause();
  //     } else {
  //       audio.play();
  //     }
  //   };

  //   document.addEventListener('visibilitychange', handleVisibilityChange);

  //   return () => {
  //     audio.pause();
  //     audio.currentTime = 0;
  //     document.removeEventListener('click', handlePlayAudio);

  //   };
  // }, []);


  return (
    <div className="w-full bg-cover bg-center h-full rounded-lg flex flex-col p-4 items-center justify-center"
      style={{ backgroundImage: `url(${Bg})` }}>

      <div className='flex flex-row  items-center justify-center gap-4'>
        <div className='flex flex-row gap-1'>
          <p className='text-white font-bold text-lg'>Volatility : </p>
          <div className='flex items-center justify-center flex-row gap-0.2'>
            <img src={volatilityFull} alt="Continue" className="h-8 " />
            <img src={volatilityFull} alt="Volatility" className="h-8  " />
            <img src={volatilityEmpty} alt="Volatility" className="h-10  " />
            <img src={volatilityEmpty} alt="Volatility" className=" h-10 " />
            <img src={volatilityEmpty} alt="Volatility" className=" h-10 " />
          </div>
        </div>
        <div>
          <img src={Mc} alt="Volatility" className=" " />
        </div>

      </div>
      <Carousel slides={slides} gifImages={slideGif} arrowLeft={arrowLeftImg} arrowRight={arrowRightImg} />
      <div>
        <img src={Continue} onClick={onContinue} alt="Continue" className="cursor-pointer mb-3" />
      </div>

    </div>
  );
}

export default GoldenEmpireBoot;
