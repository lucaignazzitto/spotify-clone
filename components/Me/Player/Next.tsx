'use client'
import { useState } from "react";
import Spinner from "@/components/Loader/Spinner";
import Icon from '@/components/Image/Icon'
import Button from "@/components/Buttons/Button"
import { useSpotifyPlayer } from "@/contexts/SpotifyPlayerContext";
import { ButtonProps } from "react-bootstrap";

interface NextSongProps extends ButtonProps {
  className?: string,
  iconSize?: number
}

/**
 * go to next track
 */
function NextButton ({ className = "", iconSize, ...props }: NextSongProps) {
  const { deviceId, nextSong } = useSpotifyPlayer()
  const [ loading, setLoading ] = useState<boolean>(false) 

  const handleClick = () => {
    setLoading(true)
    return nextSong(deviceId)
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Button
      className={`hover-anim ${className}`}
      aria-label="Next song"
      role="button"
      text={
        loading ? <Spinner show={true}  />
        : <Icon id='track-next' width={iconSize} height={iconSize}></Icon>
      }
      onClick={handleClick}
      {...props}
    />
  )
}

export default NextButton