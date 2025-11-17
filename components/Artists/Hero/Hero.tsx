"use client"
import FollowButton from "@/components/Buttons/Follow"
import { ArtistInterface } from "@/lib/models/artist.inteface"
import style from "./Hero.module.scss"
import { motion } from "framer-motion"
import { formatNumber } from "@/utils/helpers"

export default function Hero({ artist, useImage = true }: { artist: ArtistInterface, useImage?: boolean }) {
  const heroImage = useImage ? artist?.images?.[0] || null : null

  return (
    <div className={style.ArtistHeroWrapper}>
      {
        heroImage && heroImage.url &&
        <motion.div
          className={style.ArtistHeroWrapperHeroBack}
          style={{
            backgroundImage: `url(${heroImage.url})`,
            filter: 'blur(8px)',
          }}
          initial={{ filter: 'blur(8px)' }}
          animate={{ filter: 'blur(0)' }}
          transition={{ duration: 0.2 }}
        />
      }
      <div>
        <div className={style.ArtistHeroWrapperFollowers}>{formatNumber(artist?.followers?.total)} Followers</div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <h1 className={style.ArtistHeroWrapperTitle}>{artist?.name}</h1>
        </motion.div>
        <div className={style.ArtistHeroWrapperFollow}>
          <FollowButton type={artist.type} ids={artist.id} />
        </div>
      </div>
    </div>
  )
}