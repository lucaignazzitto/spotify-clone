// using offcanvas instead
'use client'
import { useEffect, useState } from "react"
import Offcanvas, { OffcanvasProps } from 'react-bootstrap/Offcanvas'
import style from "./SliderDrawer.module.scss"

interface Props extends OffcanvasProps {
  className?: string
  show?: boolean
  onClose: (e:any) => void
  title?: string
  children,
}
export default function SliderDrawer ({
  className = "",
  show = false,
  placement = "bottom",
  onClose = () => {},
  title = "",
  children,
  ...props
}: Props) {

  const [showDrawer, setShowDrawer] = useState<boolean>(show)

  const handleHide = (e) => {
    onClose(e)
  }

  useEffect(() => {
    setShowDrawer(show)
  }, [show])

  return (
    <Offcanvas show={showDrawer} placement={placement} className={`${className} ${style.SliderDrawer}`} onHide={handleHide} { ...props }>
      <Offcanvas.Header closeButton closeVariant="white">
        {title ? <Offcanvas.Title as="span">{title}</Offcanvas.Title> : null }
      </Offcanvas.Header>
      <Offcanvas.Body>
        {children}
      </Offcanvas.Body>
    </Offcanvas>
  )
}