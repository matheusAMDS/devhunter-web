import NextLink from "next/link"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>DevHunter</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"  />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NextLink href="/">
                <Nav.Link href="/">Home</Nav.Link>
              </NextLink>
              <NextLink href="/about">
                <Nav.Link href="/about">Sobre</Nav.Link>
              </NextLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
        {children}
      </main>
    </>
  )
}

export default Layout