"use client"
import Row from 'react-bootstrap/Row';
import ArtistHeroLoader from "@/components/Loader/ArtistHeroLoader"
import Placeholder from 'react-bootstrap/Placeholder';
import React from 'react';

export default function Loading () {
  return (
    <Row>
      <ArtistHeroLoader />
      {
        Array.from(Array(10).keys()).map((t, index) => (
          <React.Fragment key={index}>
            <Placeholder xs={12} key={index} animation="glow" className="mt-3">
              <Placeholder xs={8} className="mt-3" />
              <Placeholder xs={2} className="mt-1 offset-2" />
              <Placeholder xs={2} className="mt-1" />
            </Placeholder>
          </React.Fragment>
        ))
      }
    </Row>
  )
}