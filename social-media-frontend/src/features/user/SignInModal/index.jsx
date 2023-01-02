import { login } from 'services/login'
import { useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addUserToState } from 'features/user/userSlice'
import { addTokenToState } from 'features/token/tokenSlice'
import { toggleShowSignIn } from 'features/show/showSlice'

function SignInModal() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const show = useSelector((state) => state.show.signin)

  const handleClose = () => dispatch(toggleShowSignIn(false))

  const signin = async (event) => {
    event.preventDefault()

    try {
      const user = await login({
        username: username,
        password: password,
      })
      window.localStorage.setItem('socialAppUser', JSON.stringify(user))

      dispatch(addUserToState(user.id))
      dispatch(addTokenToState(user.token))
      dispatch(toggleShowSignIn(false))
      
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Modal
      className="modal"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Sign in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={signin}>
          <Form.Group name="username" value={username} controlId="username">
            <Form.Label>username</Form.Label>
            <Form.Control
              type="text"
              onChange={({ target }) => {
                setUsername(target.value)
              }}
            />
          </Form.Group>
          <Form.Group name="password" value={password} controlId="password">
            <Form.Label>username</Form.Label>
            <Form.Control
              type="password"
              onChange={({ target }) => {
                setPassword(target.value)
              }}
            />
          </Form.Group>
          <br />
          <Button className="interactive" variant="dark" type="submit">
            sign in
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default SignInModal
