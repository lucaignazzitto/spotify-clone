'use client'
import { useCallback, useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import HttpProvider from '@/services/HttpProvider'
import Icon from '@/components/Image/Icon'
import Spinner from "../Loader/Spinner";

/**
 * Like or dislike
 * based on props
 * @param {String} ids comma separated ids of tracks
 * @returns {JSX}
 */
export default function LikeButton ({
  ids = "",
  label = "",
  className = "",
  type = "track",
  animate = true,
  onClick = () => {}
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const checkForLike = useCallback(() => {
    const url = type === 'track' ? '/api/me/tracks/contains' : '/api/me/album/contains'
    return HttpProvider.get(url, {
      params: {
        ids
      }
    })
      .then((res) => {
        const [ liked = false ] = res.data || [false]
        setIsLiked(liked)
        return res
      })
  }, [ids])


  const handleClick = (e) => {
    e.preventDefault()
    setLoading(true)
    const url = '/api/me/tracks'
    const params = {
      ids
    }
    const httpMethod = isLiked ? HttpProvider.delete(url, { data: params }) : HttpProvider.put(url, params)
    return httpMethod
      .then((res) => {
        setIsLiked(like => like = !like)
        return res
      })
      .finally(() => {
        setLoading(false)
        refreshPageAfterEdit()
        onClick && onClick(e)
      })
  }

  const refreshPageAfterEdit = () => {
    // Refresh the current route
    // losing client-side browser or React state.
    router.refresh()
  }


  useEffect(() => {
    checkForLike()
  }, [checkForLike])

  return (
    <button type="button" className={`btn btn-none btn-like ${animate ? 'hover-anim' : ''} ${className}`} onClick={handleClick}>
      {
        loading ? <Spinner show={true} width={20} height={20} />
        : <>
          <Icon id={isLiked ? 'heart-active' : 'heart'} color={isLiked ? '#1ed760' : ''} width={20} height={20} />
          { label }
        </>
      }
    </button>
  )
}