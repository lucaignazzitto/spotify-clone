'use client'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Device from "@/components/Devices/Device"
import Icon from '@/components/Image/Icon'
import Spinner from "@/components/Loader/Spinner"
import Link from "next/link"
import playerStore from '@/stores/PlayerStore';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

/**
 * go to devices page
 */
function DevicesButton ({ className = "", color = "" }) {
  const [ loading, setLoading ] = useState(false)
  const onDevicesToggle = (status) => {
    if (status) {
      loadDevices()
    }
  }

  const loadDevices = async () => {
    setLoading(true)
    return playerStore.loadDevices()
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    loadDevices()
  }, [])

  return (
    <>
      <OverlayTrigger
        trigger="click"
        rootClose={true}
        onToggle={onDevicesToggle}
        placement="top"
        overlay={
        <Popover>
          <Popover.Header className='p-3'>
            <div className='d-flex align-items-center'>
              <Spinner width={20} height={20} show={loading} className='me-2' />
              <span><b>Select a device</b></span>
            </div>
            {
              playerStore.getActiveDevice ? 
              <p className='m-0 fs-12 cl-green'><Icon id="speaker-active" className='fill-green me-2' width={16} /> <b>{playerStore.getActiveDevice?.name}</b></p>
              : null
            }
            <p className='mt-1 mb-0 fs-12 cl-grey'>or chooce another device</p>
          </Popover.Header>
          <Popover.Body>
            <ul className="nav">
              {
                playerStore.getDevices.map((device, index) => (
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

export default observer(DevicesButton)
