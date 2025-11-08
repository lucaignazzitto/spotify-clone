import Row from 'react-bootstrap/Row';
import Placeholder from 'react-bootstrap/Placeholder';
import { Fragment } from 'react';

export default function Loading () {
  return (
    <Row>
      <Placeholder xs={6} animation="glow" className="mb-5">
        <Placeholder xs={12} />
      </Placeholder>
      {
        Array.from(Array(4).keys()).map((t, index) => (
          <Fragment key={index}>
            <Placeholder xs={12} key={index} animation="glow" className="mt-3">
              <Placeholder xs={8} className="mt-3" />
              <Placeholder xs={2} className="mt-1 offset-2" />
              <Placeholder xs={2} className="mt-1" />
            </Placeholder>
          </Fragment>
        ))
      }
    </Row>
  )
}