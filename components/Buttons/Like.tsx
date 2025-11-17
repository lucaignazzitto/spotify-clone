'use client'
import { MouseEvent, ReactNode, useCallback, useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import HttpProvider from '@/services/HttpProvider'
import Icon, { IconProps } from '@/components/Image/Icon'
import Spinner from "../Loader/Spinner";
import { revalidateByPath, revalidateByTag } from "@/app/actions/revalidate";

interface Props {
  ids?: string
  label?: string | ReactNode
  className?: string
  type?: string
  animate?: boolean,
  iconProps?: IconProps,
  onClick?: () => void
}

/**
 * Like or dislike
 * based on props
 * @param {String} ids comma separated ids of tracks
 * @returns {JSX}
 */
export default function LikeButton({
  ids = "",
  label = "",
  className = "",
  type = "track",
  animate = true,
  iconProps = {},
  onClick = () => { },
  ...props
}: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>(false)

  const checkForLike = useCallback((controller) => {
    const url = type === 'track' ? '/api/me/tracks/contains' : '/api/me/albums/contains'
    return HttpProvider.get(url, {
      params: {
        ids
      },
      signal: controller?.signal,
    })
      .then((res: { data: boolean[] }) => {
        const [liked = false] = res?.data || [false]
        setIsLiked(liked)
        return res
      })
  }, [type, ids])


  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    setLoading(true)
    const url = type === 'track' ? '/api/me/tracks' : '/api/me/albums'
    const params = {
      ids
    }
    const httpMethod = isLiked ? HttpProvider.delete(url, { data: params }) : HttpProvider.put(url, params)
    return httpMethod
      .then(async (res) => {
        setIsLiked(like => like = !like)
        await revalidateByTag(type === "track" ? "saved-tracks" : "saved-albums")
        await revalidateByPath("/profile", 'layout')
        return res
      })
      .finally(() => {
        setLoading(false)
        refreshPageAfterEdit()
        onClick()
      })
  }

  const refreshPageAfterEdit = () => {
    // Refresh the current route
    // losing client-side browser or React state.
    router.refresh()
  }


  useEffect(() => {
    const controller = new AbortController();
    checkForLike(controller)
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [checkForLike])

  return (
    <button type="button" className={`btn btn-none btn-like ${animate ? 'hover-anim' : ''} ${className}`} onClick={handleClick} {...props}>
      {
        loading ? <Spinner show={true} width={20} height={20} />
          : <>
            <Icon id={isLiked ? 'heart-active' : 'heart'} color={isLiked ? '#1ed760' : ''} width={20} height={20} {...iconProps} />
            {label}
          </>
      }
    </button>
  )
}