import Album from '@/components/Albums/Album'
import GenericSlider from '@/components/Slider/GenericSlider'
import GenericAlbumsLoader from '@/components/Loader/GenericAlbumsLoader'
import { AlbumInterface } from '@/lib/models/album.inteface'

type Props = {
  albums: AlbumInterface[],
  useType?: boolean
  useLinkToArtist?: boolean
  className?: string
  title?: string
  isLoading?: boolean
}

export default function Albums ({
  albums = [],
  className = "",
  title,
  useType = false,
  useLinkToArtist = false,
  isLoading = false,
}: Props) {
  return (
    <div className={className}>
      { title ? <div className='mb-3 mb-lg-4'>{title}</div> : null }
      {
        isLoading ? <GenericAlbumsLoader />
        :
        albums && albums.length ?
          <GenericSlider>
            {
              albums.map((album, index) => (
                <Album album={album} key={index} useLinkToArtist={useLinkToArtist} useType={useType} />
              ))
            }
          </GenericSlider>
        : <p>No Albums found</p>
      }
    </div>
  )
}