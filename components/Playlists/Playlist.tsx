import Link from "next/link"
import PlayPause from "@/components/Me/Player/PlayPause"
import ImageFit from "@/components/Image/Fit"
import style from "@/components/Playlists/GenericPlaylist.module.scss"
import { mediaPlaceholder } from "@/utils/helpers"
import { PlaylistInterface } from "@/lib/models/playlist.interface"

interface Props {
  playlist: PlaylistInterface
}

export default function Playlist({ playlist }: Props) {
  const [big, medium, small] = playlist?.images
  const image = big || medium || small

  return (
    <div className={style.playlistWrapp}>
      <Link href={`/playlists/${playlist.id}`}>
        <div className={style.playlistWrappInner}>
          <div className={style.playlistWrappInnerMedia}>
            <ImageFit
              url={image?.url}
              alt={`${playlist.name} playlist cover `}
              placeholder="blur"
              blurDataURL={mediaPlaceholder}
            />
            <PlayPause element={playlist} animate={false} className={style.playlistWrappInnerMediaPlayer} />
          </div>
          <div className={style.playlistWrappInnerTitle}>
            {playlist.name} • {playlist.tracks.total} tracks
          </div>
          <div className={style.playlistWrappInnerSubTitle}>
            <span>Created by: {playlist.owner.display_name}</span>
            <div>{playlist.description}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}