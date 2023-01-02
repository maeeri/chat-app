import { connect } from 'react-redux'
import { sendMessage } from '../chatSlice'
import { Button, Form, Image } from 'react-bootstrap'
import { MDBInputGroup, MDBCardFooter } from 'mdb-react-ui-kit'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'

const AddMessageComponent = (props) => {
  const [content, setContent] = useState('')
  const user = useSelector((state) => state.user)

  const send = (event) => {
    event.preventDefault()
    content && props.dispatch(user.username, content, user.profilePicture)
    setContent('')
  }

  return (
    <section id="new-message">
      <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
        <Image src={user.profilePicture} className="chat-avatar" />
        <Form onSubmit={(event) => send(event)}>
          <MDBInputGroup className="mb-0">
            <input
              className="form-control"
              placeholder="Type message"
              type="text"
              value={content}
              onChange={({ target }) => setContent(target.value)}
            />
            <Button
              type="submit"
              className="yellow"
              style={{ paddingTop: '.55rem' }}
            >
              send
            </Button>
          </MDBInputGroup>
        </Form>
      </MDBCardFooter>
    </section>
  )
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: (username, content, avatar) => {
    dispatch(
      sendMessage({
        id: uuid(),
        username: username,
        content: content,
        avatar: avatar,
        timecode: new Date().toLocaleString('en-UK'),
      })
    )
  },
})

export default connect(() => ({}), mapDispatchToProps)(AddMessageComponent)
