'use client'
import { observer } from "mobx-react-lite"
import { useRouter } from "next/navigation"
import { useState } from "react";
import Spinner from "@/components/Loader/Spinner"
import PlayerStore from "@/stores/PlayerStore"
import Icon from '@/components/Image/Icon'
import Button from "@/components/Buttons/Button"

/**
 * go to previous track
 */
function PreviousButton ({ className = "", refreshOnComplete = true }) {
  const [ loading, setLoading ] = useState(false)
  const router = useRouter()
  const deviceId = PlayerStore.getPlayerId

  const handleClick = (e) => {
    e.preventDefault()
    setLoading(true)
    return PlayerStore.previous(deviceId)
      .then((res) => {
        refreshOnComplete && router.refresh()
        return res
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Button
      className={`hover-anim ${className}`}
      disabled={!deviceId}
      aria-label="Previous song"
      text={
        loading ? <Spinner show={true}  />
        : <Icon id='track-prev'></Icon>
      }
      onClick={handleClick}
    />
  )
}

export default observer(PreviousButton)