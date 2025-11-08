import { ButtonHTMLAttributes, ReactNode } from "react"
import style from "./Button.module.scss"

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  className?: string
  isLoading?: boolean
  loadingValue?: string
  icon?: ReactNode,
  text?: ReactNode
}


export default function Button({
  name = "button",
  type = "button",
  className = "",
  isLoading = false,
  loadingValue = "Loading...",
  icon = null,
  text = null,
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={`btn ${className}`} {...props}>
      <div className={`${style.buttonContent} ${icon ? style.buttonContentWithIcon : ''} ${isLoading ? style.buttonContentIsLoading : ''}`}>
        {
          icon && <div className={style.buttonContentIcon}>{icon}</div>
        }
        {
          text && <div className={style.buttonContentText}>{text}</div>
        }
        {
          isLoading && <div className={style.buttonContentLoader}>{loadingValue}</div>
        }
      </div>
    </button>
  )
}