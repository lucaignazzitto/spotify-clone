import { useCallback, useEffect, useState } from 'react'
import HttpProvider from '@/services/HttpProvider'
import TracksLoader from '@/components/Loader/TracksLoader'
import Tracks from '@/components/Tracks/Tracks'
import Track from '@/components/Tracks/Track'
import { TrackInterface } from '@/lib/models/track.interface'

export default function Queue ({ className = "" }: { className?: string }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPlaying, setCurrentPlaying] = useState<TrackInterface>()
  const [currentQueue, setCurrentQueue] = useState<TrackInterface[]>([])

  const loadQueue = () => {
    setLoading(true)
    return HttpProvider.get('/api/me/player/queue')
      .then((res) => {
        const { currently_playing = {}, queue = [] } = res.data.playerQueue
        setCurrentPlaying(currently_playing)
        setCurrentQueue(queue)
        return res.data
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    loadQueue()
  }, [])

  return (
    <div className={`${className}`}>
      <div className={``}>
        <span className={`section-title`}>Now listening</span>
        <div className={`mt-4`}>
          {
            loading ? <TracksLoader times={1} />
            : <Track track={currentPlaying} showImage={true} />
          }
        </div>
      </div>
      <div className={`mt-5`}>
        <span className={`section-title`}>Next on queue</span>
        <Tracks
          className={`mt-4`}
          tracks={currentQueue}
          showImage={true}
          showNumber={true}
          useLoopAsNumber={true}
          isLoading={loading}
        />
      </div>
    </div>
  )
}