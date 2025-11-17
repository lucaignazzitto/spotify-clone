'use client'
import { useState } from "react"
import Spinner from "@/components/Loader/Spinner"
import Icon from '@/components/Image/Icon'
import Button from "@/components/Buttons/Button"
import { ButtonProps } from "react-bootstrap"
import { useSpotifyPlayer } from "@/contexts/SpotifyPlayerContext"

interface Props extends ButtonProps {
  className?: string,
  iconSize?: number
}

/**
 * set repeat mode
 */
function RepeatButton({ className = "", iconSize, ...props }: Props) {
  const { deviceId, player, repeat, loadPlayer } = useSpotifyPlayer()

  const [loading, setLoading] = useState(false)

  const statusLegend = {
    'off': {
      icon: 'repeat-inactive',
      nextState: 'track'
    },
    'track': {
      icon: 'repeat-one',
      nextState: 'context'
    },
    'context': {
      icon: 'repeat-active',
      nextState: 'off'
    }
  }

  const repeatState = player?.repeat_state || 'off'

  const handleClick = () => {
    setLoading(true)
    return repeat(deviceId, statusLegend[repeatState].nextState)
      .then(async () => await loadPlayer())
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Button
      className={`hover-anim ${className}`}
      disabled={!deviceId}
      role="button"
      aria-label="Repeat song"
      text={
        loading ? <Spinner show={true} />
          : <Icon id={statusLegend[repeatState].icon} width={iconSize} height={iconSize} />
      }
      onClick={handleClick}
      {...props}
    />
  )
}

export default RepeatButton