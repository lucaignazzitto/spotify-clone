"use client";
import Placeholder from '@/components/Loader/Placeholder';
import { Col, ColProps, Row } from 'react-bootstrap';

type Props = ColProps & {
  times?: number,
  direction?: "horizontal" | "vertical",
  title?: string,
  className?: string,
}

export default function ArtistLoader({ times = 4, direction = "horizontal", title, className = "", ...props }: Props) {
  const isHorizontal = direction === 'horizontal'

  return (
    <div className={className}>
      {title ? <span className={`section-title`}>{title}</span> : null}
      <Row className={title ? 'mt-5' : ''}>
        {
          Array.from(Array(times).keys()).map((t, index) => (
            <Col
              md={isHorizontal ? (12 / times) : 12}
              key={index}
              className="mb-4"
              {...props}
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