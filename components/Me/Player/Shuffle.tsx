'use client'
import { observer } from "mobx-react-lite"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Spinner from "@/components/Loader/Spinner"
import PlayerStore from "@/stores/PlayerStore"
import Icon from '@/components/Image/Icon'
import Button from "@/components/Buttons/Button"
import { useSpotifyPlayer } from "@/contexts/SpotifyPlayerContext"

/**
 * set shuffle
 */
function ShuffleButton({ className = "btn btn-none", iconSize }: { className?: string, iconSize?: number }) {
  const { player, deviceId, shuffle, loadPlayer } = useSpotifyPlayer()

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const shuffleState = useMemo(() => {
    return player?.shuffle_state || false
  }, [player])

  const handleClick = () => {
    setLoading(true)
    return shuffle(deviceId, !shuffleState)
      .then(async () => {
        // reload player
        await loadPlayer()
        router.refresh()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Button
      className={`hover-anim ${className}`}
      role="button"
      disabled={!deviceId}
      aria-label="Shuffle list"
      text={
        loading ? <Spinner show={true} />
          : <Icon id='shuffle' color={shuffleState ? '#1ed760' : ''} width={iconSize} height={iconSize} />
      }
      onClick={handleClick}
    />
  )
}

export default observer(ShuffleButton)