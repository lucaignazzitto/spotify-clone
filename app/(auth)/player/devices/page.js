import { cookies } from 'next/headers'
import pageBg from "@/public/images/bubble-4.jpg"
import PlayerStore from '@/stores/PlayerStore'
import Devices from "@/components/Devices/Devices"
// import style from "./Page.module.scss"

async function loadDevices() {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/player/devices`, {
    headers: { 
      Cookie: cookies().toString()
    },
    cache: "no-cache"
  })
   
  if (response.ok) {
    return response.json()
      .then((res) => {
        PlayerStore.setDevices(res.devices)
        return res
      })
  } else {
    return []
  }
}

export default async function DevicesPage () {
  const { devices = [] } = await loadDevices()

  return (
    <main>
      <div className="page-background" style={{ backgroundImage: `url(${pageBg.src})`}}></div>
      <h1 className="page-title">Connect to device</h1>
      <section className={`page-section`}>
        <span className={`section-title`}>Your devices</span>
        <Devices devices={devices} className='mt-4' />
      </section>
    </main>
  )
}
