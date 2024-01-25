import { useMemo } from "react"
import style from "./Lyrics.module.scss"

export default function LyricsText ({ className = "", lyrics, showNoLyricsMessage = false }) {
  const regex = /\n/g
  const convertLyrics = useMemo(() => {
    if (lyrics) {
      let html = ''
      const convertedString = [...lyrics.matchAll(regex)];
      if (convertedString && convertedString.length) {
        let startAt = 0
        let endAt = 0
        convertedString.forEach((element) => {
          endAt = element.index
          html += `<span>${lyrics.slice(startAt, endAt)}</span>`
          startAt = endAt
        });
      }
      return html
    } else {
      return showNoLyricsMessage ? '<span>OOPS, no lyrics for this track :(</span>' : ''
    }
  }, [lyrics])

  return (
    <div className={style.lyrics}>
      <div className={style.lyricsWrapp} dangerouslySetInnerHTML={{ __html: convertLyrics }}></div>
    </div>
  )
}