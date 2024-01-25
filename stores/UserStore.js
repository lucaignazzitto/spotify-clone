import { makeAutoObservable } from "mobx"
import { makePersistable } from "mobx-persist-store"
import HttpProvider from "@/services/HttpProvider"
import localforage from "localforage"

const isBrowser = typeof window !== "undefined"

class UserStore {
  accessToken = ""
  user = ""

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: "UserStore",
      properties: ["accessToken", "user"],
      storage: isBrowser ? localforage : undefined,
    }, { delay: 50, fireImmediately: true })
      .then((res) => {
        return res
      })
  }

  loadUser = () => {
    return HttpProvider.get(`/api/me`)
      .then((res) => {
        const { me } = res.data
        this.setUser(me)
        return me
      })
  }

  loadPlaylist = (type = 'mine', limit = 50) => {
    return HttpProvider.get(`/api/me/playlists`, {
      params: {
        limit
      }
    })
      .then((res) => {
        return res.data
      })
  }

  addToPlaylist = ({ playlist_id, tracks, position = 0 }) => {
    return HttpProvider.post(`/api/playlists/${playlist_id}/tracks`, {
      tracks,
      position
    })
      .then((res) => {
        return res.data
      })
  }

  removeFromPlaylist = ({ playlist_id, tracks }) => {
    return HttpProvider.delete(`/api/playlists/${playlist_id}/tracks`, {
      data: {
        tracks
      }
    })
      .then((res) => {
        return res.data
      })
  }

  get getToken () {
    return this.accessToken
  }

  get getUser () {
    return this.user || {}
  }

  get getUserId () {
    return this.user?.id
  }
  
  setToken = (token) => {
    this.accessToken = token
  }

  setUser = (user) => {
    this.user = user
  }
}

const userStore = new UserStore()
export default userStore
