import { cookies } from "next/headers"
import FollowButton from "@/components/Buttons/Follow"
import style from "@/app/(auth)/artists/[id]/Hero/Hero.module.scss"

async function loadArtist(artistId) {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/artists/${artistId}`, {
    headers: { Cookie: cookies().toString() },
  })
   
  if (response.ok) {
    return response.json()
      .then((res) => {
        const { artist = {} } = res
        return {
          artist,
          heroImage: artist?.images ? artist?.images[0] : {}
        }
      })
  } else {
    return []
  }
}

export default async function Hero ({ artistId }) {
  const { artist, heroImage } = await loadArtist(artistId)

  const formatNumber = (number) => {
    if (number !== undefined || number !== NaN) {
      const formatter = new Intl.NumberFormat();
      return formatter.format(number)
    } else {
      return 0
    }
  }

  return (
    <div className={style.ArtistHeroWrapper}>
      {
        heroImage && heroImage.url ? <div className={style.ArtistHeroWrapperHeroBack} style={{ backgroundImage: `url(${heroImage.url})` }} /> : null
      }
      <div>
        <div className={style.ArtistHeroWrapperFollowers}>{formatNumber(artist?.followers?.total)} FOLLOWERS</div>
        <h1 className={style.ArtistHeroWrapperTitle}>{artist?.name}</h1>
        <div className={style.ArtistHeroWrapperFollow}>
          <FollowButton type={artist.type} ids={artistId} />
        </div>
      </div>
    </div>
  )
}