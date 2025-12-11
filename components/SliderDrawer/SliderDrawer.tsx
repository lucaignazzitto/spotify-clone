// using offcanvas instead
'use client'
import { ReactNode } from "react"
import Offcanvas, { OffcanvasProps } from 'react-bootstrap/Offcanvas'

export interface SliderDrawerProps extends OffcanvasProps {
  className?: string
  show?: boolean
  onClose: (e:any) => void
  title?: string | ReactNode
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
}: SliderDrawerProps) {

  const handleHide = (e) => {
    onClose(e)
  }

  return (
    <Offcanvas show={show} placement={placement} className={`${className}`} onHide={handleHide} { ...props }>
      <Offcanvas.Header closeButton closeVariant="white">
        {title ? <Offcanvas.Title as="span">{title}</Offcanvas.Title> : null }
      </Offcanvas.Header>
      <Offcanvas.Body>
        {children}
      </Offcanvas.Body>
    </Offcanvas>
  )
}