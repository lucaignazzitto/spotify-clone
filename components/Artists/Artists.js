import Artist from '@/components/Artists/Artist'
import GenericSlider from '@/components/Slider/GenericSlider'
import ArtistLoader from '@/components/Loader/ArtistLoader'

export default function Artists ({ direction = "vertical", itemsPerRow = 4, artists = [], className = "", title, showType = false, isLoading }) {
  return (
    <div className={className}>
      { title ? <div>{title}</div> : null }
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