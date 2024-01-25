'use client'
import { Children, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, FreeMode, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import '@/styles/components/slider.scss'

const GenericSlider = ({
  spaceBetween = 30,
  slidesPerView = 4,
  className = "",
  overflowed = true,
  onInit = () => {},
  onSlideChange = () => {},
  children,
  ...props
}) => {

  const [isMounted, setIsMouted] = useState(false)

  const breakpoints = {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 15
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    991: {
      slidesPerView: slidesPerView,
      spaceBetween: spaceBetween
    }
  }

  const handleSlideChange = (e) => {
    return onSlideChange(e)
  }

  const handleSlideInit = (swiper) => {
    setIsMouted(true)
    return onInit(swiper)
  }

  return (
    <Swiper
      className={`${className} ${overflowed ? 'overflow-visible' : ''}`}
      style={isMounted ? { opacity: 1 } : { opacity: 0 }}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      onSlideChange={handleSlideChange}
      onSwiper={handleSlideInit}
      freeMode={true}
      pagination={{
        clickable: true,
        // dynamicBullets: true
      }}
      breakpoints={breakpoints}
      modules={[Grid, FreeMode, Pagination]}
      { ...props }
    >
      {Children.map(children, (child, index) =>
        <SwiperSlide key={index}>
          {child}
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default GenericSlider