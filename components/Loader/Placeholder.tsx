import Col, { ColProps } from 'react-bootstrap/Col';

export default function Placeholder ({ className = "", animation = "wave", ...props }: ColProps) {
  return (
    <Col { ...props } className={`placeholder placeholder-${animation} ${className}`}></Col>
  )
}