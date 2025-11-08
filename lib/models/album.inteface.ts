import { ArtistInterface } from "./artist.inteface"
import { Restriction, Image, External_Urls, Copyrights } from "./common.interface"
import { TrackInterface } from "./track.interface"

export interface AlbumInterface {
  album_type: "album" | "single" | "compilation" | "ep",
  total_tracks: number,
  available_markets: any[],
  external_urls: External_Urls,
  href: string,
  id: string,
  images: Image[],
  name: string,
  release_date: string,
  release_date_precision: string,
  restrictions: {
    reason: Restriction
  },
  tracks: {
    items: TrackInterface[],
  }
  copyrights: Copyrights[],
  type: "album" | "playlist",
  uri: string,
  artists: ArtistInterface[]
} 