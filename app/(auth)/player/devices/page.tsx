import { cookies } from 'next/headers'
import pageBg from "@/public/images/bubble-4.jpg"
import Devices from "@/components/Devices/Devices"
import BackgroundHandler from '@/components/Backound/Handler'
import { DeviceInterface } from '@/lib/models/devices.interface'
import { Metadata } from 'next'
// import style from "./Page.module.scss"

async function loadDevices() {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/player/devices`, {
    headers: { 
      Cookie: (await cookies()).toString()
    },
    cache: "no-cache"
  })
   
  if (response.ok) {
    return response.json()
      .then((res) => {
        const devices = res.devices as DeviceInterface[]
        return devices
      })
  } else {
    return []
  }
}

export function generateMetadata(): Metadata {
  return {
    title: "My devices"
  }
}

export default async function DevicesPage () {
  const devices = await loadDevices()
  return (
    <div>
      <BackgroundHandler src={pageBg} />
      <h1 className="page-title">Connect to device</h1>
      <section className={`page-section`}>
        <span className={`section-title`}>Your devices</span>
        <Devices devices={devices} className='mt-4' />
      </section>
    </div>
  )
}
