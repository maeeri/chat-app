import { connect, useSelector } from 'react-redux'
import { MDBCardHeader } from 'mdb-react-ui-kit'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = ({ onlineUsers }) => {
  const user = useSelector((state) => state.user)
  
  return (
    <MDBCardHeader
      className="d-flex justify-content-between align-items-center p-3"
      style={{ borderTop: '4px solid #ffa900' }}
    >
      <h5 className="mb-0">Chat messages</h5>
      <div className="d-flex flex-row align-items-center">
        <DropdownButton
          variant="warning"
          title={`users online
          ${onlineUsers.length}`}
        >
          {onlineUsers.map((u) => (
            <Dropdown.Item>
              <Link className="chat-link link" to={`/profile/${u.id}`}>
                {u.id === user.id ? <>me</> : <>{u.username}</>}
              </Link>
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </MDBCardHeader>
  )
}

export default connect(
  (state) => ({
    onlineUsers: state.chat.onlineUsers,
  }),
  {}
)(Header)
