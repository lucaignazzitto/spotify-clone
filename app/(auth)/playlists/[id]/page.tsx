import { cookies } from 'next/headers'
import Container from 'react-bootstrap/Container'
import pageBg from "@/public/images/bubble-3.jpg"
import GernericAlbumHero from "@/components/Hero/Album/GenericHero"
import BackgroundHandler from '@/components/Backound/Handler'
import { PlaylistInterface } from '@/lib/models/playlist.interface'
import Track from '@/components/Tracks/Track'
import { TrackInterface } from '@/lib/models/track.interface'
import { cache } from 'react'
import { Metadata } from 'next'

const loadPlaylist = cache(async (id) => {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/playlists/${id}?market=IT`, {
    headers: { Cookie: (await cookies()).toString() },
    next: {
      tags: ['user-playlist']
    }
  })

  if (response.ok) {
    return response.json()
      .then((res) => {
        return res
      })
  } else {
    return []
  }
})

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const playlist = await loadPlaylist(id) as PlaylistInterface

  return {
    title: playlist.name,
    description: playlist.description
  }
}

export default async function Playlist({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const playlist = await loadPlaylist(id) as PlaylistInterface

  return (
    <Container fluid className={"mb-5"}>
      <BackgroundHandler src={pageBg} />
      <GernericAlbumHero album={playlist} type={playlist.type} />
      <div className='mt-5'>
        {
          playlist?.tracks?.items?.map(({ track }: { track: TrackInterface }, index: number) => (
            <Track
              key={`${index}-${track.id}`}
              track={track}
              from={"playlist"}
              parentUri={playlist.uri}
              playlistId={playlist.id}
              showImage={true}
              showOptions={true}
              className={"mt-4 mb-2"}
            />
          ))
        }
      </div>
    </Container>
  )
}
