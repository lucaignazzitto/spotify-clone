import { AlbumInterface } from "./album.inteface"
import { ArtistInterface } from "./artist.inteface"
import { PlaylistInterface } from "./playlist.interface"
import { TrackInterface } from "./track.interface"

export interface SearchInterface {
  tracks: {
    items: TrackInterface[]
  }
  albums: {
    items: AlbumInterface[]
  }
  artists: {
    items: ArtistInterface[]
  }
  playlists: {
    items: PlaylistInterface[]
  }
  shows: any // not handled
  episodes: any // not handled
  audiobooks: any // not handled
}