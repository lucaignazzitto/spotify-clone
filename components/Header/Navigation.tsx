'use client'
import AppIcon from '@/components/Image/Icon'
import Logo from "@/components/Logo/Logo"
import style from './Navigation.module.scss'
import { usePathname, useRouter } from "next/navigation"
import { MouseEvent } from 'react'
import Link from 'next/link'

export default function HeaderNavigation({ className = "" }: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname()

  const goTo = (e: MouseEvent<HTMLButtonElement>, direction: string) => {
    e.preventDefault()
    if (direction === 'back') {
      router.back()
    } else {
      router.forward()
    }
  }

  return (
    <div className={`${style.NavigationWrapper} ${className}`}>
      <div className={style.NavigationWrapperInner}>
        <div className={`${style.NavigationWrapperInnerCard} d-none d-lg-block`}>
          <div className={style.NavigationWrapperInnerCardNav}>
            <div className={style.NavigationWrapperInnerCardNavCta}>
              <button className="btn btn-none hover-anim" onClick={(e) => goTo(e, 'back')} aria-label='navigate back'>
                <AppIcon id='left-arrow'></AppIcon>
              </button>
            </div>
            <div className={style.NavigationWrapperInnerCardNavCta}>
              <button className="btn btn-none hover-anim" onClick={(e) => goTo(e, 'forward')} aria-label='navigate forward'>
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
