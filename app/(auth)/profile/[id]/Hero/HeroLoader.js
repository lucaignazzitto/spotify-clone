import Placeholder from '@/components/Loader/Placeholder';
import style from "@/app/(auth)/artists/[id]/Hero/Hero.module.scss"

export default function ArtistHeroLoader ({ className = "" }) {

  return (
    <div className={style.ArtistHeroWrapper}>
      <Placeholder md={12} animation="glow" className={className}>
        <Placeholder xs={4} />
        <Placeholder xs={9} className="mt-3" size='lg' style={{ height: '40px' }} />
      </Placeholder>
    </div>
  )
}