"use client"
import Link, { LinkProps } from "next/link"
import { useSearchParams } from "next/navigation"
import { useCallback } from "react"

type PickerOptions = {
  title: string
  urlKey: string
}

interface Props extends Omit<LinkProps, 'href'> {
  className?: string,
  options: PickerOptions[],
  urlKey: string,
  activeKey?: string,
  redirectPath?: (opt: PickerOptions) => string
}

export default function UrlPicker({ className = "", options, activeKey, urlKey, redirectPath, ...props }: Props) {
  const searchParams = useSearchParams()
  const active = activeKey || searchParams.get(urlKey)

  const createQueryString = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)
    return params.toString()
  }, [searchParams])

  return (
    options.map((type) => (
      <Link href={redirectPath ? redirectPath(type) : { query: createQueryString(urlKey, type.urlKey) }} scroll={false} key={type.urlKey} className={`btn btn-small btn-rounded ${active === type.urlKey ? 'btn-light' : 'btn-dark'} fs-12 ${className}`} {...props}>{type.title}</Link>
    ))
  )
}