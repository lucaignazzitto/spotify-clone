import Link from 'next/link'
import AppIcon from '@/components/Image/Icon'

export default function Logo ({ className = "", color = "#1ed760", width = 43, height = 43 }) {
  return (
    <Link href={'/'} className={className}>
      <AppIcon id='logo' width={width} height={height} color={color}></AppIcon>
    </Link>
  )
}