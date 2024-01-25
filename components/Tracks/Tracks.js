import { Row, Col } from 'react-bootstrap'
import Track from '@/components/Tracks/Track'
import TracksLoader from '@/components/Loader/TracksLoader'

export default function Tracks ({
  tracks = [],
  className = "",
  title,
  showImage = false,
  showActive = true,
  showNumber = false,
  showOptions = false,
  from = "album",
  playlistId = "",
  useLoopAsNumber = false,
  isLoading
}) {
  return (
    <div className={`tracks ${className}`}>
      { title ? <div>{title}</div> : null }
      <Row className={`${title ? 'mt-5' : ''}`}>
        {
          isLoading ? <TracksLoader direction={"vertical"} />
          :
          tracks && tracks.length ?
            tracks.map((track, index) => (
              <Col xs={12} key={index}>
                <Track
                  track={track}
                  from={from}
                  playlistId={playlistId}
                  showImage={showImage}
                  showActive={showActive}
                  showNumber={showNumber}
                  showOptions={showOptions}
                  numberLabel={useLoopAsNumber ? index + 1 : ''} />
              </Col>
            ))
            : <p>No tracks found</p>
        }
      </Row>
    </div>
  )
}