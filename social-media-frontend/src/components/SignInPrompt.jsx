import { Container, Button } from 'react-bootstrap'
import SignUpModal from '../features/user/SignUpModal'
import SignInModal from '../features/user/SignInModal'
import { useDispatch } from 'react-redux'
import { toggleShowSignIn, toggleShowSignUp } from 'features/show/showSlice'

function SignInPrompt() {
  const dispatch = useDispatch()

  const showSignIn = () => {
    dispatch(toggleShowSignIn(true))
  }

  const showSignUp = () => {
    dispatch(toggleShowSignUp(true))
  }

  return (
    <Container className="signin-prompt">
      <Button
        className="interactive prompt-btn"
        onClick={() => showSignUp(true)}
      >
        Sign up
      </Button>
      <Button
        className="interactive prompt-btn"
        onClick={() => showSignIn(true)}
      >
        Sign in
      </Button>
      <SignUpModal />
      <SignInModal />
    </Container>
  )
}

export default SignInPrompt
