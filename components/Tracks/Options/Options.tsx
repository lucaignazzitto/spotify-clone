'use client'
import { toast } from 'react-toastify';
import { observer } from "mobx-react-lite"
import { useState } from 'react';
import Track from '../Track';
import Spinner from '@/components/Loader/Spinner';
import PlayerStore from "@/stores/PlayerStore"
import UserStore from "@/stores/UserStore"
import Icon from "@/components/Image/Icon"
import SliderDrawer from '@/components/SliderDrawer/SliderDrawer';
import LikeButton from '@/components/Buttons/Like'
import Image from 'next/image';

import style from './Options.module.scss'
import { useRouter } from 'next/navigation';
import { mediaPlaceholder } from '@/utils/helpers';
import { TrackInterface } from '@/lib/models/track.interface';
import { PlaylistInterface } from '@/lib/models/playlist.interface';
import { useSpotifyPlayer } from '@/contexts/SpotifyPlayerContext';

interface Props {
  track: TrackInterface,
  from: string
  playlistId: string
}

function TrackOptions({ track, from = "album", playlistId }: Props) {
  const { deviceId, addToQueue: SpotifyAddToQueue, } = useSpotifyPlayer()
  const router = useRouter();
  const [showModalPlaylists, setShowModalPlaylists] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [playlistLoading, setPlaylistLoading] = useState<PlaylistInterface['id']>()
  const [playlists, setPlaylists] = useState<PlaylistInterface[]>([])

  const addToQueue = () => {
    return SpotifyAddToQueue(deviceId, track?.uri)
      .then(() => {
        toast.success(`${track.name} added to queue`)
      })
  }

  const copyUrl = (url = track?.external_urls?.spotify) => {
    // copy to clipboard
    if (url) {
      navigator.clipboard.writeText(url)
      toast.success(`Url copied to clipboard`)
    } else {
      toast.error(`No url found`)
    }
  }

  const getPlaylistImage = (playlist) => {
    const [large, medium, small] = playlist?.images || []
    return small || medium || large
  }

  const togglePlaylist = (toggle) => {
    setShowModalPlaylists(toggle)
    if (toggle) {
      return loadPlaylists()
    }
  }

  const loadPlaylists = () => {
    playlists.length === 0 && setLoading(true)
    return UserStore.loadPlaylists()
      .then((res) => {
        setPlaylists(res?.items?.user || [])
        return res
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const addToPlaylist = (e, { playlist_id }) => {
    e.preventDefault()
    e.stopPropagation()
    setPlaylistLoading(playlist_id)
    return UserStore.addToPlaylist({ playlist_id, tracks: [track?.uri] })
      .then(() => {
        toast.success(`${track.name} added to playlist`)
      })
      .finally(() => {
        setPlaylistLoading(null)
      })
  }

  const removeFromPlaylist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    return UserStore.removeFromPlaylist({ playlist_id: playlistId, tracks: [track?.uri] })
      .then(() => {
        toast.success(`${track.name} added to playlist`)
        router.refresh()
      })
  }

  const createPlaylist = () => {
    console.log('createPlaylist')
  }

  return (
    <div className={style.Options}>
      <ul className="nav">
        <li onClick={addToQueue}>
          <Icon id="add-queue" width={20} />
          <span>Add to queue</span>
        </li>
        <li>
          <button className="btn btn-none as-li" onClick={() => togglePlaylist(true)}>
            <Icon id="plus" width={20} />
            <span>Add to playlist</span>
          </button>
        </li>
        {
          from === "playlist" ?
            <li>
              <button className="btn btn-none as-li" onClick={(e) => removeFromPlaylist(e)}>
                <Icon id="trash" width={20} />
                <span>Remove from playlist</span>
              </button>
            </li>
            : null
        }
        <li>
          <LikeButton ids={track.id} label={<span>Add to liked song</span>} animate={false} className="as-li" aria-label={`Save track ${track.name}`} />
        </li>
        <li onClick={() => copyUrl()}>
          <Icon id="copy" width={20} />
          <span>Copy url</span>
        </li>
        <li className="divider">
          <a href={track?.external_urls?.spotify} className="as-li" target="_blank">
            <Icon id="logo" width={20} />
            <span>Open on browser</span>
          </a>
        </li>
      </ul>

      <SliderDrawer
        show={showModalPlaylists}
        placement="end"
        title='Add track to playlist'
        className={style.OptionsModal}
        onClose={(e) => togglePlaylist(false)}
      >
        <div className={`${style.OptionsModalBodyContent} popover-body`}>
          <ul className={style.OptionsModalBodyContentListTop}>
            <li>
              <button className="btn btn-none as-li" onClick={() => createPlaylist()}>
                <Icon id="plus" width={20} />
                <span>New playlist</span>
              </button>
            </li>
          </ul>
          <Spinner show={loading} className={style.OptionsModalBodyContentLoader} />
          <ul className={style.OptionsModalBodyContentList}>
            {
              playlists.map((playlist, index) => (
                <li key={playlist.id || index} className={style.OptionsModalBodyContentListItem}>
                  <button className='btn btn-none as-li' onClick={(e) => addToPlaylist(e, { playlist_id: playlist.id })}>
                    <div className={style.OptionsModalBodyContentListItemImage}>
                      {
                        playlistLoading === playlist.id ? <Spinner show={true} />
                          : <Image src={getPlaylistImage(playlist)?.url} width={60} height={60} placeholder='blur' blurDataURL={mediaPlaceholder} loading="lazy" alt={`Playlist ${playlist.name}`} style={{ borderRadius: '8px' }} className='img-fluid' />
                      }
                    </div>
                    <span>{playlist.name}</span>
                  </button>
                </li>
              ))
            }
          </ul>
          <Track track={track} useHoverAnimation={false} showImage={false} showLike={false} showDuration={false} showPlay={false} className={style.OptionsModalBodyContentListTrack} />
        </div>
      </SliderDrawer>
    </div>
  )
}

export default observer(TrackOptions)