import { External_Urls, Image, Owner } from "./common.interface"
import { TrackInterface } from "./track.interface"

export interface PlaylistInterface {
  collaborative: boolean,
  description: string,
  external_urls: External_Urls,
  href: string,
  id: string,
  images: Image[],
  name: string,
  owner: Owner,
  public: boolean,
  snapshot_id: string,
  tracks: {
    href: string,
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number,
    items: [
      {
        added_at: string,
        added_by: {
          external_urls: External_Urls,
          href: string,
          id: string,
          type: string,
          uri: string
        },
        is_local: false,
        track: TrackInterface
      }
    ]
  },
  type: "playlist",
  uri: string
}