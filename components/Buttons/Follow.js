'use client'
import { useCallback, useEffect, useState } from "react"
import HttpProvider from '@/services/HttpProvider'
import style from "./Button.module.scss"

/**
 * follow or following
 * based on props
 * @param {String} type artist or user 
 * @param {String} ids comma separated id of artist or user
 * @returns {JSX}
 */
export default function FollowButton ({
  type = "artist",
  ids = "",
  className = "",
  onClick = () => {},
  isLoading = false,
  loadingValue = "Loading...",
  icon = false
}) {
  const [loading, setLoading] = useState(true)
  const [following, setFollowing] = useState(false)

  const checkForFollow = useCallback(() => {
    setLoading(true)
    return HttpProvider.get('/api/me/following/contains', {
      params: {
        type,
        ids
      }
    })
      .then((res) => {
        const [ isFollowing ] = res.data
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
    <button type="button" className={`btn btn-small ${className} ${following ? 'btn-success' : 'btn-secondary' }`} onClick={handleClick}>
      <div className={`${style.buttonContent} ${icon ? style.buttonContentWithIcon : ''} ${isLoading || loading ? style.buttonContentIsLoading : ''}`}>
        <div className={style.buttonContentText}>{ following ? 'Following' : 'Follow' }</div>
        {
          isLoading || loading ? 
            <div className={style.buttonContentLoader}>{loadingValue}</div>
          : null
        }
      </div>
    </button>
  )
}