import { cookies } from 'next/headers';
import { cache, ReactNode } from 'react';
import { SpotifyPlayerProvider } from '@/contexts/SpotifyPlayerContext';
import { Metadata } from 'next';
import { UserInterface } from '@/lib/models/user.interface';
import { APP_NAME } from '../layout';
import Menu from '@/components/Sidebar/Menu'
import HeaderNavigation from '@/components/Header/Navigation'
import Player from '@/components/Me/Player/Player';

import '@/styles/global.scss'

const loadMe = cache(async () => {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me`, {
    headers: { Cookie: (await cookies()).toString() as string },
    next: {
      revalidate: 10,
      tags: ['user']
    }
  })

  if (response.ok) {
    return response.json()
      .then((res) => {
        const { me = {} } = res
        return me
      })
  } else {
    return undefined
  }
})

export async function generateMetadata(): Promise<Metadata> {
  const user = await loadMe() as UserInterface
  return {
    title: {
      default: user.display_name,
      template: `%s | ${APP_NAME}`,
    },
  }
}

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const user = await loadMe()

  return (
    <SpotifyPlayerProvider>
      <div className='main-container'>
        <div className="navigation-bar">
          <HeaderNavigation />
        </div>
        <div className='sidebar'>
          <Menu user={user} />
        </div>
        <div className='content'>
          {children}
        </div>
      </div>
      <Player />
    </SpotifyPlayerProvider>
  )
}
