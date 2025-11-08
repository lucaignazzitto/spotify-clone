import { Copyrights } from '@/lib/models/common.interface'
import style from './CopyRight.module.scss'

type Props = {
  copyrights: Copyrights[],
  className?: string
}

export default function CopyRight ({ copyrights = [], className = "" }: Props) {
  return (
    <div className={`${style.CopyWrapp} ${className}`}>
      {
        copyrights.map((copy, index) => (
          <p key={index} className={style.CopyWrappLine}>@ {copy.text}</p>
        ))
      }
    </div>
  )
}