import { cookies } from 'next/headers'
import GenericAlbums from '@/components/Albums/GenericAlbums'
import style from "./Albumns.module.scss"

const limit = 8
const market = 'IT'
async function load (artistId) {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/artists/${artistId}/albums?limit=${limit}&market=${market}`, {
    headers: { Cookie: cookies().toString() },
  })
   
  if (response.ok) {
    return response.json()
      .then((res) => {
        const { items = [] } = res
        return items
      })
  } else {
    return []
  }
}

export default async function Albums ({ artistId }) {
  const albums = await load(artistId)
  return (
    <div className={style.albumsList}>
      <span className={`section-title`}>ALBULMS</span>
      <div className={style.albumsListWrapp}>
        <GenericAlbums direction="horizontal" albums={albums} />
      </div>
    </div>
  )
}