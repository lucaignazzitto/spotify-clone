import { DeviceInterface } from '@/lib/models/devices.interface'
import Device from './Device'

export default function Devices ({ devices = [], className = "" }: { devices?: DeviceInterface[], className?: string }) {
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