import style from "./Button.module.scss"

export default function Button ({
  name = "button",
  type = "button",
  className = "",
  onClick = () => {},
  isLoading = false,
  loadingValue = "Loading...",
  icon = false,
  text = "",
  ...props
}) {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick} name={name} { ...props }>
      <div className={`${style.buttonContent} ${icon ? style.buttonContentWithIcon : ''} ${isLoading ? style.buttonContentIsLoading : ''}`}>
        {
          icon ?
            <div className={style.buttonContentIcon}>{icon}</div>
          : null
        }
        {
          text ?
            <div className={style.buttonContentText}>{text}</div>
            : null
          }
        {
          isLoading ? 
            <div className={style.buttonContentLoader}>{loadingValue}</div>
          : null
        }
      </div>
    </button>
  )
}