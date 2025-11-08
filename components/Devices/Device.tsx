'use client'
import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import Spinner from "@/components/Loader/Spinner"
import Icon from "@/components/Image/Icon"
import Volume from "./Volume"
import style from "./Devices.module.scss"
import { useSpotifyPlayer } from "@/contexts/SpotifyPlayerContext"
import { DeviceInterface } from "@/lib/models/devices.interface"

interface DeviceProps {
  device?: DeviceInterface,
  showVolume?: boolean,
  className?: string
}

function Device({ device, showVolume = true, className = "" }: DeviceProps) {
  const { activeDevice, transferPlayback, isPlaying, handleSync } = useSpotifyPlayer()

  const [loading, setLoading] = useState(false)
  const [isActive, setIsActive] = useState(device.is_active)

  const switchToDevice = (e) => {
    e.preventDefault()
    setLoading(true)
    handleSync(false)
    return transferPlayback(device.id, isPlaying)
      .finally(() => {
        setLoading(false)
        handleSync(true)
      })
  }

  useEffect(() => {
    setIsActive(activeDevice?.id === device.id)
  }, [, activeDevice?.id])

  return (
    Object.keys(device).length ?
      <div className={`device ${style.deviceWrapp} ${isActive ? style.deviceWrappIsActive : ''} ${className}`}>
        <div className={`device-inner ${style.deviceWrappInner}`}>
          <div className={`device-inner-content ${style.deviceWrappInnerContent}`}>
            <button className="btn btn-none w-100 align-items-center" onClick={switchToDevice}>
              <div className={`device-inner-icon ${style.deviceWrappInnerContentIcon}`}>
                {
                  loading ? <Spinner show={true} />
                    : <Icon id={device.type.toLowerCase()} />
                }
              </div>
              <div className={`device-inner-icon ${style.deviceWrappInnerContentTitle}`}>
                {device.name}
              </div>
            </button>
            {
              device.supports_volume && showVolume ?
                <div className={`device-inner-icon ${style.deviceWrappInnerContentVolume}`}>
                  <Volume deviceId={device.id} volume_percent={device.volume_percent} />
                </div>
                : null
            }
          </div>
        </div>
      </div>
      : <p>No device found</p>
  )
}

export default observer(Device)