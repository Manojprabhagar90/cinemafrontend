import React,{ useEffect,useState } from 'react'
import { frontend_assets } from '../assets/frontend_assets/assets';
import { ChevronLeftIcon,ChevronRightIcon } from '@heroicons/react/20/solid';

const Sliderad = () => {
    const [imgaddslider, setImgaddslider] = useState(frontend_assets.ad_img);
    const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = imgaddslider.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, imgaddslider]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);
    
    
  return (
    <div>
      <section className="section">
      
      <div className="section-center">
        {imgaddslider.map((adimg, adimgIndex) => {
          const { id, image } = adimg;

          let position = 'nextSlide';
          if (adimgIndex === index) {
            position = 'activeSlide';
          }
          if (
            adimgIndex === index - 1 ||
            (index === 0 && adimgIndex === imgaddslider.length - 1)
          ) {
            position = 'lastSlide';
          }

          return (
            <article className={position} key={id}>
              <img src={image} className='px-36' />
             
              {/* <FaQuoteRight className="icon" /> */}
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
            <ChevronLeftIcon aria-hidden="true" className="cursor-pointer size-5 text-gray-400"/>
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
            <ChevronRightIcon aria-hidden="true" className="cursor-pointer size-5 text-gray-400"/>
        </button>
      </div>
    </section>
    </div>
  )
}

export default Sliderad
