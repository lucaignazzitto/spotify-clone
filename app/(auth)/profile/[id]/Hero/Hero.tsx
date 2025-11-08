import style from "@/components/Hero/Album/GenericHero.module.scss"
import { mediaPlaceholder } from '@/utils/helpers'
import { UserInterface } from '@/lib/models/user.interface'
import Image from 'next/image'

export default async function Hero({ me }: { me: UserInterface }) {
  const [medium, small] = me?.images
  const image = medium || small

  return (
    <div className={style.GernericAlbumHeroWrapper}>
      <div className={style.GernericAlbumHeroWrapperRowTitle}>
        {image && image.url ?
          <div className={style.GernericAlbumHeroWrapperHeroBack}>
            <Image
              src={image.url}
              width={200}
              height={200}
              alt={`${me.display_name} profile image`}
              className="position-relative img-fluid"
              placeholder="blur"
              blurDataURL={mediaPlaceholder}
              loading="lazy"
            />
          </div> : null
        }
        <div className={style.GernericAlbumHeroWrapperInfo}>
          <div className={style.GernericAlbumHeroWrapperInfoType}>{me.product}</div>
          <h1 className={style.GernericAlbumHeroWrapperInfoTitle}>{me?.display_name}</h1>
          <div className={style.GernericAlbumHeroWrapperInfoFollowers}>{me?.followers?.total} Followers</div>
        </div>
      </div>
    </div>
  )
}