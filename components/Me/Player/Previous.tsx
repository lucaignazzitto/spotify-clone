'use client'
import { useState } from "react";
import Spinner from "@/components/Loader/Spinner"
import Icon from '@/components/Image/Icon'
import Button from "@/components/Buttons/Button"
import { ButtonProps } from "react-bootstrap";
import { useSpotifyPlayer } from "@/contexts/SpotifyPlayerContext";

interface PrevSongProps extends ButtonProps {
  className?: string,
  iconSize?: number,
}

/**
 * go to previous track
 */
function PreviousButton({ className = "", iconSize }: PrevSongProps) {
  const { deviceId, prevSong } = useSpotifyPlayer()
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    return prevSong(deviceId)
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Button
      className={`hover-anim ${className}`}
      role="button"
      disabled={!deviceId}
      aria-label="Previous song"
      text={
        loading ? <Spinner show={true} />
          : <Icon id='track-prev' width={iconSize} height={iconSize}></Icon>
      }
      onClick={handleClick}
    />
  )
}

export default PreviousButton