import { External_Urls, Image, Restriction } from "./common.interface"
import { ShowInferface } from "./show.interface";

export interface EpisodeInterface {
  audio_preview_url: string;
  description: string;
  html_description: string;
  duration_ms: string;
  explicit: string;
  external_urls: External_Urls,
  href: string;
  id: string;
  images: Image[],
  is_externally_hosted: boolean,
  is_playable: boolean,
  language: string;
  languages: string[],
  name: string;
  release_date: string,
  release_date_precision: string,
  resume_point: {
    fully_played: boolean,
    resume_position_ms: 0
  },
  type: "episode",
  uri: string;
  restrictions: Restriction,
  show: ShowInferface
}