import Image from "next/image"

export default function ImageFlat ({ alt = "", className = "img-fluid", quality = 80, ...props }) {
  return (
    <Image
    { ...props }
    alt={alt}
    className={className}
    sizes="100%"
    quality={quality} />
  )
}