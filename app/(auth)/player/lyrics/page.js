'use client'
import { enableStaticRendering } from 'mobx-react-lite';
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import HttpProvider from "@/services/HttpProvider"
import PlayerStore from "@/stores/PlayerStore"
import Placeholder from '@/components/Loader/Placeholder';
import LyricsText from '@/components/Lyrics/Lyrics'

const isServer = typeof window === 'undefined'
enableStaticRendering(isServer);


function PlayerLyricsPage () {
  const [loading, setLoading] = useState(true)
  const [lyrics, setLyrics] = useState('')

  const player = PlayerStore?.getPlayer

  const loadLyrics = () => {
    const isrc = player?.item?.external_ids?.isrc
    if (isrc) {
      setLoading(true)
      return HttpProvider.get(`/api/lyrics/${isrc}`)
      .then((res) => {
        setLyrics(res.data.lyrics_body || '')
        return res
      })
      .finally(() => {
        setLoading(false)
      })
    }
  }

  useEffect(() => {
    loadLyrics()
  }, [player?.item?.uri])

  return (
    <main>
      {
        loading ? 
          Array.from(Array(14).keys()).map((t, index) => (
            <div key={index}>
              { index % 2 === 0 ?
                <Placeholder xs={10} key={index} animation="glow" className="mt-4" style={{ height: '25px' }}></Placeholder>
                : <Placeholder xs={11} key={index} animation="glow" className="mt-4" style={{ height: '28px' }}></Placeholder>
              }
            </div>
          ))
        : <LyricsText lyrics={lyrics} showNoLyricsMessage />
      }
    </main>
  )
}

export default observer(PlayerLyricsPage)
