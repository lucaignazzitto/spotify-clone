'use client'
import { useState, useCallback, useMemo, useEffect } from "react"
import debounce from 'lodash/debounce'
import HttpProvider from '@/services/HttpProvider'
import Spinner from "@/components/Loader/Spinner"
import Icon from "@/components/Image/Icon"
import style from "./Volume.module.scss"

export default function Volume ({ deviceId, volume_percent = 0, direction = "vertical", className = "" }) {
  const [currentVolume, setCurrentVolume] = useState(volume_percent)
  const [loading, setLoading] = useState(false)

  const handleVolume = (e, forceToValue) => {
    e.preventDefault()
    const { value } = e.target
    const valueToSet = forceToValue !== undefined ? forceToValue : value
    setCurrentVolume(valueToSet)
    setPlaybackVolume(valueToSet)
  }

  const setPlaybackVolume = useCallback(debounce((volume) => {
    setLoading(true)
    return HttpProvider.put('/api/me/player/volume', {
      device_id: deviceId,
      volume_percent: volume
    })
      .finally(() => {
        setLoading(false)
      })
  }, 600), [])

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

  useEffect(() => {
    setCurrentVolume(volume_percent)
  }, [volume_percent])
  
  
  return (
    <div className={`${style.volumeWrapp} ${className}`}>
      <div className={`${style.volumeWrappContent} ${direction === "horizontal" ? style.volumeWrappContentHorizontal : style.volumeWrappContentVertical }`}>
        <button className="btn btn-none hover-anim" onClick={(e) => handleVolume(e, currentVolume > 0 ? 0 : 100)}>
          {
            loading ? <Spinner show={true} width={20} height={20} />
            : <Icon id={iconByVolume} className={`${style.volumeWrappContentIcon}`} width={20} height={20} />
          }
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