import { AlbumInterface } from "./album.inteface"
import { SimplifiedArtistInterface } from "./artist.inteface"
import { AvailableMarkets, External_Ids, External_Urls, Restriction } from "./common.interface"

export interface TrackInterface {
  album: AlbumInterface
  artists: SimplifiedArtistInterface[],
  available_markets: AvailableMarkets,
  disc_number: number,
  duration_ms: number,
  explicit: boolean,
  external_ids: External_Ids,
  external_urls: External_Urls,
  href: string,
  id: string,
  is_playable: boolean,
  linked_from?: object,
  restrictions: {
    reason: Restriction
  },
  name: string,
  popularity: number,
  preview_url: string,
  track_number: number,
  type: "track",
  uri: string,
  is_local: boolean
} 