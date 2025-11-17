
"use client"
import Track from '@/components/Tracks/Track'
import { useSpotifyPlayer } from '@/contexts/SpotifyPlayerContext'
import { useEffect } from 'react'
import { revalidateByPath } from '@/app/actions/revalidate'
import { PlayHistoryInterface } from '@/lib/models/player.interface'
import { timeFromNow } from '@/utils/helpers'
import { Stack } from 'react-bootstrap'
import Link from 'next/link'

export default function RecentlyList({ tracks }: { tracks?: PlayHistoryInterface[] }) {
  const { track, changingTrack } = useSpotifyPlayer()

  const revalidate = async () => {
    await revalidateByPath('/player/recently');
  }

  useEffect(() => {
    revalidate()
  }, [track?.name, changingTrack])

  return (
    <div>
      <Stack direction="horizontal" gap={4}>
        <h1 className="page-title">Recently</h1>
        <Link href={'/player/queue'} className='text-muted text-underline fs-14'>Queue</Link>
      </Stack>
      <section className={`page-section`}>
        {
          tracks.map((item, index) => (
            <div key={index}>
              <Track
                track={item.track}
                parentUri={item.track.album.uri}
                showImage={true}
                showActive={false}
                className='mb-5'
                extras={<span className='fs-10'>Played {timeFromNow(item.played_at)}</span>}
              />
            </div>
          ))
        }
      </section>
    </div>
  )
}
