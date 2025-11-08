'use client'
import PlayerStore from '@/stores/PlayerStore';
import { Children, useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Spinner from "@/components/Loader/Spinner"
import Placeholder from '@/components/Loader/Placeholder';
import ImageFit from "@/components/Image/Fit"
import { EffectCards } from 'swiper/modules';

import style from './SliderNavigation.module.scss'

// Import Swiper styles
import 'swiper/css';
import { observer } from 'mobx-react-lite';
import 'swiper/css/effect-cards';
import { useSpotifyPlayer } from '@/contexts/SpotifyPlayerContext';
import Image from 'next/image';

const SliderNavigation = ({
  spaceBetween = 30,
  slidesPerView = 4,
  className = "",
  overflowed = true,
  onInit = () => {},
  onSlideChange = () => {},
  children,
  ...props
}) => {
  const { player, deviceId } = useSpotifyPlayer()
  const [isLoading, setIsLoading] = useState(false)
  const [internallyHandled, setInternallyHandled] = useState(false)
  const [swiperInstance, setSwiperInstance] = useState(null)
  const [slides, setSlides] = useState([...Array(3).keys()].map((key) => {
    return {
      key,
      content: <div className={style.SliderNavigationContainerSliderPlaceholder} />
    }
  }))

  const track = player?.item

  const initSlider = (swiper) => {
    setSwiperInstance(swiper)
    // swiper.slideTo(1, 0, false)
  }

  const editSlideByKey = useCallback((key = swiperInstance.activeIndex) => {
    let tmpSlides = [...slides]
    let currentSlide = tmpSlides[key]
    const isEnd = key + 2 === tmpSlides.length
    const track = player?.item || {}
    const [large, medium, small ] = track?.album?.images || []
    const image = large || medium || small

    if (isEnd) {
      tmpSlides = [...tmpSlides, {
        key: slides.length,
        content: <div className={style.SliderNavigationContainerSliderPlaceholder} />
      },
      {
        key: slides.length + 1,
        content: <div className={style.SliderNavigationContainerSliderPlaceholder} />
      }]
    }

    if (currentSlide) {
      currentSlide.content = <ImageFit url={image?.url} className={style.SliderNavigationContainerSliderImage} />
    }
    setInternallyHandled(false)
    setSlides(tmpSlides);
  }, [player])

  const handleNext = (swiper) => {
    setIsLoading(true)
    setInternallyHandled(true)
    return PlayerStore.next(deviceId)
      .then((player) => {
        if (player?.item?.name === track?.name) {
          // the track is the same but user changed slide
          // go to previus slide again
          swiper.slidePrev(300, false)
        }
        return player
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handlePrev = () => {
    setIsLoading(true)
    setInternallyHandled(true)
    return PlayerStore.previous(deviceId)
      .then((player) => {
        if (player?.item?.name === track?.name) {
          // the track is the same but user changed slide
          // go to previus slide again 
          swiper.slideNext(300, false)
        }
        return player
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    editSlideByKey(0)
  }, [swiperInstance])

  useEffect(() => {
    if (swiperInstance) {
      !internallyHandled && swiperInstance.slideNext(300, false)
      editSlideByKey()
    }
  }, [track?.name])

  return (
    <div className={style.SliderNavigation}>
      <Swiper
        modules={[EffectCards]}
        effect={'cards'}
        slidesPerView={1}
        onSlideNextTransitionEnd={handleNext}
        onSlidePrevTransitionEnd={handlePrev}
        onSwiper={initSlider}
        loop={false}
        className={style.SliderNavigationContainer}
      >
        {
          slides.map((slide, index) => (
            <SwiperSlide className={style.SliderNavigationContainerSlider} key={index}>
              {
                isLoading ? 
                <div className={style.SliderNavigationContainerSliderLoader}>
                  <Spinner show={true} width={40} height={40} />
                </div>
                : null
              }
              { slide.content }
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
};

export default observer(SliderNavigation)