'use client'
import { observer } from "mobx-react-lite"
import { useMemo, useState } from "react"
import Button from "@/components/Buttons/Button"
import Icon from '@/components/Image/Icon'
import Spinner from "@/components/Loader/Spinner"
import { useSpotifyPlayer } from "@/contexts/SpotifyPlayerContext"

interface PlayPauseProps {
  deviceId?: number | string,
  parentUri?: string,
  element: any, //@todo apply correct type
  className?: string,
  size?: string,
  animate?: boolean
  disabled?: boolean
}

/**
 * Start a new context or resume current playback on the user's active device.
 * @param {string} [deviceId=""] The id of the device this command is targeting. If not supplied, the user's currently active device is the target.
 * @param {string} [contextUri=""] Optional. Spotify URI of the context to play. Valid contexts are albums, artists & playlists.
 * @param {string} [uris=""] Optional. A JSON array of the Spotify track URIs to play
 * @param {Object} [offset={}] Optional. Indicates from where in the context playback should start. Only available when context_uri corresponds to an album or playlist object "position" is zero based and can’t be negative. Example: "offset": {"position": 5} "uri" is a string representing the uri of the item to start at.
 * @param {String} [type="track"] Determinate what type of audio to reproduce ["track", "album", "playlist"]
 * @param {number} [position_ms=0] 
 * @param {Boolean} [animate=true] show animation on hover 
 * @param {string} [className=""] 
 * @param {() => void} [onClick=() => {}] 
 * @returns {JSX}
 */
function PlayPause({
  element,
  parentUri,
  className = "",
  size = "normal",
  animate = true,
  disabled = false,
  ...props
}: PlayPauseProps) {

  const { player, deviceId, isPlaying: spotifyIsPlaying, play: spotifyPlay, pause: spotifyPause } = useSpotifyPlayer() as any
  const [loading, setLoading] = useState(false)

  const isActive = useMemo(() => {
    const currentUris = [element?.context?.uri, element?.uri, element?.item?.uri].filter(uri => uri)
    if (player) {
      const playerUris = [player?.context?.uri, player.item?.uri, player?.album?.uri].filter(uri => uri)
      return player && currentUris.every((c) => playerUris.includes(c))
    } else {
      return false
    }
  }, [player, element])

  const isPlaying = useMemo(() => {
    return spotifyIsPlaying && isActive
  }, [player])

  /**
   * prepare payload to start or resume playback
   * if playback is playing -> pause
   * if playback is pause -> play*
   * *play
   * get current playng context from player
   * if is album or playlist
   *  populate context_uri with context uri
   *  populate position from player > track > track_number
   *  populate position_ms from player > progress_ms
   * if is track
   *  populate uri with context uri
   * @returns 
   */
  const preparePayloadByElement = () => {
    const progress = isActive ? player?.progress_ms || 0 : 0
    const trackUri = isActive ? player?.item?.uri : element?.item?.uri || element?.uri
    const type = element?.context?.type || element?.type || 'track'
    if (type && type !== "track" || parentUri) {
      // is album or playlist
      const albumUri = isActive ? player?.context?.uri || player?.item?.album?.uri : parentUri || element?.context?.uri || element?.uri
      const isTrackFromAlbum = trackUri.includes('track')
      return {
        context_uri: albumUri,
        offset: {
          [isTrackFromAlbum ? 'uri' : 'position']: isTrackFromAlbum ? trackUri : 0
        },
        position_ms: progress
      }
    } else {
      // is track
      return {
        uris: [trackUri],
        position_ms: progress
      }
    }
  }

  const play = () => {
    const params = preparePayloadByElement()
    return spotifyPlay(deviceId, params)
  }

  const pause = () => {
    return spotifyPause(deviceId)
  }

  const handleClick = (e) => {
    e && e.preventDefault()
    isPlaying ? pause() : play()
  }

  return (
    <Button
      className={`btn-none btn-play ${animate ? 'hover-anim' : ''} ${className} btn-play-${size} ${isPlaying ? 'is-playing' : ''}`}
      disabled={disabled}
      text={
        loading ? <Spinner show={loading}  />
        : <Icon id={ isPlaying ? 'track-play' : 'track-pause'}></Icon>
      }
      onClick={handleClick}
      {...props}
    />
  )
}

export default observer(PlayPause)