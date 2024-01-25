import { useEffect, useState } from 'react'
import HttpProvider from '@/services/HttpProvider'
import TracksLoader from '@/components/Loader/TracksLoader'
import Tracks from '@/components/Tracks/Tracks'
import Track from '@/components/Tracks/Track'

export default function Queue ({ className = "" }) {
  const [loading, setLoading] = useState(false)
  const [currentPlaying, setCurrentPlaying] = useState({})
  const [currentQueue, setCurrentQueue] = useState([])

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
          itemsPerRow={1}
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