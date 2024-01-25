import Image from "next/image"
import style from "./Fit.module.scss"

export default function ImageFit ({ url, alt = "", className = "", quality = 80, props }) {
  return (
    <div className={`${style.imageFitWrapp} ${className}`}>
      <Image src={url} fill sizes="100%" alt={alt} className="img-fluid" quality={quality} {...props} />
      <div style={{ backgroundImage: `url(${url})`}} />
    </div>
  )
}