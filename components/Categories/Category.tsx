import Link from "next/link"
import style from "./Category.module.scss"
import { CategoryInteface } from "@/lib/models/category.interface"
import Image from "next/image"
import { mediaPlaceholder } from "@/utils/helpers"

type Props = {
  category: CategoryInteface
}

export default function Category ({ category }: Props) {
  const [ big, medium, small ] = category?.icons
  const image = medium || big || small

  return (
    <div className={style.CategoryWrapp}>
      <Link href={{
        pathname: `/categories/${category.id}`
      }}>
        <div className={style.CategoryWrappInner}>
          <div className={style.CategoryWrappInnerMedia}>
            <Image src={image?.url} width={300} height={300} placeholder='blur' blurDataURL={mediaPlaceholder} loading="lazy" alt={`Cover photo of ${category.name}`} className='img-fluid' />
          </div>
          <div className={style.CategoryWrappInnerTitle}>{category.name}</div>
        </div>
      </Link>
    </div>
  )
}