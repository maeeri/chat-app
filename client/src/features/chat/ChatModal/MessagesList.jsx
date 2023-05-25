import { connect } from 'react-redux'
import { useRef, useEffect } from 'react'
import { MDBCardBody } from 'mdb-react-ui-kit'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import profilePicture from '../../../media/img/profilepic.png'

function ChatMessage({ message }) {
  const user = useSelector((state) => state.user)
  return user.username !== message.username ? (
    <>
      <div className="d-flex justify-content-between">
        <p className="small mb-1">{message.username}</p>
        <p className="small mb-1 text-muted">{message.timecode} </p>
      </div>
      <div className="d-flex flex-row justify-content-start">
        <img
          src={message.avatar ? message.avatar : profilePicture}
          alt={`${message.username} avatar`}
          className="chat-avatar"
        />
        <div>
          <p
            className="small p-2 ms-3 mb-3 rounded-3"
            style={{ backgroundColor: '#f5f6f7' }}
          >
            {message.content}
          </p>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="d-flex justify-content-between">
        <p className="small mb-1 text-muted">{message.timecode} </p>
        <p className="small mb-1">{message.username}</p>
      </div>
      <div className="d-flex flex-row justify-content-end">
        <div>
          <p
            className="small p-2 ms-3 mb-3 rounded-3"
            style={{ backgroundColor: '#f5f6' }}
          >
            {message.content}
          </p>
        </div>

        <img
          src={message.avatar ? message.avatar : profilePicture}
          alt={`${message.username} avatar`}
          className="chat-avatar-self"
        />
      </div>
    </>
  )
}

ChatMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    timecode: PropTypes.string.isRequired,
  }),
}

const MessagesListComponent = ({ messages }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <MDBCardBody className="chat-body">
      {messages.map((m) => (
        <ChatMessage message={m} key={m.id} />
      ))}
      <div ref={messagesEndRef} />
    </MDBCardBody>
  )
}

MessagesListComponent.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      timecode: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default connect(
  (state) => ({
    messages: state.chat.messages,
  }),
  {}
)(MessagesListComponent)
