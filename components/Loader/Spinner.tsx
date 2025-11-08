import Icon from '@/components/Image/Icon'
import style from './Spinner.module.scss'

interface Prop {
  show?: boolean,
  className?: string
  width?: number
  height?: number
  color?: string
}

export default function Spinner ({ show = false, className = "", width = 25, height = 25, color = '#fff' }) {
  return (
    show ? 
      <div className={`${className} ${style.Spinner}`}
      style={{
        width,
        height
      }}>
        <Icon color={color} id='loader' className={style.SpinnerIcon} />
      </div>
    : null
  )
}