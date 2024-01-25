'use client'
import { enableStaticRendering } from 'mobx-react-lite';
import { observer } from "mobx-react-lite"
import { Row, Col } from "react-bootstrap"
import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react"

import SliderDrawer from '@/components/SliderDrawer/SliderDrawer';
import NextButton from "@/components/Me/Player/Next"
import PreviousButton from "@/components/Me/Player/Previous"
import PlayerStore from "@/stores/PlayerStore"
import ShuffleButton from "@/components/Me/Player/Shuffle"
import PlayPause from "@/components/Me/Player/PlayPause"
import RepeatButton from '@/components/Me/Player/Repeat';
import DevicesButton from "@/components/Me/Player/DevicesButton"
import Listening from '@/components/Devices/Listening';
import ProgressBar from '@/components/Devices/ProgressBar';
import LyricsButton from './LyricsButton';
import Volume from "@/components/Devices/Volume"
import PlayerRecap from './PlayerRecap';
import QueueButton from "./QueueButton";
import PlayingTrack from './PlayingTrack';

import style from "./Player.module.scss"

const isServer = typeof window === 'undefined'
enableStaticRendering(isServer);

function Player () {
  // const [sdkPlayer, setSdkPlayer] = useState()

  const [isLoading, setIsLoading] = useState(true)
  const [showRecap, setShowRecap] = useState(false)
  const pathname = usePathname()

  const player = PlayerStore.getPlayer
  const device = PlayerStore.getActiveDevice
  const hasPlayer = Object.keys(player).length > 0
  const playState = player?.is_playing || false

  // const loadSdkPlayer = () => {
  //   const script = document.createElement("script");
  //   script.src = "https://sdk.scdn.co/spotify-player.js";
  //   script.async = true;
  //   const token = getCookie('accessToken')
  //   document.body.appendChild(script);

  //   window.onSpotifyWebPlaybackSDKReady = () => {
  //     const p = new window.Spotify.Player({
  //       name: `Luca great app`,
  //       getOAuthToken: cb => { cb(token); },
  //       volume: 0.5
  //     });

  //     setSdkPlayer(p);

  //     p.addListener('player_state_changed', ({ position, duration, track_window: { current_track } }) => {
  //       console.log('Currently Playing', current_track);
  //       console.log('Position in Song', position);
  //       console.log('Duration of Song', duration);
  //       PlayerStore.setPlayingTrack(current_track)
  //       PlayerStore.loadPlayer()
  //     });

  //     p.connect().then(success => {
  //       if (success) {
  //         console.log('The Web Playback SDK successfully connected to Spotify!');
  //       }
  //     })
  //   };
  // }

  const load = () => {
    return PlayerStore.loadPlayer()
      .finally(()  => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setShowRecap(false)
    // load()
  }, [pathname])

  useEffect(() => {
    // if (!sdkPlayer) {
    //   loadSdkPlayer()
    // } else {
    //   sdkPlayer.disconnect()
    // }

    const playerUpdater = setInterval(() => {
      load()
        .catch(() => {
          clearInterval(playerUpdater)
        })
    }, 4000);

    return () => {
      clearInterval(playerUpdater)
    }
  }, [])

  return (
    <div className={`player-wrapp ${style.playerWrapp} ${style.playerWrappHasPlayer} ${device?.name ? style.playerWrappHasListening : ''}`}>
      <div className={`player-wrapp-content ${style.playerWrappContent}`}>
        <Row className="h-100 align-items-center">
          <Col xs={9} lg={3} className={`player-wrapp-content`}>
            <PlayingTrack track={player?.item || {}} isLoading={isLoading} handleClick={() => setShowRecap(true)} />
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
                <DevicesButton color={pathname === '/player/devices' ? '#1ed760' : '' } />
              </div>
              <div className={`${style.playerWrappContentValueItem}`}>
                <PlayPause
                  deviceId={PlayerStore.getPlayerId}
                  disabled={!PlayerStore.getPlayerId}
                  position_ms={player.progress_ms}
                  offsetPosition={player?.item?.track_number || 0}
                  isPlaying={playState}
                  element={player}
                />
              </div>
              <div className={`${style.playerWrappContentValueItem} d-none d-lg-block`}>
                <NextButton className="btn btn-none" />
              </div>
              <div className={`${style.playerWrappContentValueItem} d-none d-lg-block`}>
                <RepeatButton className="btn btn-none" />
              </div>
            </div>
            <div className={`${style.playerWrappContentValueItemProgress} d-none d-lg-block mt-3`}>
              <ProgressBar isPlaying={playState} startAt={player.progress_ms} max={player?.item?.duration_ms} />
            </div>
          </Col>
          <Col md={3} className='align-items-center justify-content-end d-none d-lg-flex'>
            <div className={` ${style.playerWrappContentValueItem}`}>
              <LyricsButton track={player?.item || {}} color={pathname === '/player/lyrics' ? '#1ed760' : '' } />
            </div>
            <div className={` ${style.playerWrappContentValueItem}`}>
              <DevicesButton color={pathname === '/player/devices' ? '#1ed760' : '' } />
            </div>
            <div className={` ${style.playerWrappContentValueItem}`}>
              <QueueButton color={pathname === '/player/queue' ? '#1ed760' : '' } />
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

export default observer(Player)