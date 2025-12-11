'use client'
import { useState, useCallback, useMemo, useEffect } from "react"
import debounce from 'lodash/debounce'
import HttpProvider from '@/services/HttpProvider'
import Icon from "@/components/Image/Icon"
import style from "./Volume.module.scss"
import { useSpotifyPlayer } from "@/contexts/SpotifyPlayerContext"

interface Props {
  deviceId?: number | string,
  volume_percent?: number
  iconSize?: number
  direction?: "vertical" | "horizontal"
  className?: string
}

export default function Volume({ deviceId, volume_percent = 0, direction = "vertical", className = "", iconSize = 20 }: Props) {
  const { activeDevice, handleSync } = useSpotifyPlayer();

  const [currentVolume, setCurrentVolume] = useState<number>(volume_percent || activeDevice.volume_percent)

  const handleVolume = (e: any, forceToValue?: number) => {
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
    handleSync(false)
    return HttpProvider.put('/api/me/player/volume', {
      device_id: deviceId,
      volume_percent: volume
    }).finally(() => {
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
          <Icon id={iconByVolume} className={`${style.volumeWrappContentIcon}`} width={iconSize} height={iconSize} />
        </button>
        <input
          type="range"
          name={`volume-${deviceId}`}
          value={currentVolume}
          onChange={(e) => handleVolume(e)}
          min={0}
          max={100}
          step={1}
          className={`${style.volumeWrappContentInput}`}
        />
      </div>
    </div>
  )
}