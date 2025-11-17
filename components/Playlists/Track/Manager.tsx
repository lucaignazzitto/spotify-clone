"use client"
import { DeviceInterface } from '@/lib/models/devices.interface'
import { Modal } from 'react-bootstrap'
import { useCallback, useEffect, useState } from 'react'
import { TrackInterface } from '@/lib/models/track.interface'
import HttpProvider from "@/services/HttpProvider"
import style from './Manager.module.scss'
import PlaylistList from './List'
import Icon from '@/components/Image/Icon'
import SliderDrawer from '@/components/SliderDrawer/SliderDrawer'
import CreatePlaylist from '../Create'
import { PlaylistInterface } from '@/lib/models/playlist.interface'

interface PlaylistTrackManagerProps {
  track: TrackInterface
  devices?: DeviceInterface[],
  className?: string
}

interface AddModalProps extends React.ComponentProps<typeof Modal> { }

interface PlaylistTrackManagerDrawerProps extends Omit<React.ComponentProps<typeof SliderDrawer>, 'children'> { }

function AddModal({ track, onComplete, ...props }: AddModalProps) {
  const handleSubmit = (payload, addTrack, callback) => {
    return HttpProvider.post(`/api/me/playlists`, payload)
      .then((res) => {
        if (addTrack) {
          return onComplete({ playlist_id: res.data.id, track: addTrack ? track : undefined })
            .finally(() => {
              callback()
              props?.onHide()
            })
        }
      })
  }

  return (
    <Modal centered {...props}>
      <Modal.Header closeButton closeVariant="white" className='pt-4 pb-3 px-4' style={{ border: 'none' }}>
        <Modal.Title>
          <div>
            <span><b>Create new playlist</b></span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreatePlaylist track={track} onSubmit={handleSubmit} className="px-2 pb-3" />
      </Modal.Body>
    </Modal>
  )
}

function AddTrack({ track, title = "New playlist", icon = <Icon id="plus" width={20} />, onComplete = () => { } }: any) {
  const [toggleModal, setToggleModal] = useState<boolean>(false)
  return (
    <>
      <ul className={`nav ${style.addPlaylist}`}>
        <li className='list-hoverable' onClick={() => setToggleModal(true)}>
          {icon}
          <span>{title}</span>
        </li>
      </ul>
      <AddModal show={toggleModal} onHide={() => setToggleModal(false)} onComplete={onComplete} track={track} />
    </>
  )
}

const LIMIT = 12

function PlaylistTrackManager({ track }: PlaylistTrackManagerProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(0)
  const [playlists, setPlaylists] = useState<PlaylistInterface[]>([])

  const loadPlaylists = useCallback(() => {
    playlists.length === 0 && setLoading(true)
    return HttpProvider.get(`/api/me/playlists`, {
      params: {
        limit: LIMIT,
        offset
      }
    })
      .then((res) => {
        const { items = {}, total } = res.data || {}
        const userPlaylist = items?.user || []
        setHasMore((offset + LIMIT) < total)
        if (offset > 0) {
          setPlaylists(prev => [...prev, ...userPlaylist]);
        } else {
          setPlaylists(userPlaylist);
        }
        return res
      })
      .finally(() => {
        setLoading(false)
      })
  }, [offset])

  useEffect(() => {
    loadPlaylists()
  }, [loadPlaylists])

  const addToPlaylist = ({ playlist_id, track, position = 0 }) => {
    if (!playlist_id || !track?.uri) {
      if (offset !== 0) {
        setOffset(0)
      } else {
        loadPlaylists()
      }
      return
    }

    return HttpProvider.post(`/api/playlists/${playlist_id}/tracks`, {
      tracks: [track?.uri],
      position
    })
      .then((res) => {
        return res.data
      })
      .finally(() => loadPlaylists())
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <AddTrack track={track} onComplete={addToPlaylist} />
      <PlaylistList
        limit={LIMIT}
        playlists={playlists}
        track={track}
        canLoadMore={hasMore}
        loading={loading}
        onPlaylistClick={(playlistId) => ({ playlist_id: playlistId })}
        onLoadMore={() => setOffset((prev) => LIMIT + prev)}
      />
    </div>
  )
}

function PlaylistTrackManagerDrawer({ show, onClose, track, ...props }: PlaylistTrackManagerDrawerProps) {
  return (
    <SliderDrawer
      show={show}
      placement="end"
      title='Add track to playlist'
      onClose={onClose}
      onClick={(e) => e.stopPropagation()} // since is called under Options -> Options is under an overlayTrigger, prevent clicks to close all
      {...props}
    >
      <PlaylistTrackManager track={track} />
    </SliderDrawer>
  )
}

export type TrackPlaylistComponentType = typeof PlaylistTrackManager & {
  AddModal: typeof AddModal;
  Drawer: typeof PlaylistTrackManagerDrawer;
};

PlaylistTrackManager.AddModal = AddModal
PlaylistTrackManager.Drawer = PlaylistTrackManagerDrawer

export default PlaylistTrackManager