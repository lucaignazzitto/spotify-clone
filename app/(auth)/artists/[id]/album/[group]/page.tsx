import { ArtistInterface } from '@/lib/models/artist.inteface'
import { AlbumInterface, IncludesGroup } from '@/lib/models/album.inteface'
import { loadArtist } from '../../page'
import { loadAlbum } from '../../Albums/Albums'
import { Metadata } from 'next'
import { Stack } from 'react-bootstrap'
import AlbumTypesPicker from '@/components/Albums/AlbumTypesPicker'
import Albums from '@/components/Albums/GenericAlbums'

export async function generateMetadata({ params }: { params: Promise<{ id: ArtistInterface['id'] }> }): Promise<Metadata> {
  const { id } = await params
  const artist = await loadArtist(id) as ArtistInterface

  return {
    title: artist.name,
    keywords: artist.genres
  }
}

export default async function page({ params }: { params: Promise<{ id: ArtistInterface['id'], group: IncludesGroup }> }) {
  const { id, group } = await params
  const artist = await loadArtist(id) as ArtistInterface
  const albums = await loadAlbum({ artistId: id, include_groups: group }) as AlbumInterface[]

  return (
    <div>
      <h3 className='mb-3'>{artist?.name}</h3>
      <Stack direction="horizontal" gap={2}>
        <AlbumTypesPicker activeGroup={group} redirectPath={(group) => `/artists/${id}/album/${group}`} replace={true} />
      </Stack>
      <div className="mt-4 gy-3">
        <Albums albums={albums} useColumns />
      </div>
    </div >
  )
}