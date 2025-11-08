'use client'
import { useState, useCallback, useMemo, useEffect } from "react"
import debounce from 'lodash/debounce'
import HttpProvider from '@/services/HttpProvider'
import Spinner from "@/components/Loader/Spinner"
import Icon from "@/components/Image/Icon"
import style from "./Volume.module.scss"
import { useSpotifyPlayer } from "@/contexts/SpotifyPlayerContext"

export default function Volume({ deviceId, volume_percent = 0, direction = "vertical", className = "" }) {
  const { activeDevice, handleSync } = useSpotifyPlayer();

  const [currentVolume, setCurrentVolume] = useState(volume_percent || activeDevice.volume_percent)
  const [loading, setLoading] = useState(false)

  const handleVolume = (e, forceToValue) => {
    e.preventDefault()
    const { value } = e.target
    const valueToSet = forceToValue !== undefined ? forceToValue : value
    setCurrentVolume(valueToSet)
    setPlaybackVolume(valueToSet)
  }

  const iconByVolume = useMemo(() => {
    let iconId = 'no-volume'
    if (currentVolume > 0 && currentVolume < 30) {
      iconId = 'volume-low'
    }
    if (currentVolume >= 30 && currentVolume < 50) {
      iconId = 'volume-half'
    } else if (currentVolume >= 50) {
      iconId = 'volume'
    }
    return iconId
  }, [currentVolume])

  const debouncedSetVolume = useMemo(() => debounce((volume) => {
    setLoading(true)
    handleSync(false)
    return HttpProvider.put('/api/me/player/volume', {
      device_id: deviceId,
      volume_percent: volume
    }).finally(() => {
      setLoading(false)
      setTimeout(() => {
        handleSync(true)
      }, 500)
    })
  }, 600), [deviceId, handleSync])

  const setPlaybackVolume = useCallback((volume) => {
    debouncedSetVolume(volume)
  }, [debouncedSetVolume])

  useEffect(() => {
    return () => debouncedSetVolume.cancel()
  }, [debouncedSetVolume])


  return (
    <div className={`${style.volumeWrapp} ${className}`}>
      <div className={`${style.volumeWrappContent} ${direction === "horizontal" ? style.volumeWrappContentHorizontal : style.volumeWrappContentVertical}`}>
        <button className="btn btn-none hover-anim" onClick={(e) => handleVolume(e, currentVolume > 0 ? 0 : 100)}>
          <Icon id={iconByVolume} className={`${style.volumeWrappContentIcon}`} width={20} height={20} />
        </button>
        <input
          type="range"
          orient={direction}
          name={`volume-${deviceId}`}
          value={currentVolume}
          onChange={handleVolume}
          min={0}
          max={100}
          step={1}
          className={`${style.volumeWrappContentInput}`}
        />
      </div>
    </div>
  )
}