import { makeAutoObservable } from "mobx"
import { makePersistable } from "mobx-persist-store"
import HttpProvider from "@/services/HttpProvider"
import localforage from "localforage"
import { TrackInterface } from "@/lib/models/track.interface"

const isBrowser = typeof window !== "undefined"

class UserStore {
  user = ""

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: "UserStore",
      properties: ["user"],
      storage: isBrowser ? localforage : undefined,
    }, { delay: 50, fireImmediately: true })
      .then((res) => {
        return res
      })
  }

  loadPlaylists = (limit = 50) => {
    return HttpProvider.get(`/api/me/playlists`, {
      params: {
        limit
      }
    })
      .then((res) => {
        return res.data
      })
  }

  addToPlaylist = ({ playlist_id, tracks, position = 0 }): Promise<string> => {
    return HttpProvider.post(`/api/playlists/${playlist_id}/tracks`, {
      tracks,
      position
    })
      .then((res) => {
        return res.data
      })
  }

  removeFromPlaylist = ({ playlist_id, tracks }: { playlist_id: string, tracks: TrackInterface['uri'][] }): Promise<string> => {
    return HttpProvider.delete(`/api/playlists/${playlist_id}/tracks`, {
      data: {
        tracks
      }
    })
      .then((res) => {
        return res.data
      })
  }
}

const userStore = new UserStore()
export default userStore
