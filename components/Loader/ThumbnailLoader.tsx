import Row from 'react-bootstrap/Row';
import Col, { ColProps } from 'react-bootstrap/Col';
import Placeholder from '@/components/Loader/Placeholder';
import { Stack } from 'react-bootstrap';

type Props = ColProps & {
  times?: number
  direction?: "vertical" | "horizontal"
  className?: string
  title?: string
}

export default function ThumbnailLoader ({ times = 4, direction = "horizontal", className="", title = "", ...props }: Props) {
  const isHorizontal = direction === 'horizontal'

  return (
    <>
      { title ? <div className={`section-title mb-3 mb-lg-4`}>{title}</div> : null }
      <Row className={className}>
        {
          Array.from(Array(times).keys()).map((t, index) => (
            <Col md={ isHorizontal ? (12 / times) : 12} key={index} {...props}>
              <Stack direction={isHorizontal ? 'vertical' : 'horizontal'} gap={2}>
                <Placeholder xs={"auto"} style={{ width: 60, height: 60 }} className='rounded' />
                <Placeholder xs={8} />
              </Stack>
            </Col>
          ))
        }
      </Row>
    </>
  )
}