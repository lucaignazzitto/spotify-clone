"use client"
import Track from '@/components/Tracks/Track'
import { TrackInterface } from '@/lib/models/track.interface'
import { Stack } from 'react-bootstrap'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function QueueList({ currently_playing, queue = [] }: { currently_playing?: TrackInterface, queue: TrackInterface[] }) {

  return (
    <div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: .05
            }
          }
        }}
      >
        <Stack direction="horizontal" gap={4}>
          <h1 className={`page-title`}>Queue</h1>
          <Link href={'/player/recently'} className='text-muted text-underline fs-14'>Recently</Link>
        </Stack>
        <section className={`page-section pb-0`}>
          <p className={`font-medium text-gray-300`}>
            Now listening
          </p>
          <motion.div
            className={`mt-4`}
            variants={{
              hidden: { opacity: 0, y: 20, x: -5 },
              visible: { opacity: 1, y: 0, x: 0 },
            }}
          >
            <Track track={currently_playing} showImage={true} />
          </motion.div>
        </section>
        <section className={`page-section`}>
          <p className={`font-medium text-gray-300`}>Next on queue</p>
          {
            queue.map((track, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Track
                  track={track}
                  parentUri={track.album.uri}
                  showImage={true}
                  className={`mt-4`}
                  key={index}
                  numberLabel={index + 1}
                  showActive={false}
                  showNumber
                />
              </motion.div>
            ))
          }
        </section>
      </motion.div>
    </div>
  )
}