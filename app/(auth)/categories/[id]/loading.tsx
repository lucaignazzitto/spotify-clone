import Row from 'react-bootstrap/Row';
import GenericAlbumsLoader from '@/components/Loader/GenericAlbumsLoader';

export default function Loading () {
  return (
    <Row>
      <GenericAlbumsLoader />
      <GenericAlbumsLoader className="mt-4" />
      <GenericAlbumsLoader className="mt-4" />
    </Row>
  )
}