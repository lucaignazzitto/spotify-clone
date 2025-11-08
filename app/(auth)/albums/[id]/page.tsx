import { cookies } from 'next/headers'
import pageBg from "@/public/images/bubble-3.jpg"
import Tracks from "@/components/Tracks/Tracks"
import GernericAlbumHero from "@/components/Hero/Album/GenericHero"
import CopyRight from "@/components/CopyRight/CopyRight"
import { AlbumInterface } from '@/lib/models/album.inteface'
import style from "./Page.module.scss"
import BackgroundHandler from '@/components/Backound/Handler'
import { cache } from 'react'
import { Metadata } from 'next'

const loadAlbum = cache(async (id: AlbumInterface['id']) => {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/albums/${id}?market=IT`, {
    headers: { Cookie: (await cookies()).toString() as string },
    next: {
      revalidate: 3600,
      tags: ['artist-album']
    }
  })

  if (response.ok) {
    return response.json()
  } else {
    return []
  }
})

export async function generateMetadata({ params }: { params: Promise<{ id: AlbumInterface['id'] }>}): Promise<Metadata> {
  const { id } = await params
  const album = await loadAlbum(id) as AlbumInterface
  return {
    title: album.name
  }
}

export default async function Album({ params }: { params: Promise<{ id: AlbumInterface['id'] }>}) {
  const { id } = await params
  const album = await loadAlbum(id) as AlbumInterface

  return (
    <div className={style.AlbumPage}>
      <BackgroundHandler src={pageBg} />
      <div>
        <GernericAlbumHero album={album} type={album.type} />
        <div>
          <Tracks tracks={album?.tracks?.items} parentUri={album.uri} className={style.AlbumPageTracks} groupByDisc={true} showNumber={true} showOptions={true} />
          <CopyRight copyrights={album?.copyrights} />
        </div>
      </div>
    </div>
  )
}
