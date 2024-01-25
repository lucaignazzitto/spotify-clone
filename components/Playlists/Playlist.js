import Link from "next/link"
import PlayPause from "@/components/Me/Player/PlayPause"
import ImageFit from "@/components/Image/Fit.js"
import style from "@/components/Playlists/GenericPlaylist.module.scss"

export default function Playlist ({ playlist }) {
  const [ big, medium, small ] = playlist?.images
  const image = big || medium || small

  return (
    <div className={style.playlistWrapp}>
      <Link
      href={{
        pathname: `/playlists/${playlist.id}`
      }}>
        <div className={style.playlistWrappInner}>
          <div className={style.playlistWrappInnerMedia}>
            <ImageFit url={image?.url} alt={`${playlist.name} playlist cover `} />
            <PlayPause element={playlist} animate={false} className={style.playlistWrappInnerMediaPlayer} />
          </div>
          <div className={style.playlistWrappInnerTitle}>
            {playlist.name} • {playlist.tracks.total} tracks
          </div>
          <div className={style.playlistWrappInnerSubTitle}>
            <span>Created by: {playlist.owner.display_name}</span>
            <div>{playlist.description}</div>
            <span>{playlist.owner.followers?.total ? `- ${playlist.owner.followers.total}` : null}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}