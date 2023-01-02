import { Navbar, Container, Offcanvas, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toggleShowSignIn, toggleShowSignUp } from 'features/show/showSlice'

function AppBar({ logout }) {
  const user = useSelector((state) => state.user)
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const showSignIn = () => {
    dispatch(toggleShowSignIn(true))
  }

  const showSignUp = () => {
    dispatch(toggleShowSignUp(true))
  }

  return (
    <Navbar fixed="top" expand="lg" className="menu">
      <Container fluid>
        <Navbar.Toggle
          style={{ background: 'white' }}
          aria-controls="offcanvasNavbar-expand-lg"
        />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          placement="end"
          className="menu"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              className="menu-heading"
              id="offcanvasNavbarLabel-expand-lg"
            >
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link className="link navlink" href="/">
                Home
              </Nav.Link>
              {user.id && (
                <Nav.Link href={`/users`} className="link navlink">
                  User list
                </Nav.Link>
              )}
              {user.id && (
                <Nav.Link
                  href={`/profile/${state.user.id}`}
                  className="link navlink"
                >
                  Profile
                </Nav.Link>
              )}
              {!user.id && (
                <>
                  <div>
                    <Nav.Link
                      className="link navlink"
                      onClick={() => showSignUp()}
                    >
                      Sign up
                    </Nav.Link>
                  </div>
                  <div>
                    <Nav.Link
                      className="link navlink"
                      onClick={() => showSignIn()}
                    >
                      Sign in
                    </Nav.Link>
                  </div>
                </>
              )}
              {user.id && (
                <Nav.Link className="link navlink" onClick={() => logout()}>
                  Sign out
                </Nav.Link>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default AppBar
