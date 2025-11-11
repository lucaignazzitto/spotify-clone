'use client'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Device from "@/components/Devices/Device"
import Icon from '@/components/Image/Icon'
import Spinner from "@/components/Loader/Spinner"
import Link from "next/link"
import { useState } from 'react';
import { useSpotifyPlayer } from '@/contexts/SpotifyPlayerContext';

function DevicesButton ({ className = "", color = "" }: { className?: string, color?: string }) {
  const { activeDevice, devices, loadDevices } = useSpotifyPlayer()
  const [ loading, setLoading ] = useState<boolean>(false)
  
  const onDevicesToggle = (status: boolean) => {
    if (status) {
      getDevices()
    }
  }

  const getDevices = () => {
    setLoading(true)
    return loadDevices()
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <OverlayTrigger
        trigger="click"
        rootClose={true}
        onToggle={onDevicesToggle}
        placement="top"
        overlay={
        <Popover style={{ maxWidth: 300 }}>
          <Popover.Header className='p-3'>
            <div className='d-flex align-items-center'>
              <Spinner width={20} height={20} show={loading} className='me-2' />
              <span><b>Select a device</b></span>
            </div>
            {
              activeDevice ? 
              <p className='m-0 fs-12 cl-green'><Icon id="speaker-active" className='fill-green me-2' width={16} /> <b>{activeDevice?.name}</b></p>
              : null
            }
            <p className='mt-1 mb-0 fs-12 cl-grey'>or chooce another device</p>
          </Popover.Header>
          <Popover.Body>
            <ul className="nav">
              {
                devices.map((device, index) => (
                  <li key={index}>
                    <Device device={device} showVolume={false} className='no-style' />
                  </li>
                ))
              }
            </ul>
          </Popover.Body>
        </Popover>
      }>
        <div className='d-none d-lg-block'>
          <button className='btn btn-none hover-anim'>
            <Icon id="devices" color={color} />
          </button>
        </div>
      </OverlayTrigger>
      <Link className={`hover-anim ${className} d-lg-none`} href={'/player/devices'}>
        <Icon id="devices" color={color} />
      </Link>
    </>
  )
}

export default DevicesButton
