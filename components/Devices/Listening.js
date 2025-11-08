'use client'
import { useSpotifyPlayer } from '@/contexts/SpotifyPlayerContext';
import Icon from '@/components/Image/Icon'
import style from "./Listening.module.scss"

function Listening ({ className = "" }) {
  const { activeDevice: device } = useSpotifyPlayer()

  return (
    device?.name ? 
      <div className={`${style.ListeningOn} ${className}`}>
        <Icon id="speaker-active" className={style.ListeningOnIcon}  />
        <b>{device?.name}</b>
      </div>
    : null
  )
}

export default Listening