'use client'
import HttpProvider from "@/services/HttpProvider"
import loginBg from "@/public/images/login.png"
import logo from "@/public/images/logo.svg"
import Button from "@/components/Buttons/Button"
import { useState } from "react"
import Image from "next/image"
import BackgroundHandler from "@/components/Backound/Handler"

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false)

  const handleLogin = (e): Promise<boolean | string> => {
    e.preventDefault()
    setLoading(true)
    return HttpProvider.post('api/me/login')
      .then((res) => {
        const { url }: { url: string } = res.data
        if (url && url.startsWith('http')) {
          document.location = url
        }
        return true
      })
      .catch(() => {
        setLoading(false)
        return ''
      })
  }

  return (
    <div className="relative w-full h-lvh flex items-center justify-center p-5">
      <BackgroundHandler src={loginBg} />
      <div className="py-12 px-10 max-w-[500px] rounded-xl bg-black shadow-2xs shadow-black">
        <div>
          <Image src={logo.src} width={40} height={40} alt="Spotify" />
        </div>
        <div className="mt-7">
          <h1>Not logged-in</h1>
          <p className="text-gray-300 mt-3">
            Your session is expired or you are never logged in.<br></br>
            Login to access to all functionality
          </p>
          <div className="mt-10">
            <Button className={`btn-success`} onClick={handleLogin} text="Login" isLoading={loading} />
          </div>
        </div>
      </div>
    </div>
  )
}
