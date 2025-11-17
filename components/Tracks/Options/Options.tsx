'use client'
import { toast } from 'react-toastify';
import Icon from "@/components/Image/Icon"
import LikeButton from '@/components/Buttons/Like'
import style from './Options.module.scss'
import HttpProvider from "@/services/HttpProvider"
import { TrackInterface } from '@/lib/models/track.interface';
import { useSpotifyPlayer } from '@/contexts/SpotifyPlayerContext';
import PlaylistTrackManager from '@/components/Playlists/Track/Manager';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  track: TrackInterface,
  from: string
  playlistId: string
}

function TrackOptions({ track, from = "album", playlistId }: Props) {
  const { deviceId, addToQueue: SpotifyAddToQueue } = useSpotifyPlayer()
  const [showModalPlaylists, setShowModalPlaylists] = useState<boolean>(false)
  const router = useRouter()

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

  const removeFromPlaylist = () => {
    return HttpProvider.delete(`/api/playlists/${playlistId}/tracks`, {
      data: {
        tracks: [track?.uri]
      }
    })
      .then((res) => {
        toast.success(`${track.name} removed from playlist`)
        router.refresh()
      })
  }

  return (
    <div className={style.Options}>
      <ul className="nav">
        <li className='list-hoverable' onClick={addToQueue}>
          <Icon id="add-queue" width={20} />
          <span>Add to queue</span>
        </li>
        <li className='list-hoverable'>
          <button className="btn btn-none fs-12 cl-white w-100 gap-3 align-items-center" onClick={() => { setShowModalPlaylists(true) }}>
            <Icon id="plus" width={20} />
            <span>Add to playlist</span>
          </button>
        </li>
        {
          from === "playlist" ?
            <li className='list-hoverable' onClick={removeFromPlaylist}>
              <Icon id="trash" width={20} />
              <span>Remove from playlist</span>
            </li>
            : null
        }
        <li className='list-hoverable'>
          <LikeButton ids={track.id} label={<span>Add to liked song</span>} animate={false} className='fs-12 cl-white w-100 gap-3' aria-label={`Save track ${track.name}`} />
        </li>
        <li className='list-hoverable' onClick={() => copyUrl()}>
          <Icon id="copy" width={20} />
          <span>Copy url</span>
        </li>
        <li className='border-top w-100 mt-2'>
          <a href={track?.external_urls?.spotify} className='list-hoverable' target="_blank">
            <Icon id="logo" width={20} />
            <span>Open on browser</span>
          </a>
        </li>
      </ul>

      <PlaylistTrackManager.Drawer show={showModalPlaylists} onClose={() => setShowModalPlaylists(false)} track={track} />
    </div>
  )
}

export default TrackOptions