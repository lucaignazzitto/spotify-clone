import Image, { ImageProps } from "next/image"
import style from "./Fit.module.scss"

interface Props extends Omit<ImageProps, 'src'> {
  url: string,
  className?: string,
  quality?: number
}

export default function ImageFit ({ url, alt = "", className = "", quality = 75, ...props }: Props) {
  return (
    <div className={`${style.imageFitWrapp} ${className}`}>
      <Image src={url} fill sizes="100%" alt={alt} className="img-fluid" quality={quality} {...props} />
      <div style={{ backgroundImage: `url(${url})`}} />
    </div>
  )
}