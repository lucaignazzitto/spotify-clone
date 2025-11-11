'use client'
import AppIcon from '@/components/Image/Icon'
import Logo from "@/components/Logo/Logo"
import { useRouter } from "next/navigation"
import { MouseEvent } from 'react'

export default function HeaderNavigation({ className = "" }: { className?: string }) {
  const router = useRouter()

  const goTo = (e: MouseEvent<HTMLButtonElement>, direction: string) => {
    e.preventDefault()
    if (direction === 'back') {
      router.back()
    } else {
      router.forward()
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative grid grid-cols-[auto_1fr] items-center">
        <div className={`relative hidden lg:block`}>
          <div className={"p-1 grid grid-cols-[auto_auto] items-center gap-3 rounded-4xl backdrop-blur-xs bg-black/0"}>
            <div className={"p-1.5 cursor-pointer"}>
              <button className="btn btn-none hover-anim" onClick={(e) => goTo(e, 'back')} aria-label='navigate back'>
                <AppIcon id='left-arrow'></AppIcon>
              </button>
            </div>
            <div className={"p-1.5 cursor-pointer"}>
              <button className="btn btn-none hover-anim" onClick={(e) => goTo(e, 'forward')} aria-label='navigate forward'>
                <AppIcon id='right-arrow'></AppIcon>
              </button>
            </div>
          </div>
        </div>
        <div className={`relative justify-self-end`}>
          <Logo />
        </div>
      </div>
    </div>
  )
}
