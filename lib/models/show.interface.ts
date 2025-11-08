import { AvailableMarkets, Copyrights, External_Urls, Image } from "./common.interface";

export interface ShowInferface {
  available_markets: AvailableMarkets[],
  copyrights: Copyrights[],
  description: string,
  html_description: string,
  explicit: boolean,
  external_urls: External_Urls,
  href: string,
  id: string,
  images: Image[],
  is_externally_hosted: boolean,
  languages: string[],
  media_type: string,
  name: string,
  publisher: string,
  type: "show",
  uri: string,
  total_episodes: number
}