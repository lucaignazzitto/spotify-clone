import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: 'Login'
}

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div>{children}</div>
  )
}
