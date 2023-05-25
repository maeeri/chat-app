import { Navbar, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toggleShowChat } from 'features/show/showSlice'

function Footer() {
  const show = useSelector((state) => state.show.chat)
  const dispatch = useDispatch()

  return (
    <Navbar bg="dark" fixed="bottom" variant="dark">
      <Container>
        <Navbar.Text>
          <Button
            className="link navlink"
            onClick={() => dispatch(toggleShowChat(!show))}
          >
            chat{' '}
          </Button>
        </Navbar.Text>
        <Navbar.Text>© Mari-Anne Eerikäinen 2023</Navbar.Text>
      </Container>
    </Navbar>
  )
}

export default Footer
