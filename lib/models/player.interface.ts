import { External_Urls } from "./common.interface"
import { DeviceInterface } from "./devices.interface"
import { EpisodeInterface } from "./episode.interface"
import { TrackInterface } from "./track.interface"

export interface PlayRequestParams {
  context_uri: string,
  offset: {
      position: number
  },
  position_ms: number
}


export interface PlayerActions {
  interrupting_playback: boolean,
  pausing: boolean,
  resuming: boolean,
  seeking: boolean,
  skipping_next: boolean,
  skipping_prev: boolean,
  toggling_repeat_context: boolean,
  toggling_shuffle: boolean,
  toggling_repeat_track: boolean,
  transferring_playback: boolean
}


export interface PlayerInterface {
  device: DeviceInterface,
  repeat_state: string,
  shuffle_state: boolean,
  context: {
    type: string,
    href: string,
    external_urls: External_Urls,
    uri: string
  },
  timestamp: number,
  progress_ms: number,
  is_playing: boolean,
  item: TrackInterface | EpisodeInterface,
  currently_playing_type: string,
  actions: PlayerActions
}