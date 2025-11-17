"use client"
import Album from '@/components/Albums/Album'
import GenericSlider from '@/components/Slider/GenericSlider'
import { motion } from 'framer-motion'
import GenericAlbumsLoader from '@/components/Loader/GenericAlbumsLoader'
import { AlbumInterface } from '@/lib/models/album.inteface'
import { Col, ColProps, Row } from 'react-bootstrap'

type Props = {
  albums: AlbumInterface[],
  useType?: boolean
  useColumns?: boolean
  useLinkToArtist?: boolean
  className?: string
  title?: string
  isLoading?: boolean
  columnProps?: ColProps
}

const UseSlider = ({ albums = [], useLinkToArtist, useType }) => {
  return albums && albums.length > 0 &&
    <GenericSlider>
      {
        albums.map((album, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <Album album={album} useLinkToArtist={useLinkToArtist} useType={useType} />
          </motion.div>
        ))
      }
    </GenericSlider>
}

const UseColumns = ({ albums, useLinkToArtist, useType, columnProps }) => {
  return (
    <Row>
      {
        albums.map((album, index) => (
          <Col xs={6} md={4} lg={3} {...columnProps} key={index}>
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >

              <Album album={album} useLinkToArtist={useLinkToArtist} useType={useType} />
            </motion.div>
          </Col>
        ))
      }
    </Row>
  )
}

export default function Albums({
  albums = [],
  className = "",
  title,
  useColumns = false,
  useType = false,
  useLinkToArtist = false,
  isLoading = false,
  columnProps = {}
}: Props) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={className}
      variants={{
        visible: {
          transition: {
            staggerChildren: .05
          }
        }
      }}
    >
      {title ? <div className='mb-3 mb-lg-4'>{title}</div> : null}
      {
        isLoading ? <GenericAlbumsLoader />
          : useColumns ? <UseColumns albums={albums} useLinkToArtist={useLinkToArtist} useType={useType} columnProps={columnProps} /> :
          <UseSlider albums={albums} useLinkToArtist={useLinkToArtist} useType={useType} />
      }
    </motion.div>
  )
}