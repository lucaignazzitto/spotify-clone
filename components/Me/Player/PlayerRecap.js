'use client'
import { observer } from "mobx-react-lite"
import { usePathname } from 'next/navigation'
import ImageFit from "@/components/Image/Fit"
import SliderNavigation from "./Navigation/SliderNavigation"
import LinkToArtist from '@/components/Artists/LinkToArtist'
import LikeButton from '@/components/Buttons/Like'
import NextButton from "@/components/Me/Player/Next"
import PreviousButton from "@/components/Me/Player/Previous"
import PlayerStore from "@/stores/PlayerStore"
import ShuffleButton from "@/components/Me/Player/Shuffle"
import PlayPause from "@/components/Me/Player/PlayPause"
import RepeatButton from '@/components/Me/Player/Repeat';
import DevicesButton from "@/components/Me/Player/DevicesButton"
import ProgressBar from '@/components/Devices/ProgressBar';
import LyricsButton from '@/components/Me/Player/LyricsButton';
import Volume from "@/components/Devices/Volume"
import QueueButton from "./QueueButton";
import style from "./PlayerRecap.module.scss"

function PlayerRecap () {
  const pathname = usePathname()
  const player = PlayerStore.getPlayer
  
  const track = player?.item || {}
  const [large, medium, small ] = track?.album?.images || []
  const image = large || medium || small
  
  return (
    <div className={`player-recap ${style.recapPlayerWrapp}`}>
      <div className={`${style.recapPlayerWrappImage}`}>
        <SliderNavigation />
        {/* { image?.url ?
          <ImageFit url={image.url} />
          // <div style={{ backgroundImage: `url(${image.url})`}} />
          : null
        } */}
      </div>
      <div className={`${style.recapPlayerWrappContent}`}>
        <div className={`${style.recapPlayerWrappContentTrack}`}>
          <div className={`${style.recapPlayerWrappContentTrackTitle}`}>
            {track.explicit ? <span className="explicit me-2">E </span> : null }
            {track.name}
          </div>
          <div className={`${style.recapPlayerWrappContentTrackArtist}`}>
            <LinkToArtist artists={track.artists} />
          </div>
          <div className={`${style.recapPlayerWrappContentTrackLike}`}>
            <LikeButton ids={track.id} />
          </div>
        </div>
        <div className={`${style.recapPlayerWrappContentControllers}`}>
          <div className={`${style.recapPlayerWrappContentTrackers}`}>
            <div className={`${style.recapPlayerWrappContentActions}`}>
              <ShuffleButton className="btn btn-none" />
            </div>
            <div className={`${style.recapPlayerWrappContentActions} `}>
              <PreviousButton className="btn btn-none" refreshOnComplete={false} />
            </div>
            <div className={`${style.recapPlayerWrappContentActions}`}>
              <PlayPause
                deviceId={PlayerStore.getPlayerId}
                disabled={!PlayerStore.getPlayerId}
                position_ms={player.progress_ms}
                offsetPosition={player?.item?.track_number || 0}
                element={player}
              />
            </div>
            <div className={`${style.recapPlayerWrappContentActions}`}>
              <NextButton className="btn btn-none" refreshOnComplete={false} />
            </div>
            <div className={`${style.recapPlayerWrappContentActions}`}>
              <RepeatButton className="btn btn-none" />
            </div>
          </div>
          <div className={`${style.recapPlayerWrappContentProgress}`}>
            <ProgressBar isPlaying={player.is_playing} startAt={player.progress_ms} max={player?.item?.duration_ms} />
          </div>
          <div className={`${style.recapPlayerWrappContentDevices}`}>
            <div className={` ${style.recapPlayerWrappContentActions}`}>
                <DevicesButton color={pathname === '/player/devices' ? '#1ed760' : '' } />
              </div>
              <div className={` ${style.recapPlayerWrappContentActions}`}>
                <LyricsButton track={player?.item || {}} color={pathname === '/player/lyrics' ? '#1ed760' : '' } />
              </div>
              <div className={` ${style.recapPlayerWrappContentActions}`}>
                <QueueButton color={pathname === '/player/queue' ? '#1ed760' : '' } />
              </div>
              <div className={` ${style.recapPlayerWrappContentActions} ${style.recapPlayerWrappContentActionsVolume}`}>
                <Volume deviceId={player?.device?.id} volume_percent={player?.device?.volume_percent} />
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(PlayerRecap)