import { NextRequest, NextResponse } from 'next/server'
import MusixmatchProvider from "@/services/MusixmatchProvider"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: track_isrc } = await params

  const lyrics = await MusixmatchProvider.get(`/track.get`, {
    params: {
      'track_isrc': track_isrc,
    }
  })
    .then((res) => {
      if (res.status === 200) {
        const { track } = res.data.message.body
        if (track) {
          return MusixmatchProvider.get(`/track.lyrics.get`, {
            params: {
              'commontrack_id': track.commontrack_id,
            }
          })
            .then((res) => {
              const { lyrics } = res.data.message.body
              return lyrics
            })
        } else {
          return {}
        }
      }
    })

  return NextResponse.json(lyrics)
}
