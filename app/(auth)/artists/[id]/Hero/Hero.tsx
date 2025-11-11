import FollowButton from "@/components/Buttons/Follow"
import { ArtistInterface } from "@/lib/models/artist.inteface"
import style from "@/app/(auth)/artists/[id]/Hero/Hero.module.scss"

export default async function Hero({ artist, useImage = true }: { artist: ArtistInterface, useImage?: boolean }) {
  const heroImage = useImage ? artist?.images?.[0] || null : null

  const formatNumber = (number: number | undefined) => {
    if (number !== undefined) {
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
        <div className={style.ArtistHeroWrapperFollowers}>{formatNumber(artist?.followers?.total)} Followers</div>
        <h1 className={style.ArtistHeroWrapperTitle}>{artist?.name}</h1>
        <div className={style.ArtistHeroWrapperFollow}>
          <FollowButton type={artist.type} ids={artist.id} />
        </div>
      </div>
    </div>
  )
}