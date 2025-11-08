'use client'
import { observer } from "mobx-react-lite"
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Spinner from "@/components/Loader/Spinner";
import PlayerStore from "@/stores/PlayerStore"
import Icon from '@/components/Image/Icon'
import Button from "@/components/Buttons/Button"

/**
 * go to next track
 */
function NextButton ({ className = "", refreshOnComplete = true }) {
  const [ loading, setLoading ] = useState(false) 
  const router = useRouter()
  const deviceId = PlayerStore.getPlayerId

  const handleClick = (e) => {
    e.preventDefault()
    setLoading(true)
    return PlayerStore.next(deviceId)
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
      text={
        loading ? <Spinner show={true}  />
        : <Icon id='track-next'></Icon>
      }
      onClick={handleClick}
    />
  )
}

export default observer(NextButton)