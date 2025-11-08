'use client'
import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { millisToMinutesAndSeconds } from '@/utils/helpers'
import debounce from 'lodash/debounce'
import style from "./ProgressBar.module.scss"
import { useSpotifyPlayer } from "@/contexts/SpotifyPlayerContext"

function ProgressBar({ startAt = 0, max = 0, className = "" }) {
  const { player = {}, deviceId, seek, handleSync } = useSpotifyPlayer()
  const intervalRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(startAt)

  const handleProgress = (e) => {
    e.preventDefault()
    const { value } = e.target
    setIsDragging(true);
    setCurrentProgress(parseInt(value))
    setProgress(parseInt(value))
  }

  const debouncedSeek = useMemo(() => debounce((newProgress) => {
    handleSync(false)
    seek(deviceId, newProgress).finally(() => {
      handleSync(true)
      setIsDragging(false)
    })
  }, 100), [deviceId, seek, handleSync])

  const setProgress = useCallback((newProgress) => {
    debouncedSeek(newProgress)
  }, [debouncedSeek])

  useEffect(() => {
    if (!isDragging && player?.is_playing) {
      intervalRef.current = setInterval(() => {
        setCurrentProgress((prev) => Math.min(prev + 1000, max));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isDragging, player?.is_playing, max]);

  useEffect(() => () => debouncedSeek.cancel(), [debouncedSeek])


  return (
    <div className={`${style.progressWrapp} ${className}`}>
      <div className={`${style.progressWrappContent}`}>
        <span className={`${style.progressWrappContentIndicator}`}>{millisToMinutesAndSeconds(currentProgress)}</span>
        <input
          type="range"
          value={currentProgress}
          onChange={handleProgress}
          min={0}
          max={max}
          step={1}
          className={`${style.progressWrappContentInput}`}
        />
        <span className={`${style.progressWrappContentIndicator}`}>{millisToMinutesAndSeconds(max)}</span>
      </div>
    </div>
  )
}

export default ProgressBar