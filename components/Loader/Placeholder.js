import Col from 'react-bootstrap/Col';

export default function Placeholder ({ className = "", animation = "wave", ...props }) {
  return (
    <Col { ...props } className={`placeholder placeholder-${animation} ${className}`}></Col>
  )
}