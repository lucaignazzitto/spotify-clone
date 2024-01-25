import Icon from '@/components/Image/Icon'
import Link from "next/link"

/**
 * go to next track
 */
export default function QueueButton ({ className = "", color = "" }) {  
  return (
    <Link
      className={`hover-anim ${className}`}
      href={'/player/queue'}
    >
      <Icon id="queue" color={color} />
    </Link>
  )
}
