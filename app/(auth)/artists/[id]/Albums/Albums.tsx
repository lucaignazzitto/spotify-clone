import { cookies } from 'next/headers'
import GenericAlbums from '@/components/Albums/GenericAlbums'
import style from "./Albumns.module.scss"
import { AlbumInterface } from '@/lib/models/album.inteface'
import { ArtistInterface } from '@/lib/models/artist.inteface'

const limit = 8
const market = 'IT'

async function load (artistId: ArtistInterface['id']) {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/artists/${artistId}/albums?limit=${limit}&market=${market}`, {
    headers: { Cookie: (await cookies()).toString() },
    next: {
      revalidate: 3600,
      tags: ['artist-album']
    }
  })
   
  if (response.ok) {
    return response.json()
      .then((res) => {
        const { items = [] } = res
        return items as AlbumInterface[]
      })
  } else {
    return []
  }
}

export default async function Albums ({ artistId }: { artistId: ArtistInterface['id'] }) {
  const albums = await load(artistId) as AlbumInterface[]

  return (
    <div className={style.albumsList}>
      <span className={`section-title`}>Albums</span>
      <div className={style.albumsListWrapp}>
        <GenericAlbums albums={albums} />
      </div>
    </div>
  )
}