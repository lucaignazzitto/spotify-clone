'use client'
import AppIcon from '@/components/Image/Icon'
import Logo from "@/components/Logo/Logo"
import Menu from '@/components/Sidebar/Menu'
import style from './Navigation.module.scss'
import { useRouter } from "next/navigation"

export default function HeaderNavigation ({ className = "" }) {
  const router = useRouter()

  const goTo = (e, direction) => {
    e.preventDefault()
    if (direction === 'back') {
      router.back({
        scroll: false
      })
    } else {
      router.forward({
        scroll: false
      })
    }
  }

  return (
    <div className={`${style.NavigationWrapper} ${className}`}>
      <div className={style.NavigationWrapperInner}>
        <div className={`${style.NavigationWrapperInnerCard} d-none d-lg-block`}>
          <div className={style.NavigationWrapperInnerCardNav}>
            <div className={style.NavigationWrapperInnerCardNavCta}>
              <button className="btn btn-none hover-anim" onClick={(e) => goTo(e, 'back')}>
                <AppIcon  ppIcon id='left-arrow'></AppIcon>
              </button>
            </div>
            <div className={style.NavigationWrapperInnerCardNavCta}>
              <button className="btn btn-none hover-anim" onClick={(e) => goTo(e, 'forward')}>
                <AppIcon id='right-arrow'></AppIcon>
              </button>
            </div>
          </div>
        </div>
        <div className={`${style.NavigationWrapperInnerCard} ${style.NavigationWrapperInnerCardPlayer}`}>
          <Logo />
        </div>
      </div>
    </div>
  )
}
