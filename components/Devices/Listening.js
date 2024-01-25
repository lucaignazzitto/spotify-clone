'use client'
import { enableStaticRendering } from 'mobx-react-lite';
import { observer } from "mobx-react-lite"
import Icon from '@/components/Image/Icon'
import PlayerStore from "@/stores/PlayerStore"

import style from "./Listening.module.scss"

const isServer = typeof window === 'undefined'
enableStaticRendering(isServer);

function Listening ({ className = "" }) {
  const device = PlayerStore.getActiveDevice

  return (
    device?.name ? 
      <div className={`${style.ListeningOn} ${className}`}>
        <Icon id="speaker-active" className={style.ListeningOnIcon}  />
        <b>{device?.name}</b>
      </div>
    : null
  )
}

export default observer(Listening)