import { Route, Routes, useNavigate } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import AppBar from 'components/AppBar'
import { useEffect } from 'react'
import { addUserToState, removeUserFromState } from 'features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import ProfilePage from 'features/user/ProfilePage'
import SignUpModal from 'features/user/SignUpModal'
import SignInModal from 'features/user/SignInModal'
import ChatModal from 'features/chat/ChatModal'
import { addTokenToState } from 'features/token/tokenSlice'
import HomePage from 'components/HomePage'
import UserList from 'features/allUsers/UserList'
import { initializeAllUsers } from 'features/allUsers/allUsersSlice'
import Footer from 'components/Footer'
import { addOnlineUser, removeOnlineUser } from 'features/chat/chatSlice'

function App() {
  const user = useSelector((state) => state.user)
  const allUsers = useSelector((state) => state.allUsers)
  const onlineUsers = useSelector((state) => state.chat.onlineUsers)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('socialAppUser')
    if (!user.id && loggedUserJSON) {
      const userFromLocalStorage = JSON.parse(loggedUserJSON)
      dispatch(addTokenToState(userFromLocalStorage.token))
      dispatch(addUserToState(userFromLocalStorage.id))
    }
    initAllUsers()
    if (userForOnlineUsers) initOnlineUser()
    if (userForOnlineUsers)
      window.addEventListener('beforeunload', (event) => {
        event.preventDefault()
        dispatch(removeOnlineUser(userForOnlineUsers))
      })
  }, [user])

  const initAllUsers = async () => {
    if (allUsers.length === 0) await dispatch(initializeAllUsers())
  }

  const userForOnlineUsers =
    user.username !== null
      ? {
          username: user.username,
          id: user.id,
          profilePicture: user.profilePicture,
        }
      : null

  const initOnlineUser = async () => {
    if (user.id && (!onlineUsers.includes(userForOnlineUsers) || !onlineUsers))
      await dispatch(addOnlineUser(userForOnlineUsers))
  }

  const logout = () => {
    window.localStorage.removeItem('socialAppUser')
    dispatch(removeUserFromState())
    navigate('/')
  }

  return (
    <Container className="contents box">
      <AppBar logout={logout} />
      <Row></Row>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:id" element={<ProfilePage user={user} />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
      <SignUpModal />
      <SignInModal />
      <ChatModal />
      <Footer />
    </Container>
  )
}

export default App
