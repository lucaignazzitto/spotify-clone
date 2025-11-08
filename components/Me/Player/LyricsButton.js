import Icon from '@/components/Image/Icon'
import Link from "next/link"

/**
 * go to next track
 */
export default function LyricsButton ({ track, className = "", color = "" }) {
  return (
    track ?
      <Link
        className={`hover-anim ${className}`}
        href={`/player/lyrics`}
      >
        <Icon id="microphone" color={color} />
      </Link>
    : null
  )
}
