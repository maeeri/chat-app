import { useSelector } from 'react-redux'
import { Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const user = useSelector((state) => state.user)
  const onlineUsers = useSelector((state) => state.chat.onlineUsers)

  return (
    <Container>
      <h5 style={{ marginBottom: '18px' }}>chat users</h5>
      <ul id="online-userlist">
        {onlineUsers &&
          onlineUsers.map((u) => {
            return (
              <li key={u.username}>
                <Image
                  style={{ width: '20px' }}
                  className="chat-avatar"
                  src={u.profilePicture}
                />
                {user.id !== u.id && (
                  <Link className='link chat-link' to={`/profile/${u.id}`}>{u.username}</Link>
                )}
                {user.id === u.id && <>me</>}
              </li>
            )
          })}
      </ul>
    </Container>
  )
}

export default Sidebar
