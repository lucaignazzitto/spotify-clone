'use client'
import { observer } from "mobx-react-lite"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Spinner from "@/components/Loader/Spinner"
import PlayerStore from "@/stores/PlayerStore"
import Icon from '@/components/Image/Icon'
import Button from "@/components/Buttons/Button"

/**
 * set shuffle
 */
function ShuffleButton ({ className = "btn btn-none" }) {
  const [ loading, setLoading ] = useState(false) 
  const router = useRouter()
  const player = PlayerStore.getPlayer
  const deviceId = PlayerStore.getPlayerId

  const shuffleState = useMemo(() => {
    return player?.shuffle_state || false
  }, [player])

  const handleClick = (e) => {
    e.preventDefault()
    setLoading(true)
    return PlayerStore.shuffle(deviceId, !shuffleState)
      .then(() => {
        router.refresh()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Button
      className={`hover-anim ${className}`}
      disabled={!deviceId}
      text={
        loading ? <Spinner show={true}  />
        : <Icon id='shuffle' color={shuffleState ? '#1ed760' : ''} />
      }
      onClick={handleClick}
    />
  )
}

export default observer(ShuffleButton)