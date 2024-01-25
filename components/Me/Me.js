'use client'
import { useState, useEffect } from "react"
import HttpProvider from "@/services/HttpProvider"
import Link from "next/link"
import ImageFlat from "../Image/FlatImage"
import style from "./Me.module.scss"
import Placeholder from "../Loader/Placeholder"

export default function Me ({ className = "" }) {
  const [loading, setLoading] = useState(true)
  const [me, setMe] = useState()
  const [profileImageUrl, setProfileUrl] = useState('')

  const load = () => {
    setLoading(true)
    return HttpProvider.get(`/api/me`)
      .then((res) => {
        const { me } = res.data
        const [ small, medium ] = me?.images || []
        setProfileUrl(small || medium)
        setMe(me)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className={className}>
      { loading ? <Placeholder xs={2} style={{ borderRadius: '20px', width: '40px', height: '40px' }} /> : null }
      {
        me && 'id' in me ?
        <div className={style.meWrapp}>
          <Link href={{
            pathname: `/profile/${me.id}`
          }}>
            <div className={style.meWrappInfo}>
              <ImageFlat src={profileImageUrl?.url} fill className={style.meWrappInfoImage} />
            </div>
          </Link>
        </div>
        : null
      }
    </div>
  )
}