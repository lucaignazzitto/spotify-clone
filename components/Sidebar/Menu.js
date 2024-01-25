'use client'
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import HttpProvider from '@/services/HttpProvider'
import Me from "@/components/Me/Me"
import Icon from '@/components/Image/Icon'
import SearchModal from '@/components/Search/Modal';
import Link from 'next/link'
import style from "./Menu.module.scss"

export default function Menu ({ className = "" }) {
  const pathname = usePathname();
  const router = useRouter()

  const [user, setUser] = useState({})
  const [showSearch, setShowSearch] = useState(false)

  const loadUser = () => {
    return HttpProvider.get(`/api/me`)
      .then((res) => {
        const { me } = res.data
        setUser(me)
      })
  }

  const handleLogout = () => {
    return HttpProvider.post('/api/me/logout')
      .then(() => {
        return router.push('/login')
      })
      .catch((err) => {
        console.err('something went wrong', err)
      })
  }

  const handleSearchClick = (e, toggle = true) => {
    e && e.preventDefault()
    setShowSearch(toggle)
  }

  const handleListClick = (e, list) => {
    e.preventDefault()
    list.click && list.click(e)
    return true
  }


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
      // click: handleSearchClick
    },
    {
      name: 'logout',
      iconId: 'logout',
      click: handleLogout
    }
  ]

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <div className={`${style.SidebarMenu} ${className}`}>
      <div className={`${style.SidebarMenuLogo}`}>
        <Me />
      </div>
      <ul className={`${style.SidebarMenuUl}`}>
        {
          linkLegend.map((list) => (
            <li className={`${style.SidebarMenuUlList} ${pathname === list.href ? style.SidebarMenuUlListActive : ''}`} key={list.name} onClick={(e) => handleListClick(e, list) }>
              {
                list.component ? list.component
                :
                list.href ?
                  <Link href={list.href} className='hover-anim'>
                    <Icon id={list.iconId} />
                  </Link>
                : <Icon id={list.iconId} />
              }
            </li>
          ))
        }
      </ul>
      <SearchModal show={showSearch} onModalClose={(e) => handleSearchClick(e, false)} />
    </div>
  )
}