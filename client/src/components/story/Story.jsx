import React from 'react'
import './story.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const Story = () => {
  const demoData = [1,2,3,4]
  return (
    <div className='story-container'>
      <div className='story-card'>
        <div className='add-ava'>
          <img className='add-img' src="https://i.ibb.co/kmNvNk8/nature-img.jpg" />
          {/* <img className='svg-plus' src={add_icon}/> */}
        </div>
        <h3 className='account-name'>Nguyen Tran</h3>
      </div>
      <div className='story-wrapper'>
        <Swiper
          modules={[Autoplay, Navigation, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          style={{'max-width': '100%', 'height':'100%', }}
        >  
          { 
            demoData.map(d => (
              <SwiperSlide>
                <div className='story-card'>
                  {/* <CardImg src="https://i.ibb.co/kmNvNk8/nature-img.jpg"/> */}
                  <img className='card-story-img' src="https://i.ibb.co/BcjFX7X/nature.jpg"/>
                
                  <h3 className='author-name'>Edogawa Conan</h3>
                  <div className='ava-container'>
                    <div className='ava'>
                      <div className='ava-img' src="https://i.ibb.co/ckCGnQ4/conan.jpg" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
        
    </div>
  )
}

export default Story