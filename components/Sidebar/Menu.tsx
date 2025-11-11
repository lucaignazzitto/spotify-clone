"use client"
import Me from "@/components/Me/Me"
import Icon from '@/components/Image/Icon'
import Link from 'next/link'
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
      href: `/profile/${user?.id}/saved`,
    },
    {
      name: 'releases',
      iconId: 'bell',
      href: `/releases`,
    },
    {
      name: 'search',
      iconId: 'search',
      href: `/search`,
    },
    {
      name: 'logout',
      iconId: 'logout',
      href: `/api/me/logout`,
      prefetch: false
    }
  ]

  return (
    <div className={`relative h-full flex justify-center items-center flex-row-reverse lg:flex-col! ${className}`}>
      <div>
        <Me user={user} />
      </div>
      <ul className={`w-full list-none p-0 m-auto grid grid-cols-[repeat(5,minmax(auto,30px))] gap-x-5 md:gap-x-8 lg:gap-x-12 lg:flex lg:w-[inherit] lg:items-center lg:flex-col`}>
        {
          linkLegend.map((list) => (
            <li className={`inline-block cursor-pointer self-center justify-self-center lg:mb-14 ${pathname === list.href ? 'text-green-600 fill-green-600' : ''}`} key={list.name}>
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