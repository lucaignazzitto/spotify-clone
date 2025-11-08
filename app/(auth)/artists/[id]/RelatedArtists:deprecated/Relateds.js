import { cookies } from 'next/headers'
import GenericSlider from '@/components/Slider/GenericSlider'
import Artist from '@/components/Artists/Artist'
import style from "./Related.module.scss"

const limit = 8
async function load (artistId) {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/artists/${artistId}/related-artists`, {
    headers: { Cookie: await cookies() },
    next: { revalidate: 3000 },
  })
   
  if (response.ok) {
    return response.json()
      .then((res) => {
        const { artists = [] } = res
        return artists.slice(0, limit)
      })
  } else {
    return []
  }
}

export default async function Albums ({ artistId }) {
  const related = await load(artistId)

  return (
    <div className={style.relatedArtistsList}>
      <span className={`section-title`}>RELATED ARTISTS</span>
      <div className={style.relatedArtistsListWrapp}>
        <div>
          <GenericSlider>
            {
              related.map((artist, index) => (
                <Artist artist={artist} key={index}/>
              ))
            }
          </GenericSlider>
          {
            related.length ? null : <p>No related artists</p>
          }
        </div>
      </div>
    </div>
  )
}