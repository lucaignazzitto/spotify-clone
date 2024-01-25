'use client'
import HttpProvider from "@/services/HttpProvider"
import loginBg from "@/public/images/login.png"
import logo from "@/public/images/logo.svg"
import Button from "@/components/Buttons/Button"
import style from './Page.module.scss'
import { useState } from "react"

export default function Login() {
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    return HttpProvider.post('api/me/login')
      .then((res) => {
        const { url } = res.data
        if (url && url.startsWith('http')) {
          document.location = url
        }
        return true
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div className={style.LoginPage}>
      <div className={style.LoginPageBg} style={{ backgroundImage: `url(${loginBg.src})`}}></div>
      <div className={style.LoginPageForm}>
        <div className={style.LoginPageFormLogo}>
          <img src={logo.src} />
        </div>
        <p className={style.LoginPageFormTitle}>You are not logged-in</p>
        <div className={style.LoginPageFormDescription}>
          <p>
            Your session is expired or you are never logged in.
            Login to access to all functionality
          </p>
        </div>
        <Button className={`${style.LoginPageFormCta} btn-success`} onClick={handleLogin} text="Login" isLoading={loading} />
      </div>
    </div>
  )
}
