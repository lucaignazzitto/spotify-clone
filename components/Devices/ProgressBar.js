'use client'
import { useState, useEffect, useCallback } from "react"
import { millisToMinutesAndSeconds } from '@/utils/helpers'
import playerStore from "@/stores/PlayerStore"
import style from "./ProgressBar.module.scss"
import { observer } from "mobx-react-lite"

let progress

function ProgressBar ({ startAt = 0, max = 0, className = "" }) {
  const [currentProgress, setCurrentProgress] = useState(startAt)

  const player = playerStore.getPlayer

  const handleProgress = (e) => {
    e.preventDefault()
    const { value } = e.target
    setCurrentProgress(parseInt(value))
    playerStore.setPlayerProgress(parseInt(value))
  }

  const fillProgress = useCallback(() => {
    setCurrentProgress(player?.progress_ms || 0)
    if (player.is_playing) {
      progress = setInterval(() => {
        setCurrentProgress(v => v + 1000)
      }, 1000)
    } else {
      clearInterval(progress)
    }
  }, [player])
  
  useEffect(() => {
    fillProgress()
    return () => {
      clearInterval(progress)
    }
  }, [fillProgress])
  
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

export default observer(ProgressBar)