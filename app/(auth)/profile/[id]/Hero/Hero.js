import ImageFlat from '@/components/Image/FlatImage'
import style from "@/components/Hero/Album/GenericHero.module.scss"

export default async function Hero ({ me }) {
  const [small, medium] = me?.images
  const image = medium || small

  return (
    <div className={style.GernericAlbumHeroWrapper}>
      <div className={style.GernericAlbumHeroWrapperRowTitle}>
        { image && image.url ? 
          <div className={style.GernericAlbumHeroWrapperHeroBack}>
            <ImageFlat fill sizes="100vw" src={image.url} alt={`${me.display_name} profile image`} className="position-relative img-fluid" />
          </div> : null
        }
        <div className={style.GernericAlbumHeroWrapperInfo}>
          <div className={style.GernericAlbumHeroWrapperInfoType}>{me?.product}</div>
          <h1 className={style.GernericAlbumHeroWrapperInfoTitle}>{me?.display_name}</h1>
          <div className={style.GernericAlbumHeroWrapperInfoFollowers}>{me?.followers?.total} Followers</div>
        </div>
      </div>
    </div>
  )
}