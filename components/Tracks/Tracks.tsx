"use client"
import Track from '@/components/Tracks/Track'
import TracksLoader from '@/components/Loader/TracksLoader'
import groupby from 'lodash/groupBy'
import { TrackInterface } from '@/lib/models/track.interface'
import Icon from '../Image/Icon'
import { delay, motion } from 'framer-motion'
import { notFound } from 'next/navigation'

interface TracksProps {
  tracks: TrackInterface[],
  parentUri?: string
  className?: string
  title?: string
  groupByDisc?: boolean
  showImage?: boolean
  showAlbum?: boolean
  showActive?: boolean
  showNumber?: boolean
  showOptions?: boolean
  from?: string
  playlistId?: string
  useLoopAsNumber?: boolean
  isLoading?: boolean
}

export default function Tracks({
  tracks = [],
  parentUri = "",
  className = "",
  title,
  groupByDisc = false,
  showImage = false,
  showActive = true,
  showNumber = false,
  showAlbum = false,
  showOptions = false,
  from = "album",
  playlistId = "",
  useLoopAsNumber = false,
  isLoading
}: TracksProps) {
  const traksByDisk = groupByDisc ? groupby(tracks, 'disc_number') : { 1: tracks }
  const hasMultipleDisc = groupByDisc && Object.keys(traksByDisk).length > 1

  return (
    <div className={`tracks ${className}`}>
      {title ? <div>{title}</div> : null}
      <div className={`${title ? 'mt-3 mt-lg-4' : ''}`}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: .04
              }
            }
          }}
        >
          {
            isLoading ? <TracksLoader direction={"vertical"} />
              :
              tracks && tracks.length ?
                Object.keys(traksByDisk).map((disc_number) => (
                  <div key={disc_number}>
                    {hasMultipleDisc && <div className='my-3 px-2 fs-12 text-muted w-500'><Icon id="disc" color='#c1c1c1' width={20} /> <span className='ps-2'>Disc {disc_number}</span></div>}
                    {
                      traksByDisk[disc_number].map((track, index) => (
                        <motion.div
                          className='w-full'
                          key={`${track.id}-${index}`}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                          }}
                        >
                          <Track
                            track={track}
                            from={from}
                            parentUri={parentUri}
                            playlistId={playlistId}
                            showImage={showImage}
                            showActive={showActive}
                            showNumber={showNumber}
                            showAlbum={showAlbum}
                            showOptions={showOptions}
                            numberLabel={useLoopAsNumber ? index + 1 : ''}
                          />
                        </motion.div>
                      ))
                    }
                  </div>
                ))
                : notFound()
          }
        </motion.div>
      </div>
    </div>
  )
}