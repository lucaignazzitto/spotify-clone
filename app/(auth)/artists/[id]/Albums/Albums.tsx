import { cookies } from 'next/headers'
import GenericAlbums from '@/components/Albums/GenericAlbums'
import style from "./Albumns.module.scss"
import { AlbumInterface, IncludesGroup } from '@/lib/models/album.inteface'
import { ArtistInterface } from '@/lib/models/artist.inteface'
import Link from 'next/link'

const LIMIT = 15
const MARKET = 'IT'

const ALBUMNS_GROUP = [
  {
    group: 'album',
    title: 'Albums'
  },
  {
    group: 'single',
    title: 'Single and EP'
  },
  {
    group: 'compilation',
    title: 'Compilations'
  }
]

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
    <div className={style.albumsList}>
      <div>
        <div className='flex items-center justify-between'>
          <span className={`section-title`}>Discography</span>
          <Link href={`/artists/${artistId}/album/${group}`} className='text-sm text-gray-300!'>View all</Link>
        </div>
        <div className='flex items-center gap-3 mt-3'>
          {
            ALBUMNS_GROUP.map((type) => (
              <Link href={{ query: { group: type.group } }} scroll={false} key={type.group} className={`btn btn-small btn-rounded ${group === type.group ? 'btn-light' : 'btn-dark'} fs-12`}>{type.title}</Link>
            ))
          }
        </div>
        <div className={"w-full mt-8"}>
          <GenericAlbums albums={albums} />
        </div>
      </div>
      <div className='mt-5 pt-4'>
        <div className='flex items-center justify-between'>
          <span className={`section-title`}>Discovered also in</span>
          <Link href={`/artists/${artistId}/album/appears_on`} className='text-sm text-gray-300'>View all</Link>
        </div>
        <div className={"w-full mt-8"}>
          <GenericAlbums albums={albumsAppears} />
        </div>
      </div>
    </div>
  )
}