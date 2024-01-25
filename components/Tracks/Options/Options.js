'use client'
import { toast } from 'react-toastify';
import { observer } from "mobx-react-lite"
import { useState } from 'react';
import Track from '../Track';
import Spinner from '@/components/Loader/Spinner';
import PlayerStore from "@/stores/PlayerStore"
import UserStore from "@/stores/UserStore"
import Icon from "@/components/Image/Icon"
import ImageFlat from "@/components/Image/FlatImage"
import SliderDrawer from '@/components/SliderDrawer/SliderDrawer';
import LikeButton from '@/components/Buttons/Like'

import style from './Options.module.scss'


function TrackOptions ({ track, from = "album", playlistId }) {
  const [showModalPlaylists, setShowModalPlaylists] = useState(false)
  const [loading, setLoading] = useState(false)
  const [playlistLoading, setPlaylistLoading] = useState()
  const [playlists, setPlaylists] = useState([])

  const addToQueue = () => {
    return PlayerStore.addToQueue(PlayerStore?.getPlayerId, track?.uri)
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
    const [ large, medium, small] = playlist?.images || []
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
    return UserStore.loadPlaylist()
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
      })
  }

  const createPlaylist = () => {
    console.log('asdasd')
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
          <LikeButton ids={track.id} label={<span>Add to liked song</span>} animate={false} className="as-li" />
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
                        : <ImageFlat src={getPlaylistImage(playlist)?.url} width={40} height={40} style={{ borderRadius:'8px' }} />
                      }
                    </div>
                    <span>{playlist.name}</span>
                  </button>
                </li>
              ))
            }
          </ul>
          <Track track={track} showImage={true} showLike={false} showDuration={false} className={style.OptionsModalBodyContentListTrack} />
        </div>
      </SliderDrawer>

      {/* <Modal
      show={showModalPlaylists}
      onHide={() => togglePlaylist(false)}
      centered
      className={style.OptionsModal}
      size="lg">
        <Modal.Body className={`${style.OptionsModalBody} popover`}>
          <div className={`${style.OptionsModalBodyContent} popover-body`}>
            <ul className={style.OptionsModalBodyContentListTop}>
              <li>
                <button className="btn btn-none as-li" onClick={() => createPlaylist()}>
                  <Icon id="plus" width={20} />
                  <span>New playlist</span>
                </button>
              </li>
            </ul>
            <ul className={style.OptionsModalBodyContentList}>
              <Spinner show={loading} />
              {
                playlists.map((playlist, index) => (
                  <li key={playlist.id || index} className={index === 0 ? 'divider' : ''}>
                    <button className='btn btn-none as-li' onClick={() => addToPlaylist({ playlist_id: playlist.id })}>
                      <ImageFlat src={getPlaylistImage(playlist)?.url} width={40} height={40} style={{ borderRadius:'8px' }} />
                      <span>{playlist.name}</span>
                    </button>
                  </li>
                ))
              }
            </ul>
          </div>
        </Modal.Body>
      </Modal> */}
    </div>
  )
}

export default observer(TrackOptions)