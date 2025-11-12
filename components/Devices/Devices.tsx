"use client"
import { DeviceInterface } from '@/lib/models/devices.interface'
import Device from './Device'
import { Modal } from 'react-bootstrap'
import { useSpotifyPlayer } from '@/contexts/SpotifyPlayerContext'
import { useCallback, useEffect } from 'react'

interface DevicesProps {
  devices?: DeviceInterface[],
  className?: string
}

function Devices({ devices = [], className = "" }: DevicesProps) {
  return (
    <div className={className}>
      {
        (devices && devices.length > 0) ?
          devices.map((device, index) => (
            <Device device={device} key={index} />
          ))
          : <p>No Devices found</p>
      }
    </div>
  )
}

interface DeviceModalProps extends React.ComponentProps<typeof Modal> { }

function DeviceModal({ onDeviceSelected = () => {}, ...props }: DeviceModalProps) {
  const { devices, loadDevices } = useSpotifyPlayer()

  if (props?.show) loadDevices()

  return (
    <Modal centered {...props}>
      <Modal.Header closeButton closeVariant="white" className='pt-4 pb-3 px-4' style={{ border: 'none' }}>
        <Modal.Title>
          <div>
            <span><b>Select a device</b></span>
            <p className='mb-0 fs-12 cl-grey'>or chooce another device</p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="nav flex-column px-2">
          {
            devices.map((device, index) => (
              <li key={index}>
                <Device device={device} showVolume={false} className='no-style' onDeviceSelected={onDeviceSelected} />
              </li>
            ))
          }
        </ul>
      </Modal.Body>
    </Modal>
  )
}


export type DevicesComponentType = typeof Devices & {
  Modal: typeof DeviceModal;
};

Devices.Modal = DeviceModal

export default Devices