'use client'
import { Row, Col } from "react-bootstrap"
import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react"

import SliderDrawer from '@/components/SliderDrawer/SliderDrawer';
import NextButton from "@/components/Me/Player/Next"
import PreviousButton from "@/components/Me/Player/Previous"
import ShuffleButton from "@/components/Me/Player/Shuffle"
import PlayPause from "@/components/Me/Player/PlayPause"
import RepeatButton from '@/components/Me/Player/Repeat';
import DevicesButton from "@/components/Me/Player/DevicesButton"
import Listening from '@/components/Devices/Listening';
import ProgressBar from '@/components/Devices/ProgressBar';
import Volume from "@/components/Devices/Volume"
import PlayerRecap from './PlayerRecap';
import QueueButton from "./QueueButton";
import PlayingTrack from './PlayingTrack';

import style from "./Player.module.scss"
import { useSpotifyPlayer } from '@/contexts/SpotifyPlayerContext';

function Player() {
  const { player, track, activeDevice } = useSpotifyPlayer();
  const [showRecap, setShowRecap] = useState(false)
  const device = activeDevice
  const pathname = usePathname()

  useEffect(() => {
    setShowRecap(false)
  }, [pathname])

  return (
    <div className={`player-wrapp ${style.playerWrapp} ${style.playerWrappHasPlayer} ${device?.name ? style.playerWrappHasListening : ''}`}>
      <div className={`player-wrapp-content ${style.playerWrappContent}`}>
        <Row className="h-100 align-items-center">
          <Col xs={9} lg={3} className={`player-wrapp-content`}>
            <PlayingTrack track={track} handleClick={() => setShowRecap(true)} />
          </Col>
          <Col xs lg={6}>
            <div className='d-flex align-items-center justify-content-end justify-content-lg-center mt-lg-2'>
              <div className={`${style.playerWrappContentValueItem} d-none d-lg-block`}>
                <ShuffleButton className="btn btn-none" />
              </div>
              <div className={`${style.playerWrappContentValueItem} d-none d-lg-block`}>
                <PreviousButton className="btn btn-none" />
              </div>
              <div className={`${style.playerWrappContentValueItem} d-block d-lg-none  me-3`}>
                <DevicesButton color={pathname === '/player/devices' ? '#1ed760' : ''} />
              </div>
              <div className={`${style.playerWrappContentValueItem}`}>
                <PlayPause disabled={!activeDevice?.id} element={player} />
              </div>
              <div className={`${style.playerWrappContentValueItem} d-none d-lg-block`}>
                <NextButton className="btn btn-none" disabled={!activeDevice?.id} />
              </div>
              <div className={`${style.playerWrappContentValueItem} d-none d-lg-block`}>
                <RepeatButton className="btn btn-none" />
              </div>
            </div>
            <div className={`${style.playerWrappContentValueItemProgress} d-none d-lg-block mt-3`}>
              <ProgressBar key={player?.progress_ms} startAt={player?.progress_ms || 0} max={player?.item?.duration_ms} />
            </div>
          </Col>
          <Col md={3} className='align-items-center justify-content-end d-none d-lg-flex'>
            <div className={` ${style.playerWrappContentValueItem}`}>
              <DevicesButton color={pathname === '/player/devices' ? '#1ed760' : ''} />
            </div>
            <div className={` ${style.playerWrappContentValueItem}`}>
              <QueueButton color={pathname === '/player/queue' ? '#1ed760' : ''} />
            </div>
            <div className={` ${style.playerWrappContentValueItem}`}>
              {
                player?.device?.supports_volume ?
                  <Volume deviceId={player?.device?.id} volume_percent={player?.device?.volume_percent} />
                : null
              }
            </div>
          </Col>
        </Row>
      </div>
      <SliderDrawer
        show={showRecap}
        onClose={(e) => setShowRecap(false)}
        title={<Listening />}
        className={`player-recap-slider ${style.recapPlayerSlider}`}>
        <PlayerRecap />
      </SliderDrawer>
    </div>
  )
}

export default Player