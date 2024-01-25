'use client'
import HttpProvider from "@/services/HttpProvider"
import { Row, Col } from "react-bootstrap"
import { usePathname } from 'next/navigation'
import { useEffect, useMemo } from "react"
import PlayerStore from "@/stores/PlayerStore"
import Controllers from "./Controllers"
import Track from '@/components/Tracks/Track'
import style from "./Player.module.scss"

export default function CurrentPlaying () {
  const pathname = usePathname()

  const player = useMemo(() => {
    return PlayerStore.getPlayer || {}
  }, [PlayerStore.getPlayer])

  const hasPlayer = useMemo(() => {
    return Object.keys(PlayerStore.getPlayer).length > 0 || false
  }, [PlayerStore.getPlayer])

  const load = () => {
    return HttpProvider.get(`/api/me/player/currently-playing`, {
      params: {
        market: 'IT'
      }
    })
      .then((res) => {
        const p = res.data.playing
        if (Object.keys(p).length) {
          PlayerStore.setPlayer(p)
        }        
      })
  }

  const handleRefreshPlayer = (e) => {
    e && e.preventDefault()
    return load()
  }

  useEffect(() => {
    load()
  }, [pathname])

  return (
    <div className={`player-wrapp ${style.playerWrapp} ${hasPlayer ? style.playerWrappHasPlayer : ''}`}>
      <div className={`player-wrapp-content ${style.playerWrappContent}`}>
        {
          hasPlayer ? 
            <Row className="w-100 align-items-center">
              <Col md={4} lg={3} className={`player-wrapp-content ${style.playerWrappContentCol1}`}>
                <Track track={player.item} showImage={true} className={style.playerWrappContentValueTrack} />
              </Col>
              <Col md={4}>
                <Controllers player={player} onRefreshPlayer={handleRefreshPlayer} />
              </Col>
            </Row>
          :
          null
        }
      </div>
    </div>
  )
}