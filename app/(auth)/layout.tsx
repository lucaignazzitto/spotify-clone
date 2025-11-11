import { cookies } from 'next/headers';
import { cache, ReactNode } from 'react';
import Menu from '@/components/Sidebar/Menu'
import HeaderNavigation from '@/components/Header/Navigation'
import Player from '@/components/Me/Player/Player';
import { SpotifyPlayerProvider } from '@/contexts/SpotifyPlayerContext';
import '@/styles/global.scss'
import { Metadata } from 'next';
import { UserInterface } from '@/lib/models/user.interface';
import { APP_NAME } from '../layout';

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
      <div className='relative block'>
        <div className="fixed w-full top-0 max-h-24 z-50 py-3 pr-7 pl-32 hidden lg:block">
          <HeaderNavigation />
        </div>
        <div className='w-[100px] h-full py-4 md:py-5 lg:fixed lg:top-0 lg:left-0 lg:backdrop-blur-[1px] lg:z-50 lg:py-6 lg:bg-black/5'>
          <Menu user={user} />
        </div>
        <div className='relative overflow-x-hidden lg:pl-32 lg:pt-24 lg:pr-16 pt:14 px-8 pb-24'>
          {children}
        </div>
      </div>
      <Player />
    </SpotifyPlayerProvider>
  )
}
