import Link from "next/link"
import Image, { ImageProps } from "next/image"
import { mediaPlaceholder } from "@/utils/helpers"
import { ArtistInterface } from "@/lib/models/artist.inteface"
import { Stack } from "react-bootstrap"

interface Props {
  artist: ArtistInterface,
  showType?: boolean
  imageProps?: ImageProps
}

export default function ArtistAvatar({ artist }: Props) {
  const [small] = artist?.images

  return (
    <Link href={`/artists/${artist.id}`}>
      <Stack direction="horizontal" gap={2}>
        <Image
          src={small?.url}
          width={22}
          height={22}
          alt={`Cover photo of ${artist.name}`}
          placeholder="blur"
          blurDataURL={mediaPlaceholder}
          className="rounded-circle"
        />
        <div className={"fs-12 text-muted"}>{artist.name}</div>
      </Stack>
    </Link>
  )
}