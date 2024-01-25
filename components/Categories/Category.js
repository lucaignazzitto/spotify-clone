import Link from "next/link"
import ImageFit from "@/components/Image/Fit.js"

import style from "./Category.module.scss"

export default function Category ({ category }) {
  const [ big, medium, small ] = category?.icons
  const image = medium || big || small

  return (
    <div className={style.CategoryWrapp}>
      <Link href={{
        pathname: `/categories/${category.id}`
      }}>
        <div className={style.CategoryWrappInner}>
          <div className={style.CategoryWrappInnerMedia}>
            <ImageFit url={image?.url} alt={`Cover photo of ${category.name}`} />
          </div>
          <div className={style.CategoryWrappInnerTitle}>{category.name}</div>
        </div>
      </Link>
    </div>
  )
}