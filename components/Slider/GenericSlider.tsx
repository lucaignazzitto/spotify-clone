'use client'
import { Children, ReactNode, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Grid, FreeMode, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import '@/styles/components/slider.scss'

interface Props extends SwiperClass {
  spaceBetween?: number
  slidesPerView?: number
  className?: string
  overflowed?: boolean,
  onInit: (swiper: SwiperClass) => void,
  onSlideChange: (swiper: SwiperClass) => void,
  children: ReactNode,
}

const GenericSlider = ({
  spaceBetween = 25,
  slidesPerView = 4,
  className = "",
  overflowed = true,
  onInit = (swiper) => {},
  onSlideChange = (swiper) => {},
  children,
  ...props
}) => {

  const [isMounted, setIsMouted] = useState<boolean>(false)

  const breakpoints = {
    // when window width is >= 320px
    0: {
      slidesPerView: 2,
      spaceBetween: 5
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    991: {
      slidesPerView: slidesPerView,
      spaceBetween: spaceBetween
    }
  }

  const handleSlideChange = (swiper: SwiperClass) => {
    return onSlideChange(swiper)
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