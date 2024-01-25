import style from './Icon.module.scss'

export default function Icon ({ className = "", id = "", color = "", width, height, styles = {} }) {
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