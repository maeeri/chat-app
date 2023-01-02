import { Link } from 'react-router-dom'
import { ListGroup, Button, Image, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import profilepic from 'media/img/profilepic.png'
import { removeConnection } from './userSlice'

function FriendsList({ friends }) {
  const { id } = useParams()
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()

  const unfriend = (friendId) => {
    dispatch(removeConnection(friendId, token))
    window.location.reload()
  }

  return (
    <ListGroup className="list-profilepage box">
      {friends.map((f) => (
        <ListGroup.Item key={f.id}>
          <div style={{ display: 'inline-block' }}>
            <Link className="link favourites" to={`/profile/${f.id}`}>
              <Image
                className="list-img interactive friendlist-img"
                src={f.profilePicture ? f.profilePicture : profilepic}
                alt=""
              />
            </Link>
          </div>
          <div style={{ display: 'inline-block' }}>{f.name}</div>

          {user.id === id && (
            <Button
              onClick={() => unfriend(f.id)}
              className="float-right favourite-button interactive"
            >
              <span
                title={`unfriend ${f.name}`}
                className="material-symbols-outlined"
              >
                heart_broken
              </span>
            </Button>
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default FriendsList
