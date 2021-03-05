import BootstrapAlert from "react-bootstrap/Alert"
import { useState } from "react"

interface AlertProps {
  heading: string 
  body: string
  color: 'primary' | 'secondary' | 'danger' | 'success'
  closable?: boolean
}

const Alert: React.FC<AlertProps> = ({ heading, body, color, closable }) => {
  const [ show, setShow ] = useState(true)

  return (
    <BootstrapAlert 
      show={show} 
      variant={color} 
      onClose={closable && (() => setShow(!show))}
      dismissible={closable}
    >
      <BootstrapAlert.Heading>{heading}</BootstrapAlert.Heading>
      <p>{body}</p>
    </BootstrapAlert>
  )
}

export default Alert