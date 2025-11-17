import { ButtonHTMLAttributes, ReactNode } from "react"
import { Button as BootButton, ButtonProps } from 'react-bootstrap'
import style from "./Button.module.scss"

interface AppButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">, ButtonProps {
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
}: AppButtonProps) {
  return (
    <BootButton type={type} variant="light" className={`btn ${className}`} {...props}>
      <div className={`${style.buttonContent} ${icon ? style.buttonContentWithIcon : ''} ${isLoading ? style.buttonContentIsLoading : ''}`}>
        {
          icon && <div className={style.buttonContentIcon}>{icon}</div>
        }
        {
          text && <div className={style.buttonContentText} style={{ opacity: isLoading ? 0 : 1 }}>{text}</div>
        }
        {
          isLoading && <div className={style.buttonContentLoader}>{loadingValue}</div>
        }
      </div>
    </BootButton>
  )
}