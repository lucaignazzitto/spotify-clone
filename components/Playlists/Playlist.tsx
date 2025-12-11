import Link from "next/link"
import PlayPause from "@/components/Me/Player/PlayPause"
import style from "@/components/Playlists/GenericPlaylist.module.scss"
import { mediaPlaceholder } from "@/utils/helpers"
import { PlaylistInterface } from "@/lib/models/playlist.interface"
import Image from "next/image"

interface Props {
  playlist: PlaylistInterface
}

export default function Playlist({ playlist }: Props) {
  const [big, medium, small] = playlist?.images || []
  const image = big || medium || small

  return (
    <div className={style.playlistWrapp}>
      <Link href={`/playlists/${playlist.id}`}>
        <div className={style.playlistWrappInner}>
          { image?.url &&
            <div className={style.playlistWrappInnerMedia}>
              <Image
                src={image.url}
                width={300}
                height={300}
                alt={`${playlist.name} playlist cover `}
                placeholder="blur"
                blurDataURL={mediaPlaceholder}
                className="img-fluid w-100"
                style={{ aspectRatio: 1 }}
              />
              <PlayPause element={playlist} animate={false} className={style.playlistWrappInnerMediaPlayer} aria-label={`Play playlist ${playlist.name}`} />
            </div>
          }
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