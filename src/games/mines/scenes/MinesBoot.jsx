import React from 'react'
import Carousel from '../components/Carousel'
import continueSound from '../../../assets/mines/audio/continue.mp3';


function MinesBoot({ assets, onContinue }) {

    const playContinueSound = () => {
      const audio = new Audio(continueSound);
      audio.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
    };
    
    // Combined handler to play sound and then continue after delay
    const handleContinueClick = () => {
      playContinueSound();
      
      // Delay the onContinue call by 4 seconds
      setTimeout(() => {
        onContinue();
      }, 4000); // 4000 milliseconds = 4 seconds
    };
  //console.log('Assets passed', assets)

  const slides = [assets.slider1.src, assets.slider2.src]

  return (
    <div className='w-full h-full flex relative rounded-lg flex-col gap-3 py-2 px-6 items-center justify-center' >
      <div className='flex flex-col justify-between h-full'>

        <div className='flex md:flex-row  flex-col-reverse items-center relative justify-start gap-4 h-[15%] '>
          <div className='flex flex-row gap-1 '>
            <p className='text-white font-semibold  text-lg'>Volatility : </p>

            <div className='flex items-center justify-center flex-row gap-0.2'>
              <div className=' h-6 w-6 bg-center bg-cover'
                style={{
                  backgroundImage: `url(${assets.volatilityFull.src})`,
                  // backgroundSize: '100% 100%',
                  // backgroundRepeat: 'no-repeat',
                  // backgroundPosition: 'center'
                }}
              >
              </div>
              <div className=' h-6 w-6 bg-center bg-cover'
                style={{
                  backgroundImage: `url(${assets.volatilityFull.src})`,
                }}
              >
              </div>
              <div className=' h-6 w-6 bg-center bg-cover'
                style={{
                  backgroundImage: `url(${assets.volatilityEmpty.src})`,
                }}
              >
              </div>
              <div className=' h-6 w-6 bg-center bg-cover'
                style={{
                  backgroundImage: `url(${assets.volatilityEmpty.src})`,
                }}
              >
              </div>
              <div className=' h-6 w-6 bg-center bg-cover'
                style={{
                  backgroundImage: `url(${assets.volatilityEmpty.src})`,
                }}
              >
              </div>
              {/* <img src={assets.volatilityFull.src} alt="Volatility" className="h-8" />
              <img src={assets.volatilityFull.src} alt="Volatility" className="h-8" />
              <img src={assets.volatilityEmpty.src} alt="Volatility" className="h-10" />
              <img src={assets.volatilityEmpty.src} alt="Volatility" className=" h-10 " />
              <img src={assets.volatilityEmpty.src} alt="Volatility" className=" h-10 " /> */}
            </div>
          </div>

          <div className=' h-6 w-[100px]'
            style={{
              backgroundImage: `url(${assets.mines.src})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
          >
            {/* <img src={assets.mines.src} alt="Mines" className=" h-12" /> */}
          </div>

        </div>


        <div className='flex items-center justify-center h-[40%] '>
          <Carousel slides={slides} arrowLeft={assets.leftArrow.src}
            arrowRight={assets.rightArrow.src} />

        </div>


        <div className='flex items-center justify-center'>
          <div className='flex items-center justify-center h-10 w-[150px] mt-4 '
            style={{
              backgroundImage: `url(${assets.continue.src})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
            onClick={handleContinueClick}

          >
            {/* <img src={assets.continue.src} onClick={onContinue} alt="Continue"
            className="cursor-pointer mb-3" /> */}
          </div>
        </div>

      </div>
    </div>
  )
}

export default MinesBoot