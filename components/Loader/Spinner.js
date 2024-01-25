import Icon from '@/components/Image/Icon'
import style from './Spinner.module.scss'

export default function Spinner ({ show = false, className = "", width = 25, height = 25, color = '#fff' }) {
  return (
    show ? 
      <div className={`${className} ${style.Spinner}`}
      style={{
        width,
        height
      }}>
        <Icon fill={color} id='loader' className={style.SpinnerIcon} />
      </div>
    : null
  )
}