'use client'
import Row from 'react-bootstrap/Row';
import ArtistHeroLoader from "@/components/Loader/ArtistHeroLoader"
import TracksLoader from "@/components/Loader/TracksLoader"
// import Placeholder from 'react-bootstrap/Placeholder';
import React from 'react';

export default function Loading () {
  return (
    <>
      <ArtistHeroLoader />
      <TracksLoader times={10} direction="vertical" className="mt-5" />
    </>
  )
}