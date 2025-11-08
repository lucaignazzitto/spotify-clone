import Image, { ImageProps } from "next/image"

export default function BackgroundHandler({ ...props }) {
  return (
    <Image
      alt="background page"
      className="page-background"
      priority
      objectFit="cover"
      objectPosition="center"
      placeholder="blur"
      quality={100}
      fill
      sizes="100vw"
      {...props as ImageProps}
    />
  )
}