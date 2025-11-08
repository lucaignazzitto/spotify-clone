'use client'
import { observer } from "mobx-react-lite"
import { useState } from "react"
import PlayerStore from "@/stores/PlayerStore"
import Spinner from "@/components/Loader/Spinner"
import Icon from '@/components/Image/Icon'
import Button from "@/components/Buttons/Button"

/**
 * set repeat mode
 */
function RepeatButton ({ className = "" }) {
  const [ loading, setLoading ] = useState(false) 
  const player = PlayerStore.getPlayer
  const deviceId = PlayerStore.getPlayerId

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

  const handleClick = (e) => {
    e.preventDefault()
    setLoading(true)
    return PlayerStore.repeat(deviceId, statusLegend[repeatState].nextState)
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Button
      className={`hover-anim ${className}`}
      disabled={!deviceId}
      aria-label="Repeat song"
      text={
        loading ? <Spinner show={true}  />
        : <Icon id={statusLegend[repeatState].icon} />
      }
      onClick={handleClick}
    />
  )
}

export default observer(RepeatButton)