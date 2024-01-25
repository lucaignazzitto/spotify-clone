// using offcanvas instead
'use client'
import { useEffect, useState } from "react"
import Offcanvas from 'react-bootstrap/Offcanvas'
import style from "./SliderDrawer.module.scss"

export default function SliderDrawer ({
  className = "",
  show = false,
  placement = "bottom",
  onClose,
  title = "",
  children,
  ...props
}) {

  const [showDrawer, setShowDrawer] = useState(show)

  const handleHide = (e) => {
    onClose && onClose(e)
  }

  useEffect(() => {
    setShowDrawer(show)
  }, [show])

  return (
    <Offcanvas show={showDrawer} placement={placement} { ...props } className={`${className} ${style.SliderDrawer}`} onHide={handleHide}>
      <Offcanvas.Header closeButton closeVariant="white">
        {title ? <Offcanvas.Title as="span">{title}</Offcanvas.Title> : null }
      </Offcanvas.Header>
      <Offcanvas.Body>
        {children}
      </Offcanvas.Body>
    </Offcanvas>
  )
}