"use client"
import Tracks from '@/components/Tracks/Tracks'
import Track from '@/components/Tracks/Track'
import { TrackInterface } from '@/lib/models/track.interface'
import { useSpotifyPlayer } from '@/contexts/SpotifyPlayerContext'
import { useEffect } from 'react'
import { revalidateByPath } from '@/app/actions/revalidate'

export default function QueueList ({
  currently_playing,
  queue = []
}: { currently_playing?: TrackInterface, queue: TrackInterface[] }) { 
  const { track, changingTrack } = useSpotifyPlayer()

  const revalidate = async () => {
    await revalidateByPath('/queue');
  }

  useEffect(() => {
    revalidate()
  }, [track?.name, changingTrack])

  return (
    <div>
      <h1 className="page-title">Queue</h1>
      <section className={`page-section`}>
        <span className={`font-medium text-gray-300`}>Now listening</span>
        <div className={`mt-4`}>
          <Track track={currently_playing} showImage={true} />
        </div>
      </section>
      <section className={`page-section`}>
        <span className={`font-medium text-gray-300`}>Next on queue</span>
        <Tracks
          className={`mt-4`}
          tracks={queue}
          showImage
          showActive={false}
          showNumber
          showOptions
          useLoopAsNumber
        />
      </section>
    </div>
  )
}
