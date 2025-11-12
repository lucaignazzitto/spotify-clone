"use client"
import Me from "@/components/Me/Me"
import Icon from '@/components/Image/Icon'
import Link from 'next/link'
import style from "./Menu.module.scss"
import { usePathname } from "next/navigation"
import { UserInterface } from "@/lib/models/user.interface"

export default function Menu({ user, className = "" }: { user: UserInterface, className?: string }) {

  const pathname = usePathname()

  const linkLegend = [
    {
      name: 'home',
      iconId: 'home',
      href: '/'
    },
    {
      name: 'liked',
      iconId: 'heart',
      href: `/profile/${user.id}/saved`,
    },
    {
      name: 'search',
      iconId: 'search',
      href: `/search`,
    },
    {
      name: 'releases',
      iconId: 'bell',
      href: `/releases`,
    },
    {
      name: 'logout',
      iconId: 'logout',
      href: `/api/me/logout`,
      prefetch: false
    }
  ]

  return (
    <div className={`${style.SidebarMenu} ${className}`}>
      <div className={`${style.SidebarMenuLogo}`}>
        <Me user={user} />
      </div>
      <ul className={`${style.SidebarMenuUl}`}>
        {
          linkLegend.map((list) => (
            <li className={`${style.SidebarMenuUlList} ${pathname === list.href ? style.SidebarMenuUlListActive : ''}`} key={list.name}>
              {
                list.href ?
                  <Link href={list.href} className='hover-anim' prefetch={list?.prefetch ?? true} aria-label={list.name}>
                    <Icon id={list.iconId} />
                  </Link>
                  : <Icon id={list.iconId} />
              }
            </li>
          ))
        }
      </ul>
    </div>
  )
}