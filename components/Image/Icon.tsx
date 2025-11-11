import style from './Icon.module.scss'

export interface IconProps {
  className?: string
  id?: string
  color?: string
  width?: number,
  height?: number,
  styles?: any
}

export default function Icon({ className = "", id = "", color = "", width, height, styles = {} }: IconProps) {
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