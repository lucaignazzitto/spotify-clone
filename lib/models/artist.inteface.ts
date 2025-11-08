import { External_Urls, Followers, Image } from "./common.interface";

export interface ArtistInterface {
  external_urls: External_Urls,
  followers: Followers,
  genres: string[],
  href: string,
  id: string,
  images: Image[],
  name: string,
  popularity: number,
  type: "artist",
  uri: string
}

export type SimplifiedArtistInterface = Omit<
  ArtistInterface,
  "genres" | "followers" | "popularity" | "images"
>