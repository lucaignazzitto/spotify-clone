import Icon from '@/components/Image/Icon'
import Link from "next/link"

interface Props {
  className?: string,
  color?: string
}
/**
 * go to next track
 */
export default function QueueButton ({ className = "", color = "" }: Props) {  
  return (
    <Link className={`hover-anim ${className}`} href={'/player/queue'}>
      <Icon id="queue" color={color} />
    </Link>
  )
}
