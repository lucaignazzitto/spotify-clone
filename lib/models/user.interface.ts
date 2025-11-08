import { External_Urls, Followers, Image } from "./common.interface";

export interface UserInterface {
  display_name: string;
  external_urls: External_Urls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
  product: string;
}