import Device from './Device'

export default function Devices ({ devices = [], className = "" }) {
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