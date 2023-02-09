import { Modal, Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { toggleShowChat } from 'features/show/showSlice'
import Chatbox from './Chatbox'

function ChatModal() {
  const showChat = useSelector((state) => state.show.chat)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(toggleShowChat(false))
  }

  return (
    <Modal
      scrollable={true}
      className="chat-modal"
      show={showChat}
      onHide={handleClose}
    >
      <Row>
        {user.id && (
          <Modal.Body className="chat-modal-body">
            <Col>
              <Chatbox />
            </Col>
          </Modal.Body>
        )}
        {!user.id && (
          <Modal.Body>
            <Col style={{ textAlign: 'center' }}>
              sign up or sign in to start chatting
            </Col>
          </Modal.Body>
        )}
      </Row>
    </Modal>
  )
}

export default ChatModal
