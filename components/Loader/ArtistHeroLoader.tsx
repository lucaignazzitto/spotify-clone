import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Placeholder from '@/components/Loader/Placeholder';

export default function ArtistHeroLoader ({ className = "" }: { className?: string }) {

  return (
    <Row className={className}>
      <Col md={12} animation="glow">
        <Placeholder xs={2} />
        <Col></Col>
        <Placeholder xs={6} className="mt-4" style={{ height: '60px' }} />
        <Col></Col>
        <Placeholder xs={2} className="mt-3" />
      </Col>
    </Row>
  )
}