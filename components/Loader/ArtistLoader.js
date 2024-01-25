import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Placeholder from '@/components/Loader/Placeholder';

export default function ArtistLoader ({ times = 4, direction = "horizontal", title, className = "", ...props }) {
  const isHorizontal = direction === 'horizontal'

  return (
    <div className={className}>
      { title ? <span className={`section-title`}>{title}</span> : null }
      <Row className={title ? 'mt-5' : ''}>
        {
          Array.from(Array(times).keys()).map((t, index) => (
            <Col
              md={ isHorizontal ? (12 / times) : 12}
              key={index}
              className="mb-4"
              { ...props }
            >
              <Placeholder xs={12} className="image-fit-wrapp" />
              <Placeholder xs={8} className="mt-2" />
            </Col>
          ))
        }
      </Row>
    </div>
  )
}