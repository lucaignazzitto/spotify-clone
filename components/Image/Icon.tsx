import style from './Icon.module.scss'

interface Props {
  className?: string
  id?: string
  color?: string
  width?: number,
  height?: number,
  styles?: any
}

export default function Icon({ className = "", id = "", color = "", width, height, styles = {} }: Props) {
  return (
    <svg className={`${style.AppIcon} ${className}`} style={{
      fill: color,
      width,
      height,
      ...styles
    }}>
      <use href={`#${id}`}></use>
    </svg>
  )
}