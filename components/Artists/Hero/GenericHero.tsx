import { Image as ImageInterface } from '@/lib/models/common.interface'
import { ReactNode } from 'react'
import { Stack } from 'react-bootstrap'
import Image from 'next/image'
import { ArtistInterface } from '@/lib/models/artist.inteface'
import { mediaPlaceholder } from '@/utils/helpers'

type Props = {
  image?: ImageInterface,
  imageClassName?: string
  className?: string
  preTitle?: string | ReactNode
  preTitleClassName?: string
  title: string | ReactNode
  titleClassName?: string
  subtitle?: string | ReactNode
  subtitleClassName?: string
  endActions?: ReactNode
}

export default function GenericArtistHero({
  image,
  imageClassName,
  className,
  preTitle,
  preTitleClassName = "",
  title,
  titleClassName = "",
  subtitle,
  subtitleClassName = "",
  endActions = null
}: Props) {
  const finalImage = image.url 
  return (
    <Stack direction="vertical" gap={2} className={className}>
      {preTitle && <div className={`fs-12 font-medium ${preTitleClassName}`}>{preTitle}</div>}
      <Stack direction="horizontal" gap={3}>
        { finalImage && <Image src={finalImage} width={image?.width || 90} height={image?.height || 90} alt={`Cover for ${title}`} className={`img-fluid ${imageClassName}`} placeholder="blur" blurDataURL={mediaPlaceholder} />}
        {title && <div className={`font-bold ${titleClassName}`}>{title}</div>}
      </Stack>
      {preTitle && <div className={`fs-14 font-medium ${subtitleClassName}`}>{subtitle}</div>}
      {endActions}
    </Stack>
  )
}