"use client"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Placeholder from '@/components/Loader/Placeholder';

type Props = {
  times?: number
  direction?: "vertical" | "horizontal"
  title?: string
  className?: string
}

export default function TracksLoader ({ times = 4, direction = "horizontal", title = "", className = "" }: Props) {
  const isHorizontal = direction === 'horizontal'

  return (
    <div className={className}>
      { title ? <span className={`section-title`}>{title}</span> : null }
      <Row className={`${title ? 'mt-3 mt-lg-4' : ''}`}>
        {
          Array.from(Array(times).keys()).map((t, index) => (
            <Col
              md={ isHorizontal ? (12 / times) : 12}
              key={index}
              className="mb-4"
            >
              <Row className='px-2 align-items-center'>
                <Col xs={6}>
                  <Placeholder xs={10}/>
                  <Placeholder xs={3} className="mt-2"/>
                </Col>
                <Col xs={5} className='offset-1 text-end'>
                  <Placeholder xs={8} />
                </Col>
              </Row>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}