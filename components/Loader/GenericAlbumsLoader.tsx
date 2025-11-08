import Row from 'react-bootstrap/Row';
import Col, { ColProps } from 'react-bootstrap/Col';
import Placeholder from '@/components/Loader/Placeholder';

type Props = ColProps & {
  times?: number
  direction?: "vertical" | "horizontal"
  className?: string
}

export default function GenericAlbumsLoader ({ times = 4, direction = "horizontal", className = "flex-nowrap", ...props }: Props) {
  const isHorizontal = direction === 'horizontal'

  return (
    <Row className={className}>
      {
        Array.from(Array(times).keys()).map((t, index) => (
          <Col
            md={ isHorizontal ? (12 / times) : 12}
            key={index}
            {...props}
          >
            <Placeholder xs={12} className="image-fit-wrapp" />
            <Placeholder xs={12} className="mt-3" />
            <Placeholder xs={6} className="mt-1" />
          </Col>
        ))
      }
    </Row>
  )
}