"use client"
import Track from '@/components/Tracks/Track'
import { TrackInterface } from '@/lib/models/track.interface'
import { useSpotifyPlayer } from '@/contexts/SpotifyPlayerContext'
import { useEffect } from 'react'
import { revalidateByPath } from '@/app/actions/revalidate'
import { Stack } from 'react-bootstrap'
import Link from 'next/link'

export default function QueueList({ currently_playing, queue = [] }: { currently_playing?: TrackInterface, queue: TrackInterface[] }) {
  const { track, changingTrack } = useSpotifyPlayer()

  const revalidate = async () => {
    await revalidateByPath('/player/queue');
  }

  useEffect(() => {
    revalidate()
  }, [track?.name, changingTrack])

  return (
    <div>
      <Stack direction="horizontal" gap={4}>
        <h1 className="page-title">Queue</h1>
        <Link href={'/player/recently'} className='text-muted text-underline fs-14'>Recently</Link>
      </Stack>
      <section className={`page-section pb-0`}>
        <span className={`font-medium text-gray-300`}>Now listening</span>
        <div className={`mt-4`}>
          <Track track={currently_playing} showImage={true} />
        </div>
      </section>
      <section className={`page-section`}>
        <span className={`font-medium text-gray-300`}>Next on queue</span>
        {
          queue.map((track, index) => (
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
          ))
        }
      </section>
    </div>
  )
}