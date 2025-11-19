
"use client"
import { motion } from 'framer-motion'
import Track from '@/components/Tracks/Track'
import { PlayHistoryInterface } from '@/lib/models/player.interface'
import { timeFromNow } from '@/utils/helpers'
import { Stack } from 'react-bootstrap'
import Link from 'next/link'

export default function RecentlyList({ tracks }: { tracks?: PlayHistoryInterface[] }) {
  return (
    <div>
      <Stack direction="horizontal" gap={4}>
        <h1 className="page-title">Recently</h1>
        <Link href={'/player/queue'} className='text-muted text-underline fs-14'>Queue</Link>
      </Stack>
      <section className={`page-section`}>
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
          {
            tracks.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20, x: -5 },
                  visible: { opacity: 1, y: 0, x: 0 },
                }}
              >
                <Track
                  track={item.track}
                  parentUri={item.track.album.uri}
                  showImage={true}
                  showActive={false}
                  className='mb-4'
                  extras={<span className='fs-10'>Played {timeFromNow(item.played_at)}</span>}
                />
              </motion.div>
            ))
          }
        </motion.div>
      </section>
    </div>
  )
}
