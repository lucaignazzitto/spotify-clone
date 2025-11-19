'use client'
import { ButtonHTMLAttributes, ReactNode, useCallback, useEffect, useState } from "react"
import HttpProvider from '@/services/HttpProvider'
import style from "./Button.module.scss"
import Button from "./Button"


interface FollowButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "type"> {
  type?: string
  ids?: string
  label?: string
  className?: string
  isLoading?: boolean
  loadingValue?: string
  icon?: ReactNode,
}

/**
 * follow or following
 * based on props
 * @param {String} type artist or user 
 * @param {String} ids comma separated id of artist or user
 * @returns {JSX}
 */
export default function FollowButton({
  type = "artist",
  ids = "",
  className = "",
  onClick = () => { },
  isLoading = false,
  loadingValue = "Loading...",
  icon = false
}: FollowButtonProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const [following, setFollowing] = useState<boolean>(false)

  const checkForFollow = useCallback(() => {
    setLoading(true)
    return HttpProvider.get('/api/me/following/contains', {
      params: {
        type,
        ids
      }
    })
      .then((res) => {
        const [isFollowing] = res.data
        setFollowing(isFollowing)
        return res
      })
      .finally(() => {
        setLoading(false)
      })
  }, [type, ids])


  const handleClick = (e) => {
    e.preventDefault()
    setLoading(true)
    const url = '/api/me/following'
    const params = {
      type,
      ids
    }
    const httpMethod = following ? HttpProvider.delete(url, { data: params }) : HttpProvider.put(url, params)
    return httpMethod
      .then((res) => {
        setFollowing(follow => follow = !follow)
        return res
      })
      .finally(() => {
        setLoading(false)
        onClick && onClick(e)
      })
  }


  useEffect(() => {
    checkForFollow()
  }, [checkForFollow])

  return (
    <Button
      type="button"
      variant="primary"
      className={`btn btn-small ${className}`}
      onClick={handleClick}
      isLoading={isLoading || loading}
      text={following ? 'Following' : 'Follow'}
    />
  )
}