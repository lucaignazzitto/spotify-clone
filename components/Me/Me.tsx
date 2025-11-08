import Link from "next/link"
import style from "./Me.module.scss"
import Image from "next/image"
import { mediaPlaceholder } from "@/utils/helpers"
import { UserInterface } from "@/lib/models/user.interface"

export default function Me ({ user, className = "" }: { user: UserInterface, className?: string }) {
  const [ small, medium ] = user?.images || []
  const profileImageUrl = small || medium

  return (
    <div className={className}>
      {
        user && 'id' in user ?
        <div className={style.meWrapp}>
          <Link href={`/profile/${user.id}`} aria-label="Profile">
            <div className={style.meWrappInfo}>
              <Image src={profileImageUrl?.url} alt={`${user.display_name} profile image`} width={30} height={30} className={style.meWrappInfoImage} placeholder="blur" blurDataURL={mediaPlaceholder} loading="lazy" />
            </div>
          </Link>
        </div>
        : null
      }
    </div>
  )
}