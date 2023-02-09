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
  const { dispatchMessages, dispatchAddOnlineUser, dispatchOnlineUsers } = props

  useEffect(() => {
    function addUser() {
      console.log(onlineUsers)
      dispatchAddOnlineUser(user.username, user.id, user.profilePicture)
      dispatchOnlineUsers(onlineUsers)
    }

    addUser()
    dispatchMessages()
  }, [messages])

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
