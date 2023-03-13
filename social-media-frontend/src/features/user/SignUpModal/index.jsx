import { createUser } from 'services/user'
import { Form, Button, Modal } from 'react-bootstrap'
import { useState } from 'react'
import { addUserToState } from 'features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toggleShowSignUp } from 'features/show/showSlice'
import { login } from 'services/login'
import ErrorMessage from 'components/ErrorMessage'

function SignUpModal() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const show = useSelector((state) => state.show.signup)

  const handleClose = () => dispatch(toggleShowSignUp(false))

  const signup = async (event) => {
    event.preventDefault()
    if (username && password && name) {
      try {
        await createUser(username, password, name)
        const user = await login({
          username: username,
          password: password,
        })

        window.localStorage.setItem('socialAppUser', JSON.stringify(user))
        dispatch(addUserToState(user.id))
        dispatch(toggleShowSignUp(false))
        setName('')
        setPassword('')
        setUsername('')
      } catch (error) {
        const resMessage = error.response.data.message
        setMessage(resMessage)
      }
      setMessage('')
    } else {
      let newMessage = !username
        ? 'username '
        : !password
        ? 'password '
        : 'name '
      newMessage += 'is required'
      setMessage(newMessage)
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
        <Modal.Title>Sign up</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ErrorMessage message={message} />
        <hr/>
        <Form onSubmit={signup}>
          <Form.Group value={username} name="username" controlId="username">
            <Form.Label>username</Form.Label>
            <Form.Control
              onChange={({ target }) => {
                setUsername(target.value)
              }}
              placeholder="username"
            />
            {/* <ErrorMessage message={!username && message} /> */}
          </Form.Group>
          <Form.Group value={password} name="password" controlId="password">
            <Form.Label>password</Form.Label>
            <Form.Control
              onChange={({ target }) => {
                setPassword(target.value)
              }}
              type="password"
              placeholder="password"
            />
            {/* <ErrorMessage message={!password && message} /> */}
          </Form.Group>
          <Form.Group value={name} name="name" controlId="name">
            <Form.Label>name</Form.Label>
            <Form.Control
              onChange={({ target }) => {
                setName(target.value)
              }}
              type="text"
              placeholder="name"
            />
            {/* <ErrorMessage message={!name && message} /> */}
          </Form.Group>
          <br />
          <Button className="interactive" variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default SignUpModal
