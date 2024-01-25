import style from './CopyRight.module.scss'

export default function CopyRight ({ copyrights = [], className = "" }) {
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