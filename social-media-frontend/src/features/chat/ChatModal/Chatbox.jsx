import { MDBContainer, MDBRow, MDBCol, MDBCard } from 'mdb-react-ui-kit'
import { connect, useSelector } from 'react-redux'
import { addOnlineUser, getNewMessages, setOnlineUsers } from '../chatSlice'
import AddMessage from './AddMessage'
import Header from './Header'
import MessagesList from './MessagesList'
import { useEffect } from 'react'

function ChatboxContainer(props) {
  const user = useSelector((state) => state.user)
  const onlineUsers = useSelector((state) => state.chat.onlineUsers)
  const messages = useSelector((state) => state.chat.messages)

  useEffect(() => {
    addUser()
    props.dispatchMessages()
  }, [messages])

  const addUser = () => {
    props.dispatchAddOnlineUser(user.username, user.id, user.profilePicture)
    props.dispatchOnlineUsers(onlineUsers)
  }

  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: '#eee' }}>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol>
          <MDBCard>
            <Header />
            <MessagesList messages={messages} />
            <AddMessage />
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

const mapDispatchToProps = (dispatch) => ({
  dispatchAddOnlineUser: (username, id, avatar) => {
    dispatch(
      addOnlineUser({
        username: username,
        id: id,
        avatar: avatar,
      })
    )
  },
  dispatchOnlineUsers: (onlineUsers) => {
    dispatch(setOnlineUsers(onlineUsers))
  },
  dispatchMessages: () => {
    dispatch(getNewMessages())
  },
})

export default connect(() => ({}), mapDispatchToProps)(ChatboxContainer)
