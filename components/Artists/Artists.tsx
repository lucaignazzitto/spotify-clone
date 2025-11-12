import Artist from '@/components/Artists/Artist'
import GenericSlider from '@/components/Slider/GenericSlider'
import ArtistLoader from '@/components/Loader/ArtistLoader'
import { ArtistInterface } from '@/lib/models/artist.inteface'
import { ReactNode } from 'react'

type Props = {
  direction: "vertical" | "horizontal"
  itemsPerRow?: number
  artists?: ArtistInterface[]
  className?: string
  title?: string | ReactNode
  showType?: boolean
  isLoading?: boolean
}

export default function Artists ({
  direction = "vertical",
  itemsPerRow = 4,
  artists = [],
  className = "",
  title,
  showType = false,
  isLoading = false
}: Props) {
  return (
    <div className={className}>
      { title ? <div className='mb-3 mb-lg-4'>{title}</div> : null }
      {
        isLoading ? <ArtistLoader itemsPerRow={1} direction={direction} />
        :
        artists && artists.length ?
          <GenericSlider slidesPerView={itemsPerRow}>
            {
              artists.map((artist, index) => (
                <Artist artist={artist} showType={showType} key={index}/>
              ))
            }
          </GenericSlider>
        : <p>No artists found</p>
      }
    </div>
  )
}