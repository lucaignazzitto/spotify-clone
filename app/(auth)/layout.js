import dynamic from 'next/dynamic'
import Menu from '@/components/Sidebar/Menu'
import HeaderNavigation from '@/components/Header/Navigation'

const Player = dynamic(() => import("@/components/Me/Player/Player"), {
  ssr: false,
});

import '@/styles/global.scss'

export default function AuthLayout({ children }) {
  return (
    <>
      <div className='main-container'>
        <div className="navigation-bar">
          <HeaderNavigation />
        </div>
        <div className='sidebar'>
          <Menu />
        </div>
        <div className='content'>
          {children}
        </div>
      </div>
      <Player />
    </>
  )
}
