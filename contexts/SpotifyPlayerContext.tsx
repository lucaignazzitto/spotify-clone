"use client"
import Devices from "@/components/Devices/Devices";
import { DeviceInterface } from "@/lib/models/devices.interface";
import { PlayerInterface, PlayRequestParams } from "@/lib/models/player.interface";
import { TrackInterface } from "@/lib/models/track.interface";
import HttpProvider from "@/services/HttpProvider"
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";

interface SpotifyPlayer {
  player: PlayerInterface,
  deviceId: DeviceInterface['id'],
  activeDevice: DeviceInterface,
  devices: DeviceInterface[],
  track: TrackInterface,
  changingTrack: boolean,
  isPlaying: boolean,
  transferPlayback: (deviceId: DeviceInterface['id'], play?: boolean) => Promise<void>,
  nextSong: (deviceId: DeviceInterface['id']) => Promise<void>,
  prevSong: (deviceId: DeviceInterface['id']) => Promise<void>,
  repeat: (deviceId: DeviceInterface['id'], state: string) => Promise<void>,
  addToQueue: (deviceId: DeviceInterface['id'], trackUri: string) => Promise<void>,
  setOpenDevicePicker: Dispatch<SetStateAction<boolean>>,
  handleSync: (toggle: boolean) => void,
  loadPlayer: (market?: string) => Promise<PlayerInterface>,
  loadDevices: () => Promise<DeviceInterface[]>,
  seek: (deviceId: DeviceInterface['id'], state: boolean) => Promise<void>,
  shuffle: (deviceId?: DeviceInterface['id'], state?: boolean) => Promise<void>,
  play: (deviceId: DeviceInterface['id'], param: PlayRequestParams) => void,
  pause: (deviceId: DeviceInterface['id']) => void,
}

const SpotifyPlayerContext = createContext<SpotifyPlayer | undefined>(undefined);

export function SpotifyPlayerProvider({ children }) {
  const [player, setPlayer] = useState<PlayerInterface>()
  const [changingTrack, setChangingTrack] = useState<boolean>(false)
  const [activeDevice, setActiveDevice] = useState<DeviceInterface>()
  const [openDevicePicker, setOpenDevicePicker] = useState<boolean>(false)
  const [devices, setDevices] = useState<DeviceInterface[]>([])
  const [deviceId, setDeviceId] = useState<DeviceInterface['id']>(null);
  const [track, setTrack] = useState<TrackInterface>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playerUpdater = useRef<any>(null)

  const initSync = () => {
    loadPlayer()
    playerUpdater.current = setInterval(() => {
      loadPlayer()
        .catch(() => {
          clearInterval(playerUpdater.current)
        })
    }, 4000);
  }

  const handleSync: SpotifyPlayer['handleSync'] = (toggle) => {
    if (toggle) {
      return initSync()
    } else {
      return clearInterval(playerUpdater.current)
    }
  }

  const loadPlayer: SpotifyPlayer['loadPlayer'] = (market = 'IT') => {
    return HttpProvider.get(`/api/me/player?market=${market}`)
      .then((res) => {
        const p = res.data.player
        setPlayer(p)
        setActiveDevice(p?.device)
        setTrack(p.item)
        setDeviceId(p?.device?.id)
        setIsPlaying(p?.is_playing)
        return p
      })
  }

  const transferPlayback: SpotifyPlayer['transferPlayback'] = (deviceId, play = isPlaying) => {
    return HttpProvider.put('/api/me/player', {
      device_id: deviceId,
      play
    })
      .then(async () => {
        // reload player
        await loadDevices()
        setDeviceId(deviceId)
        return undefined
      })
  }

  const nextSong: SpotifyPlayer['nextSong'] = (deviceId) => {
    return HttpProvider.post('/api/me/player/next', {
      device_id: deviceId
    })
      .then(async (res) => {
        // reload player
        await loadPlayer()
        return undefined
      })
  }

  const prevSong: SpotifyPlayer['prevSong'] = (deviceId) => {
    return HttpProvider.post('/api/me/player/previous', {
      device_id: deviceId
    })
      .then(async (res) => {
        // reload player
        await loadPlayer()
        return undefined
      })
  }

  const addToQueue: SpotifyPlayer['addToQueue'] = (deviceId, trackUri) => {
    return HttpProvider.post('/api/me/player/queue', {
      device_id: deviceId,
      uri: trackUri
    })
  }

  const play: SpotifyPlayer['play'] = (deviceId, params) => {
    let oldStatus = isPlaying
    setChangingTrack(true)
    setIsPlaying(true)
    handleSync(false)
    return HttpProvider.put(`/api/me/player/play?device_id=${deviceId}`, params)
      .then(async (res) => {
        // reload player
        await loadPlayer()
        return res
      })
      .catch(err => {
        setIsPlaying(oldStatus)
        throw new Error(err)
      })
      .finally(() => {
        setChangingTrack(false)
        handleSync(true)
      })
  }

  const pause: SpotifyPlayer['pause'] = (deviceId) => {
    let oldStatus = isPlaying
    setChangingTrack(true)
    setIsPlaying(false)
    handleSync(false)
    return HttpProvider.put(`/api/me/player/pause`, {
      device_id: deviceId
    })
      .then(async (res) => {
        // reload player
        await loadPlayer()
        return res
      })
      .catch(err => {
        setIsPlaying(oldStatus)
        throw new Error(err)
      })
      .finally(() => {
        setChangingTrack(false)
        handleSync(true)
      })
  }

  const shuffle: SpotifyPlayer['shuffle'] = (id = deviceId, state = false) => {
    return HttpProvider.put('/api/me/player/shuffle', {
      device_id: id,
      state
    })
  }

  const repeat: SpotifyPlayer['repeat'] = (id = deviceId, state) => {
    return HttpProvider.put('/api/me/player/repeat', {
      device_id: id,
      state
    })
  }

  const seek: SpotifyPlayer['seek'] = (deviceId, position_ms) => {
    return HttpProvider.put('/api/me/player/seek', {
      device_id: deviceId,
      position_ms
    })
  }

  const loadDevices = (): Promise<DeviceInterface[]> => {
    return HttpProvider.get('/api/me/player/devices')
      .then((res) => {
        const { devices = [] } = res.data
        const activeDevice = devices.find(d => d.is_active)
        setActiveDevice(activeDevice)
        setDevices(devices)
        return devices
      })
  }

  useEffect(() => {
    initSync()
    return () => {
      if (playerUpdater.current) {
        clearInterval(playerUpdater.current)
      }
    }
  }, [])

  return (
    <SpotifyPlayerContext.Provider value={{
      player,
      deviceId,
      activeDevice,
      devices,
      track,
      isPlaying,
      changingTrack,
      repeat,
      addToQueue,
      nextSong,
      prevSong,
      setOpenDevicePicker,
      transferPlayback,
      handleSync,
      loadPlayer,
      loadDevices,
      seek,
      shuffle,
      play,
      pause,
    }}>
      {children}
      <Devices.Modal show={openDevicePicker} onHide={() => setOpenDevicePicker(false)} onDeviceSelected={() => setOpenDevicePicker(false)} />
    </SpotifyPlayerContext.Provider>
  )
}

export function useSpotifyPlayer() {
  return useContext(SpotifyPlayerContext);
}