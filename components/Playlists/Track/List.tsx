'use client'
import { useCallback, useEffect, useState } from 'react';
import HttpProvider from "@/services/HttpProvider"
import Image from 'next/image';
import style from './Manager.module.scss'
import { mediaPlaceholder } from '@/utils/helpers';
import { TrackInterface } from '@/lib/models/track.interface';
import { PlaylistInterface } from '@/lib/models/playlist.interface';
import ThumbnailLoader from '../../Loader/ThumbnailLoader';
import Track from '@/components/Tracks/Track';

interface Props {
  limit?: number
  playlists?: PlaylistInterface[]
  track: TrackInterface,
  canLoadMore?: boolean,
  loading?: boolean,
  onLoadMore?: (offset: null) => void,
  onPlaylistClick?: (id: PlaylistInterface['id']) => void
}

function PlaylistList({
  limit = 5,
  playlists = [],
  track,
  loading,
  canLoadMore,
  onLoadMore = () => { },
  onPlaylistClick = () => { }
}: Props) {

  return (
    <div className={`${style.playlistThumbnails} popover-body`}>
      {loading && <ThumbnailLoader direction="vertical" times={limit} className='gap-3 px-2' />}
      <ul className={style.playlistThumbnailsList}>
        {
          playlists.map((playlist, index) => {
            const [large, medium, small] = playlist?.images || []
            const image = small || medium || large
            return (
              <li key={playlist.id || index} className={`${style.playlistThumbnailsListItem} list-hoverable`}>
                <div className={style.playlistThumbnailsListItemImage} onClick={() => onPlaylistClick(playlist.id)}>
                  <Image src={image?.url} width={60} height={60} placeholder='blur' blurDataURL={mediaPlaceholder} loading="lazy" alt={`Playlist ${playlist.name}`} style={{ borderRadius: '8px' }} className='img-fluid' />
                </div>
                <span>{playlist.name}</span>
              </li>
            )
          })
        }
      </ul>
      {
        canLoadMore &&
        <div className='text-center my-4'>
          <button className='btn btn-sm cl-white' onClick={onLoadMore}>Load more</button>
        </div>

      }
      <Track track={track} useHoverAnimation={false} showImage={false} showLike={false} showDuration={false} showPlay={false} className={style.playlistThumbnailsListTrack} />
    </div>
  )
}

export default PlaylistList