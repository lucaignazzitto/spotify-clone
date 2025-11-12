import { ArtistInterface } from '@/lib/models/artist.inteface'
import { AlbumInterface, IncludesGroup } from '@/lib/models/album.inteface'
import Album from '@/components/Albums/Album'
import { loadArtist } from '../../page'
import { loadAlbum } from '../../Albums/Albums'
import { Metadata } from 'next'
import { Col, Row, Stack } from 'react-bootstrap'
import AlbumTypesPicker from '@/components/Albums/AlbumTypesPicker'

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
        <AlbumTypesPicker activeGroup={group} redirectPath={(group) => `/artists/${id}/album/${group}`} />
      </Stack>
      <Row className="mt-4 gy-3">
        {
          albums && albums.length ?
            albums.map((album, index) => (
              <Col xs={6} md={4} lg={3} key={index}>
                <Album album={album} key={index} />
              </Col>
            ))
            : <p>No Albums found</p>
        }
      </Row>
    </div >
  )
}