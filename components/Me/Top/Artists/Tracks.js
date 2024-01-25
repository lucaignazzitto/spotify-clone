import { Row, Col } from 'react-bootstrap'
import Track from '@/components/Tracks/Track'
import TracksLoader from '@/components/Loader/TracksLoader'

export default function Tracks ({ direction = "vertical", itemsPerRow = 4, tracks = [], className = "", title, showImage = false, showNumber = false, isLoading }) {
  const isHorizontal = direction === 'horizontal'

  return (
    <Row className={className}>
      { title ? <div>{title}</div> : null }
      {
        isLoading ? <TracksLoader direction={direction} />
        :
        tracks && tracks.length ?
          tracks.map((track, index) => (
            <Col
            xs={isHorizontal ? (36 / itemsPerRow) : 12}
            md={isHorizontal ? (24 / itemsPerRow) : 12}
            lg={ isHorizontal ? (12 / itemsPerRow) : 12}
            key={index}>
              <Track track={track} showImage={showImage} showNumber={showNumber} />
            </Col>
          ))
          : <p>No tracks found</p>
      }
    </Row>
  )
}