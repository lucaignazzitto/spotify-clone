import { makeAutoObservable, toJS, set } from "mobx"
import HttpProvider from "@/services/HttpProvider"
class PlayerStore {
  player = ""
  devices = []
  activeDevice = ""

  constructor() {
    makeAutoObservable(this)
  }

  /** ----- SETTERS */
  setPlayer = (player) => {
    this.player = player
  }
  
  setPlayerPause = () => {
    set(this.player, 'is_playing', false)
  }

  setPlayerProgress = (progress_ms) => {
    set(this.player, 'progress_ms', progress_ms)
  }

  togglePlayerPause = (toggle = false) => {
    set(this.player, 'is_playing', toggle)
  }

  setPlayingTrack = (track) => {
    set(this.player, 'track', track)
  }

  setDevices = (devices) => {
    this.devices = devices
    const activeDevice = devices.find(d => d.is_active)
    this.setActiveDevice(activeDevice)
  }

  setActiveDevice = (device) => {
    this.activeDevice = device
  }

  /** ----- SETTERS */


  /** ----- GETTERS */
  get getPlayer () {
    return toJS(this.player)
  }

  get getPlayerId () {
    return this.activeDevice?.id || ""
  }

  get getIsPlaying () {
    return this.getPlayer?.is_playing || false
  }

  get getPlayerUri () {
    return this.getPlayer?.item?.uri || ""
  }

  get getDevices () {
    return this.devices
  }

  get getActiveDevice () {
    return this.activeDevice
  }

  isTrackActive (trackUri) {
    return this.getPlayerUri === trackUri
  }
  /** ----- GETTERS */

  loadPlayer ( market = 'IT') {
    return HttpProvider.get(`/api/me/player`, {
      params: {
        market
      }
    }, {
      cache: "no-cache"
    })
      .then((res) => {
        const p = res.data.player
        this.setPlayer(p)
        this.setActiveDevice(p?.device)
        if (Object.keys(p).length === 0) {
          this.setPlayerPause()
        }
        return p
      })
  }

  loadDevices () {
    return HttpProvider.get('/api/me/player/devices')
      .then((res) => {
        const { devices = [] } = res.data
        const activeDevice = devices.find(d => d.is_active)
        this.setActiveDevice(activeDevice?.id)
        this.setDevices(devices)
      })
  }

  transferPlayback (deviceId, play = this.getIsPlaying) {
    return HttpProvider.put('/api/me/player', {
      device_id: deviceId,
      play
    })
      .then((res) => {
        // reload player
        this.setActiveDevice(deviceId)
        // return this.loadPlayer()
        return res
      })
  }

  play (deviceId, params) {
    return HttpProvider.put(`/api/me/player/play?device_id=${deviceId}`, params, {
      cache: "no-cache"
    })
      .then(async (res) => {
        // reload player
        // return this.loadPlayer()
        await this.loadPlayer()
        this.togglePlayerPause(true)
        return res
      })
  }

  pause (deviceId) {
    return HttpProvider.put('/api/me/player/pause', {
      device_id: deviceId
    })
      .then(async (res) => {
        // reload player
        // return this.loadPlayer()
        await this.loadPlayer()
        this.togglePlayerPause(false)
        return res
      })
  }


  shuffle (deviceId, state = false) {
    return HttpProvider.put('/api/me/player/shuffle', {
      device_id: deviceId,
      state
    })
      .then((res) => {
        // reload player
        // return this.loadPlayer()
        return res
      })
  }

  repeat (deviceId, state = "context") {
    return HttpProvider.put('/api/me/player/repeat', {
      device_id: deviceId,
      state
    })
      .then((res) => {
        // reload player
        // return this.loadPlayer()
        return res
      })
  }


  previous (deviceId) {
    return HttpProvider.post('/api/me/player/previous', {
      device_id: deviceId
    })
      .then(async (res) => {
        // reload player
        return await this.loadPlayer()
      })
  }


  next (deviceId) {
    return HttpProvider.post('/api/me/player/next', {
      device_id: deviceId
    })
      .then(async (res) => {
        // reload player
        return await this.loadPlayer()
      })
  }

  addToQueue (deviceId, trackUri) {
    return HttpProvider.post('/api/me/player/queue', {
      device_id: deviceId,
      uri: trackUri
    })
  }
}

const playerStore = new PlayerStore()

export default playerStore
