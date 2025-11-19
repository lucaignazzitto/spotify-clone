import { cookies } from 'next/headers'
import GenericAlbums from '@/components/Albums/GenericAlbums'
import { AlbumInterface, IncludesGroup } from '@/lib/models/album.inteface'
import { ArtistInterface } from '@/lib/models/artist.inteface'
import Link from 'next/link'
import AlbumTypesPicker from '@/components/Albums/AlbumTypesPicker'

const LIMIT = 15
const MARKET = 'IT'

export async function loadAlbum({ artistId, limit = LIMIT, include_groups }: { artistId: ArtistInterface['id'], limit?: string | number, include_groups?: IncludesGroup }) {
  const params = new URLSearchParams();
  params.append("limit", `${limit}`)
  params.append("market", MARKET)
  include_groups && params.append("include_groups", include_groups)

  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/artists/${artistId}/albums?${params.toString()}`, {
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

export default async function Albums({ artistId, group = "album" }: { artistId: ArtistInterface['id'], group?: IncludesGroup }) {
  const albums = await loadAlbum({ artistId, include_groups: group }) as AlbumInterface[]
  const albumsAppears = await loadAlbum({ artistId, include_groups: 'appears_on' }) as AlbumInterface[]

  return (
    <div>
      <div>
        <div className='d-flex align-items-center justify-content-between'>
          <span className={`section-title`}>Discography</span>
          <Link href={`/artists/${artistId}/album/${group}`} className='fs-14 text-muted'>View all</Link>
        </div>
        <div className='d-flex align-items-center gap-3 mt-3'>
          <AlbumTypesPicker activeGroup={group} />
        </div>
        <div className={"w-100 mt-4"}>
          <GenericAlbums albums={albums} key={group} />
        </div>
      </div>
      <div className='mt-5 pt-4'>
        <div className='d-flex align-items-center justify-content-between'>
          <span className={`section-title`}>Discovered also in</span>
          <Link href={`/artists/${artistId}/album/appears_on`} className='fs-14 text-muted'>View all</Link>
        </div>
        <div className={"w-100 mt-4"}>
          <GenericAlbums albums={albumsAppears} />
        </div>
      </div>
    </div>
  )
}