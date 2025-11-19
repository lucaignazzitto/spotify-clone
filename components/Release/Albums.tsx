"use client"
import { motion } from 'framer-motion'
import { AlbumInterface } from '@/lib/models/album.inteface'
import { Col, ColProps, Row } from 'react-bootstrap'
import ReleaseAlbum from './Album'

type Props = {
  albums: AlbumInterface[],
  useType?: boolean
  className?: string
  columnProps?: ColProps
}


export default function ReleaseAlbums({
  albums = [],
  className = "",
  useType = false,
  columnProps = {}
}: Props) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={`row ${className}`}
      variants={{
        visible: {
          transition: {
            staggerChildren: .05
          }
        }
      }}
    >
      {
        albums.map((album, index) => (
          <Col xs={12} {...columnProps} key={index}>
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <ReleaseAlbum album={album} useType={useType} />
            </motion.div>
          </Col>
        ))
      }
    </motion.div>
  )
}