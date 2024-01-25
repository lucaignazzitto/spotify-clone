import { Row, Col } from 'react-bootstrap'
import Album from '@/components/Albums/Album'
import GenericSlider from '@/components/Slider/GenericSlider'
import GenericAlbumsLoader from '@/components/Loader/GenericAlbumsLoader'

export default function Albums ({
  direction = "vertical",
  itemsPerRow = 4,
  albums = [],
  className = "",
  title,
  isLoading = false,
}) {
  const isHorizontal = direction === 'horizontal'

  return (
    <div className={className}>
      { title ? <div>{title}</div> : null }
      {
        isLoading ? <GenericAlbumsLoader />
        :
        albums && albums.length ?
          <GenericSlider>
            {
              albums.map((album, index) => (
                <Album album={album} key={index} />
              ))
            }
          </GenericSlider>
        : <p>No Albums found</p>
      }
    </div>
  )
}