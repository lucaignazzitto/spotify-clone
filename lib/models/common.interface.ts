export interface Image {
  url: string
  height: number
  width: number
}

export interface External_Ids {
  isrc: string,
  ean: string,
  upc: string
}

export interface Owner {
  external_urls: External_Urls,
  href: string,
  id: string,
  type: string,
  uri: string,
  display_name: string
}

export interface Followers {
  href: string,
  total: number
}

export interface External_Urls {
  spotify: string
}

export interface Copyrights {
  text: string
  type: string
}

export type Restriction = "market" | "product" | "explicit"
export type AvailableMarkets = "US" | "IT" | "FR" | "DE" | "ES" | "GB" | "CN" | "JP" | "BR" | "CA"